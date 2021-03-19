import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
// import { HashLink as HashNavLink } from 'react-router-hash-link';
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
                        <Link to="/quote">
                            <button className="md inv-to-red">
                                Get a quote
                            </button>
                        </Link>
                    </div>
                    
                </nav>
            </header>
        )
    }
}

export default withRouter(Header);