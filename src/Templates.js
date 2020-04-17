import React from "react";
import {useGlobalState} from "./hooks/useGlobal";

export function Templates(props) {
	const {data} = useGlobalState();
	return (
    <ul className="list">
      {data.templates.map((template, ind) =>
          <Template template={template} key={ind}/>
      )}
    </ul>
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