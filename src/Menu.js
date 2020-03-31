import React from "react";
import {Controlled as CodeMirror} from 'react-codemirror2';
import {Images} from "./Images.js";

export function Menu(props) {
	return (
			<div className={"scroll modal menu" + (props.view === "menu" ? "" : " invisible")}>
				<button>Save as Template</button>
				<h1>Asset: {props.asset.name}</h1>
				<div className="input-group">
					<textarea value={props.asset.note} readOnly={true} />
				</div>
				<div className="flex flex-auto">
					<div className="col-3">
						<h3>About</h3>
						<dl>
							<dt>Name</dt><dd></dd>
							<dt>Version</dt><dd></dd>
							<dt>Type</dt><dd></dd>
							<dt>Created On</dt><dd></dd>
							<dt>Created By</dt><dd></dd>
							<dt>Last Modified On</dt><dd></dd>
							<dt>Last Modified By</dt><dd></dd>
						</dl>
					</div>
					<div className="col-3">
						<h3>Revision History</h3>
						<table>
							<tr>
								<td>Revision Date</td>
								<td>HTML</td>
							</tr>
							<tr>
								<td>01/01/2020</td>
								<td><a href="">HTML</a></td>
							</tr>
						</table>
					</div>
					<div className="col-3 shortcuts">
						<h3>Shortcuts</h3>
						<dl>
							<dt>Ctrl + S</dt><dd>Save</dd>
							<dt>Ctrl + <i className="far fa-arrow-alt-circle-up"></i></dt><dd>Move active element up</dd>
							<dt>Ctrl + <i className="far fa-arrow-alt-circle-down"></i></dt><dd>Move active element down</dd>
							<dt>Ctrl + D</dt><dd>Clone active element</dd>
							<dt>Tab</dt><dd>Move focus to next slement</dd>
							<dt>Shift + Tab</dt><dd>Move focus to previous next slement</dd>
							<dt>Ctrl + L</dt><dd>Wrap text in a link</dd>
							<dt>Ctrl + B</dt><dd>Bold text</dd>
							<dt>Ctrl + I</dt><dd>Italic text</dd>
							<dt>Ctrl + U</dt><dd>Underline text</dd>
						</dl>
					</div>
				</div>
			</div>
	)
}

export function ImageMenu(props) {
	return (
			<div className={"scroll modal menu" + (props.view === "images" ? "" : " invisible")}>
				<h3>Images</h3>
				<Images />
			</div>
	)
}

export function CodeEditor(props) {
	let options = {
		lineNumbers: true,
		lineWrapping: true,
		theme: "darcula",
		mode: "htmlmixed"
	};
	//TODO: link autoformat button from toolbar (or move here), and add autoformat.js from design_tool
	//TODO: move inline styles from autoformat.js
	// causing an error: onChange={props.setActiveTemplate}
	return (
			<div className={"scroll modal menu" + (props.view === "code" ? "" : " invisible")}>
				<CodeMirror value={props.src_doc} options={options}/>
			</div>
	)
}