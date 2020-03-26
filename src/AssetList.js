import React from "react";
import {Link, useRouteMatch} from "react-router-dom"
import campaignForm from "./mocks/campaign";
import InputGroup from "./InputGroup";

export default function AssetList(props) {
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
									<Link className="button" to={`/company/${match.params.companyID}/asset/${item.id}/`}>
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