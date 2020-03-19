import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Toolbar} from './Toolbar.js';
import {Company} from './Overview.js';
import {List} from './List.js';
import {data} from './data.js';
import './App.css';

function App() {
	const [templates, setTemplates] = useState(data.templates);
	const [src_doc, setTemplate] = useState(templates[0].html);
	const [view, setView] = useState("visual");
	const [show_images, toggleImages] = useState(true);
	const [outlines, toggleOutlines] = useState(true);
	const [zoom, changeZoom] = useState(1);
	const [device, changeDevice] = useState("desktop");

	const setZoom = function (e, to) {
		let newT = 1;
		if (to === "in") newT = zoom + 0.25;
		else if (to === "out") newT = zoom / 1.25;
		changeZoom(newT);
	};

	return (
			<Router>
				<Toolbar
						src_doc={src_doc}
						view={view}
						device={device}
						toggleImages={() => toggleImages(!show_images)}
						toggleOutlines={() => toggleOutlines(!outlines)}
						changeZoom={setZoom}
						setView={setView}
						changeDevice={changeDevice}
				/>
				<Switch>
					<Route path="/company/:companyId">
						<Company
							data={data}
							templates={templates}
							view={view}
							src_doc={src_doc}
							show_images={show_images}
							outlines={outlines}
							device={device}
							zoom={zoom}
						/>
					</Route>
					<Route path="/">
						<List />
					</Route>
				</Switch>
			</Router>
	)
}

export default App;
