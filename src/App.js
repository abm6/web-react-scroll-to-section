import { useRef } from 'react';

import Header from './components/Header.comp';
import Body from './components/body.comp';
import Footer from './components/footer.comp';

function App() {
	const refs = {
		header: useRef(null),
		body: useRef(null),
		footer: useRef(null),
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
			<nav>
				<ul>
					<li onClick={() => scrollToSection(refs.header)}>Header</li>
					<li onClick={() => scrollToSection(refs.body)}>Body</li>
					<li onClick={() => scrollToSection(refs.footer)}>Footer</li>
				</ul>
			</nav>

			<section>
				<Header ref={refs.header} goToSection={handleGoToSection} />
				<Body ref={refs.body} goToSection={handleGoToSection} />
				<Footer ref={refs.footer} goToSection={handleGoToSection} />
			</section>
		</div>
	);
}

export default App;
