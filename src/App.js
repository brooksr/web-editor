import React, {useEffect, useState, useRef} from 'react';
import './App.css';
//import {data} from "./mocks/company_data.js";
import {data} from './data.js';

import {Canvas} from './Canvas.js';
import {Toolbar} from './Toolbar.js';
import {Editor} from './Editor.js';
import {Menu, ImageMenu, ClientSettings, CodeEditor} from './Menu.js';
let CodeMirror = require('react-codemirror');
require('codemirror/lib/codemirror.css');
require('codemirror/mode/htmlmixed/htmlmixed');

function App() {
    //console.log(JSON.stringify(data, null, "\t"));
    const [company, setCompany] = useState(data.company);
    const [campaigns, setCampaigns] = useState(data.campaigns);
    const [templates, setTemplates] = useState(data.templates);
    const [blocks, setBlocks] = useState(data.blocks);
    const [images, setImages] = useState(data.images);
    const [fonts, setFonts] = useState(data.fonts);
    const [styles, setStyles] = useState(data.styles);
    const [src_doc, setTemplate] = useState(templates[0].html);
    const [canvas_styles, setCanvasStyles] = useState([]);

    const [show_images, toggleImages] = useState(true);
    const [outlines, toggleOutlines] = useState(true);
    const [zoom, changeZoom] = useState(1);
    const [drag, setDragging] = useState(null);
    const [active_element, setActive] = useState(null);
    const [view, setView] = useState("visual");
    const [device, changeDevice] = useState("desktop");

    const setZoom = function (e, to) {
        let newT = 1;
        if (to === "in") newT = zoom + 0.25;
        else if (to === "out") newT = zoom / 1.25;
        changeZoom(newT);
    };
    const setActiveTemplate = function (html) {
        //setView("visual");
        setTemplate(html);
    };

    return (
        <div>
            <Toolbar
                src_doc={src_doc}
                view={view}
                device={device}
                toggleImages={() => toggleImages(!show_images)}
                toggleOutlines={() => toggleOutlines(!outlines)}
                changeZoom={setZoom}
                setView={setView}
                changeDevice={changeDevice}
            />
            <Menu
                view={view}
                campaigns={campaigns}
                templates={templates}
                setTemplate={setActiveTemplate}
            />
            <ImageMenu
                view={view}
                images={images}
            />
            <ClientSettings
                view={view}
                company={company}
                fonts={fonts}
                styles={styles}
                setFonts={setFonts}
                setStyles={setStyles}
                campaigns={campaigns}
                setTemplate={setActiveTemplate}
            />
            <CodeEditor
                view={view}
                src_doc={src_doc}
                setActiveTemplate={setActiveTemplate}
                CodeMirror={CodeMirror}
            />
            <Canvas
                src_doc={src_doc}
                fonts={fonts}
                styles={styles}
                show_images={show_images}
                outlines={outlines}
                device={device}
                zoom={zoom}
                drag={drag}
                setActiveTemplate={setActiveTemplate}
                setDragging={setDragging}
                setActive={setActive}
                setCanvasStyles={setCanvasStyles}
            />
            <Editor
                canvas_styles={canvas_styles}
                styles={styles}
                blocks={blocks}
                active_element={active_element}
                setDragging={setDragging}
                setCanvasStyles={setCanvasStyles}
                CodeMirror={CodeMirror}
            />
        </div>
    )
}

export default App;
