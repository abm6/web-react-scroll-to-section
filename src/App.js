import { useRef, useState, useEffect } from 'react';

import Header from './components/Header.comp';
import Body from './components/body.comp';
import Footer from './components/footer.comp';

function App() {
	const refs = {
		header: useRef(null),
		body: useRef(null),
		footer: useRef(null),
	};

	const NavBar = () => {
		const [mySection, setMySection] = useState('header');

		const handleScroll = () => {
			// refactors

			const offsetHeights = [];
			Object.values(refs).forEach((val) => {
				offsetHeights.push(val.current.offsetTop);
			});

			console.log(offsetHeights);

			const headerOffsetHeight = refs.header.current.offsetHeight;
			const bodyOffsetHeight = refs.body.current.offsetHeight;
			const footerOffsetHeight = refs.footer.current.offsetHeight;

			const maxScrollableHeight =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight;

			const totalOffsetHeight = offsetHeights.reduce((a, b) => a + b, 0);

			const position = window.pageYOffset;

			const scrollPercent = Math.round(position) / maxScrollableHeight;

			const calculatedOffsetHeight = scrollPercent * totalOffsetHeight;

			const headTopPosition = 0;
			const bodyTopPosition = headTopPosition + headerOffsetHeight;
			const footerTopPosition = bodyTopPosition + bodyOffsetHeight;

			console.log('calculatedOffsetHeight', calculatedOffsetHeight);
			console.log(
				Math.round(position),
				maxScrollableHeight,
				scrollPercent,
				totalOffsetHeight
			);
			if (calculatedOffsetHeight < bodyTopPosition) {
				setMySection('header');
			}
			if (
				calculatedOffsetHeight > bodyTopPosition &&
				calculatedOffsetHeight < bodyTopPosition + bodyOffsetHeight
			) {
				setMySection('body');
			}
			if (
				calculatedOffsetHeight > bodyTopPosition + bodyOffsetHeight &&
				calculatedOffsetHeight <= totalOffsetHeight
			) {
				setMySection('footer');
			}
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
					<li
						className={mySection === 'header' ? 'active' : ''}
						onClick={() => scrollToSection(refs.header)}>
						Header
					</li>
					<li
						className={mySection === 'body' ? 'active' : ''}
						onClick={() => scrollToSection(refs.body)}>
						Body
					</li>
					<li
						className={mySection === 'footer' ? 'active' : ''}
						onClick={() => scrollToSection(refs.footer)}>
						Footer
					</li>
				</ul>
			</nav>
			// <div className="section-status">
			// 	<h3>Focused Section: </h3>
			// 	<p>{mySection}</p>
			// </div>
		);
	};

	const getSection = () => {
		console.log(refs.header);
	};

	const handleScrollEvent = (setMySection) => {
		const scrollTop = window.pageYOffset;
		const headerHeight = refs.header.current.offsetHeight;
		const bodyHeight = refs.body.current.offsetHeight;
		const footerHeight = refs.footer.current.offsetHeight;
		const totalHeight = headerHeight + bodyHeight + footerHeight;

		if (scrollTop < headerHeight) {
			setMySection('header');
		} else if (
			scrollTop >= headerHeight &&
			scrollTop < totalHeight - footerHeight
		) {
			setMySection('body');
		} else {
			setMySection('footer');
		}
	};

	const scrollToSection = (elementRef) => {
		window.scrollTo({
			top: elementRef.current.offsetTop,
			behavior: 'smooth',
		});
	};

	const handleGoToSection = (sectionName) => scrollToSection(refs[sectionName]);

	return (
		<div className="container">
			<NavBar />

			<section>
				<Header ref={refs.header} goToSection={handleGoToSection} />
				<Body ref={refs.body} goToSection={handleGoToSection} />
				<Footer ref={refs.footer} goToSection={handleGoToSection} />
			</section>
		</div>
	);
}

export default App;
