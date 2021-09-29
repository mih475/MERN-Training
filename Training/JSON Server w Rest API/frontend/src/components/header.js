import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Employee Management Page</h1>
      <hr />
      <div className="links">
        <NavLink to="/" className="link" activeClassName="active" exact>
          Employee List
        </NavLink>
        <NavLink to="/add" className="link" activeClassName="active">
          Add Employee
        </NavLink>
      </div>
    </header>
  );
};

export default Header;