import React from 'react';

export default function Home() {
	return (
		<main>
			<section className="hero">
				<div className="hero__text">
					<h1>Vi spelar musiken som du glömt att du kommer ihåg</h1>
					<p>
						Ut luctus tincidunt tincidunt Ut Nunc consectetur nulla, consectetur
						maximus elit. nisi dui viverra lobortis, In venenatis{' '}
					</p>
				</div>

				<img src="./images/hero-image.png" alt="Hero" />
			</section>
			<section>
				<div className="container">
					<img
						src="./images/aladdin-banner.jpg"
						alt="Hero"
						className="banner"
					/>
				</div>
			</section>
		</main>
	);
}
