import { useRef, useState, useEffect } from 'react';

import Header from './components/Header.comp';
import Body from './components/Body.comp';
import Footer from './components/Footer.comp';
import Navbar from './components/Navbar.comp';

// find the index whose value is closest to the current scroll position
const closestIndex = (num, arr) => {
	let curr = arr[0],
		diff = Math.abs(num - curr);
	let index = 0;
	for (let val = 0; val < arr.length; val++) {
		let newdiff = Math.abs(num - arr[val]);
		if (newdiff < diff) {
			diff = newdiff;
			curr = arr[val];
			index = val;
		}
	}
	return index;
};

const App = () => {
	const refs = {
		header: useRef(null),
		body: useRef(null),
		footer: useRef(null),
	};

	const [mySection, setMySection] = useState(0);

	const handleScroll = () => {
		const offsetHeights = [];

		Object.values(refs).forEach((val) => {
			offsetHeights.push(val.current.offsetTop);
		});

		const position = window.pageYOffset;
		const activeSectionIndex = closestIndex(position, offsetHeights);
		setMySection(activeSectionIndex);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	const scrollToSection = (sectionName) => {
		window.scrollTo({
			top: refs[sectionName].current.offsetTop,
			behavior: 'smooth',
		});
	};

	return (
		<div className="container">
			<Navbar mySection={mySection} scrollToSection={scrollToSection} />
			<section>
				<Header ref={refs.header} goToSection={scrollToSection} />
				<Body ref={refs.body} goToSection={scrollToSection} />
				<Footer ref={refs.footer} goToSection={scrollToSection} />
			</section>
		</div>
	);
};

export default App;
