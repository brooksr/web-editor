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
				<Route path="/company/:companyID/campaign/:campaignID">
						<Campaign />
				</Route>
				<Route path="/company/:companyID">
				<div className={"scroll modal menu"}>
					<h1>{data.vars.name}</h1>
					<h2>Company Data</h2>
					<hr/>
					<ClientOptions />
					<h3>Campaigns</h3>
					<button>New Campaign</button>
					{data.campaigns.map((campaign) =>
							<CampaignSummary campaign={campaign}/>
					)}
				</div>
				</Route>
		</Switch>
	)
}

function CampaignSummary(props) {
	let match = useRouteMatch();
	let campaign = props.campaign;

	return (
			<div className="campaignWrapper">
				<h4><a href={campaign.data.admin.opp} rel="noopener noreferrer" target="_blank">{campaign.info.name}</a></h4>
				<p>{campaign.notes}</p>
					<Link className="button" to={`/company/${match.params.companyID}/campaign/${campaign.id}`}>
						<i className="fas fa-edit"></i>
						<span className="">Open Campaign</span>
					</Link>
					{campaign.assets && Object.keys(campaign.assets).map(prop => {
						return (
								<div key={prop}>
									<h5>{prop}</h5>
									<AssetList type={prop} list={campaign.assets[prop].list} setTemplate={props.setTemplate}/>
								</div>
						)
					})}
			</div>
	)
}

function Campaign(props) {
	const {data} = useGlobalState();
	let match = useRouteMatch();
	let campaignID = match.params.campaignID ? match.params.campaignID : props.id;
	let campaign = data.campaigns.find(c => c.id === Number(campaignID));
	
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
					<button>
						<i className="far fa-save"></i>
						<span className="tablet-tooltip">Save</span>
					</button>
					<button>
						<i className="fas fa-archive"></i>
						<span className="tablet-tooltip">Archive</span>
					</button>
					<button>
						<i className="far fa-clone"></i>
						<span className="tablet-tooltip">Clone</span>
					</button>
				</div>

				{campaign.info && Object.keys(campaign.info).map(prop => {
					return (
							<InputGroup
									key={prop}
									asset={campaignForm.info[prop]}
									value={campaign.info[prop]}
							/>
					)
				})}
				<div className="flex">
					{campaign.data && Object.keys(campaign.data).map(prop => {
						return (
							<div key={prop}>
								<h4>{prop}</h4>
								{Object.keys(campaign.data[prop]).map(prop2 => {
									return (
											<InputGroup
													key={prop2}
													asset={campaignForm.data[prop][prop2]}
													value={campaign.data[prop][prop2]}
											/>
									)
								})}
							</div>
						)
					})}
				</div>
				{campaign.assets && Object.keys(campaign.assets).map(prop => {
					return (
							<div key={prop}>
								<h5>{prop}</h5>
								<AssetList type={prop} list={campaign.assets[prop].list} setTemplate={props.setTemplate}/>
							</div>
					)
				})}
			</div>
	)
}
function AssetList(props) {
	let match = useRouteMatch();

	return (
			<div className="flex flex-auto">
				{(props.list).map((item, index) => {
					return (
							<div key={index} className="clearfix">
								<div className="iframeWrapper" style={{float: "left"}}>
									<iframe srcDoc={item.html} title="campaign preview"> </iframe>
								</div>
								<div className="button-group button-group-sm flex-auto">
									<Link className="button" to={`/company/${match.params.companyID}/asset/${item.id}`}>
										<i className="fas fa-pen"></i>
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
								{Object.keys(Object.assign(item)).map(prop => {
									let formConfig = campaignForm.assets[props.type].defaults[prop];
									return formConfig && (
													<InputGroup
															key={prop}
															asset={formConfig}
															value={item[prop]}
													/>
											)
								})}
							</div>
					)
				})}
			</div>
	)
}
function InputGroup(props) {
	if (!props.asset) debugger;
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
	let conditions = {
        "Page | Home Page": "is a home page",
        "Page | Category Page": "is a category page",
        "Page | Product Page": "is a product page",
        "Page | Cart Page": "is a cart page",
        "Page | Checkout Page": "is a checkout page",
        "Page | Login Page": "is a login page",
        "Page | Register Page": "is a register page",
        "Page | Confirmation Page": "is a confirmation page",
        "Stage | Pre Cart": "cart total == 0",
        "Stage | Active Cart": "cart total > 0",
        "Stage | Post Purchase": "orders > 0",
    	"Visitor | Return Visitor": "is a return visitor",
    	"Visitor | Direct Traffic": "is direct traffic",
    	"Visitor | Logged In": "is logged in",
    };
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
					{Object.keys(conditions).map(label => <option value={conditions[label]} label={label} key={label} />)}
				</datalist>
			</div>
	)
}
