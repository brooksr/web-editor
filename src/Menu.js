import React from "react";
import {Controlled as CodeMirror} from 'react-codemirror2'

export function Menu(props) {
	return (
			<div className={"scroll modal menu" + (props.view === "menu" ? "" : " invisible")}>
				<button>Save as Template</button>
				<div className="newItem">
					<h3>New</h3>
					<ul>
						{props.templates.map((template, ind) =>
								<Template setTemplate={props.setTemplate} template={template} key={ind}/>
						)}
					</ul>
				</div>
				<div className="openItem">
					<h3>Open</h3>
					{props.campaigns.map((campaign, ind) =>
							<CampaignSummary setTemplate={props.setTemplate} campaign={campaign} key={ind}/>
					)}
				</div>
				<div className="shortcuts">
					<h3>Shortcuts</h3>
					<dl className="flex">
						<dt>Ctrl + S</dt><dd>Save</dd>
						<dt>Ctrl + <i className="far fa-arrow-alt-circle-up"></i></dt><dd>Move active element up</dd>
						<dt>Ctrl + <i className="far fa-arrow-alt-circle-down"></i></dt><dd>Move active element down</dd>
						<dt>Ctrl + D</dt><dd>Clone active element</dd>
						<dt>Tab</dt><dd>Move focus to next slement</dd>
						<dt>Shift + Tab</dt><dd>Move focus to previous next slement</dd>
						<dt>Ctrl + L</dt><dd>Wrap text in a link</dd>
						<dt>Ctrl + B</dt><dd>Bold text</dd>
						<dt>Ctrl + I</dt><dd>Italic text</dd>
						<dt>Ctrl + U</dt><dd>Underline text</dd>
					</dl>
				</div>
			</div>
	)
}

export function ImageMenu(props) {
	return (
			<div className={"scroll modal menu" + (props.view === "images" ? "" : " invisible")}>
				<h3>Images</h3>
				<form action="" method="post" encType="multipart/form-data">
					<input type="file" name="fileToUpload" id="fileToUpload"/>
					<input type="submit" value="Upload Image" name="submit"/>
				</form>
				<ul>
					{props.images.map((i) =>
							<li key={i.src}>
								<img src={i.src} alt={i.alt}/>
								<a href={i.src} target="_blank" rel="noopener noreferrer">{i.src}</a>
								<p>{i.alt}</p>
								<span className="image-size">{i.size}</span>
							</li>
					)}
				</ul>
			</div>
	)
}

export function CodeEditor(props) {
	let options = {
		lineNumbers: true,
		lineWrapping: true,
		theme: "darcula",
		mode: "htmlmixed"
	};
	//TODO: link autoformat button from toolbar (or move here), and add autoformat.js from design_tool
	//TODO: move inline styles from autoformat.js
	// causing an error: onChange={props.setActiveTemplate}
	return (
			<div className={"scroll modal menu" + (props.view === "code" ? "" : " invisible")}>
				<CodeMirror value={props.src_doc} options={options}/>
			</div>
	)
}

export function ClientSettings(props) {
	return (
			<div className={"scroll modal menu" + (props.view === "campaigns" ? "" : " invisible")}>
				<h2>Client Settings</h2>
				<hr/>
				<h3>Campaigns</h3>
				{props.campaigns.map((campaign, ind) =>
						<Campaign setTemplate={props.setTemplate} campaign={campaign} key={ind}/>
				)}
				<h3>Fonts</h3>
				{props.fonts.map((font, index) => {
					return (
							<div key={index} className="input-group">
								<label>Font Name</label>
								<input type="text" name="name" value={font.name} onChange={props.setFonts}/>
								<label>Font Path</label>
								<input type="text" name="path" value={font.path} onChange={props.setFonts}/>
							</div>
					)
				})}
				<h3>Styles</h3>
				{Object.keys(props.styles).map((cssVar, index) => {
					return (
							<div key={index} className="input-group">
								<label>Name</label>
								<input type="text" name="name" value={cssVar} onChange={props.setStyles}/>
								<label>Value</label>
								<input type="text" name="value" value={props.styles[cssVar]} onChange={props.setStyles}/>
							</div>
					)
				})}
				<h3>Company</h3>
				{Object.keys(props.company).map((name, index) => {
					return (
							<div key={index} className="input-group">
								<label>Name</label>
								<input type="text" name="name" value={name} readOnly={true}/>
								<label>Value</label>
								<input type="text" name="value" value={props.company[name]} readOnly={true}/>
							</div>
					)
				})}
			</div>
	)
}

