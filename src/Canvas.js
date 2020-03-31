import React, {useEffect, useRef} from "react";
import {elements} from "./mocks/elements";
import {useGlobalState} from "./hooks/useGlobal";

export function Canvas(props) {
    let {data} = useGlobalState();
    let iframe = useRef(null);

    //TODO replace document.getElementById("canvas")?
    useEffect(() => {
        //rewrite shortcuts for react
        /*document.getElementById("canvas").addEventListener("keydown", function(event) {
            let save = event.which === 83 && event.ctrlKey;//S
            let moveUp = event.which === 38 && event.shiftKey;
            let moveDown = event.which === 40 && event.shiftKey;
            let link = event.which === 76 && event.ctrlKey;//L
            if (save) {
                event.preventDefault();
                editor.save();
            } else if (moveUp) {
                event.preventDefault();
                editor.moveUp();
            } else if (moveDown) {
                event.preventDefault();
                editor.moveDown();
            } else if (link) {
                event.preventDefault();
                let sel = editor.doc.getSelection();
                if (sel.rangeCount) {
                    let range = sel.getRangeAt(0).cloneRange();
                    let a = document.createElement("a");
                    a.href = "#";
                    range.surroundContents(a);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        });*/
        let setDrag = (elm) => {
            elm.draggable = "true";
            elm.addEventListener('dragstart', function dragStart(e) {
                e.stopPropagation();
                e.dataTransfer.setData("text/plain", Array.from(iframe.current.contentDocument.querySelectorAll("*")).indexOf(e.target));
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
                //let name = "";
                //TODO: show the element being hovered
                /*if (this.id) name += "#" + this.id;
                if (this.className) name += "." + this.className;
                document.getElementById("canvasNotice").textContent = name;
                this.parentNode.style.paddingTop = "1em";*/
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
                //document.getElementById("canvasNotice").textContent = "";
                if (elements[this.tagName.toLowerCase()] == null || elements[this.tagName.toLowerCase()].droppable === false) return;
                let data = e.dataTransfer.getData("text");
                if (!isNaN(Number(data))) this.append(iframe.current.contentDocument.querySelectorAll("*")[data]);
                else this.append(document.createRange().createContextualFragment(data));
            }, false);
        };
        let handleLoad = () => {
            // add editing styles
            let styleTag = document.createElement("style");
            styleTag.title = "editor";
            styleTag.innerHTML = data.editor_style;
            let canvas = iframe.current.contentDocument;
            canvas.head.appendChild(styleTag);
    
            //get css
            let styles = {
                css: [],
                media: []
            };
            let initial_styles = Array.from(canvas.styleSheets).reduce((acc, sheet) => {
                return acc.concat((sheet.title !== "editor" && !sheet.href) ? Array.from(sheet.rules) : []);
            }, []);
            initial_styles.forEach(rule => {
                //unshift so most specific styless are on
                if (rule.media) {
                    styles.media.push(rule);
                } else {
                    styles.css.push(rule);
                }
            });
            props.setCanvasStyles(styles);
            
            // change the active element with focus
            canvas.body.addEventListener("focusin", e => {
                if (e.target === canvas.querySelector("[data-status]")) return;
                if (canvas.querySelector("[data-status]")) {
                    canvas.querySelector("[data-status]").removeAttribute("data-status");
                }
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
    
            //log mutations
            new MutationObserver((mutationsList, observer) => {
                for(let mutation of mutationsList) {
                    console.log(mutation.target);
                    if (mutation.type === 'childList') {
                        if (mutation.addedNodes.length > 0) {
                            console.log('Child node added');
                            console.log(mutation.addedNodes);
                        } else if (mutation.removedNodes.length > 0) {
                            console.log('Child node removed');
                            console.log(mutation.removedNodes);
                        }
                    } else if (mutation.type === 'attributes') {
                        let value = mutation.target.getAttribute(mutation.attributeName);
                        if (value === null) {
                            console.log(`${mutation.attributeName} removed`);
                        } else {
                            console.log(`${mutation.attributeName}="${value}"`);
                        }
                    }
                }
            }).observe(canvas, { attributes: true, childList: true, subtree: true });
        };
        document.getElementById("canvas").addEventListener('load', handleLoad);
    }, [data.editor_style, props]);

    useEffect(() => {
        let imgs = document.getElementById("canvas").contentDocument.querySelectorAll("img");
        imgs.forEach(img => {
            if (img.src === window.location.href) {
                img.src = img.getAttribute("data-src");
                img.removeAttribute("data-src");
            } else {
                img.setAttribute("data-src", img.src);
                img.src = window.location.href;
            }
        });
    }, [props.show_images]);

    useEffect(() => {
        let body = document.getElementById("canvas").contentDocument.body;
        body.classList.toggle("no-outline");
        
    }, [props.outlines]);
   
    return (
        <div className={`canvasWrapper scroll canvas_${props.device}`}>
            <iframe
                ref={iframe}
                id="canvas"
                title="canvas"
                srcDoc={props.src_doc}
                style={{transform: `scale(${props.zoom})`}}
            />
            <div id="canvasNotice"> </div>
        </div>
    );
}