import { Field, Formik } from 'formik';
import React, { Component } from 'react'
import { Col, Grid, Row } from 'react-flexbox-grid';
import Select from "react-dropdown-select";

import { firstStepQuoteFormSchema, secondStepQuoteFormSchema } from '../../utils/formSchemas'
import { stateOptions } from '../../utils/constants'
import { firestore } from "../../Fire.js";

export default class Quote extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            zip: this.props.match.params.zip,
            quoteId: '',
            showStepTwo: false,
            showFinalStep: false
        }
    }

    captureFirstStep = (values) => {
        firestore.collection('quotes').add({
            onMedicare: values.onMedicare,
            partB2020Start: values.partB2020Start,
            sex: values.sex,
            smoker: values.smoker,
            dob: values.dob,
            timestamp: Date.now(),
        }).then(doc => {
            this.setState({
                quoteId: doc.id,
                showStepTwo: true
            })
        }).catch(error => {
            console.error("Error submitting first step: " + error)
        });
    } 

    captureSecondStep = (values) => {
        firestore.collection('quotes').doc(this.state.quoteId).set({
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            email: values.email,
            line1: values.line1,
            line2: values.line2,
            zip: values.zip,
            city: values.city,
            state: values.state,
            timestamp: Date.now(),
        }, {merge: true}).then(() => {
            this.setState({
                showStepTwo: false,
                showFinalStep: true,
                quoteId: ""
            })
        }).catch(error => {
            console.error("Error submitting second step: " + error)
        });
    }
    
    render() {
        return (
            <div className="wrapper">
                <h1>Supplemental Medicare Insurance Quote</h1>
                <div className="horiz-rule-blue" />
                { !this.state.showStepTwo && !this.state.showFinalStep && ( 
                    <div>
                        <h2>Step 1 of 2</h2>
                        <Formik
                            initialValues={{
                                onMedicare: "",
                                partB2020Start: "",
                                sex: "",
                                smoker: "",
                                dob: "",
                            }}
                            onSubmit={(values, actions) => {
                                this.captureFirstStep(values);
                                actions.resetForm()
                            }}
                            validationSchema={firstStepQuoteFormSchema}
                        >
                            {props => (
                                <form onSubmit={props.handleSubmit}>
                                    <Grid fluid>
                                        <Row>
                                            <Col sm={12} md={6} className="sm-margin-b">
                                                <label id="onMedicare-radio-group">On Medicare?</label>
                                                <div role="group" aria-labelledby="onMedicare-radio-group">
                                                    <label className="check-container">
                                                        <Field type="radio" name="onMedicare" value="yes" />
                                                        <span className="checkmark"></span>
                                                        Yes
                                                    </label>
                                                    <label className="check-container">
                                                        <Field type="radio" name="onMedicare" value="no" />
                                                        <span className="checkmark"></span>
                                                        No
                                                    </label>
                                                </div>
                                            </Col>
                                        </Row>
                                        {(props.values.onMedicare) && (
                                            <Row>
                                                <Col sm={12} md={6} className="sm-margin-b">
                                                    <label id="partB2020Start-radio-group">Is your Medicare part B date after January 1st, 2020?</label>
                                                    <div role="group" aria-labelledby="partB2020Start-radio-group">
                                                        <label className="check-container">
                                                            <Field type="radio" name="partB2020Start" value="yes" />
                                                            <span className="checkmark"></span>
                                                            Yes
                                                        </label>
                                                        <label className="check-container">
                                                            <Field type="radio" name="partB2020Start" value="no" />
                                                            <span className="checkmark"></span>
                                                            No
                                                        </label>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )}
                                    {(props.values.onMedicare && props.values.partB2020Start) && (
                                            <Row>
                                                <Col sm={12} md={6} className="sm-margin-b">
                                                    <label id="sex-radio-group">Sex?</label>
                                                    <div role="group" aria-labelledby="sex-radio-group">
                                                        <label className="check-container">
                                                            <Field type="radio" name="sex" value="male" />
                                                            <span className="checkmark"></span>
                                                            Male
                                                        </label>
                                                        <label className="check-container">
                                                            <Field type="radio" name="sex" value="female" />
                                                            <span className="checkmark"></span>
                                                            Female
                                                        </label>
                                                    </div>
                                                </Col>
                                            </Row>
                                    )}
                                    
                                    {(props.values.onMedicare && props.values.partB2020Start && props.values.sex) && ( 
                                        <Row>
                                            <Col sm={12} md={6} className="sm-margin-b">
                                                <label id="smoker-radio-group">Smoker?</label>
                                                <div role="group" aria-labelledby="smoker-radio-group">
                                                    <label className="check-container">
                                                        <Field type="radio" name="smoker" value="yes" />
                                                        <span className="checkmark"></span>
                                                        Yes
                                                    </label>
                                                    <label className="check-container">
                                                        <Field type="radio" name="smoker" value="no" />
                                                        <span className="checkmark"></span>
                                                        No
                                                    </label>
                                                </div>
                                            </Col>
                                        </Row>
                                    )}
                                    {(props.values.onMedicare && props.values.partB2020Start && props.values.sex) && ( 
                                        <Row>
                                            <Col xs={12} sm={6} md={3}>
                                                <label htmlFor="month">Birth Month: </label>
                                                <Field
                                                    name="dob.month"
                                                    onChange={props.handleChange}
                                                    value={props.values.dob.month}
                                                    type="number"
                                                    placeholder={props.values.dob.month || `12`}
                                                />
                                                {props.errors.dob &&
                                                    props.errors.dob.month &&
                                                    props.touched.dob &&
                                                    props.touched.dob.month ? (
                                                    <span className="red">{props.errors.dob.month}</span>
                                                    ) : (
                                                    ""
                                                    )}
                                            </Col>
                                            <Col xs={12} sm={6} md={3}>
                                                <label htmlFor="day">Birth Day: </label>
                                                <Field
                                                    name="dob.day"
                                                    onChange={props.handleChange}
                                                    value={props.values.dob.day}
                                                    type="number"
                                                    placeholder={props.values.dob.day || `31`}
                                                />
                                                {props.errors.dob &&
                                                    props.errors.dob.day &&
                                                    props.touched.dob &&
                                                    props.touched.dob.day ? (
                                                    <span className="red">{props.errors.dob.day}</span>
                                                    ) : (
                                                    ""
                                                    )}
                                            </Col>
                                            <Col xs={12} sm={6} md={3}>
                                                <label htmlFor="year">Birth Year: </label>
                                                <Field
                                                    name="dob.year"
                                                    onChange={props.handleChange}
                                                    value={props.values.dob.year}
                                                    type="number"
                                                    placeholder={props.values.dob.year || `1950`}
                                                />
                                                {props.errors.dob &&
                                                    props.errors.dob.year &&
                                                    props.touched.dob &&
                                                    props.touched.dob.year ? (
                                                    <span className="red">{props.errors.dob.year}</span>
                                                    ) : (
                                                    ""
                                                    )}
                                            </Col>
                                        </Row>
                                    )}
                                    {(props.values.onMedicare && props.values.partB2020Start && props.values.sex && props.values.smoker) && (
                                        <Row className="md-margin-b">
                                            <Col xs={12}>
                                                <button 
                                                    type="submit"
                                                    disabled={!props.dirty && !props.isSubmitting}
                                                    className="md blue-to-inv" >
                                                        Next&nbsp;&nbsp;<i className="fas fa-arrow-right"/> 
                                                </button>
                                            </Col>
                                        </Row>
                                    )}
                                        
                                    </Grid>
                                </form>
                            )}
                        </Formik>
                    </div>
                )}

                { this.state.showStepTwo && (
                    <div>
                        <h2>Step 2 of 2</h2>
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
                                zip: this.state.zip
                            }}
                            onSubmit={(values, actions) => {
                                this.captureSecondStep(values);
                            }}
                            validationSchema={secondStepQuoteFormSchema}
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
                                                <br/>
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
                                                <br/>
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
                                                    value={props.values.phone}
                                                />
                                                <br/>
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
                                                <br/>
                                                {props.errors.email && props.touched.email ? (
                                                    <span className="red">{props.errors.email}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                        </Row>
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
                                                <br/>
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
                                                <br/>
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
                                                <br/>
                                                {props.errors.city && props.touched.city ? (
                                                    <span className="red">{props.errors.city}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                            <Col sm={12} md={6} lg={4} className="sm-margin-b">
                                                <label>State:</label>
                                                <Field
                                                    type="text"
                                                    required
                                                    onChange={props.handleChange}
                                                    placeholder="Not provided"
                                                    name="state"
                                                    value={props.values.state || ''}
                                                />
                                                {/* <Select
                                                    options={stateOptions}
                                    
                                                    onChange={(value) => console.log(value)}
                                                /> */}
                                                <br/>
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
                                                <br/>
                                                {props.errors.zip && props.touched.zip ? (
                                                    <span className="red">{props.errors.zip}</span>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                        </Row>
                                        <Row className="md-margin-b">
                                            <Col xs={12}>
                                                <button 
                                                    type="submit"
                                                    className="md blue-to-inv" 
                                                    disabled={!props.dirty && !props.isSubmitting}>
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
                { this.state.showFinalStep && (
                    <div>
                        <h2>Thanks!</h2>
                        <p>We have received your quote and you will be contacted soon by a team member.</p>
                    </div>
                )}
                
            </div>
        )
    }
}