export default {
	info: {
		name: {
			type: "text",
			label: "Campaign Name",
			title: "Enter a unique name for this campaign.",
			value: ""
		},
		notes: {
			type: "textarea",
			label: "Campaign Notes",
			title: "Summary of campaign and testing instructions.",
			value: ""
		},
	},
	data: {
		rules: {
			conditions: {
				type: "conditions",
				label: "Conditions",
				title: "When should this campaign run?",
				value: [],
			},
			lift_test: {
				type: "number",
				label: "USI Traffic %",
				title: "How much traffic are we live on?",
				value: "100",
				min: 0,
				max: 100
			},
			languages: {
				type: "text",
				label: "Languages",
				title: "What languages will we use?",
				value: "en",
			},
			locales: {
				type: "text",
				label: "Locales",
				title: "What locales should we launch on? Based on website or geolocation?",
				value: "All",
			},
			pages: {
				type: "text",
				label: "Pages",
				title: "What pages should we launch on?",
				value: "All",
			},
			stages: {
				type: "text",
				label: "Stages",
				title: "What stages should we launch on?",
				value: "All",
			},
			visitors: {
				type: "text",
				label: "Visitors",
				title: "Which visitors should we launch on?",
				value: "All",
			},
			notes: {
				type: "textarea",
				label: "Other Rules",
				title: "Any other rule requests?",
				value: ""
			},
		},
		features: {
			other: {
				type: "checkbox",
				label: "Features",
				title: "Any other features?",
				options: [
					"Cart Rebuilder",
					"Coupon Reminder",
				],
			},
			coupon_source: {
				type: "text",
				label: "Coupon",
				title: "What is the coupon? Add link to list or mult-use coupon.",
				value: "",
			},
			coupon_expiration: {
				type: "date",
				label: "Coupon Expiration",
				title: "When does the coupon expire?",
				value: "",
			},
			coupon_apply: {
				type: "text",
				label: "Coupon Application",
				title: "When should we apply the coupon?",
				value: "When email is submitted.",
			},
			notes: {
				type: "textarea",
				label: "Other Features",
				title: "Any other feature requests?",
				value: ""
			},
		},
		admin: {
			site_id: {
				type: "text",
				label: "Site IDs",
				title: "What site IDs are related to this campaign?",
				value: "",
			},
			tracking: {
				type: "text",
				label: "Tracking Link",
				title: "What is the affiliate link?",
				value: "",
			},
			sale_window: {
				type: "time",
				label: "Sale Window",
				title: "What is the sale window for this client?",
				value: 86400 * 14,
			},
			opp: {
				type: "text",
				label: "SalesForce Link",
				title: "What is the opportunity link?",
				value: "",
			},
			design_notes: {
				type: "textarea",
				label: "Design Notes",
				title: "This is an area for design notes and feedback. Add links to client references and assets.",
				value: "",
			},
			dev_notes: {
				type: "textarea",
				label: "Dev Notes",
				title: "Notes for the development team. Comments on specific functionality.",
				value: "",
			},
			qa_notes: {
				type: "textarea",
				label: "QA Notes",
				title: "Notes for QA. Links to QA docs.",
				value: "",
			},
		},
	},
	assets: {
		modal: {
			defaults: {
				name: {
					type: "text",
					label: "Modal Name",
					title: "Enter a unique name for this modal.",
					value: ""
				},
				html: {
					type: "textarea",
					label: "Modal Code",
					title: "Code for the modal",
					value: ""
				},
				launch_method: {
					type: "checkbox",
					label: "Launch Method",
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
					label: "Launch settings",
					title: "How aggressive is this campaign? 1 is conservative, 10 is aggressive.",
					value: 5,
					min: 1,
					max: 10
				},
				link: {
					type: "text",
					label: "Destination Link",
					title: "Where should this modal link to?",
					value: ""
				},
				coupon: {
					type: "text",
					label: "Coupon",
					title: "Unique coupon for this modal",
					value: ""
				},
				split: {
					type: "number",
					label: "Split %",
					title: "How much traffic is the modal live on?",
					value: "100",
					min: 0,
					max: 100
				},
				notes: {
					type: "textarea",
					label: "Notes",
					title: "Any other requests?",
					value: "",
				},
			},
			notes: {
				type: "textarea",
				label: "Other Modal Requests",
				title: "Any other requests for the modals?",
				value: "",
			},
		},
		email: {
			defaults: {
				name: {
					type: "text",
					label: "Email Name",
					title: "Enter a unique name for this email.",
					value: ""
				},
				subject: {
					type: "text",
					label: "Subject",
					title: "Enter a subject line.",
					value: ""
				},
				preheader: {
					type: "text",
					label: "Preheader",
					title: "Enter a preheader.",
					value: ""
				},
				time: {
					type: "time",
					label: "Send Time",
					title: "When should this email send?",
					value: 3600,
				},
				html: {
					type: "textarea",
					label: "Email Code",
					title: "Code for the email",
					value: "",
				},
				from_name: {
					type: "text",
					label: "From Name",
					title: "Enter a from name.",
					value: ""
				},
				from_email: {
					type: "text",
					label: "From Email",
					title: "Enter a from email.",
					value: ""
				},
				link: {
					type: "text",
					label: "Destination Link",
					title: "What is the destination link?",
					value: ""
				},
				coupon: {
					type: "text",
					label: "Coupon",
					title: "Unique coupon for this modal",
					value: ""
				},
				split: {
					type: "number",
					label: "Split %",
					title: "How much traffic is the modal live on?",
					value: "100",
					min: 0,
					max: 100
				},
				notes: {
					type: "textarea",
					label: "Notes",
					title: "Any other requests?",
					value: "",
				},
			},
			notes: {
				type: "textarea",
				label: "Email Notes",
				title: "Any other requests for the emails?",
				value: "",
			},
		}
	}
};