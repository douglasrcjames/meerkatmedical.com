import React, { Component } from 'react'
// import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import ContactForm from '../misc/ContactForm';

export default class About extends Component {

    render() {
        return (
            <div className="wrapper">
                <Helmet>
                    <title>About | Meerkat Medical</title>
                </Helmet>
                <h1>Who We Are</h1>
                <p>
                    At Meerkat Medical, we connect you with expert agents to help you find the perfect plan for the perfect price. 
                    We are an independent company that doesn’t belong to any specific provider so you can get Medicare Supplement quotes for free from experienced, licensed agents!
                </p>

                <h1><a id="Contact" className="anchor" href="/#">Contact</a>Contact</h1>
                <ContactForm />
            </div>
        )
    }
}
