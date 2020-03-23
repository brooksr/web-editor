import React, {useState} from "react";
import {Route, Link, useRouteMatch, Switch} from "react-router-dom"
import campaignForm from "./mocks/campaign";
import Asset from "./Asset";
import {useGlobalState} from "./hooks/useGlobal";

function ClientOptions(props) {
	const {data} = useGlobalState();
	return (
			<div className="flex flex-auto">
				<div>
					<h3>Fonts</h3>
					<button className="button-sm">
						<i className="fas fa-plus"></i>
						<span className="sr-only">Add</span>
					</button>
					{Object.keys(data.fonts).map((font, index) => {
						return (
								<div key={index} className="input-group">
									<button className="button-sm button-transparent">
										<i className="fas fa-times"></i>
										<span className="sr-only">Delete</span>
									</button>
									<label className="sr-only">Font Name</label>
									<input type="text" name="name" defaultValue={data.fonts[font].name} readOnly={true} />
									<label className="sr-only">Font Path</label>
									<input type="text" name="path" defaultValue={data.fonts[font].path} readOnly={true} />
								</div>
						)
					})}
				</div>
				<div>
					<h3>Styles</h3>
					<button className="button-sm">
						<i className="fas fa-plus"></i>
						<span className="sr-only">Add</span>
					</button>
					{Object.keys(data.styles).map((cssVar, index) => {
						return (
								<div key={index} className="input-group">
									<button className="button-sm button-transparent">
										<i className="fas fa-times"></i>
										<span className="sr-only">Delete</span>
									</button>
									<label className="sr-only">Name</label>
									<input type="text" name="name" defaultValue={cssVar} readOnly={true} />
									<label className="sr-only">Value</label>
									<input type="text" name="value" defaultValue={data.styles[cssVar]} readOnly={true} />
								</div>
						)
					})}
				</div>
				<div>
					<h3>Vars</h3>
					<button className="button-sm">
						<i className="fas fa-plus"></i>
						<span className="sr-only">Add</span>
					</button>
					{Object.keys(data.vars).map((name, index) => {
						return (
								<div key={index} className="input-group">
									<button className="button-sm button-transparent">
										<i className="fas fa-times"></i>
										<span className="sr-only">Delete</span>
									</button>
									<label className="sr-only">Name</label>
									<input type="text" name="name" value={name} readOnly={true} />
									<label className="sr-only">Value</label>
									<input type="text" name="value" value={data.vars[name]} readOnly={true} />
								</div>
						)
					})}
				</div>
			</div>
	)
}

export function Company(props) {
	const {data} = useGlobalState();

	//const [fonts, setFonts] = useState(props.data.fonts);
	//const [styles, setStyles] = useState(props.data.styles);
	//const [campaigns, setCampaigns] = useState(props.data.campaigns);
	//const [vars, setVars] = useState(props.data.vars);


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
	
	//debugger;
	return (
		<Switch>
				<Route path="/company/:companyID/asset/:assetID">
					<Asset
						view={props.view}
						src_doc={props.src_doc}
						show_images={props.show_images}
						outlines={props.outlines}
						device={props.device}
						zoom={props.zoom}
						setView={props.setView}
					/>
				</Route>
				<Route path="/company/:companyID">
				<div className={"scroll modal menu"}>
					<h1>{data.vars.name}</h1>
					<h2>Company Data</h2>
					<hr/>
					<ClientOptions />
					<h3>Campaigns</h3>
					<button>New Campaign</button>
					{data.campaigns.map((campaign, ind) =>
							<Campaign campaign={campaign} key={ind}/>
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

				<div className="button-group flex-auto">
					{/* <button>
						<i className="far fa-edit"></i>
						<span className="tablet-tooltip">Edit</span>
					</button> */}
					<button>
						<i className="far fa-save"></i>
						<span className="">Save</span>
					</button>
					<button>
						<i className="fas fa-archive"></i>
						<span className="">Archive</span>
					</button>
					<button>
						<i className="far fa-clone"></i>
						<span className="">Clone</span>
					</button>
				</div>

				<h2><input className="input-heading" defaultValue={campaign.name}/></h2>
				<textarea className="input-desc" defaultValue={campaign.notes} />
				<div>
					<h5>Modals</h5>
					<button>
						<i className="fas fa-plus"></i>
						<span className="">New Modal</span>
					</button>
					{!campaign.modal ? "" : <AssetList type="modal" list={campaign.modal} />}
					<h5>Emails</h5>
					<button>
						<i className="fas fa-plus"></i>
						<span className="">New Email</span>
					</button>
					{!campaign.email ? "" : <AssetList type="email" list={campaign.email} />}
				</div>

				<div className="flex">
					<div>
						<h4>Rules</h4>
						{campaign.rules && Object.keys(campaign.rules).map(prop => {
							return (
									<InputGroup
											key={prop}
											asset={campaignForm.rules[prop]}
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
											asset={campaignForm.features[prop]}
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
											asset={campaignForm.admin[prop]}
											value={campaign.admin[prop]}
									/>
							)
						})}
					</div>
				</div>
			</div>
	)
}
function AssetList(props) {
	let match = useRouteMatch();
	return (
			<div className="flex flex-auto">
				{(props.list.list).map((asset, index) => {
					return (
							<div key={index} className="clearfix">
								<div className="iframeWrapper" style={{float: "left"}}>
									<iframe srcDoc={asset.html} title="campaign preview"> </iframe>
								</div>
								<div className="button-group button-group-sm flex-auto">
									<Link className="button" to={`${match.url}asset/${asset.id}`}>
										<i className="fas fa-pen"></i>
										{/* {JSON.stringify(match, null, "\t")} */}
										<span className="">Open</span>
									</Link>
									{/* <button>
										<i className="far fa-save"></i>
										<span className="tablet-tooltip">Save</span>
									</button> */}
									<button>
										<i className="fas fa-archive"></i>
										<span className="">Archive</span>
									</button>
									{/* <button>
										<i className="fas fa-arrows-alt"></i>
										<span className="tablet-tooltip">Move</span>
									</button> */}
									<button>
										<i className="far fa-clone"></i>
										<span className="">Clone</span>
									</button>
								</div>
								{Object.keys(Object.assign(asset, props.list.defaults)).map(prop => {
									//debugger;	
									return prop === "html" || prop === "id" ? "" : ( (
													<InputGroup
															key={prop}
															asset={campaignForm[props.type].defaults[prop]}
															value={asset[prop]}
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
			<label>{props.asset.label}</label>
			{
				props.asset.type === "text" ? <input type="text" name="value" defaultValue={props.value} placeholder={props.asset.title} /> :
				props.asset.type === "number" ? <input type="number" name="value" min={props.asset.min} max={props.asset.max} defaultValue={props.value} placeholder={props.asset.title} /> :
				props.asset.type === "time" ? <input type="number" name="value" min="0" defaultValue={props.value} placeholder={props.asset.title} /> :
				props.asset.type === "checkbox" ? <div><CheckboxList options={props.asset.options} /></div> :
				props.asset.type === "date" ? <input type="date" name="value" defaultValue={props.value} placeholder={props.asset.title} /> :
				props.asset.type === "textarea" ? <textarea name="value" defaultValue={props.value} placeholder={props.asset.title} /> :
				props.asset.type === "conditions" ? <Conditions value={props.value} className="condition" /> : ""
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
