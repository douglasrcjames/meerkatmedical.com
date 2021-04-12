import { Field, Formik } from 'formik';
import React, { Component } from 'react'
import { Col, Grid, Row } from 'react-flexbox-grid';
import Select from "react-dropdown-select";

import { quoteFormSchema } from '../../utils/formSchemas'
import { stateOptions } from '../../utils/constants'
import { firestore } from "../../Fire.js";
import { formatPhoneNumber } from '../../utils/misc';

export default class Quote extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            zip: this.props.match.params.zip,
            submittedForm: false
        }
    }

    submitQuote = (values) => {
        firestore.collection('quotes').add({
            firstName: values.firstName,
            lastName: values.lastName,
            phone: formatPhoneNumber(values.phone),
            email: values.email,
           /* address: {
                line1: values.line1,
                line2: values.line2,
                zip: values.zip,
                city: values.city,
                state: values.state,
            },
            gender: values.gender,
            smoker: values.smoker,
            dob: {
                month: values.dob.month.toString().padStart(2, '0'),
                day: values.dob.day.toString().padStart(2, '0'),
                year: values.dob.year.toString()
            },*/  
        }).then(() => {
            this.setState({
                submittedForm: true
            })
            console.log("Submitted successfully!")
        }).catch(error => {
            console.error("Error submitting quote: " + error)
        });
    }
    
    render() {
        return (
            <div className="wrapper">
                <h1>Supplemental Medicare Insurance Quote</h1>
                <div className="horiz-rule-blue" />

                { !this.state.submittedForm && (
                    <div className="md-margin-t">
                        <Formik
                            initialValues={{
                                firstName: "",
                                lastName: "",
                                phone: "",
                                email: "",
                                line1: "",
                                line2: "",
                                city: "",
                                state: "",
                                zip: this.state.zip,
                                gender: "",
                                smoker: "",
                                dob: {
                                    day: "",
                                    month: "",
                                    year: ""
                                }
                            }}
                            onSubmit={(values, actions) => {
                                this.submitQuote(values);
                            }}
                            validationSchema={quoteFormSchema}
                        >
                            {props => (
                                <form onSubmit={props.handleSubmit}>
                                    <Grid fluid>
                                        <Row>
                                            <Col sm={12} md={6} className="sm-margin-b">
                                                <label>First name:</label>
                                                <br/>
                                                <Field
                                                    type="text"
                                                    required
                                                    onChange={props.handleChange}
                                                    placeholder="John"
                                                    name="firstName"
                                                    value={props.values.firstName}
                                                />
                                                {props.errors.firstName && props.touched.firstName ? (
                                                    <span className="red">{props.errors.firstName}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                            <Col sm={12} md={6} className="sm-margin-b">
                                                <label>Last name:</label>
                                                <br/>
                                                <Field
                                                    type="text"
                                                    required
                                                    onChange={props.handleChange}
                                                    placeholder="Doe"
                                                    name="lastName"
                                                    value={props.values.lastName}
                                                />
                                                {props.errors.lastName && props.touched.lastName ? (
                                                    <span className="red">{props.errors.lastName}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={12} md={6} className="sm-margin-b">
                                                <label>Phone:</label>
                                                <br/>
                                                <Field
                                                    type="text"
                                                    required
                                                    onChange={props.handleChange}
                                                    placeholder="(123) 456-7890"
                                                    name="phone"
                                                    value={formatPhoneNumber(props.values.phone)}
                                                />
                                                {props.errors.phone && props.touched.phone ? (
                                                    <span className="red">{props.errors.phone}</span>
                                                ) : (
                                                    ""
                                                )}
                                                
                                            </Col>
                                            <Col sm={12} md={6} className="sm-margin-b">
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
                                            </Col>
                                        </Row> 
                                     
                                        <Row className="md-margin-b">
                                            <Col xs={12}>
                                                <button type="submit" className="md blue-to-inv">
                                                        Submit
                                                </button>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </form>
                            )}
                        </Formik>
                    </div>
                )}
                { this.state.submittedForm && (
                    <div className="sm-margin-t">
                        <h2 className="sm-margin-t">Thanks!</h2>
                        <p className="no-margin">We have received your quote and you will be contacted soon by a team member.</p>
                    </div>
                )}
                
            </div>
        )
    }
}
