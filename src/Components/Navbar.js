import React,{useState} from 'react';
import './Exit.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';


export default function NavElement(){
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" className="logo text-primary" style={{fontSize:"2.5rem"}}>zoom</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              
             
             
            </Nav>
            <Nav>
            <NavItem >
                <NavLink className="text-dark font3" href="/join">JOIN A MEETING</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-dark font3" href="/create-session">HOST A MEETING</NavLink>
              </NavItem>      
            <NavItem>
                <NavLink className="text-dark font3" href="/signin">SIGN IN</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-dark font3" href="/signup">SIGNUP IT'S FREE</NavLink>
              </NavItem>
            </Nav>
            
          </Collapse>
        </Navbar>
      </div>
    );
}