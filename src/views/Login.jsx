import React from 'react';
import {Navigate} from 'react-router-dom';
import axios from '../axios';
import {useAuth} from '../context/AuthContext';

export default function Login() {
    const {setUser, csrfToken} = useAuth();
    const [error, setError] = React.useState(null);

    // login user
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = e.target.elements;
        const body = {
            email: email.value,
            password: password.value,
        };
        await csrfToken();
        try {
            const resp = await axios.post('/login', body);
            if (resp.status === 200) {
                setUser(resp.data.user);
                return <Navigate to="/home"/>;
            }
        } catch (error) {
            if (error.response.status === 401) {
                console.log(error)
                setError(error.response.data.message);
            }
        }
    };

    return (
        <section>
            <div>
                <h1>Sign in to your account</h1>
                <form action="#" method="post" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Your email</label>
                        <input value={'70010@mail.com'} type="email" name="email" id="email" placeholder="name@company.com" required/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input value={'1111'} type="password" name="password" id="password" placeholder="••••••••" required/>
                    </div>
                    <button type="submit">Sign in</button>
                </form>
            </div>
        </section>
    );
}