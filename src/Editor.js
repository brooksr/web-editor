import {elements} from "./elements";
import {styles} from "./styles";
import React, {useState} from "react";

function Block(props) {
	let createNode = t => document.createRange().createContextualFragment(t);
	return (
			<div className="block">
				<h5>{props.id}</h5>
				<div className="button-group button-group-sm">
					<button disabled={true}>Edit</button>
					<button disabled={true}>Archive</button>
				</div>
				<code id={props.id} draggable="true" onDragStart={e => props.setDragging(createNode(props.html))}>
					{props.html}
				</code>
			</div>
	)
}

function Attribute(props) {
	return (
			<div className="input-group">
				<label htmlFor={props.name}>{props.name}</label>
				<input
						name={props.name}
						value={props.value}
						type="text"
						pattern={props.pattern}
						onChange={e => props.setActiveAttribute(e.target.value)}
						autoComplete="off"
				/>
			</div>
	)
}

function ValueInput(props) {
	return (
			<input name="value" type="text" autoComplete="off"
						 value={props.value} //"${value.replace(/"/g, "'")}"
						 pattern={props.pattern} //"${styles[prop]}"
					//className={props.className} //"${/^[rgb|hsl|#]/.test(value) ? `rgb` : "nonrgb"}"
					//${/^[rgb|hsl|#]/.test(value) ? `style="background-color:${value};"` : ""}
			/>
	)
}

function ValueSelect(props) {
	return (
			<select value={props.value} name="value" autoComplete="off">
				{props.options.map(value => <option value={value}>{value}</option>)}
			</select>
	)
}

function StyleRule(props) {
	//{/* onChange={editor.replaceCss} onfocusin={editor.updateMatches} onfocusout{editor.removeMatches}*/}
	return (
			<form className="doc_has_match " data-index="4" data-selector={props.selector}>
				<div className="input-group">
					<input autoComplete="off" name="selector" type="text"
							value={props.selector}
					/>
					{/*loop over css lines*/}
					<div className="css-line">
						<input name="property" type="text" autoComplete="off"
									 value={props.name}
									 list="cssNames"
						/>
						<ValueInput value={props.value} pattern={props.pattern}/>
						{/*<ValueSelect value={props.value} options={props.options}/>*/}
					</div>
				</div>
			</form>
	)
}

function Elements(props) {
	return (
			<details>
				<summary>{props.name}</summary>

				{Object.keys(props.elements).map((tagName, i) => {
					return props.elements[tagName].html ? <Block setDragging={props.setDragging} key={tagName} id={tagName}
																											 html={props.elements[tagName].html}/> : "";
				})}
			</details>
	)
}

function BlockGroup(props) {
	return (
			<details>
				<summary>{props.name}</summary>
				{props.blocks.map((block, i) =>
						<Block setDragging={props.setDragging} key={block.id} id={block.id} html={block.html}/>
				)}
			</details>
	)
}

function Attributes(props) {
	let tag = props.active_element ? props.active_element.tagName.toLowerCase() : "body";
	//let attributes = elements[tag].attributes;
	const [attributes, setActiveAttribute] = useState(elements[tag] ? elements[tag].attributes : elements.body.attributes);
	//TODO: resetting outerHTML loses active element
	//TODO: setActiveAttribute not working
	return !props.active_element ? <p className="help-text text-center">Select an element</p> : (
			<div className="attributes_tab">
				<h3>Active Block</h3>
				<div className="button-group-sm">
					<button>Save as Block</button>
					<button>Delete</button>
				</div>
				<div className="input-group">
				<textarea
						value={props.active_element.outerHTML}
						//onChange={e => props.active_element.outerHTML = e.target.value}
						autoComplete="off"
						className="scroll"
						readOnly={true}
				/>
				</div>
				<h3>Active Attributes</h3>
				{Object.keys(attributes).map(attr => {
					return (
							<Attribute
									key={attr}
									pattern={attributes[attr]}
									name={attr}
									value={props.active_element.getAttribute(attr) ? props.active_element.getAttribute(attr) : ""}
									setActiveAttribute={newAttr => props.active_element.setAttribute(attr, newAttr)}
							/>
					)
				})}
			</div>
	)
}

export function Editor(props) {
	let cssNames = Object.keys(Object.assign(...styles)).filter(n => n !== "id");
	return (
			<div id="editor">
				<div id="tab_panels" className="scroll">
					<div className="editor_panel edit_tab editor_active">
						<Attributes active_element={props.active_element}/>
						<div className="styles_tab">
							<details>
								<summary>Styles</summary>
								{/*loop over all stylerules*/}
								<StyleRule selector={""} value={props.value} pattern={props.pattern}/>
							</details>
							<datalist id="configStyles">
								{Object.keys(props.styles).map(name => <option label={props.styles[name]} value={`--var(${name})`} />)}
							</datalist>
							{/*<datalist id="configColors">
								{Object.keys(props.styles).map(name => !/^(#|hsl|rgb)/.test(props.styles[name]) ? "" : <option label={name} value={props.styles[name]} />)}
							</datalist>*/}
							<datalist id="cssNames">
								{cssNames.map(name => <option value={name} />)}
							</datalist>
						</div>
						<div className="blocks_tab">
							{props.blocks.map((group, i) =>
									<BlockGroup
											key={group.name}
											name={group.name}
											blocks={group.blocks}
											setDragging={props.setDragging}
									/>
							)}
							<Elements
									name="Elements"
									elements={elements}
									setDragging={props.setDragging}
							/>
						</div>
					</div>
				</div>
				<ul id="hint"></ul>
			</div>
	);
}