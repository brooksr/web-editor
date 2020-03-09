import {elements} from "./elements";
import {styles} from "./styles";
import React, {useState} from "react";
import {Controlled as CodeMirror} from 'react-codemirror2'

function Block(props) {
	return (
			<div className="block">
				<h5>{props.id}</h5>
				<div className="button-group button-group-sm">
					<button disabled={true}>
						<i className="far fa-edit"></i>
						<span className="sr-only">Edit</span>
					</button>
					<button disabled={true}>
						<i className="fas fa-archive"></i>
						<span className="sr-only">Archive</span>
					</button>
					<button disabled={true}>
						<i className="fas fa-arrows-alt"></i>
						<span className="sr-only">Move</span>
					</button>
					<button disabled={true}>
						<i className="far fa-clone"></i>
						<span className="sr-only">Clone</span>
					</button>
				</div>
				<code id={props.id} draggable="true"
					  onDragStart={e => e.dataTransfer.setData("text/plain", props.html)}
					  dangerouslySetInnerHTML={{__html: props.html}}
				/>

			</div>
	)
}

function Attribute(props) {
	return (
			<div className="input-group">
				<label htmlFor={props.name}>{props.name}</label>
				{props.name === "src" ? <button className="button-sm"><i className="far fa-image"></i></button> : ""}
				<input
						name={props.name}
						value={props.value}
						type="text"
						pattern={Array.isArray(props.pattern) ? props.pattern.join("|") : props.pattern}
						onChange={e => props.setActiveAttribute(e.target.value)}
						autoComplete="off"
				/>
			</div>
	)
}

function ValueInput(props) {

	// shortcuts, need to rewrite for react
	/*useEffect(() => {
		document.addEventListener("keyup", function(event) {
			let changeNum = event.target.tagName === "INPUT" && event.target.name === "value" && (event.which === 38 || event.which === 40);
			if (changeNum) {
				let num = event.target.value.replace(/[^0-9]/g, "");
				let change = 0;
				if (event.which === 38) change = 1;
				else if (event.which === 40) change = -1;
				if (event.shiftKey) change *= 10;
				else if (event.ctrlKey || event.altKey) change *= 100;
				event.target.value = event.target.value.replace(num, Number(num) + change);
			}
		});
	});*/
	//TODO: add color picker, other input types
	return (
			<input name="value" type="text" autoComplete="off"
				defaultValue={props.value} //"${value.replace(/"/g, "'")}"
				pattern={Array.isArray(props.pattern) ? props.pattern.join("|") : props.pattern}
				//className={props.className} //"${/^[rgb|hsl|#]/.test(value) ? `rgb` : "nonrgb"}"
				//${/^[rgb|hsl|#]/.test(value) ? `style="background-color:${value};"` : ""}
			/>
	)
}

function ValueSelect(props) {
	return (
			<select defaultValue={props.value} name="value" autoComplete="off">
				{props.options.map(value => <option key={value} value={value}>{value}</option>)}
			</select>
	)
}

