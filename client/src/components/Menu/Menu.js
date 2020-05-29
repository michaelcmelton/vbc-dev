import React, { useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import './Menu.css';

const imgPath = process.env.PUBLIC_URL + '/img/';

const Menu = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

        return (
            <div>
              <Navbar light expand="md">
                <NavbarBrand href="#"><img src={`${imgPath}VBC.png`} className="logo" alt="logo"/></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="fw" navbar>
                    <NavItem className="mx-5">
                      <NavLink href="#">Directory</NavLink>
                    </NavItem>
                    <NavItem className="mx-5">
                      <NavLink href="#">FAQ</NavLink>
                    </NavItem>
                    <NavItem className="ml-auto">
                      <NavLink className="btn btn-outline-dark" href="#">Login / Signup</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
        );
}

export default Menu;