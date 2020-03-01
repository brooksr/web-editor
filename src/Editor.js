import {elements} from "./elements";
import React, {useState} from "react";

function Block(props) {
    let createNode = t => document.createRange().createContextualFragment(t);
    let handleDragStart = e => props.setDragging(createNode(e.target.textContent));//innerHTML
    return (
        <div className="block">
            <h5>{props.id}</h5>
            <code id={props.id} draggable="true" onDragStart={handleDragStart}>{props.html}</code>
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
    //TODO: generate pattern from styles.js
    return (
        <form className="doc_has_match " data-index="4" data-selector={props.selector}>
            <div className="input-group">
                <input name="selector" type="text" value={props.selector}/>
                {/*loop over css lines*/}
                <div className="css-line">
                    <input name="property" type="text" autoComplete="off"
                           value={props.name}
                           pattern="font-family|font-style|font-weight|font-size|line-height|letter-spacing|word-spacing|color|text-transform|text-decoration|text-align|text-indent|text-shadow|word-wrap|white-space|text-overflow|height|width|min-width|max-width|min-height|max-height|overflow|overflow-x|overflow-y|flex|flex-grow|flex-shrink|flex-basis|resize|position|top|right|bottom|left|margin|margin-top|margin-left|margin-bottom|margin-right|padding|padding-top|padding-left|padding-bottom|padding-right|clear|float|display|flex-direction|flex-wrap|flex-flow|justify-content|alignment-baseline|align-items|align-content|order|z-index|background|background-color|background-image|background-repeat|background-attachment|background-position|background-size|filter|border|border-width|border-style|border-color|border-radius|outline|outline-width|outline-style|outline-color|opacity|box-shadow|transition|transform|visibility|cursor|content|text-size-adjust|list-style-type|border-spacing|border-collapse|table-layout|direction|box-sizing"
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
            <summary>Elements</summary>
            {Object.keys(props.elements).map((tagName, i) => {
                return props.elements[tagName].html ? <Block key={tagName} id={tagName} html={props.elements[tagName].html}/> : "";
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
    const [attributes, setActiveAttribute] = useState(elements[tag].attributes);
    //TODO: resetting outerHTML loses active element
    //TODO: setActiveAttribute not working
    return (
        <div className="attributes_tab">
            <h3>HTML</h3>
            <div className="input-group">
                <textarea
                    value={props.active_element ? props.active_element.outerHTML : ""}
                    //onChange={e => props.active_element.outerHTML = e.target.value}
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
                                setDragging={props.setDragging}
                                key={group.name}
                                name={group.name}
                                blocks={group.blocks}
                            />
                        )}
                        <Elements elements={elements}/>
                    </div>
                </div>
            </div>
            <ul id="hint"></ul>
        </div>
    );
}