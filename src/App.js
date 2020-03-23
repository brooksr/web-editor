import React, {useState, useReducer,useContext, createContext} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Toolbar} from './Toolbar.js';
import {Company} from './Overview.js';
import {List} from './List.js';
import {GlobalStateProvider} from './hooks/useGlobal.js';
import './App.css';

function App() {
	const [src_doc, setTemplate] = useState("");
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
		<GlobalStateProvider>
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
							view={view}
							src_doc={src_doc}
							show_images={show_images}
							outlines={outlines}
							device={device}
							zoom={zoom}
							setTemplate={setTemplate}
							setView={setView}
						/>
					</Route>
					<Route path="/">
						<List />
					</Route>
				</Switch>
			</Router>
		</GlobalStateProvider>
	)
}

export default App;
