import React from "react";
import campaignForm from "./campaign";

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

export function Overview(props) {
	// + (props.view === "campaigns" ? "" : " invisible")
	return (
			<div className={"scroll modal menu"}>
				<h1>{props.company.name} Campaign Builder</h1>
				<h2> Settings</h2>
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

				{campaign.info && Object.keys(campaign.info).map(prop => {
					return (
							<InputGroup
									key={prop}
									config={campaignForm.info[prop]}
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
													config={campaignForm.data[prop][prop2]}
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
								<AssetList type={prop} list={campaign.assets[prop]} setTemplate={props.setTemplate}/>
							</div>
					)
				})}
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
															config={campaignForm.assets[props.type].defaults[prop]}
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
