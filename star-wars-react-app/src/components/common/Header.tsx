import { Link, useLocation } from 'react-router-dom';

 const Header = () => {
  const location = useLocation();

  // Function to determine if a link is active
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>Star Wars</h1>
        </Link>
        
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/people" className={isActive('/people') ? 'active' : ''}>
                People
              </Link>
            </li>
            <li>
              <Link to="/films" className={isActive('/films') ? 'active' : ''}>
                Films
              </Link>
            </li>
            <li>
              <Link to="/planets" className={isActive('/planets') ? 'active' : ''}>
                Planets
              </Link>
            </li>
            <li>
              <Link to="/species" className={isActive('/species') ? 'active' : ''}>
                Species
              </Link>
            </li>
            <li>
              <Link to="/starships" className={isActive('/starships') ? 'active' : ''}>
                Starships
              </Link>
            </li>
            <li>
              <Link to="/vehicles" className={isActive('/vehicles') ? 'active' : ''}>
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