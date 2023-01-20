import * as yup from 'yup';

const lettersRegExp = /^[a-zA-Z]+$/;

const checkIfOnlyLetters = (value) => {
    return lettersRegExp.test(value);
};

export const signUpSchema = yup.object().shape({
    firstName: yup.string().required('First name is required').test('is-letters-only', 'First name can only contain letters', checkIfOnlyLetters),
    lastName: yup.string().required('Last name is required').test('is-letters-only', 'Last name can only contain letters', checkIfOnlyLetters),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 chars').matches(/[A-Z]/, 'Must include an uppercase character')  
        .matches(/[a-z]/, 'Must include a lowercase character').matches(/\d/, 'Must include a number')
        .matches(/[!@#\$%\^&\*\(\)\-_\=\+\\\|\[\]\{\};':\"\/<>,\.\?`~]+/, 'Must include a special character')
        .required('Password is required'),
    repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required')
});

export const logInSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 chars').matches(/[A-Z]/, 'Must include an uppercase character')
        .matches(/[a-z]/, 'Must include a lowercase character').matches(/\d/, 'Must include a number')
        .matches(/[!@#\$%\^&\*\(\)\-_\=\+\\\|\[\]\{\};':\"\/<>,\.\?`~]+/, 'Must include a special character')
        .required('Password is required'),
});

export const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
});

export const resetPasswordSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 chars').required('Password is required'),
    repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required')
});

export const addNewCarServiceSchema = yup.object().shape({
    treatmentNumber: yup.number().integer('Must be an integer number').positive('Must be a positive number').required('Treatment number is required').typeError("Must be a number"),
    treatmentInformation: yup.string().required('Treatment information is required'),
    workerEmail: yup.string().email('Invalid email').required('Worker email is required'),
    carNumber: yup.number().integer('Must be an integer number').positive('Must be a positive number').required('Car number is required').typeError("Must be a number"),
});