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
    let cssNames = Object.assign(...styles).filter(n => n !== "id");
    return (
        <form className="doc_has_match " data-index="4" data-selector={props.selector}>
            <div className="input-group">
                <input name="selector" type="text" value={props.selector}/>
                {/*loop over css lines*/}
                <div className="css-line">
                    <input name="property" type="text" autoComplete="off"
                           value={props.name}
                           pattern={cssNames.join("|")}
                    />
                    <ValueInput value={props.value} pattern={props.pattern}/>
                    <ValueSelect value={props.value} options={props.options}/>
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
                return props.elements[tagName].html ? <Block setDragging={props.setDragging} key={tagName} id={tagName} html={props.elements[tagName].html}/> : "";
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
    return (
        <div className="attributes_tab">
            <h3>Block</h3>
            <div className="button-group-sm">
                <button>Save as Block</button>
                <button>Delete</button>
            </div>
            <div className="input-group">
                <textarea
                    value={props.active_element ? props.active_element.outerHTML : ""}
                    //onChange={e => props.active_element.outerHTML = e.target.value}
                    className="scroll"
                    readOnly={true}
                />
            </div>
            <h3>Attributes</h3>
            {Object.keys(attributes).map(attr => {
                return (
                    <Attribute
                        key={attr}
                        pattern={attributes[attr]}
                        name={attr}
                        value={props.active_element && props.active_element.getAttribute(attr) ? props.active_element.getAttribute(attr) : ""}
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
                            {/*loop over all stylerules*/}
                            {/*<StyleRule selector={""} value={props.value} pattern={props.pattern}/>*/}
                        </details>
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