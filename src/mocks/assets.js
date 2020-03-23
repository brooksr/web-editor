import {modal} from "../templates/modal";
import {bar} from "../templates/bar";
import {uml_export} from "../templates/uml_export";
import {email} from "../templates/email";
import {email2} from "../templates/email2";

export let assets = [
    {
        id: 0,
        name: "Lead Capture",
        html: modal,
        launch_settings: 6,
        launch_method: "abandonment",
    }, {
        id: 1,
        name: "Coupon reminder",
        html: bar,
        launch_method: "coupon_reminder",
    },
    {
        id: 2,
        name: "Email 1",
        subject: "subject line 1",
        preheader: "preheader line 1",
        time: 3600,
        html: uml_export,
    }, {
        id: 3,
        name: "Email 2",
        subject: "subject line 2",
        preheader: "preheader line 2",
        time: 86400 - 3600,
        html: email,
    }, {
        id: 4,
        name: "Email 3",
        subject: "subject line 3",
        preheader: "preheader line 3",
        time: 86400 * 2,
        html: email2,
    },
    {
        id: 5,
        name: "Free Shipping",
        coupon: "FREESHIPPING",
        html: modal,
    }, {
        id: 6,
        name: "Free Gift",
        coupon: "FREEGIFT",
        html: modal,
    }
]
