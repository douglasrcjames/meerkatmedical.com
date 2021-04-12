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
                                        {/*
                                        <Row>
                                            <Col>
                                                <h3>Address</h3>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={12}>
                                                <label>Street:</label>
                                                <br/>
                                                <Field
                                                    type="text"
                                                    required
                                                    onChange={props.handleChange}
                                                    placeholder="Street address or P.O. Box"
                                                    name="line1"
                                                    value={props.values.line1 || ''}
                                                />
                                                {props.errors.line1 && props.touched.line1 ? (
                                                    <span className="red">{props.errors.line1}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={12} className="sm-margin-b">
                                                <Field
                                                    type="text"
                                                    onChange={props.handleChange}
                                                    placeholder="Apt, suite, unit, building, floor, etc"
                                                    name="line2"
                                                    value={props.values.line2 || ''}
                                                />
                                                {props.errors.line2 && props.touched.line2 ? (
                                                    <span className="red">{props.errors.line2}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={12} md={6} lg={4} className="sm-margin-b">
                                                <label>City:</label>
                                                <Field
                                                    type="text"
                                                    required
                                                    onChange={props.handleChange}
                                                    placeholder="Not provided"
                                                    name="city"
                                                    value={props.values.city || ''}
                                                />
                                                {props.errors.city && props.touched.city ? (
                                                    <span className="red">{props.errors.city}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                            <Col sm={12} md={6} lg={4} className="sm-margin-b">
                                                <label>State:</label>
                                                {/* <Field
                                                    type="text"
                                                    required
                                                    onChange={props.handleChange}
                                                    placeholder="Not provided"
                                                    name="state"
                                                    value={props.values.state || ''}
                                                /> 
                                                <Select
                                                    options={stateOptions}
                                                    placeholder="Not provided"
                                                    labelField={"name"}
                                                    valueField={"name"}
                                                    name="state"
                                                    key={"id"}
                                                    color={"#002868"}
                                                    className="select"
                                                    // values={props.values.state}
                                                    onChange={(option) => props.setFieldValue("state", option[0].abbreviation)}
                                                />
                                                {props.errors.state && props.touched.state ? (
                                                    <span className="red">{props.errors.state}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                            <Col sm={12} md={6} lg={4} className="sm-margin-b">
                                                <label>ZIP:</label>
                                                <Field
                                                    type="text"
                                                    required
                                                    onChange={props.handleChange}
                                                    placeholder="Not provided"
                                                    name="zip"
                                                    value={props.values.zip || ''}
                                                />
                                                {props.errors.zip && props.touched.zip ? (
                                                    <span className="red">{props.errors.zip}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} sm={6} style={{marginBottom: "30px"}}>
                                                <label id="gender-radio-group">What is your gender?</label>
                                                <div role="group" aria-labelledby="gender-radio-group">
                                                    <label className="check-container">
                                                        <Field type="radio" name="gender" value="M" />
                                                        <span className="checkmark"></span>
                                                        Male
                                                    </label>
                                                    <label className="check-container">
                                                        <Field type="radio" name="gender" value="F" />
                                                        <span className="checkmark"></span>
                                                        Female
                                                    </label>
                                                </div>
                                                {props.errors.gender && props.touched.gender ? (
                                                    <span className="red">{props.errors.gender}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                            <Col xs={12} sm={6} style={{marginBottom: "30px"}}>
                                                <label id="smoker-radio-group">Are you a smoker?</label>
                                                <div role="group" aria-labelledby="smoker-radio-group">
                                                    <label className="check-container">
                                                        <Field type="radio" name="smoker" value="Yes" />
                                                        <span className="checkmark"></span>
                                                        Yes
                                                    </label>
                                                    <label className="check-container">
                                                        <Field type="radio" name="smoker" value="No" />
                                                        <span className="checkmark"></span>
                                                        No
                                                    </label>
                                                </div>
                                                {props.errors.smoker && props.touched.smoker ? (
                                                    <span className="red">{props.errors.smoker}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                        </Row>
                                        <Row style={{marginBottom: "30px"}}>
                                            <Col xs={12} sm={3}>
                                                <label htmlFor="month">Birth Month: </label>
                                                <Field
                                                    name="dob.month"
                                                    onChange={props.handleChange}
                                                    value={props.values.dob.month}
                                                    type="number"
                                                    placeholder={props.values.dob.month || `12`}
                                                />
                                                {(props.errors.dob &&
                                                    props.errors.dob.month &&
                                                    props.touched.dob &&
                                                    props.touched.dob.month) ? 
                                                (
                                                    <span className="red">{props.errors.dob.month}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                            <Col xs={12} sm={3}>
                                                <label htmlFor="day">Birth Day: </label>
                                                <Field
                                                    name="dob.day"
                                                    onChange={props.handleChange}
                                                    value={props.values.dob.day}
                                                    type="number"
                                                    placeholder={props.values.dob.day || `31`}
                                                />
                                                {(props.errors.dob &&
                                                    props.errors.dob.day &&
                                                    props.touched.dob &&
                                                    props.touched.dob.day) ? 
                                                (
                                                    <span className="red">{props.errors.dob.day}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                            <Col xs={12} sm={3}>
                                                <label htmlFor="year">Birth Year: </label>
                                                <Field
                                                    name="dob.year"
                                                    onChange={props.handleChange}
                                                    value={props.values.dob.year}
                                                    type="number"
                                                    placeholder={props.values.dob.year || `1950`}
                                                />
                                                {(props.errors.dob &&
                                                    props.errors.dob.year &&
                                                    props.touched.dob &&
                                                    props.touched.dob.year) ? 
                                                (
                                                    <span className="red">{props.errors.dob.year}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                        </Row> 
                                        */}
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
