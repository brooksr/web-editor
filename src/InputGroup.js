import React from "react";

export default function InputGroup(props) {
	if (!props.asset) debugger;
	return (
		<div className="input-group">
			<label>{props.asset.label}</label>
			{
				props.asset.type === "text" ? <input type="text" name="value" defaultValue={props.value} placeholder={props.asset.title} /> :
				props.asset.type === "number" ? <input type="number" name="value" min={props.asset.min} max={props.asset.max} defaultValue={props.value} placeholder={props.asset.title} /> :
				props.asset.type === "time" ? <input type="number" name="value" min="0" defaultValue={props.value} placeholder={props.asset.title} /> :
				props.asset.type === "checkbox" ? <div><CheckboxList value={props.value} options={props.asset.options} /></div> :
				props.asset.type === "date" ? <input type="date" name="value" defaultValue={props.value} placeholder={props.asset.title} /> :
				props.asset.type === "textarea" ? <textarea name="value" defaultValue={props.value} placeholder={props.asset.title} /> :
				props.asset.type === "conditions" ? <Conditions value={props.value} className="condition" /> : ""
			}
		</div>
	)
}

function CheckboxList (props) {
	return props.options.map((o, i) =>
			<div key={i}>
				<input type="checkbox" name="value" checked={props.value.indexOf(i) > -1} /> {o}
			</div>
	)
}
function Conditions(props) {
	//debugger;
	let conditions = {
        "Page | Home Page": "is a home page",
        "Page | Category Page": "is a category page",
        "Page | Product Page": "is a product page",
        "Page | Cart Page": "is a cart page",
        "Page | Checkout Page": "is a checkout page",
        "Page | Login Page": "is a login page",
        "Page | Register Page": "is a register page",
        "Page | Confirmation Page": "is a confirmation page",
        "Stage | Pre Cart": "cart total == 0",
        "Stage | Active Cart": "cart total > 0",
        "Stage | Post Purchase": "orders > 0",
    	"Visitor | Return Visitor": "is a return visitor",
    	"Visitor | Direct Traffic": "is direct traffic",
    	"Visitor | Logged In": "is logged in",
    };
	return (
			<div className="conditions flex flex-auto">
				{props.value.map((term, index) =>  {
					return (
							Array.isArray(term) ? <Conditions key={index} value={term} className="condition" /> :
									(term === "||" || term === "&&") ? <select key={index} className="operator" defaultValue={term} >
												<option value="&&">AND</option>
												<option value="||">OR</option>
											</select> :
											<input key={index} list="conditions" type="text" defaultValue={term} size={term.length + 2} />
					)
				})}
				<datalist id="conditions">
					{Object.keys(conditions).map(label => <option value={conditions[label]} label={label} key={label} />)}
				</datalist>
			</div>
	)
}