function StyleRule(props) {
	function parseCSSText(cssText) {
		let style = {};
		let cssTxt = cssText.substring(cssText.indexOf("{") + 1, cssText.lastIndexOf("}"));
		cssTxt.split(";").forEach(o => {
			let property = o.substring(0, o.indexOf(":")).trim();
			let value = o.substring(o.indexOf(":") + 1).trim();
			if (property !== "") style[property] = value;
		});
		return style;
	}
	let hightlightMatches = function(selector){
		document.getElementById("canvas").contentDocument.querySelectorAll(selector).forEach((match) => {
			if (!match.getAttribute("data-status")) match.setAttribute("data-status", "match");
		})
	};
	let unHightlightMatches = function(){
		document.getElementById("canvas").contentDocument.querySelectorAll("[data-status='match']").forEach((match) => {
			match.removeAttribute("data-status");
		})
	};
	let rules = parseCSSText(props.rule.cssText);
	let matches = document.getElementById("canvas").contentDocument.querySelectorAll(props.rule.selectorText.split(":")[0]);
	let docHasMatch = matches.length > 0;
	let classes = docHasMatch ? "doc_has_match" : "hidden";
	if (Array.from(matches).indexOf(props.active_element) !== -1) {
		classes += " matches_active";
	}
	//TODO: calculate selector specificity to show what properties are inherited or overwritten
	return (
			<form className={classes} onFocus={e => hightlightMatches(props.rule.selectorText)} onBlur={unHightlightMatches} >
				<div className="button-group button-group-sm">
					<button disabled={true}>
						<i className="far fa-trash-alt"></i>
						<span className="sr-only">Delete</span>
					</button>
					<button disabled={true}>
						<i className="far fa-clone"></i>
						<span className="sr-only">Clone</span>
					</button>
					<button disabled={true}>
						<i className="fas fa-plus"></i>
						<span className="sr-only">New Line</span>
					</button>
				</div>
				<div className="input-group">
					<input autoComplete="off" name="selector" type="text"
						   defaultValue={props.rule.selectorText}
					/>
					{Object.keys(rules).map((line, index) => {
						return (
							<div key={index} className="css-line">
								<button className="button-sm button-transparent" disabled={true}>
									<i className="fas fa-times"></i>
									<span className="sr-only">Delete</span>
								</button>
								<input name="property" type="text" autoComplete="off"
									   defaultValue={line}
									   list="cssNames"
								/>
								{Array.isArray(styles[line]) ?
										<ValueSelect value={rules[line]} options={styles[line]}/> :
										<ValueInput value={rules[line]} pattern={styles[line]}/>
								}
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
							//setDragging={props.setDragging}
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
						<Block key={block.id} id={block.id} html={block.html}/>
				)}
			</details>
	)
}

function Attributes(props) {
	let tag = props.active_element && props.active_element.tagName.toLowerCase();
	let attributes = elements[tag] ? elements[tag].attributes : elements.body.attributes;
	let options = {
		lineNumbers: false,
		lineWrapping: true,
		theme: "darcula",
		mode: "htmlmixed",
	};
	//TODO: resetting outerHTML loses active element
	//TODO: setActiveAttribute not working
	if (!props.active_element) return <p className="help-text text-center">Select an element</p>
	return (
			<div className="attributes_tab">
				<h3>Active Block</h3>
				<div className="button-group">
					<button>
						<i className="far fa-save"></i>
						<span className="tablet-tooltip">Save as Block</span>
					</button>
					<button>
						<i className="far fa-trash-alt"></i>
						<span className="tablet-tooltip">Delete</span>
					</button>
					<button>
						<i className="fas fa-arrow-up"></i>
						<span className="tablet-tooltip">Move Up</span>
					</button>
					<button>
						<i className="fas fa-arrow-down"></i>
						<span className="tablet-tooltip">Move Down</span>
					</button>
				</div>
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
				<CodeMirror value={props.active_element.outerHTML} options={options}/>
			</div>
	)
}
function Style (props) {
	return (
			<div className="styles_tab">
				<details>
					<summary>Styles</summary>
					<div className="button-group button-group-sm">
						<button>New CSS Rule</button>
						<button>New Media Rule</button>
					</div>
					<div className="flex">
						{props.canvas_styles.media.map((rule, index) => {
							//TODO: highlight media query if rule met in canvas
							return (
									<div key={index} className="media_query flex">
										<div className="button-group button-group-sm">
											<button>
												<i className="fas fa-plus"></i>
												<span className="tablet-tooltip">New CSS Rule</span>
											</button>
											<button>
												<i className="far fa-trash-alt"></i>
												<span className="tablet-tooltip">Delete</span>
											</button>
										</div>
										<div className="input-group">
											<label htmlFor={props.name}>@media</label>
											<input
													defaultValue={rule.media}
													type="text"
													autoComplete="off"
											/>
										</div>
										{Array.from(rule.cssRules).map((rule, index) => {
											return (
													<StyleRule key={index} active_element={props.active_element} rule={rule} pattern={props.pattern}/>
											)
										})}
									</div>
							)
						})}
						{props.canvas_styles.css.map((rule, index) => {
							return (
									<StyleRule active_element={props.active_element} key={index} rule={rule} pattern={props.pattern}/>
							)
						})}
					</div>
				</details>
				<datalist id="configStyles">
					{Object.keys(props.styles).map(name => <option key={name} label={props.styles[name]} value={`--var(${name})`} />)}
				</datalist>
				{/*<datalist id="configColors">
					{Object.keys(props.styles).map(name => !/^(#|hsl|rgb)/.test(props.styles[name]) ? "" : <option label={name} value={props.styles[name]} />)}
				</datalist>*/}
				<datalist id="cssNames">
					{Object.keys(styles).map(name => <option key={name} value={name} />)}
				</datalist>
			</div>
	)
}

export function Editor(props) {
	return (
			<div id="editor">
				<div id="tab_panels" className="scroll">
					<div className="editor_panel edit_tab editor_active">
						<Attributes active_element={props.active_element}/>
						<Style active_element={props.active_element} canvas_styles={props.canvas_styles} styles={props.styles} pattern={props.pattern} />
						<div className="blocks_tab">
							{props.blocks.map((group, i) =>
									<BlockGroup
											key={group.name}
											name={group.name}
											blocks={group.blocks}
											//setDragging={props.setDragging}
									/>
							)}
							<Elements
									name="Elements"
									elements={elements}
									//setDragging={props.setDragging}
							/>
						</div>
					</div>
				</div>
			</div>
	);
}