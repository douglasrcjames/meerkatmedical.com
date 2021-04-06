"use strict";
import functions = require('firebase-functions');
import admin = require("firebase-admin");
import nodemailer = require('nodemailer');
admin.initializeApp(functions.config().firebase);
const request = require('request');

export const onMessageCreated = functions.firestore.document('messages/{messageId}')
  .onCreate((snap: { data: () => any; }) => {
    const newValue = snap.data();
    try {
        // Template it
        const htmlEmail = 
        `
        <div>
            <h2>New <u>Meerkat Medical</u> Website Contact</h2>
            <p>
                A new contact message has arrived! You can directly reply to this email to 
                contact the visitor back on their question or inquiry if need be. Their information and message is detailed below.
            </p>
            <h3>Details:</h3>
            <p><u>Name</u>: ${newValue.name}</p>
            <p><u>Email</u>: ${newValue.email}</p>
            <h3>Message:</h3>
            <p>${newValue.message}</p>
        </div>
        `
        // Config it
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: functions.config().email.user,
                pass: functions.config().email.password
            }
        })

        // Pack it
        const mailOptions = {
            from: `drcj.dev@gmail.com`,
            to: 'strongfamilymedia@gmail.com, drcj.dev@gmail.com',
            replyTo: `${newValue.email}`,
            subject: `New Meerkat Medical contact from ${newValue.name}`,
            text: newValue.message,
            html: htmlEmail
        }

        // Send it
        return transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(error)
        return;
    }
  });

export const onQuoteCreated = functions.firestore.document('quotes/{quoteId}')
    .onCreate((snap: { data: () => any; }) => {
        const previousValue = snap.data();
        const newValue = snap.data();
        
        if (previousValue === null || !previousValue) {
            console.log("No data for quote before change");
            return;
        }

        if (newValue === null || !newValue) {
            console.log("No data for quote after change");
            return;
        }

        try {
            const allPromises: Array<Promise<any>> = [];

            // console.log("Posted: ")
            // console.log("newValue.firstName: " + newValue.firstName)
            // console.log("newValue.lastName: " + newValue.lastName)
            // console.log("newValue.email: " + newValue.email)
            // console.log("newValue.phone: " + newValue.phone)
            // console.log("newValue.dob: " + `${newValue.dob.month}/${newValue.dob.day}/${newValue.dob.year}`)
            // console.log("newValue.gender: " + newValue.gender)
            // console.log("newValue.smoker: " + newValue.smoker)
            // console.log("newValue.line1: " + newValue.address.line1)
            // console.log("newValue.line2: " + newValue.address.line2)
            // console.log("newValue.city: " + newValue.address.city)
            // console.log("newValue.state: " + newValue.address.state)
            // console.log("newValue.zip: " + newValue.address.zip)
            // console.log("newValue.onMedicare: " + newValue.onMedicare)
            // console.log("newValue.partB2020Start: " + newValue.partB2020Start)

            const createResponse = request.post('https://app.agencybloc.com/api/v1/individuals/create', {
                form: {
                    sid: functions.config().agency_bloc.sid,
                    key: functions.config().agency_bloc.key,
                    firstName: newValue.firstName,
                    lastName: newValue.lastName,
                    email: newValue.email,
                    cellPhone: newValue.phone,
                    birthDate: `${newValue.dob.month}/${newValue.dob.day}/${newValue.dob.year}`,
                    gender: newValue.gender,
                    smokerStatus: newValue.smoker,
                    leadSource: 'Meerkat Medical',
                    addrType: "Home",
                    street1: newValue.address.line1,
                    street2: newValue.address.line2,
                    city: newValue.address.city,
                    stateAbbrev: newValue.address.state,
                    zip: newValue.address.zip,
                }
            })

            allPromises.push(createResponse);

            // Template it
            const htmlEmail = 
            `
            <div>
                <h2>New <u>Meerkat Medical</u> Website quote</h2>
                <p>The full details are posted to AgencyBloc!</p>
                <h3>Details:</h3>
                <p><u>First name</u>: ${newValue.firstName}</p>
                <p><u>Last name</u>: ${newValue.lastName}</p>
                <p><u>Email</u>: ${newValue.email}</p>
                <p><u>Phone</u>: ${newValue.phone}</p>
            </div>
            `
            // Config it
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: functions.config().email.user,
                    pass: functions.config().email.password
                }
            })

            // Pack it
            const mailOptions = {
                from: `drcj.dev@gmail.com`,
                to: 'strongfamilymedia@gmail.com, drcj.dev@gmail.com',
                replyTo: `${newValue.email}`,
                subject: `New Meerkat Medical quote from ${newValue.firstName} ${newValue.lastName}`,
                text: `The full details are posted to AgencyBloc!`,
                html: htmlEmail
            }

            allPromises.push(transporter.sendMail(mailOptions));

            return Promise.all(allPromises);
        } catch (error) {
            console.error(error)
            return;
        }
});
