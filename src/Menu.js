import React from "react";
import campaignForm from './campaign'
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
function ClientOptions(props) {
	return (
		<div className="flex flex-auto">
			<div>
				<h3>Fonts</h3>
				<button className="button-sm" disabled={true}>
					<i className="fas fa-plus"></i>
					<span className="sr-only">Add</span>
				</button>
				{props.fonts.map((font, index) => {
					return (
						<div key={index} className="input-group">
							<button className="button-sm button-transparent" disabled={true}>
								<i className="fas fa-times"></i>
								<span className="sr-only">Delete</span>
							</button>
							<label className="sr-only">Font Name</label>
							<input type="text" name="name" defaultValue={font.name} onChange={props.setFonts}/>
							<label className="sr-only">Font Path</label>
							<input type="text" name="path" defaultValue={font.path} onChange={props.setFonts}/>
						</div>
					)
				})}
			</div>
			<div>
				<h3>Styles</h3>
				<button className="button-sm" disabled={true}>
					<i className="fas fa-plus"></i>
					<span className="sr-only">Add</span>
				</button>
				{Object.keys(props.styles).map((cssVar, index) => {
					return (
						<div key={index} className="input-group">
							<button className="button-sm button-transparent" disabled={true}>
								<i className="fas fa-times"></i>
								<span className="sr-only">Delete</span>
							</button>
							<label className="sr-only">Name</label>
							<input type="text" name="name" defaultValue={cssVar} onChange={props.setStyles}/>
							<label className="sr-only">Value</label>
							<input type="text" name="value" defaultValue={props.styles[cssVar]} onChange={props.setStyles}/>
						</div>
					)
				})}
			</div>
			<div>
				<h3>Company</h3>
				<button className="button-sm" disabled={true}>
					<i className="fas fa-plus"></i>
					<span className="sr-only">Add</span>
				</button>
				{Object.keys(props.company).map((name, index) => {
					return (
						<div key={index} className="input-group">
							<button className="button-sm button-transparent" disabled={true}>
								<i className="fas fa-times"></i>
								<span className="sr-only">Delete</span>
							</button>
							<label className="sr-only">Name</label>
							<input type="text" name="name" value={name} readOnly={true}/>
							<label className="sr-only">Value</label>
							<input type="text" name="value" value={props.company[name]} readOnly={true}/>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export function ClientSettings(props) {
	return (
			<div className={"scroll modal menu" + (props.view === "campaigns" ? "" : " invisible")}>
				<h2>Client Settings</h2>
				<hr/>
				<ClientOptions fonts={props.fonts} styles={props.styles} company={props.company} />
				<h3>Campaigns</h3>
				<button>New Campaign</button>
				{props.campaigns.map((campaign, ind) =>
					<Campaign setTemplate={props.setTemplate} campaign={campaign} key={ind}/>
				)}
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
					{campaign.modal && campaign.modal.list.map((i, index) => {
						return <button key={index} onClick={e => props.setTemplate(i.html)}>{i.name}</button>
					})}
				</div>
				<div className="radio-buttons">
					{campaign.email && campaign.email.list.map((i, index) => {
						return <button key={index} onClick={e => props.setTemplate(i.html)}>{i.name}</button>
					})}
				</div>
			</div>
	)
}

function AssetList(props) {
	return (
			<div className="flex flex-auto">
				{(props.list.list).map((config, index) => {
					return (
							<div key={index} className="clearfix">
								<div className="iframeWrapper" style={{float: "left"}}>
									<iframe srcDoc={config.html} title="campaign preview"> </iframe>
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
									return prop === "html" ? "" : ( (
											<InputGroup
												key={prop}
												config={campaignForm[props.type].defaults[prop]}
												value={config[prop]}
											/>
										)
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
	//TODO:
	// add button link after label for inputs that match URL regex
	// add time converter from admin for time inputs
	// auto link siteIDs
	// create edit mode with all options, view mode
	// revision history
	// show difference between live and requested
	// mark requested updates as live
	return (
			<div className="campaignWrapper clearfix">

				<div className="button-group button-group-sm flex-auto">
					<button disabled={true}>
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
						<i className="far fa-clone"></i>
						<span className="tablet-tooltip">Clone</span>
					</button>
				</div>

				<h2><input className="input-heading" defaultValue={campaign.name}/></h2>
				<textarea className="input-desc" defaultValue={campaign.notes} />

				<div className="flex">
					<div>
						<h4>Rules</h4>
						{campaign.rules && Object.keys(campaign.rules).map(prop => {
							return (
								<InputGroup
									key={prop}
									config={campaignForm.rules[prop]}
									value={campaign.rules[prop]}
								/>
							)
						})}
					</div>
					<div>
						<h4>Features</h4>
						{campaign.features && Object.keys(campaign.features).map(prop => {
							return (
								<InputGroup
									key={prop}
									config={campaignForm.features[prop]}
									value={campaign.features[prop]}
								/>
							)
						})}
					</div>
					<div>
						<h4>Admin</h4>
						{campaign.admin && Object.keys(campaign.admin).map(prop => {
							return (
								<InputGroup
									key={prop}
									config={campaignForm.admin[prop]}
									value={campaign.admin[prop]}
								/>
							)
						})}
					</div>
				</div>
				<div>
					<h5>Modals</h5>
					{!campaign.modal ? "" : <AssetList type="modal" list={campaign.modal} setTemplate={props.setTemplate}/>}
					<h5>Emails</h5>
					{!campaign.email ? "" : <AssetList type="email" list={campaign.email} setTemplate={props.setTemplate}/>}
				</div>
			</div>
	)
}

function CheckboxList (props) {
	return props.options.map((o, i) =>
		<div key={i}>
			<input type="checkbox" name="value" value={o} defaultChecked={true} /> {o}
		</div>
	)
}
function Conditions(props) {
	//debugger;
	return (
		<div className="conditions flex flex-auto">
		{props.value.map((term, index) =>  {
			return (
				Array.isArray(term) ? <Conditions key={index} value={term} className="condition" /> :
				(term === "||" || term === "&&") ? <select key={index} className="operator" defaultValue={term} >
					<option value="&&">AND</option>
					<option value="||">OR</option>
				</select> :
				<input key={index} list="conditions" type="text" defaultValue={term} size={term.length + 2} />
			)
		})}
		<datalist id="conditions">
			<option value="Active Cart" label="active_cart"/>
			<option value="Return Visitor" label="return_visitor"/>
			<option value="Product Page" label="product_page"/>
		</datalist>
		</div>
	)
}

function InputGroup(props) {
	return (
		<div className="input-group">
			<label>{props.config.label}</label>
			{
				props.config.type === "text" ? <input type="text" name="value" defaultValue={props.value} placeholder={props.config.title} /> :
				props.config.type === "number" ? <input type="number" name="value" min={props.config.min} max={props.config.max} defaultValue={props.value} placeholder={props.config.title} /> :
				props.config.type === "time" ? <input type="number" name="value" min="0" defaultValue={props.value} placeholder={props.config.title} /> :
				props.config.type === "checkbox" ? <div><CheckboxList options={props.config.options} /></div> :
				props.config.type === "date" ? <input type="date" name="value" defaultValue={props.value} placeholder={props.config.title} /> :
				props.config.type === "textarea" ? <textarea name="value" defaultValue={props.value} placeholder={props.config.title} /> :
				props.config.type === "conditions" ? <Conditions value={props.value} className="condition" /> : ""
			}
		</div>
	)
}

function Template(props) {
	return (
			<li key={props.template.name} onClick={e => props.setTemplate(props.template.html)}>
				<div className="iframeWrapper">
					<iframe srcDoc={props.template.html} title="template preview"> </iframe>
				</div>
				<h4>{props.template.name}</h4>
			</li>
	)
}
