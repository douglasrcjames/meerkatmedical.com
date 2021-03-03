import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import money_img from "../../assets/images/icons/money-1.png";
import money_bag_img from "../../assets/images/icons/money-bag.png";
import umbrella_img from "../../assets/images/icons/insurance.png";
export default class Home extends Component {
    render() {
        return (
            <>
            <Helmet>
                <title>Home | Meerkat Medical</title>
            </Helmet>
            <div className="hero-container">
                <div className="hero-content">
                    <h1 className="no-margin">The fastest Medicare Supplement quotes</h1>
                    <p className="sm-margin-b">Citizens across America are learning more about their Medicare options with us. Get started today and secure your plan!</p>
                    <div>
                    <Link to="/quote">
                        <button className="lg red-to-inv">
                            Get a quote today
                        </button>
                    </Link>
                    </div>
                    
                </div>
            </div>
            <div className="slant-block bg-blue edge--top--reverse edge--bottom">
                <div className="wrapper white">
                    <h1 className="white no-margin">What are Medicare Supplements?</h1>
                    <p>
                        Medigap, also known as a Medicare Supplement, is a type of insurance that helps fill the "gaps" in Original Medicare and is sold by independent companies. 
                        Original Medicare pays for a good chunk, but not all, of the cost for covered health care services, supplies, etc. 
                        A Medicare Supplement Insurance (Medigap) policy can assist paying for some of the remaining health care costs, like copayments, coinsurance, and deductibles.
                    </p>
                    <Grid fluid className="md-margin-t-b">
                        <Row center="xs">
                            <Col xs={12} sm={6} md={4} style={{margin: "25px 0"}}>
                                <img src={money_img} alt="money" className="medium responsive md-margin-t-b" />
                                <h3>Copayments</h3>
                                <p className="sm-margin-t md-text md-width margin-auto">
                                    Payment made by a beneficiary (especially for health services) in addition to that made by an insurer.
                                </p>
                            </Col>
                            <Col xs={12} sm={6} md={4} style={{margin: "25px 0"}}>
                                <img src={umbrella_img} alt="umbrella" className="medium responsive md-margin-t-b" />
                                <h3>Coinsurance</h3>
                                <p className="sm-margin-t md-text md-width margin-auto">Type of insurance in which the insured pays a share of the payment made against a claim.</p>
                            </Col>
                            <Col xs={12} sm={6} md={4} style={{margin: "25px 0"}}>
                                <img src={money_bag_img} alt="dollar" className="medium responsive md-margin-t-b" />
                                <h3>Deductibles</h3>
                                <p className="sm-margin-t md-text md-width margin-auto">A specified amount of money that the insured must pay before an insurance company will pay a claim.</p>
                            </Col>
                        </Row>
                    </Grid>
                    <p>
                        Original Medicare is a fee-for-service health plan that has two parts: Part A (Hospital Insurance) and Part B (Medical Insurance). 
                        After you pay a deductible, Medicare pays its share of the Medicare-approved amount, and you pay your share (coinsurance and deductibles).
                        Medicare Supplements/Medigap Policies help cover what Medicare parts A and B do not. 
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
                <div className="center-text">
                    <Link to="/about">
                        <button className="lg red-to-inv">
                            Contact us
                        </button>
                    </Link>
                </div>
            </div>
            </>
        )
    }
}
