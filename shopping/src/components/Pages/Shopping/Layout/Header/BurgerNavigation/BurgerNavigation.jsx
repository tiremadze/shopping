import React from "react";
import {  NavLink } from "react-router-dom";
import "./burger-navigation.scss";


const BurgerNavigation = () => {
  return (
    <nav className="nav">
      <ul className="menu">
        <li>
        <NavLink exact to="/home" activeClassName="selected">HOME</NavLink>
        </li>
        <li>
        <NavLink exact to="/about" activeClassName="selected">ABOUT</NavLink>
        </li>
        <li>
        <NavLink exact to="/contact" activeClassName="selected"> CONTACT</NavLink>
        </li>
     
      </ul>
    </nav>
  )
}

export default BurgerNavigation;
