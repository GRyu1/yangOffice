import React from 'react';

function SmilingFaceSunglasses(props) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '100%';
	const height = props.height || '100%';

	return (
		<svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
	<g>
		<path d="M24,46A22,22,0,1,1,46,24,22,22,0,0,1,24,46Z" fill="#ffd764"/>
		<path d="M24,39a9.03,9.03,0,0,1-7.81-4.536,1,1,0,0,1,1.737-.994,6.989,6.989,0,0,0,12.146,0,1,1,0,0,1,1.737.994h0A9.03,9.03,0,0,1,24,39Z" fill="#363636"/>
		<path d="M14.17,15a7,7,0,1,0,5.891,10.5L22.5,21.276c.828-1.435,2.168-1.441,3,0L27.937,25.5A7,7,0,1,0,33.828,15L24,15.043Z" fill="#363636"/>
	</g>
</svg>
	);
};

export default SmilingFaceSunglasses;