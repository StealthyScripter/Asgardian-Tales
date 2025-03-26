import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

 const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to determine if a link is active
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
  };

  //toggle menu open/closed
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  //Close menu when a link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>Star Wars</h1>
        </Link>
        
        {/* Hamburger menu icon for mobile */}
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className={`hamburger-icon ${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        {/* Navigation links */}
        <nav className={menuOpen ? 'open' : ''}>
          <ul className="nav-links">
            <li>
              <Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/people" className={isActive('/people') ? 'active' : ''} onClick={closeMenu}>
                People
              </Link>
            </li>
            <li>
              <Link to="/films" className={isActive('/films') ? 'active' : ''} onClick={closeMenu}>
                Films
              </Link>
            </li>
            <li>
              <Link to="/planets" className={isActive('/planets') ? 'active' : ''} onClick={closeMenu}>
                Planets
              </Link>
            </li>
            <li>
              <Link to="/species" className={isActive('/species') ? 'active' : ''} onClick={closeMenu}>
                Species
              </Link>
            </li>
            <li>
              <Link to="/starships" className={isActive('/starships') ? 'active' : ''} onClick={closeMenu}>
                Starships
              </Link>
            </li>
            <li>
              <Link to="/vehicles" className={isActive('/vehicles') ? 'active' : ''} onClick={closeMenu}>
                Vehicles
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header