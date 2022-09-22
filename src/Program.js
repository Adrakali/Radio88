import React from 'react';
import useContentful from './Hooks/useContentful';
import ShowCard from './components/ShowCard';

export default function Program() {
	const { data, loading, error } = useContentful();

	return (
		<section>
			<div className="container grid">
				{error && <div>{error}</div>}
				{loading && <h1>Laddar sidan...</h1>}
				{data &&
					data.map((show) => (
						<ShowCard
							key={show.sys.id}
							id={show.sys.id}
							slug={show.fields.slug}
							title={show.fields.title}
							desc={show.fields.description}
							img={show.fields.image.fields.file.url}
						/>
					))}
			</div>
		</section>
	);
}
