import React from "react";
export function Menu(props) {
    return (
        <div className={"cm_wrap modal menu" + (props.open ? "" : " invisible")}>
            <button id="menuClose" className="button-small" onClick={props.toggleMenu}>×</button>
            <div className="newItem">
                <h3>New</h3>
                <ul>
                    {props.templates.map((template, ind) =>
                        <Template setTemplate={props.setTemplate} template={template} key={ind} />
                    )}
                </ul>
            </div>
            <div className="openItem">
                <h3>Open</h3>
                {props.campaigns.map((campaign, ind) =>
                    <CampaignSummary setTemplate={props.setTemplate} campaign={campaign} key={ind} />
                )}
            </div>
        </div>
    )
}
export function ImageMenu(props) {
    return (
        <div className={"cm_wrap modal menu" + (props.open ? "" : " invisible")}>
            <button id="menuClose" className="button-small" onClick={props.toggleImageMenu}>×</button>
            <h3>Images</h3>
            <form action="" method="post" encType="multipart/form-data">
                <input type="file" name="fileToUpload" id="fileToUpload"/>
                <input type="submit" value="Upload Image" name="submit"/>
            </form>
            <ul>
                {props.images.map((i) =>
                    <li key={i.src}>
                        <img src={i.src} alt={i.alt} />
                        <a href={i.src} target="_blank" rel="noopener noreferrer">{i.src}</a><span className="image-size">i.size</span>
                    </li>
                )}
            </ul>
        </div>
    )
}
export function ClientSettings(props) {
    return (
        <div className={"cm_wrap modal menu" + (props.open ? "" : " invisible")}>
            <button id="menuClose" className="button-small" onClick={props.toggleMenu}>×</button>
            <h2>Client Settings</h2>
            <hr />
            <h3>Campaigns</h3>
            {props.campaigns.map((campaign, ind) =>
                <Campaign setTemplate={props.setTemplate} campaign={campaign} key={ind} />
            )}
            <h3>Fonts</h3>
            {props.fonts.map((font, index) => {
                return (
                    <div key={index} className="input-group">
                        <label>Font Name</label>
                        <input type="text" name="name" value={font.name} onChange={props.setFonts} />
                        <label>Font Path</label>
                        <input type="text" name="path" value={font.path} onChange={props.setFonts} />
                    </div>
                )
            })}
            <h3>Styles</h3>
            {Object.keys(props.styles).map((cssVar, index) => {
                return (
                    <div key={index} className="input-group">
                        <label>Name</label>
                        <input type="text" name="name" value={cssVar} onChange={props.setStyles} />
                        <label>Value</label>
                        <input type="text" name="path" value={props.styles[cssVar]} onChange={props.setStyles} />
                    </div>
                )
            })}
        </div>
    )
}
function CampaignSummary(props){
    let campaign = props.campaign;
    return (
        <div className="campaignWrapper">
            <h4><a href={campaign.admin.opp} rel="noopener noreferrer" target="_blank">{campaign.name}</a></h4>
            <p>{campaign.notes}</p>
            <div className="radio-buttons">
                {campaign.modal && campaign.modal.configs.map((i, index) => {
                    return <button key={index} onClick={e => props.setTemplate(i.html)}>{i.name}</button>
                })}
            </div>
            <div className="radio-buttons">
                {campaign.email && campaign.email.attempts.map((i, index) => {
                    return <button key={index} onClick={e => props.setTemplate(i.html)}>{i.name}</button>
                })}
            </div>
        </div>
    )
}
function Campaign(props){
    let campaign = props.campaign;
    return (
        <div className="campaignWrapper clearfix">
            <h4><a href={campaign.admin.opp} rel="noopener noreferrer" target="_blank">{campaign.name}</a></h4>
            <p>{campaign.notes}</p>
            <div className="radio-buttons">
                {campaign.modal && campaign.modal.configs.map((i, index) => {
                    return <button key={index} onClick={e => props.setTemplate(i.html)}>{i.name}</button>
                })}
            </div>
            <div className="radio-buttons">
                {campaign.email && campaign.email.attempts.map((i, index) => {
                    return <button key={index} onClick={e => props.setTemplate(i.html)}>{i.name}</button>
                })}
            </div>
            <div>
                {/*<div className="campaignWrapper">
                    {campaign.modal && Object.keys(campaign.modal.defaults).map(prop => {
                        return (
                            <InputGroup key={prop} label={prop} value={campaign.modal.defaults[prop]} />
                        )
                    })}
                </div>*/}
                <div style={{marginLeft:"1em"}}>
                    {campaign.modal && campaign.modal.configs.map((config, index) => {
                        return (
                            <div key={index} className="campaignWrapper clearfix">
                                <div className="iframeWrapper">
                                    <iframe srcDoc={config.html}></iframe>
                                </div>
                                {Object.keys(Object.assign(config, campaign.modal.defaults)).map(prop => {
                                    return prop === "html" ? "" : (
                                        <InputGroup key={prop} label={prop} value={config[prop]} />
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                {/*<div className="campaignWrapper">
                    {campaign.email && Object.keys(campaign.email.defaults).map(prop => {
                        return (
                            <InputGroup key={prop} label={prop} value={campaign.email.defaults[prop]} />
                        )
                    })}
                </div>*/}
                <div style={{marginLeft:"1em"}}>
                    {campaign.email && campaign.email.attempts.map((config, index) => {
                        return (
                            <div key={index} className="campaignWrapper clearfix">
                                <div className="iframeWrapper">
                                    <iframe srcDoc={config.html}></iframe>
                                </div>
                                {Object.keys(Object.assign(config, campaign.email.defaults)).map(prop => {
                                    return prop === "html" ? "" :  (
                                            <InputGroup key={prop} label={prop} value={config[prop]} />
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex">
                <div className="flex-4">
                <h4>Rules</h4>
                {campaign.rules && Object.keys(campaign.rules).map(prop => {
                    return (
                        <InputGroup key={prop} label={prop} value={campaign.rules[prop]} />
                    )
                })}
                </div>
                <div className="flex-4">
                <h4>Features</h4>
                {campaign.features && Object.keys(campaign.features).map(prop => {
                    return (
                        <InputGroup key={prop} label={prop} value={campaign.features[prop]} />
                    )
                })}
                </div>
                <div className="flex-4">
                <h4>Admin</h4>
                {campaign.admin && Object.keys(campaign.admin).map(prop => {
                    return (
                        <InputGroup key={prop} label={prop} value={campaign.admin[prop]} />
                    )
                })}
                </div>
            </div>
        </div>
    )
}
function InputGroup(props) {
    return (
        <div className="input-group">
            <label>{props.label}</label>
            {Array.isArray(props.value) ? <input type="text" name="value" value={props.value.join(" & ")} readOnly={true} /> :
                props.label.indexOf("notes") !== -1 ? <textarea name="value" value={props.value} readOnly={true} /> :
                    <input type="text" name="value" value={props.value} readOnly={true} />}

        </div>
    )
}
function Template(props){
    let i = props.template;
    return (
        <li key={i.name} onClick={e => props.setTemplate(i.html)}>
            {i.icon}
            <h4>{i.name}</h4>
        </li>
    )
}
