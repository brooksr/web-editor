import React, {useState} from 'react';
import {Link, useRouteMatch} from "react-router-dom";
import './List.css';
import {useGlobalState} from "./hooks/useGlobal";
//console.log(companies)

export function List (props) {
	const {companies} = useGlobalState();
  let [term, setTerm] = useState("");
  //let match = useRouteMatch();
  //debugger;
  return (
    <div className="flex search-group">
      <div className="flex">
        <label>Search Companies</label>
        <input placeholder="Enter company name" type="text" value={term} onChange={e => setTerm(e.target.value)} />
      </div>
      <ul className="scroll" style={{height: 'calc(100vh - 10em)'}}>
        {companies.reduce((a, c) => {
          if (a.length < 500 && c.id && c.name && c.name.toLowerCase().indexOf(term) !== -1) {
            a.push(
              <li key={c.id}>
                <Link to={`/company/${c.id}/`}>{c.name}</Link>
              </li>
            )
          }
          return a;
        }, [])}
      </ul>
    </div>
  )
}