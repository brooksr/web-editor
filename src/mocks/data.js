import {modal} from "../templates/modal";
import {bar} from "../templates/bar";
import {uml_export} from "../templates/uml_export";
import {email} from "../templates/email";
import {email2} from "../templates/email2";
import {uml} from "../templates/uml";
import {modalBlocks} from "../templates/modal-blocks";
import {emailBlocks} from "../templates/email-blocks";

export let data = {
    name: "Samsung",
    note: "Samsung placeholder note",
    fonts: [{
        name: "SamsungSansRegular",
        path: "/web-editor/fonts/SamsungSansRegular-webfont"
    }, {
        name: "SamsungSansSharp",
        path: "/web-editor/fonts/SamsungSharpSans-Medium"
    }],
    styles: {
        "display-font": "SamsungSansSharp",
        "text-font": "SamsungSansRegular",
        "main-bg-color": "hsl(0, 0, 0)",
        "main-font-color": "hsl(0, 0%, 98%)",
        "primary-color": "hsl(231, 78%, 35%)",
        "primary-color-dark": "hsl(231, 78%, 30%)",
        "primary-color-text": "hsl(0, 0%, 98%)",
        "overlay-color": "hsla(0, 0%, 0%, 0.5)"
    },
    vars: {
        name: "Samsung",
        address: "123 Easy St. | Anytown, CA, USA, 98765",
        legal: "&copy {{date_now:yyyy}} | Company Name, LLC. All rights reserved.",
        facebook: "https://www.facebook.com/",
        twitter: "https://www.twitter.com/",
        linkedin: "https://www.linkedin.com/",
    },
    conditions: {
        product_page: "Product Pages",
        active_cart: "Active Cart",
        return_visitor: "Return Visitors",
    },
    templates: [{
        id: 0,
        html: modal,
        name: "Modal 1",
        version: 1.0,
        note: "",
        type: "modal",
    }, {
        id: 1,
        html: email,
        name: "Email 1",
        version: 1.0,
        note: "",
        type: "email",
    }, {
        id: 2,
        html: email2,
        name: "Email 2",
        version: 1.0,
        note: "",
        type: "email",
    }, {
        id: 3,
        html: bar,
        name: "bar 1",
        version: 1.0,
        note: "",
        type: "modal",
    }, {
        id: 4,
        html: uml,
        name: "uml 1",
        version: 1.0,
        note: "",
        type: "email",
    }, {
        id: 5,
        html: uml_export,
        name: "uml_export",
        version: 1.0,
        note: "",
        type: "email",
    }],
    blocks: [{
        id: 0,
        name: "Modal blocks",
        blocks: modalBlocks,
        version: 1.0,
        note: "",
        type: "modal",
    }, {
        id: 1,
        name: "Email blocks",
        blocks: emailBlocks,
        version: 1.0,
        note: "",
        type: "email",
    }],
    images: [{
        src: "https://via.placeholder.com/50x550?text=1",
        alt: "alt placeholder",
        size: "99kb",
        height: 100,
        width: 100,
    }, {
        src: "https://via.placeholder.com/500x500?text=2",
        alt: "alt placeholder",
        size: "99kb",
        height: 100,
        width: 100,
    }, {
        src: "https://via.placeholder.com/250x50?text=3",
        alt: "alt placeholder",
        size: "99kb",
        height: 100,
        width: 100,
    }, {
        src: "https://via.placeholder.com/550x50?text=4",
        alt: "alt placeholder",
        size: "99kb",
        height: 100,
        width: 100,
    }, {
        src: "https://via.placeholder.com/50x50?text=5",
        alt: "alt placeholder",
        size: "99kb",
        height: 100,
        width: 100,
    }, ],
    campaigns: [{
        id: 0,
        info: {
            name: "Inboxed Incentive | Save Your Cart",
            notes: "Summary of campaign. Testing instructions.",
        },
        data: {
            rules: {
                conditions: ["90% Lift Test", "&&", "Not Return Visitor", "&&", ["Cart Total > 0", "||", ["Product Page", "&&", "Direct Traffic"]]],
                languages: "en",
                locales: "us",
                notes: "",
            },
            features: {
                other: ["cart_rebuilder", "coupon_reminder"],
                coupon_source: "SAVE10",
                coupon_expiration: "2020-12-31",
                coupon_apply: "Only from email",
                notes: "",
            },
            admin: {
                site_id: "23456",
                tracking: "https://www.example.com?url=",
                sale_window: 86400 * 30,
                opp: "https://upsellit.lightning.force.com/lightning/r/Opportunity/0060g000010TmmNAAS/view",
                design_notes: "This is an area for design notes and feedback. Add links to client references and assets.",
                dev_notes: "Notes for the development team. Comments on specific functionality.",
                qa_notes: "Notes for QA. Links to QA docs.",
            },
        },
        assets: {
            modal: {
                list: [{
                    id: 0,
                    name: "Lead Capture",
                    html: modal,
                    launch_settings: 6,
                    link: "https://www.destination.com/cart",
                    launch_method: [0, 1],
                }, {
                    id: 1,
                    name: "Coupon reminder",
                    html: bar,
                    link: "https://www.destination.com/cart",
                    launch_method: [3],
                }],
                notes: "",
            },
            email: {
                list: [{
                    id: 2,
                    name: "Email 1",
                    subject: "subject line 1",
                    preheader: "preheader line 1",
                    time: 3600,
                    html: uml_export,
                    from_name: "Samsung Support",
                    from_email: "support@samsung.com",
                    link: "https://www.destination.com/cart",
                }, {
                    id: 3,
                    name: "Email 2",
                    subject: "subject line 2",
                    preheader: "preheader line 2",
                    time: 86400 - 3600,
                    html: email,
                    from_name: "Samsung Support",
                    from_email: "support@samsung.com",
                    link: "https://www.destination.com/cart",
                }, {
                    id: 4,
                    name: "Email 3",
                    subject: "subject line 3",
                    preheader: "preheader line 3",
                    time: 86400 * 2,
                    html: email2,
                    from_name: "Samsung Support",
                    from_email: "support@samsung.com",
                    link: "https://www.destination.com/cart",
                }],
                notes: "",
            }
        }
    }, {
        id: 1,
        info: {
            name: "Precise Promotion | Free Shipping vs Free Gift",
            notes: "Example description here.",
        },
        data: {
            rules: {
                conditions: ["Not Return Visitor", "&&", "Cart Total == 0"],
                languages: "en",
                locales: "us",
                notes: "",
            },
            admin: {
                site_id: "23457",
                tracking: "https://www.example.com?url=",
                sale_window: 86400 * 30,
                opp: "https://upsellit.lightning.force.com/lightning/r/Opportunity/0060g000010TmmNAAS/view",
                design_notes: "This is an area for design notes and feedback. Add links to client references and assets.",
                dev_notes: "Notes for the development team. Comments on specific functionality.",
                qa_notes: "Notes for QA. Links to QA docs.",
            },
        },
        assets: {
            modal: {
                list: [{
                    id: 5,
                    name: "Free Shipping",
                    coupon: "FREESHIPPING",
                    html: modal,
                    split: 50, // 1 / configs.length
                    launch_settings: 6,
                    link: "https://www.destination.com/cart",
                    launch_method: [0, 1],
                    notes: "",
                }, {
                    id: 6,
                    name: "Free Gift",
                    coupon: "FREEGIFT",
                    html: modal,
                    split: 50, // 1 / configs.length
                    launch_settings: 6,
                    link: "https://www.destination.com/cart",
                    launch_method: [0, 1],
                    notes: "",
                }]
            }
        }
    }],
};

data.editor_style = `
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
    ${Object.keys(data.styles).map(style => `--${style}: ${data.styles[style]};`).join("\n")}
}
${data.fonts.reduce((acc, style) => acc += `
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
}`, "")}
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
}`;