import {modal} from "./templates/modal";
import {bar} from "./templates/bar";
import {uml_export} from "./templates/uml_export";
import {email} from "./templates/email";
import {email2} from "./templates/email2";
import {uml} from "./templates/uml";
import {modalBlocks} from "./modal-blocks";
import {emailBlocks} from "./email-blocks";

export let data = {
    campaigns: [
        {
            name: "Inboxed Incentive | Save Your Cart",
            notes: "Summary of campaign. Testing instructions.",
            rules: {
                lift_test: 0.90,
                languages: ["en"],
                locales: ["us"],
                pages: ["home"],
                stages: ["active_cart"],
                visitors: ["new"],
                notes: "",
            },
            features: {
                other: ["cart_rebuilder", "coupon_reminder"],
                coupon: {
                    source: "SAVE10",
                    expiration: "2020-12-31",
                    apply: "Only from email"
                },
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
            modal: {
                notes: "",
                defaults: {
                    link: "https://www.destination.com/cart",
                },
                configs: [
                    {
                        name: "Lead Capture",
                        html: modal,
                        launch_method: "abandonment",
                        launch_settings: 6
                    }, {
                        name: "Coupon reminder",
                        launch_method: "coupon_reminder",
                        html: bar,
                    }
                ]
            },
            email: {
                notes: "",
                defaults: {
                    link: "https://www.destination.com/cart",
                },
                attempts: [
                    {
                        name: "Email 1",
                        time: 3600,
                        html: uml_export,
                    }, {
                        name: "Email 2",
                        time: 86400 - 3600,
                        html: email,
                    }, {
                        name: "Email 3",
                        time: 86400 * 2,
                        html: email2,
                    }
                ]
            }
        }, {
            name: "Precise Promotion | Free Shipping vs Free Gift",
            notes: "Example description here.",
            rules: {
                languages: ["en"],
                stages: ["pre_cart"],
                visitors: ["new"],
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
            modal: {
                defaults: {
                    split: 0.50,// 1 / config.length
                    launch_method: "abandonment",
                    launch_settings: 6,
                    link: "https://www.destination.com/cart",
                    notes: "",
                },
                configs: [
                    {
                        name: "Free Shipping",
                        coupon: "FREESHIPPING",
                        html: modal,
                    },{
                        name: "Free Gift",
                        coupon: "FREEGIFT",
                        html: modal,
                    }
                ]
            }
        }
    ],
    templates: [
        {
            html: modal,
            name: "Modal 1",
            icon: '<i class="fas fa-ad"></i>'
        }, {
            html: email,
            name: "Email 1",
            icon: '<i class="far fa-envelope"></i>'
        }, {
            html: email2,
            name: "Email 2",
            icon: '<i class="far fa-envelope"></i>'
        }, {
            html: bar,
            name: "bar 1",
            icon: '<i class="fas fa-ad"></i>'
        }, {
            html: uml,
            name: "uml 1",
            icon: '<i class="fab fa-html5"></i>'
        }, {
            html: uml_export,
            name: "uml_export",
            icon: '<i class="fab fa-html5"></i>'
        }
    ],
    blocks: [
        {
            name: "Modal blocks",
            blocks: modalBlocks
        }, {
            name: "Email blocks",
            blocks: emailBlocks
        }
    ],
    images: [
        {
            src: "https://via.placeholder.com/50x50?text=1",
            alt: "alt placeholder",
            size: "99kb"
        },{
            src: "https://via.placeholder.com/500x500?text=2",
            alt: "alt placeholder",
            size: "99kb"
        },{
            src: "https://via.placeholder.com/250x50?text=3",
            alt: "alt placeholder",
            size: "99kb"
        },{
            src: "https://via.placeholder.com/550x50?text=4",
            alt: "alt placeholder",
            size: "99kb"
        },{
            src: "https://via.placeholder.com/550x50?text=5",
            alt: "alt placeholder",
            size: "99kb"
        },
    ],
    fonts: [
        {
            name: "SamsungSansRegular",
            path: "/fonts/SamsungSansRegular-webfont"
        }, {
            name: "SamsungSansSharp",
            path: "/fonts/SamsungSharpSans-Medium"
        }
    ],
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
};