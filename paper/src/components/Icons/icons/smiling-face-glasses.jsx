import React from 'react';

function SmilingFaceGlasses(props) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '100%';
	const height = props.height || '100%';

	return (
		<svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
	<g>
		<path d="M24,46A22,22,0,1,1,46,24,22,22,0,0,1,24,46Z" fill="#ffd764"/>
		<path d="M33,32a1,1,0,0,0-1-1H16a1,1,0,0,0-1,1v1H33Z" fill="#fff"/>
		<path d="M15.059,33a9,9,0,0,0,17.882,0Z" fill="#cb2010"/>
		<path d="M19.114,39.547a8.943,8.943,0,0,0,9.772,0,5.96,5.96,0,0,0-9.772,0Z" fill="#ff7163"/>
		<path d="M14,24a3,3,0,1,1,3-3A3,3,0,0,1,14,24Z" fill="#363636"/>
		<path d="M34,24a3,3,0,1,1,3-3A3,3,0,0,1,34,24Z" fill="#363636"/>
		<path d="M34,13a7.991,7.991,0,0,0-6.736,3.7,3.981,3.981,0,0,0-6.528,0A7.987,7.987,0,1,0,22,21V19a2,2,0,0,1,4,0v2a8,8,0,1,0,8-8ZM14,27a6,6,0,1,1,6-6A6,6,0,0,1,14,27Zm20,0a6,6,0,1,1,6-6A6,6,0,0,1,34,27Z" fill="#363636"/>
	</g>
</svg>
	);
};

export default SmilingFaceGlasses;