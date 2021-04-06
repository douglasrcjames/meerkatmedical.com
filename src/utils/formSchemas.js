import * as yup from "yup";

export const contactFormSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email.")
      .required("Email is required.")      
      .max(150,"Email must be at most 150 characters long.")
      .min(2,"Email must be at least 2 characters long."),
    name: yup
      .string()
      .required("Your name is required.")
      .max(150,"Name must be at most 150 characters long.")
      .min(2,"Name must be at least 2 characters long."),
    message: yup
      .string()
      .required("A message is required.")
      .max(30000,"Message must be at most 30000 characters long.")
      .min(10,"Message must be at least 10 characters long."),
})

export const getStartedFormSchema = yup.object().shape({
    zip: yup
    .string()
    .max(10, "ZIP should be less than 10 digits."),
})

export const quoteFormSchema = yup.object().shape({
    firstName: yup
        .string()
        .required("A first name is required.")
        .max(150,"Name must be at most 150 characters long.")
        .min(1,"Name must be at least 1 characters long."),
    lastName: yup
        .string()
        .required("A last name is required.")
        .max(150,"Name must be at most 150 characters long.")
        .min(1,"Name must be at least 1 characters long."),
    phone: yup
        .string()
        .required('A phone number is required.'),
    email: yup
        .string()
        .email("That is not a valid email address.")
        .required("Email is required."),
    line1: yup.string().required("Street address is required."),
    line2: yup.string(),
    city: yup.string().required("City is required."),
    state: yup.string().required("State is required."),
    zip: yup
        .string()
        .required("A ZIP code is required.")
        .max(10, "ZIP should be less than 10 digits."),
    gender: yup
        .string()
        .required("A gender input is required."),
    smoker: yup
        .string()
        .required("A smoker input is required."),
    dob: yup.object().shape({
        day: yup
            .number()
            .required("A birth month is required.")
            .transform( cv => isNaN(cv) ? undefined : cv) // for when the field is empty and not required
            .positive()
            .integer()
            .min(1, "Number too low.")
            .max(31, "Number too high."), // What about feb 28th?
        month: yup
            .number()
            .required("A birth day is required.")
            .transform( cv => isNaN(cv) ? undefined : cv)
            .positive()
            .integer()
            .min(1, "Number too low.")
            .max(12, "Number too high."), 
        year: yup
            .number()
            .required("A birth year is required.")
            .transform( cv => isNaN(cv) ? undefined : cv)
            .positive()
            .integer()
            .min(1900, "Number too low.")
            .max(2019, "Number too high."), //** make max the current year (dynamically)
        }),
})