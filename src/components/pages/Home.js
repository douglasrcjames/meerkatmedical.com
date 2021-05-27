import React, { Component } from 'react';
import { Field, Formik } from 'formik';
import { emailListFormSchema } from '../../utils/formSchemas'
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import money_img from "../../assets/images/icons/money-1.png";
import money_bag_img from "../../assets/images/icons/money-bag.png";
import umbrella_img from "../../assets/images/icons/insurance.png";
export default class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             zip: '',
             error: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            zip: event.target.value,
            error: ''
        });
    }

    getStarted = () => {
        if(this.state.zip){
            if(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zip)){
                this.props.history.push(`/quote/${this.state.zip}`);
            } else {
                this.setState({ error: 'Please enter a valid US ZIP code.' })
            }
        } else {
            this.props.history.push(`/quote`);
        }
        
    }
    
    render() {
        return (
            <>
            <Helmet>
                <title>Home | Meerkat Medical</title>
            </Helmet>
            <div className="hero-container">
                <div className="hero-content">
                    <h1 className="no-margin">The Fastest way to Save on Medicare</h1>
                    <p className="sm-margin-b">Enter your Zip Code to get started</p>
                    <form onSubmit={this.getStarted}>
                        <input type="text" placeholder="ZIP Code" value={this.state.zip} onChange={this.handleChange} className="sm-width" />
                        &nbsp;&nbsp;
                        <button type="submit" className="md red-to-inv">
                            Get started &nbsp;&nbsp;<i className="fas fa-arrow-right"/> 
                        </button>
                        <br/>
                        {this.state.error && (<span className="red">{this.state.error}</span>)}
                    </form>
                    <br/>
                    <h3>Or Enter Your Email to Recieve your Free Medicare Booklet</h3>
                    <form onSubmit={this.emailList}>
                        <input type="text" placeholder="john_doe@gmail.com" value={this.state.email} onChange={this.handleChange} className="sm-width" />
                        <button type="submit" className="md red-to-inv">
                            Submit &nbsp;&nbsp;<i className="fas"/> 
                        </button>
                    </form>
                </div>
            </div>
            <div className="slant-block bg-blue edge--top--reverse edge--bottom">
                <div className="wrapper white">
                    <h1 className="white no-margin">What Options do I have with Medicare?</h1>
                    <p>
                        Medicare consists of two paths. Traditional Medicare and Medicare Advantage. 
                        With Traditional Medicare, MediGap or Supplemental Policies are the best way to stabilize costs.
                        For Advantage plan users, supplemental coverage is also available. 
                        By combining the best Medicare and Supplement plans, consumers can navigate retirement without financial concerns.
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
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="slant-block bg-blue edge--top--reverse edge--bottom">
                    <div className="wrapper white center-text">
                        <h1 className="white no-margin">Stay up to date with Meerkat Medical</h1>
                        <br></br>
                        <p className="sm-margin-b">Enter your email below, and don't let Medicare changes take you by surprise.</p>
                        <div className="md-margin-t">
                            <Formik
                                initialValues={{
                                    email: "",
                                }}
                                onSubmit={(values, actions) => {
                                    this.submitQuote(values);
                                }}
                                validationSchema={emailListFormSchema}
                            >
                                {props => (
                                    <form onSubmit={props.handleSubmit}>
                                        <Grid>    
                                            <div sm={12} md={6} className="sm-margin-b">
                                                <label>Email:</label>
                                                <br/>
                                                <Field
                                                    type="text"
                                                    required
                                                    onChange={props.handleChange}
                                                    placeholder="john_doe@gmail.com"
                                                    name="email"
                                                    value={props.values.email}
                                                />
                                                {props.errors.email && props.touched.email ? (
                                                    <span className="red">{props.errors.email}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <Row className="md-margin-b">
                                                <Col xs={12}>
                                                    <button type="submit" className="md red-to-inv">
                                                            Submit
                                                    </button>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>                                            
            </div>
            </>
        )
    }
}
