import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './List.css';
import {useGlobalState} from "./hooks/useGlobal";

export function List (props) {
	const {companies} = useGlobalState();
  let [term, setTerm] = useState("");
  
  return (
    <div className="flex search-group">

      <div className="flex">
        <label>Search Companies</label>
        <input placeholder="Enter company name" type="text" value={term} onChange={e => setTerm(e.target.value)} />
      </div>

      <ul className="scroll" style={{height: 'calc(100vh - 10em)'}}>
        {companies.reduce((a, c) => {
          if (c.id && c.name && c.name.toLowerCase().indexOf(term) !== -1) {
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