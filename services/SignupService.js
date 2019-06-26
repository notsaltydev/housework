import axios from "axios";


export const SignupService = (username, email, password) => {
    return axios.post(
        'https://housework-management.herokuapp.com/api/user',
        {
            name: username,
            email: email,
            password: password
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch(err => err);
};
