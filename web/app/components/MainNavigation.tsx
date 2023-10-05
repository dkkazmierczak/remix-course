import { NavLink } from '@remix-run/react';

function MainNavigation() {
  return (
    <nav id='main-navigation'>
      <ul>
        <li className='nav-item'>
          {/* //it will set active class */}
          <NavLink to='/'>Home</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/notes'>My Notes</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
