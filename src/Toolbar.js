import {keys} from "./keys";
import React from "react";
import {NavLink, Route, Switch, useParams, useHistory} from "react-router-dom";
import {useGlobalState} from "./hooks/useGlobal";

function Breadcrumb (props) {
    let params = useParams();
    let to = "/";
    if (params.companyID) to = `/company/${params.companyID}/`
    if (params.assetID) to += `asset/${params.assetID}/`
    return (
        <li>
            <NavLink exact to={to}>{props.name}</NavLink>
        </li>
    )
}

export function Toolbar(props) {
    let toggleFullscreen = function () {
        if (!document.fullscreenElement) {
            document.body.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen().catch(err => {
                console.log(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
            });
        }
    };
    let readScreen = function () {
        // TODO: read alt text, heading numbers, etc.
        let canvas = document.getElementById("canvas").contentDocument;
        speechSynthesis.speak(new SpeechSynthesisUtterance(canvas.body.textContent))
    };
    let testEmail = function () {
        let subject = prompt("Please enter your subject", "Design tool test. ID:" + Math.round(Math.random() * 999999));
        if (!subject) return;
        fetch('https://api.emailonacid.com/v5/email/tests', {
            method: 'POST',
            headers: {'Authorization': 'Basic ' + keys.EOA},
            body: JSON.stringify({
                "subject": subject,
                "html": props.src_doc
            })
        }).then((response) => response.json())
            .then((data) => {
                window.open("https://app.emailonacid.com/app/acidtest/" + data.id + "/list", "emailonacid");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    let changeView = e => {
        document.body.className = "view_" + e.target.value;
        props.setView(e.target.value);
        if (e.target.value === "code") {
            
        }
    };
    
	const {companies} = useGlobalState();
    const history = useHistory();
  
    function handleChange(e) {
        history.push("/company/" + document.getElementById("search").value);
    }
    //TODO: Complete toggle outlines, toggle images, autoformat, style inline
    // use route match for breadcrumb
    return (
        <div className="scroll">
            <div id="toolbar">
                <nav className="navbar">
                    <ul>
                        <Route path="/">
                            <Breadcrumb name="List" />
                        </Route>
                        <Route path="/company/:companyID/">
                            <Breadcrumb name="Company" />
                        </Route>
                        <Route path="/company/:companyID/campaign/:campaignID/">
                            <Breadcrumb name="Campaign" />
                        </Route>
                        <Route path="/company/:companyID/asset/:assetID/">
                            <Breadcrumb name="Asset" />
                        </Route>
                    </ul>
                </nav>
                <form className="save-group" onSubmit={handleChange}>
                    <input 
                        list="companies" id="search" type="search" placeholder="Search" defaultValue="" autoComplete="off"
                    />
                    <button type="submit">
                        <i className="fas fa-search"> </i>
                        <span className="tablet-tooltip">Search</span>
                    </button>
                    <datalist id="companies">
                        {companies.map(c => <option value={c.name} key={c.id} />)}
                    </datalist>
                </form>
                <Switch>
                    <Route path="/company/:companyID/asset/:assetID/">
                        <div className="radio-buttons" id="editor-view" onChange={changeView}>
                            <input id="editor-view-menu" name="editor-view" type="radio" value="menu"/>
                            <label htmlFor="editor-view-menu">
                                <i className="fas fa-bars"> </i>
                                <span className="tablet-tooltip">Menu</span>
                            </label>
                            <input id="editor-view-images" name="editor-view" type="radio" value="images"/>
                            <label htmlFor="editor-view-images">
                                <i className="far fa-images"> </i>
                                <span className="tablet-tooltip">Manage Images</span>
                            </label>
                            <input id="editor-view-code" name="editor-view" type="radio" value="code"/>
                            <label htmlFor="editor-view-code">
                                <i className="fas fa-code"> </i>
                                <span className="tablet-tooltip">Code</span>
                            </label>
                            <input id="editor-view-visual" name="editor-view" type="radio" value="visual" defaultChecked/>
                            <label htmlFor="editor-view-visual">
                                <i className="fas fa-eye"> </i>
                                <span className="tablet-tooltip">Visual</span>
                            </label>
                        </div>
                        <button type="button" id="save">
                            <i className="far fa-save"> </i>
                            <span className="">Save</span>
                        </button>
                        <div className="radio-buttons code_control">
                            <button type="button" id="emailInline">Email Inline</button>
                            <button type="button" id="autoFormat">Autoformat</button>
                        </div>
                        <div className="radio-buttons visual_control" id="device-view" onChange={e => props.changeDevice(e.target.value)}>
                            <input id="device-view-desktop" name="device-view" type="radio" value="desktop" defaultChecked/>
                            <label htmlFor="device-view-desktop">
                                <i className="fas fa-desktop"> </i>
                                <span className="tablet-tooltip">Desktop</span>
                            </label>
                            <input id="device-view-tablet" name="device-view" type="radio" value="tablet"/>
                            <label htmlFor="device-view-tablet">
                                <i className="fas fa-tablet-alt"> </i>
                                <span className="tablet-tooltip">Tablet</span>
                            </label>
                            <input id="device-view-mobile" name="device-view" type="radio" value="mobile"/>
                            <label htmlFor="device-view-mobile">
                                <i className="fas fa-mobile-alt"> </i>
                                <span className="tablet-tooltip">Mobile</span>
                            </label>
                        </div>
                        <div className="button-group visual_control">
                            <button type="button" id="zoomIn" onClick={e => props.changeZoom(e, "in")}>
                                <i className="fas fa-search-plus"> </i>
                                <span className="tablet-tooltip">Zoom In</span>
                            </button>
                            <button type="button" id="zoomO" onClick={e => props.changeZoom(e, "")}>100%</button>
                            <button type="button" id="zoomOut" onClick={e => props.changeZoom(e, "out")}>
                                <i className="fas fa-search-minus"> </i>
                                <span className="tablet-tooltip">Zoom Out</span>
                            </button>
                        </div>
                        <div className="button-group visual_control">
                            <button type="button" id="toggleImages" onClick={props.toggleImages}>
                                <i className="far fa-image"> </i>
                                <span className="tablet-tooltip">Toggle Images</span>
                            </button>
                            <button type="button" id="sendTestEmail" onClick={testEmail}>
                                <i className="far fa-paper-plane"> </i>
                                <span className="tablet-tooltip">EOA Test</span>
                            </button>
                            <button type="button" id="toggleOutlines" onClick={props.toggleOutlines}>
                                <i className="fas fa-border-none"> </i>
                                <span className="tablet-tooltip">Toggle Outlines</span>
                            </button>
                            <button type="button" id="fullScreen" onClick={toggleFullscreen}>
                                <i className="fas fa-expand-arrows-alt"> </i>
                                <span className="tablet-tooltip">Full Screen</span>
                            </button>
                            <button type="button" id="speak" onClick={readScreen}>
                                <i className="fas fa-voicemail"> </i>
                                <span className="tablet-tooltip">Speak</span>
                            </button>
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}