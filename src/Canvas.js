import React, {useEffect, useRef, useState} from "react";
import {elements} from "./elements";

export function Canvas(props) {
    let fontCSS = props.fonts.reduce((acc, style) => acc += `
    @font-face {
        font-family: "${style.name}";
        src: url("${style.path}.eot"); /* IE9 Compat Modes */
        src: url("${style.path}.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
            url("${style.path}.otf") format("opentype"), /* Open Type Font */
            url("${style.path}.svg") format("svg"), /* Legacy iOS */
            url("${style.path}.ttf") format("truetype"), /* Safari, Android, iOS */
            url("${style.path}.woff") format("woff"), /* Modern Browsers */
            url("${style.path}.woff2") format("woff2"); /* Modern Browsers */
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }`, "");
    let cssVars = Object.keys(props.styles).map(style => `--${style}: ${props.styles[style]};`).join("\n");
    let [style, setCanvasStyle] = useState(`
    ${fontCSS}
    body, html {
        min-height:100vh;
    }
    body {
        margin:0;
        transform: scale(1);
        overflow: auto;
        transform-origin: top left;
        transition: transform 0.5s ease;
        box-sizing: border-box;
        ${cssVars}
    }
    .hover {
        opacity: 0.2;
    }
    * {
        box-sizing: inherit;
        outline: 1px dashed rgba(100, 100, 100, 0.5);
    }
    *:hover {
        outline: 1px dashed rgba(47,165,228, 0.5);
    }
    [data-status="active"] {
        outline: 1px dashed #4db357;
    }
    [draggable] {
        user-select: none;
    }
    [data-status="match"]:before {
        content: "Match";
        float: left;
        position: absolute;
        width: 4em;
        left: -4em;
        background: #4db357;
        color: #fff;
        border-radius: 5px;
        font-size: 0.5rem;
        padding: 0.25em;
        overflow: visible;
        white-space: nowrap;
        word-break: normal;
    }
    .no-outline * {
        outline: none !important;
    }   
    `);
    let iframe = useRef(null);

    let setDrag = (elm) => {
        elm.draggable = "true";
        elm.addEventListener('dragstart', function dragStart(e) {
            e.stopPropagation();
            props.setDragging(this);
        }, false);
        elm.addEventListener('dragend', function dragEnd(e) {
            e.stopPropagation();
        }, false);
        elm.addEventListener('dragover', function dragOver(e) {
            e.preventDefault();
            e.stopPropagation();
        }, false);
        elm.addEventListener('dragenter', function dragEnter(e) {
            e.preventDefault();
            e.stopPropagation();
            let name = "";
            if (this.id) name += "#" + this.id;
            if (this.className) name += "." + this.className;
            document.getElementById("canvasNotice").textContent = name;
            this.parentNode.style.paddingTop = "1em";
            this.classList.toggle("hover");
        }, false);
        elm.addEventListener('dragleave', function dragLeave(e) {
            e.stopPropagation();
            this.parentNode.style.paddingTop = "";
            this.classList.toggle("hover");
        }, false);
        elm.addEventListener('drop', function dragDrop(e) {
            e.stopPropagation();
            this.parentNode.style.paddingTop = "";
            this.classList.toggle("hover");
            document.getElementById("canvasNotice").textContent = "";
            if (elements[this.tagName.toLowerCase()] == null || elements[this.tagName.toLowerCase()].droppable === false) return;
            this.append(props.drag);
            //editor.updateIds();
        }, false);
    };
    let handleLoad = () => {
        // add editing styles
        let styleTag = document.createElement("style");
        styleTag.title = "editor";
        styleTag.innerHTML = style;
        let canvas = iframe.current.contentDocument;
        canvas.head.appendChild(styleTag);
        //get css
        let initial_styles = Array.from(canvas.styleSheets).reduce((acc, sheet) => {
            return acc.concat((sheet.title !== "editor" && !sheet.href) ? Array.from(sheet.rules) : []);
        }, []);
        props.setCanvasStyles(initial_styles);
        //console.log(initial_styles);
        //let [styles, setStyles] = useState(initial_styles);
        //TODO: how to bind outlines class to body?
        if (props.outlines) canvas.body.classList.add("show-outlines");
        else if (!props.outlines) canvas.body.classList.add("no-outline");
        // change the active element with focus
        canvas.body.addEventListener("focusin", e => {
            if (canvas.querySelector("[data-status]")) {
                canvas.querySelector("[data-status]").removeAttribute("data-status");
            }
            //let [styles, setStyles] = useState(initial_styles);
            props.setActive(e.target);
            e.target.setAttribute("data-status", "active");
        });
        // add content editable, make focusable, set drag handlers
        canvas.body.querySelectorAll("*:not(style):not(script)").forEach((elm) => {
            const hasTextNode = Array.from(elm.childNodes).filter(node => {
                return node.nodeName === "#text"
                    && node.textContent.replace(/\s/g, "") !== ""
                    && !node.parentNode.isContentEditable;
            }).length > 0;
            if (hasTextNode) elm.contentEditable = true;
            elm.setAttribute("tabindex", "0");
            if (elements[elm.tagName.toLowerCase()] && elements[elm.tagName.toLowerCase()].draggable !== false) {
                setDrag(elm);
            }
        });
    }

    useEffect(() => {
        document.getElementById("canvas").addEventListener('load', handleLoad);
    });

    //TODO: bind to props.show_images?
    /*
    function () {
        let imgs = editor.doc.querySelectorAll("img")
        imgs.forEach(img => {
            if (img.src === location.href) {
                img.src = img.getAttribute("data-src");
                img.removeAttribute("data-src");
            } else {
                img.setAttribute("data-src", img.src);
                img.src = location.href;
            }
        });
    });
    */
// onLoad={handleLoad}
    let classes = "canvasWrapper scroll canvas_" + props.device;
    return (
        <div className={classes}>
            <iframe
                ref={iframe}
                id="canvas"
                title="canvas"
                onChange={props.setActiveTemplate}
                srcDoc={props.src_doc}
                style={{transform: `scale(${props.zoom})`}}
            />
            <div id="canvasNotice"> </div>
        </div>
    );
}