import React from 'react';

const Header = React.forwardRef((props, ref) => {
	return (
		<div ref={ref} className="header">
			<h1>Header</h1>
			<button onClick={() => props.goToSection('footer')}>Go To Footer</button>
		</div>
	);
});

export default Header;
