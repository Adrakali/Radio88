import React from 'react';
import { Link } from 'react-router-dom';

export default function ShowCard(props) {
	return (
		<Link to={`/program/${props.slug}`}>
			<article>
				<div className="card" key={props.id}>
					<h2>{props.title}</h2>
					<p>{props.desc}</p>
					<img src={props.img} alt={props.title} className="card__img" />
				</div>
			</article>
		</Link>
	);
}
