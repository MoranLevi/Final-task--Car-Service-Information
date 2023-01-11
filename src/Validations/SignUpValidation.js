import * as yup from 'yup';

const lettersRegExp = /^[a-zA-Z]+$/;

const checkIfOnlyLetters = (value) => {
    return lettersRegExp.test(value);
};

export const signUpSchema = yup.object().shape({
    firstName: yup.string().required('First name is required').test('is-letters-only', 'First name can only contain letters', checkIfOnlyLetters),
    lastName: yup.string().required('Last name is required').test('is-letters-only', 'Last name can only contain letters', checkIfOnlyLetters),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 chars').required('Password is required'),
    repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required')
});