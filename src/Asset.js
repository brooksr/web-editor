import React, {useState} from "react";
import {useRouteMatch} from "react-router-dom"
import {Canvas} from './Canvas.js';
import {Editor} from './Editor.js';
import {Menu, ImageMenu, CodeEditor} from './Menu.js';
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import {useGlobalState} from "./hooks/useGlobal";

export function Asset(props) {
	let match = useRouteMatch();
	const { data, assets } = useGlobalState();
	let asset = assets.find(a => a.id === Number(match.params.assetID));

	const [canvas_styles, setCanvasStyles] = useState({ css: [], media: [] });
	const [active_element, setActive] = useState();

	return (
		<div>
			<Menu
				asset={asset}
				view={props.view}
			/>
			<ImageMenu
				view={props.view}
			/>
			<CodeEditor
				view={props.view}
				src_doc={asset.html}
				CodeMirror={CodeMirror}
			/>
			<Canvas
				src_doc={asset.html}
				show_images={props.show_images}
				outlines={props.outlines}
				device={props.device}
				zoom={props.zoom}
				setActive={setActive}
				setCanvasStyles={setCanvasStyles}
			/>
			<Editor
				type={asset.type}
				canvas_styles={canvas_styles}
				active_element={active_element}
				setCanvasStyles={setCanvasStyles}
				CodeMirror={CodeMirror}
			/>
			<datalist id="configStyles">
				{Object.keys(data.styles).map(name => <option key={name} label={data.styles[name]} value={`--var(${name})`} />)}
			</datalist>
		</div>
	)
}