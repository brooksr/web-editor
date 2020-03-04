import {modal} from "./templates/modal";
import {bar} from "./templates/bar";
import {uml_export} from "./templates/uml_export";
import {email} from "./templates/email";
import {email2} from "./templates/email2";

export let campaignSchema = {
	name: {
		type: "text",
		title: "Enter a unique name for this campaign.",
		value: ""
	},
	notes: {
		type: "textarea",
		title: "Summary of campaign and testing instructions.",
		value: ""
	},
	rules: {
		lift_test: {
			type: "number",
			title: "How much traffic are we live on?",
			value: "100",
			min: 0,
			max: 100
		},
		languages: {
			type: "text",
			title: "What languages will we use?",
			value: "en",
		},
		locales: {
			type: "text",
			title: "What locales should we launch on? Based on website or geolocation?",
			value: "All",
		},
		pages: {
			type: "text",
			title: "What pages should we launch on?",
			value: "All",
		},
		stages: {
			type: "text",
			title: "What stages should we launch on?",
			value: "All",
		},
		visitors: {
			type: "text",
			title: "Which visitors should we launch on?",
			value: "All",
		},
		notes: {
			type: "textarea",
			title: "Any other rule requests?",
			value: ""
		},
	},
	features: {
		other: {
			type: "checkbox",
			title: "Any other features?",
			options: [
				"Cart Rebuilder",
				"Coupon Reminder",
			],
		},
		coupon_source: {
			type: "text",
			title: "What is the coupon? Add link to list or mult-use coupon.",
			value: "",
		},
		coupon_expiration: {
			type: "date",
			title: "When does the coupon expire?",
			value: "",
		},
		coupon_apply: {
			type: "text",
			title: "When should we apply the coupon?",
			value: "When email is submitted.",
		},
		notes: {
			type: "textarea",
			title: "Any other feature requests?",
			value: ""
		},
	},
	admin: {
		site_id: {
			type: "text",
			title: "What site IDs are related to this campaign?",
			value: "",
		},
		tracking: {
			type: "text",
			title: "What is the affiliate link?",
			value: "",
		},
		sale_window: {
			type: "time",
			title: "What is the sale window for this client?",
			value: 86400 * 14,
		},
		opp: {
			type: "text",
			title: "What is the opportunity link?",
			value: "",
		},
		design_notes: {
			type: "textarea",
			title: "This is an area for design notes and feedback. Add links to client references and assets.",
			value: "",
		},
		dev_notes: {
			type: "textarea",
			title: "Notes for the development team. Comments on specific functionality.",
			value: "",
		},
		qa_notes: {
			type: "textarea",
			title: "Notes for QA. Links to QA docs.",
			value: "",
		},
	},
	modal: {
		defaults: {
			name: {
				type: "text",
				title: "Enter a unique name for this modal.",
				value: ""
			},
			html: {
				type: "textarea",
				title: "Code for the modal",
				value: ""
			},
			launch_method: {
				type: "checkbox",
				title: "When should this modal be displayed",
				options: [
					"Abandonment: Predictive (desktop only)",
					"Abandonment: Back off site",
					"Abandonment: Back off page",
					"Proactive: After page load",
					"Side Slider: Click on tab"
				]
			},
			launch_settings: {
				type: "number",
				title: "How aggressive is this campaign? 1 is conservative, 10 is aggressive.",
				value: 5,
				min: 1,
				max: 10
			},
			link: {
				type: "text",
				title: "Where should this modal link to?",
				value: ""
			},
		},
		notes: {
			type: "textarea",
			title: "Any other requests for the modals?",
			value: "",
		},
	},
	email: {
		defaults: {
			name: {
				type: "text",
				title: "Enter a unique name for this email.",
				value: ""
			},
			subject: {
				type: "text",
				title: "Enter a subject line.",
				value: ""
			},
			preheader: {
				type: "text",
				title: "Enter a preheader.",
				value: ""
			},
			time: {
				type: "time",
				title: "When should this email send?",
				value: 3600,
			},
			html: {
				type: "textarea",
				title: "Code for the email",
				value: "",
			},
			from_name: {
				type: "text",
				title: "Enter a from name.",
				value: ""
			},
			from_email: {
				type: "text",
				title: "Enter a from email.",
				value: ""
			},
			link: {
				type: "text",
				title: "What is the destination link?",
				value: ""
			},
		},
		notes: {
			type: "textarea",
			title: "Any other requests for the modals?",
			value: "",
		},
	}
};