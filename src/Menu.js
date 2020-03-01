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
                    <Campaign setTemplate={props.setTemplate} campaign={campaign} key={ind} />
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
function Campaign(props){
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
function Template(props){
    let i = props.template;
    return (
        <li key={i.name} onClick={e => props.setTemplate(i.html)}>
            {i.icon}
            <h4>{i.name}</h4>
        </li>
    )
}
