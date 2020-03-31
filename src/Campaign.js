import React from "react";
import {useRouteMatch} from "react-router-dom"
import campaignForm from "./mocks/campaign";
import InputGroup from "./InputGroup";
import AssetList from "./AssetList";
import {useGlobalState} from "./hooks/useGlobal";

export function Campaign(props) {
	const {data} = useGlobalState();
	let match = useRouteMatch();
	let campaignID = match.params.campaignID ? match.params.campaignID : props.id;
	let campaign = data.campaigns.find(c => c.id === Number(campaignID));
	

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

				<dl className="flex">
					<dt>Version</dt><dd></dd>
					<dt>Status</dt><dd></dd>
					<dt>Type</dt><dd></dd>
					<dt>Created On</dt><dd></dd>
					<dt>Created By</dt><dd></dd>
					<dt>Last Modified On</dt><dd></dd>
					<dt>Last Modified By</dt><dd></dd>
					<dt>Form Version</dt><dd></dd>
				</dl>

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