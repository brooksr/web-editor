import React from "react";
import {Controlled as CodeMirror} from 'react-codemirror2';
import {useGlobalState} from "./hooks/useGlobal";

export function Menu(props) {
	const {data} = useGlobalState();
	return (
			<div className={"scroll modal menu" + (props.view === "menu" ? "" : " invisible")}>
				<button>Save as Template</button>
				<div className="newItem">
					<h3>New</h3>
					<ul>
						{data.templates.map((template, ind) =>
								<Template template={template} key={ind}/>
						)}
					</ul>
				</div>
				<div className="shortcuts">
					<h3>Shortcuts</h3>
					<dl className="flex">
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
	)
}

export function ImageMenu(props) {
	const {data} = useGlobalState();
	return (
			<div className={"scroll modal menu" + (props.view === "images" ? "" : " invisible")}>
				<h3>Images</h3>
				<form action="" method="post" encType="multipart/form-data">
					<input type="file" name="fileToUpload" id="fileToUpload"/>
					<input type="submit" value="Upload Image" name="submit"/>
				</form>
				<ul>
					{data.images.map((i) =>
							<li key={i.src}>
								<img src={i.src} alt={i.alt}/>
								<a href={i.src} target="_blank" rel="noopener noreferrer">{i.src}</a>
								<p>{i.alt}</p>
								<span className="image-size">{i.size}</span>
							</li>
					)}
				</ul>
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