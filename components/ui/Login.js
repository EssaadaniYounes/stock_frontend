import React, { useState } from 'react';
import { fetch } from '../../lib/fetch';
import { classes } from '../../data/classes';
import { useAuthStore } from '../../store/authStore';
function Login() {

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const { setUser, user } = useAuthStore(state => state);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    };

    const handleClick = async () => {
        const userData = await fetch('login', {
            method: 'POST',
            data: data
        });
        setUser(userData);
    }

    return (
        <div className={classes.centreItems}>
            <div className={classes.card}>
                <div>
                    <div className={classes.cardHeader}>
                        Login
                    </div>
                    <div className={classes.cardBody}>
                        <div className={classes.inputContainer}>
                            <input type="text"
                                name='email'
                                className={classes.input}
                                value={data.email}
                                onChange={(e) => handleChange(e)}
                                placeholder=" email " />
                        </div>
                        <div className={classes.inputContainer}>
                            <input type="text"
                                name='password'
                                className={classes.input}
                                value={data.password}
                                onChange={(e) => handleChange(e)}
                                placeholder=" password " />
                        </div>
                        <button onClick={() => handleClick()} type="button" className={classes.blueButton}>
                            Login
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login