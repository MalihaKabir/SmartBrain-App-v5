import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
	return (
		<div className="ma3 ml5 mt0">
			<Tilt
				className="Tilt br2 shadow-2"
				options={{
					max: 55, // max tilt rotation (degrees)
					perspective: 150 // Transform perspective, the lower the more extreme the tilt gets.
				}}
				style={{ height: 120, width: 120 }}
			>
				<div className="Tilt-inner pa3">
					{/* <img style={{ paddingTop: '5px' }} alt="logo" src={brain} /> */}
					<img alt="logo" src={brain} />
				</div>
			</Tilt>
		</div>
	);
};

export default Logo;
