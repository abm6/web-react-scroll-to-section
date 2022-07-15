import { useRef, useState, useEffect } from 'react';

import Header from './components/Header.comp';
import Body from './components/Body.comp';
import Footer from './components/Footer.comp';

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

function App() {
	const refs = {
		header: useRef(null),
		body: useRef(null),
		footer: useRef(null),
	};

	const NavBar = () => {
		const [mySection, setMySection] = useState(0);

		const navItems = ['header', 'body', 'footer'];

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
		}, []);

		return (
			<nav>
				<ul>
					{navItems.map((val, index) => {
						return (
							<li
								key={index}
								className={mySection === index ? 'active' : ''}
								onClick={() => scrollToSection(val)}>
								{val}
							</li>
						);
					})}
				</ul>
			</nav>
		);
	};

	const scrollToSection = (sectionName) => {
		window.scrollTo({
			top: refs[sectionName].current.offsetTop,
			behavior: 'smooth',
		});
	};


	return (
		<div className="container">
			<NavBar />
			<section>
				<Header ref={refs.header} goToSection={scrollToSection} />
				<Body ref={refs.body} goToSection={scrollToSection} />
				<Footer ref={refs.footer} goToSection={scrollToSection} />
			</section>
		</div>
	);
}

export default App;
