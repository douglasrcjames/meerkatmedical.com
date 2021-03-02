import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ContactForm from '../misc/ContactForm';

export default class Home extends Component {
    render() {
        return (
            <>
            <div className="wrapper">
                <Helmet>
                    <title>Home | Meerkat Medical</title>
                </Helmet>
                <div className="center-text">
                    <h1>The fastest Medicare supplement quotes</h1>
                    <Link to="https://www.github.com/douglasrcjames/dougs-react-boiler" target="_blank" rel="noopener noreferrer">
                        <button className="lg red-to-inv">
                            Get a quote!
                        </button>
                    </Link>
                </div>
            </div>
            <div className="full-width bg-blue">
                <div className="wrapper white">
                    <h1 className="white no-margin">Why Medicare Supplements?</h1>
                    <p>
                        Medicare Supplements, or Medigap Policies, help cover what Medicare parts A and B do not. 
                        Alternative Medicare plans can have yearly out-of-pocket costs in excess of $5,000. 
                        With a Medicare supplement you can visit your doctor worry free, and have a clear understanding of your costs each year. 
                    </p>
                </div>
            </div>
            <div className="wrapper">
                <h1>Who We Are</h1>
                <p>
                    At Meerkat Medical, we connect you with expert agents to help you find the perfect plan for the perfect price. 
                    We are an independent company that doesn’t belong to any specific provider so you can get Medicare Supplement quotes for free from experienced, licensed agents!
                </p>
            </div>
            </>
        )
    }
}
