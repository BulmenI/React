import { NavLink } from 'react-router-dom';

function Header(){

    return (
        <>
      <header className="app-header">
      <nav className="header-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Главная
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Контроль каллорий 
        </NavLink>
      </nav>
    </header>
        </>
    );
}

export default Header;