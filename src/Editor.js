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
				readOnly={true}
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
	function parseCSSText(cssText) {
		var cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, " ").replace(/\s+/g, " ");
		var style = {}, [,ruleName,rule] = cssTxt.match(/ ?(.*?) ?{([^}]*)}/)||[,,cssTxt];
		//var cssToJs = s => s.replace(/\W+\w/g, match => match.slice(-1).toUpperCase());
		var properties = rule.split(";").map(o => o.split(":").map(x => x && x.trim()));
		for (var [property, value] of properties) style[property] = value;
		return {cssText, ruleName, style};
	}
	let rule = {};
	let classes = "";
	if (props.rule.cssText && props.rule.selectorText) {
		rule = parseCSSText(props.rule.cssText);
		let matches = document.getElementById("canvas").contentDocument.querySelectorAll(props.rule.selectorText.split(":")[0]);
		let docHasMatch = matches.length > 0;
		classes = docHasMatch ? "doc_has_match" : "hidden";
		if (Array.from(matches).indexOf(props.active_element) !== -1) {
			classes += " matches_active";
		}
	} else {
		return "";
	}
	return (
			<form className={classes} >
				<div className="input-group">
					<input autoComplete="off" name="selector" type="text"
						   readOnly={true}
							value={props.rule.selectorText}
					/>
					{Object.keys(rule.style).map((line, index) => {
						return (
							<div key={index} className="css-line">
								<input name="property" type="text" autoComplete="off"
									   value={line}
									   list="cssNames"
									   readOnly={true}
								/>
								<ValueInput value={rule.style[line]} pattern={styles[line]}/>
								{/*<ValueSelect value={props.value} options={props.options}/>*/}
							</div>
						)
					})}
				</div>
			</form>
	)
}

function Elements(props) {
	return (
			<details>
				<summary>{props.name}</summary>

				{Object.keys(props.elements).map((tagName, i) => {
					return !props.elements[tagName].html ? "" :
						<Block
							setDragging={props.setDragging}
							key={tagName}
							id={tagName}
							html={props.elements[tagName].html}
						/>
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
	return (
			<div id="editor">
				<div id="tab_panels" className="scroll">
					<div className="editor_panel edit_tab editor_active">
						<Attributes active_element={props.active_element}/>
						<div className="styles_tab">
							<details>
								<summary>Styles</summary>
								<div className="flex">
								{props.canvas_styles.map((rule, index) => {
									return (
										<StyleRule active_element={props.active_element} key={index} rule={rule} pattern={props.pattern}/>
									)
								})}
								</div>
							</details>
							<datalist id="configStyles">
								{Object.keys(props.styles).map(name => <option label={props.styles[name]} value={`--var(${name})`} />)}
							</datalist>
							{/*<datalist id="configColors">
								{Object.keys(props.styles).map(name => !/^(#|hsl|rgb)/.test(props.styles[name]) ? "" : <option label={name} value={props.styles[name]} />)}
							</datalist>*/}
							<datalist id="cssNames">
								{Object.keys(styles).map(name => <option value={name} />)}
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