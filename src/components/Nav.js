import React from 'react';
import { Link } from 'react-router-dom';
import Player from './Player';

export default function Nav() {
	return (
		<nav>
			<div className="nav-content">
				<div id="nav__logo-wrapper">
					<Link to="/">
						<img src="/images/radio88-hemsida.png" id="nav__logo" alt="logo" />
					</Link>
				</div>
				<ul className="nav__links">
					<li>
						<Link to="/program">Program</Link>
					</li>
					<li>
						<Link to="/contact">Kontakt</Link>
					</li>
				</ul>
				<Player />
			</div>
		</nav>
	);
}