function CampaignSummary(props) {
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

function AssetList(props) {
	return (
			<div className="flex flex-auto">
				{(props.list.configs || props.list.attempts).map((config, index) => {
					return (
							<div key={index} className="campaignWrapper clearfix">
								<div className="iframeWrapper" style={{float: "left"}}>
									<iframe srcDoc={config.html} title="campaign preview"></iframe>
								</div>
								<div className="button-group button-group-sm flex-auto">
									<button onClick={e => props.setTemplate(config.html)}>
										<i className="far fa-edit"></i>
										<span className="tablet-tooltip">Edit</span>
									</button>
									<button disabled={true}>
										<i className="far fa-save"></i>
										<span className="tablet-tooltip">Save</span>
									</button>
									<button disabled={true}>
										<i className="fas fa-archive"></i>
										<span className="tablet-tooltip">Archive</span>
									</button>
									<button disabled={true}>
										<i className="fas fa-arrows-alt"></i>
										<span className="tablet-tooltip">Move</span>
									</button>
									<button disabled={true}>
										<i className="far fa-clone"></i>
										<span className="tablet-tooltip">Clone</span>
									</button>
								</div>
								{Object.keys(Object.assign(config, props.list.defaults)).map(prop => {
									return prop === "html" ? "" : (
											<InputGroup key={prop} label={prop} value={config[prop]}/>
									)
								})}
							</div>
					)
				})}
			</div>
	)
}

function Campaign(props) {
	let campaign = props.campaign;
	return (
			<div className="campaignWrapper clearfix">
				<h4><a href={campaign.admin.opp} rel="noopener noreferrer" target="_blank">{campaign.name}</a></h4>
				<p>{campaign.notes}</p>
				<div className="flex flex-auto">
					<div>
						<h4>Rules</h4>
						{campaign.rules && Object.keys(campaign.rules).map(prop => {
							return (
									<InputGroup key={prop} label={prop} value={campaign.rules[prop]}/>
							)
						})}
					</div>
					<div>
						<h4>Features</h4>
						{campaign.features && Object.keys(campaign.features).map(prop => {
							return (
									<InputGroup key={prop} label={prop} value={campaign.features[prop]}/>
							)
						})}
					</div>
					<div>
						<h4>Admin</h4>
						{campaign.admin && Object.keys(campaign.admin).map(prop => {
							return (
									<InputGroup key={prop} label={prop} value={campaign.admin[prop]}/>
							)
						})}
					</div>
				</div>
				<div>
					<h5>Modals</h5>
					{!campaign.modal ? "" : <AssetList list={campaign.modal} setTemplate={props.setTemplate}/>}
					<h5>Emails</h5>
					{!campaign.email ? "" : <AssetList list={campaign.email} setTemplate={props.setTemplate}/>}
				</div>
			</div>
	)
}

function InputGroup(props) {
	return (
			<div className="input-group">
				<label>{props.label}</label>
				{Array.isArray(props.value) ?
						<input type="text" name="value" value={props.value.join(" & ")} readOnly={true}/> :
						props.label.indexOf("notes") !== -1 ? <textarea name="value" value={props.value} readOnly={true}/> :
								<input type="text" name="value" value={props.value} readOnly={true}/>}

			</div>
	)
}

function Template(props) {
	let i = props.template;
	return (
			<li key={i.name} onClick={e => props.setTemplate(i.html)}>
				<div className="iframeWrapper">
					<iframe srcDoc={i.html} title="template preview"></iframe>
				</div>
				<h4>{i.name}</h4>
			</li>
	)
}
