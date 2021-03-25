"use strict";
import functions = require('firebase-functions');
import admin = require("firebase-admin");
import nodemailer = require('nodemailer');
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
admin.initializeApp(functions.config().firebase);
const axios = require('axios')

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

export const onQuoteUpdated = functions.firestore.document('quotes/{quoteId}')
    .onUpdate(async (change: functions.Change<DocumentSnapshot>, context: functions.EventContext) => {
        const previousValue = change.before.data();
        const newValue = change.after.data();
        
        if (previousValue === null || !previousValue) {
            console.log("No data for quote before change");
            return;
        }

        if (newValue === null || !newValue) {
            console.log("No data for quote after change");
            return;
        }

        try {
            console.log("newValue.firstName: ")
            console.log(newValue.firstName)
            console.log("newValue.lastName: ")
            console.log(newValue.lastName)
            console.log("functions.config().agency_bloc.sid: ")
            console.log(functions.config().agency_bloc.sid)
            console.log("functions.config().agency_bloc.key: ")
            console.log(functions.config().agency_bloc.key)
            const allPromises: Array<Promise<any>> = [];
            let url = 'https://app.agencybloc.com/api/v1/individuals/create';
            let data = {
                'sid': functions.config().agency_bloc.sid,
                'key': functions.config().agency_bloc.key,
                'firstName': newValue.firstName,
                'lastName': newValue.lastName
            }
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache'
                }
              }
            const createResponse = axios.post(url, data, config)

            await createResponse.then(() => {
                console.error("Success!: ")
            }).catch((error: any) => {
                console.error("Error: ")
                console.error(error)
            })

            allPromises.push(createResponse);
            // // Template it
            // const htmlEmail = 
            // `
            // <div>
            //     <h2>New <u>Meerkat Medical</u> Website Contact</h2>
            //     <p>
            //         A new contact message has arrived! You can directly reply to this email to 
            //         contact the visitor back on their question or inquiry if need be. Their information and message is detailed below.
            //     </p>
            //     <h3>Details:</h3>
            //     <p><u>Name</u>: ${newValue.name}</p>
            //     <p><u>Email</u>: ${newValue.email}</p>
            //     <h3>Message:</h3>
            //     <p>${newValue.message}</p>
            // </div>
            // `
            // // Config it
            // const transporter = nodemailer.createTransport({
            //     host: "smtp.gmail.com",
            //     port: 465,
            //     secure: true,
            //     auth: {
            //         user: functions.config().email.user,
            //         pass: functions.config().email.password
            //     }
            // })
            // console.log("transporter = " + transporter)

            // // Pack it
            // const mailOptions = {
            //     from: `drcj.dev@gmail.com`,
            //     to: 'strongfamilymedia@gmail.com, drcj.dev@gmail.com',
            //     replyTo: `${newValue.email}`,
            //     subject: `New Meerkat Medical quote from ${newValue.name}`,
            //     text: newValue.message,
            //     html: htmlEmail
            // }

            // // Send it
            // allPromises.push(transporter.sendMail(mailOptions));

            return Promise.all(allPromises);
        } catch (error) {
            console.error(error)
            return;
        }
});
