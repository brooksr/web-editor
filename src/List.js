import React, {useState} from 'react';
import {Link, useRouteMatch} from "react-router-dom";
import {company_list} from './companies.js';
import './List.css';

export function List () {
  let [term, setTerm] = useState("");
  //let match = useRouteMatch();
  return (
    <div className="flex search-group">
      <div className="flex">
        <label>Search Companies</label>
        <input placeholder="Enter company name" type="text" value={term} onChange={e => setTerm(e.target.value)} />
      </div>
      <ul>
        {company_list.map(c => <li style={{display: c.toLowerCase().indexOf(term) != -1 ? "inherit" : "none"}} key={c}>
          <Link to={`/company/${c}`}>{c}</Link>
          </li>)}
      </ul>
    </div>
  )
}