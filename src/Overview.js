import React, {useState} from "react";
import {Route, Link, useRouteMatch, Switch} from "react-router-dom"
import campaignForm from "./campaign";
import {Canvas} from './Canvas.js';
import {Editor} from './Editor.js';
import {Menu, ImageMenu, ClientSettings, CodeEditor} from './Menu.js';
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/htmlmixed/htmlmixed';

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

export function Company(props) {
	const [company, setCompany] = useState(props.data.company);
	const [campaigns, setCampaigns] = useState(props.data.campaigns);
	const [blocks, setBlocks] = useState(props.data.blocks);
	const [images, setImages] = useState(props.data.images);
	const [fonts, setFonts] = useState(props.data.fonts);
	const [styles, setStyles] = useState(props.data.styles);
	const [canvas_styles, setCanvasStyles] = useState({css: [], media: []});
	const [active_element, setActive] = useState(null);


	// shortcuts, need to rewrite for react
	/*useEffect(() => {
		document.addEventListener("keyup", function(event) {
			let save = event.which === 83 && event.ctrlKey;
			if (save) {
				event.preventDefault();
				alert("Save!")
			}
		});
	});*/
	
	const setActiveTemplate = function (html) {
		props.setView("visual");
		props.setTemplate(html);
	};
	// + (props.view === "campaigns" ? "" : " invisible")
	return (
		<Switch>
				<Route path="/company/:companyID/config/:configID">
					<Menu
							view={props.view}
							campaigns={campaigns}
							templates={props.templates}
							setTemplate={setActiveTemplate}
					/>
					<ImageMenu
							view={props.view}
							images={images}
					/>
					<CodeEditor
							view={props.view}
							src_doc={props.src_doc}
							setActiveTemplate={setActiveTemplate}
							CodeMirror={CodeMirror}
					/>
					<Canvas
							src_doc={props.src_doc}
							fonts={fonts}
							styles={styles}
							show_images={props.show_images}
							outlines={props.outlines}
							device={props.device}
							zoom={props.zoom}
							//drag={drag}
							setActiveTemplate={setActiveTemplate}
							//setDragging={setDragging}
							setActive={setActive}
							setCanvasStyles={setCanvasStyles}
					/>
					<Editor
							canvas_styles={canvas_styles}
							styles={styles}
							blocks={blocks}
							active_element={active_element}
							//setDragging={setDragging}
							setCanvasStyles={setCanvasStyles}
							CodeMirror={CodeMirror}
					/>
				</Route>
				<Route path="/company/:companyID">
				<div className={"scroll modal menu"}>
					<h1>{company.name} Campaign Builder</h1>
					<h2> Settings</h2>
					<hr/>
					<ClientOptions fonts={fonts} styles={styles} company={company} />
					<h3>Campaigns</h3>
					<button>New Campaign</button>
					{campaigns.map((campaign, ind) =>
							<Campaign setTemplate={props.setTemplate} campaign={campaign} key={ind}/>
					)}
				</div>
				</Route>
		</Switch>
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
function AssetList(props) {
  let match = useRouteMatch();
	return (
			<div className="flex flex-auto">
				{(props.list.list).map((config, index) => {
					return (
							<div key={index} className="clearfix">
								<div className="iframeWrapper" style={{float: "left"}}>
									<iframe srcDoc={config.html} title="campaign preview"> </iframe>
								</div>
								<div className="button-group button-group-sm flex-auto">
									<Link to={`${match.url}/config/${config.name}`}>{/* onClick={e => props.setTemplate(config.html)} */}
										<i className="far fa-edit"></i>
										{/* {JSON.stringify(match, null, "\t")} */}
										<span className="tablet-tooltip">Edit</span>
									</Link>
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
