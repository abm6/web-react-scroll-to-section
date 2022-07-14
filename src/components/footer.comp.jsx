import React from 'react';

const Footer = React.forwardRef((props, ref) => {
	return (
		<div ref={ref} className="footer">
			<h1>Footer</h1>
			<button onClick={() => props.goToSection('body')}>Go To Body</button>
		</div>
	);
});

export default Footer;
