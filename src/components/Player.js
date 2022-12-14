import React, { useEffect, useState, useRef } from 'react';

export default function Player() {
	const audio = useRef(new Audio('https://streaming.943.se/radio88'));

	// PLAY RADIO ========================

	const [isPlaying, setIsPlaying] = useState(false);

	function playRadio() {
		setIsPlaying((play) => !play);
	}

	useEffect(() => {
		isPlaying ? audio.current.play() : audio.current.pause();
	}, [isPlaying]);

	function changeVolume(e) {
		audio.current.volume = e.currentTarget.value / 100;
		adjustVolumeIcon(audio.current.volume);
	}
	const [volumeIcon, setVolumeIcon] = useState('fa-solid fa-volume-low');

	function adjustVolumeIcon(volume) {
		if (volume >= 0.75) {
			setVolumeIcon('fa-solid fa-volume-high');
		}
		if (volume < 0.75 && volume >= 0.2) {
			setVolumeIcon('fa-solid fa-volume-low');
		}
		if (volume < 0.2 && volume > 0) {
			setVolumeIcon('fa-solid fa-volume-off');
		}
		if (volume === 0) {
			setVolumeIcon('fa-solid fa-volume-xmark');
		}
	}

	return (
		<div className="player">
			<button onClick={playRadio} className="play-btn">
				{isPlaying ? (
					<i className="fa-solid fa-pause"></i>
				) : (
					<i className="fa-solid fa-play"></i>
				)}
			</button>
			<div className="player__title secondary-txt-clr">
				<p>Vi spelar musiken som du glömt att du kommer ihåg</p>
			</div>
			<div className="player__vol-container">
				<button className="volume-btn">
					<i className={volumeIcon}></i>
				</button>
				<input id="player__vol" type="range" onChange={changeVolume} />
			</div>
		</div>
	);
}
