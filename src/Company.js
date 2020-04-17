import React from "react";
import {Link, useRouteMatch} from "react-router-dom";
import AssetList from "./AssetList";
import {Images} from "./Images.js"
import {Templates} from "./Templates.js";
import {useGlobalState} from "./hooks/useGlobal";
import './Company.css';

export function Company(props) {
	const { data } = useGlobalState();

	return (
		<div class="company">
			<h1>{data.name}</h1>
			<div className="input-group">
				<textarea value={data.note} readOnly={true} />
			</div>
			{/* <dl className="flex">
				<dt>Created On</dt><dd></dd>
				<dt>Created By</dt><dd></dd>
				<dt>Last Modified On</dt><dd></dd>
				<dt>Last Modified By</dt><dd></dd>
			</dl> */}
			<h2>Campaigns</h2>
			<button>
					<i className="fas fa-plus"></i>
					New Campaign
				</button>
			{data.campaigns.map((campaign) =>
				<CampaignSummary key={campaign.id} campaign={campaign} />
			)}
			<hr />
			<h2>Company Data</h2>
			<ClientOptions />
			<hr />
			<h2>Images</h2>
			<Images />
			<hr />
			<h2>Templates</h2>
			<Templates />
			<hr />
		</div>
	)
}

function ClientOptions(props) {
	const { data } = useGlobalState();
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

function CampaignSummary(props) {
	let match = useRouteMatch();
	let campaign = props.campaign;

	return (
		<div className="campaignWrapper">
			<h4><a href={campaign.data.admin.opp} rel="noopener noreferrer" target="_blank">{campaign.info.name}</a></h4>
			<Link className="button" to={`/company/${match.params.companyID}/campaign/${campaign.id}/`}>
				<i className="fas fa-edit"></i>
				<span className="">Open Campaign</span>
			</Link>
			<p>Notes: {campaign.notes}</p>
			<dl className="flex">
				<dt>Version</dt><dd></dd>
				<dt>Status</dt><dd></dd>
				<dt>Type</dt><dd></dd>
				<dt>Last Modified On</dt><dd></dd>
				<dt>Last Modified By</dt><dd></dd>
			</dl>

			{campaign.assets && Object.keys(campaign.assets).map(prop => {
				return (
					<div key={prop}>
						<h5>{prop}</h5>
						<AssetList type={prop} list={campaign.assets[prop].list} setTemplate={props.setTemplate} />
					</div>
				)
			})}
		</div>
	)
}