import React, {useEffect, useState, useRef} from 'react';
import './App.css';
//import {data} from "./mocks/company_data.js";
import {data} from './data.js';

import {Canvas} from './Canvas.js';
import {Toolbar} from './Toolbar.js';
import {Editor} from './Editor.js';
import {Menu, ImageMenu} from './Menu.js';

function App() {
    console.log(JSON.stringify(data, null, "\t"));
    const [campaigns, setCampaigns] = useState(data.campaigns);
    const [templates, setTemplates] = useState(data.templates);
    const [blocks, setBlocks] = useState(data.blocks);
    const [images, setImages] = useState(data.images);
    const [fonts, setFonts] = useState(data.fonts);
    const [styles, setStyles] = useState(data.styles);
    const [src_doc, setTemplate] = useState(templates[0].html);

    const [show_images, toggleImages] = useState(true);
    const [outlines, toggleOutlines] = useState(true);
    const [menu_open, toggleMenu] = useState(false);
    const [image_menu_open, toggleImageMenu] = useState(false);
    const [zoom, changeZoom] = useState(1);
    const [view, toggleView] = useState("visual");
    const [device, changeDevice] = useState("desktop");
    const [drag, setDragging] = useState(null);
    const [active_element, setActive] = useState(null);

    const setZoom = function (e, to) {
        let newT = 1;
        if (to === "in") newT = zoom + 0.25;
        else if (to === "out") newT = zoom / 1.25;
        changeZoom(newT);
    };
    const setActiveTemplate = function (html) {
        toggleMenu(false);
        setTemplate(html);
    };
    const setImageMenu = () => toggleImageMenu(!image_menu_open);
    const setMenu = () => toggleMenu(!menu_open);

    return (
        <div>
            <Toolbar
                src_doc={src_doc}
                view={view}
                device={device}
                toggleImages={() => toggleImages(!show_images)}
                toggleOutlines={() => toggleOutlines(!outlines)}
                toggleMenu={setMenu}
                toggleImageMenu={setImageMenu}
                changeZoom={setZoom}
                toggleView={() => toggleView(view === "visual" ? "code" : "visual")}
                changeDevice={() => changeDevice(device === "desktop" ? "mobile" : "desktop")}
            />
            <Menu
                campaigns={campaigns}
                templates={templates}
                open={menu_open}
                toggleMenu={setMenu}
                setTemplate={setActiveTemplate}
            />
            <ImageMenu
                images={images}
                open={image_menu_open}
                toggleImageMenu={setImageMenu}
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
                setDragging={setDragging}
                setActive={setActive}
            />
            <Editor
                setDragging={setDragging}
                blocks={blocks}
                active_element={active_element}
            />
        </div>
    )
}

export default App;
