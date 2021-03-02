import React, { Component } from 'react'
import { NavLink, Link, withRouter } from "react-router-dom";
import { HashLink as HashNavLink } from 'react-router-hash-link';
import logo from "../../assets/images/logos/vertical-logo.png";
import "../../assets/css/Header.scss";

class Header extends Component {
    render() {
        return (
            <header>
                <nav className="nav-container">
                    <Link to="/">
                        <img
                            className="nav-logo"
                            alt="logo"
                            src={logo}
                        />
                    </Link>
                    <div className="nav-links">
                        <button className="md red-to-inv">
                            Get a free quote today! <i className="fas fa-file-invoice" />
                        </button>
                    </div>
                    
                </nav>
            </header>
        )
    }
}

export default withRouter(Header);