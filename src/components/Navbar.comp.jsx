import React from 'react'

const NavBar = ({mySection, scrollToSection}) => {
  const navItems = ['header', 'body', 'footer'];

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

export default NavBar;