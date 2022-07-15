import React from 'react';

const Body = React.forwardRef((props, ref) => {
	return (
		<div ref={ref} className="body">
			<h1>Body</h1>
			<button onClick={() => props.goToSection('header')}>Go To Header</button>
		</div>
	);
});

export default Body;
