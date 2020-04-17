import React from "react";
import {useGlobalState} from "./hooks/useGlobal";

export function Images(props) {
	const {data} = useGlobalState();
	return (
			<div>
				<form action="" method="post" encType="multipart/form-data">
					<input type="file" name="fileToUpload" id="fileToUpload"/>
					<input type="submit" value="Upload Image" name="submit"/>
				</form>
				<ul className="list">
					{data.images.map((i) =>
							<li key={i.src}>
								<img src={i.src} alt={i.alt}/>
								<a href={i.src} target="_blank" rel="noopener noreferrer">{i.src}</a>
								<p>{i.alt}</p>
								<span className="image-size">{i.size}</span>
							</li>
					)}
				</ul>
			</div>
	)
}