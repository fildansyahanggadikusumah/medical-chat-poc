import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    photoProfile: '',
    providerName: '',
    specialist: '',
    specialistId:'',
    workName: '',
    rate:'',
    

}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, phoneNumber, photoProfile, specialist, providerName, workName} = form;

        const URL = 'http://localhost:5000/auth';

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup-doctor' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, photoProfile, specialist, providerName,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('specialist', specialist);
            cookies.set('photoProfile', photoProfile);
            cookies.set('hashedPassword', hashedPassword);
            cookies.set('providerName', providerName);
            cookies.set('workName', workName);
        }

        window.location.reload();
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input 
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                         {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                            <label htmlFor="specialist">Doctor Specialist</label>
                            <select name="specialist" onChange={handleChange} required>
                                <option value="">Select a specialist</option>
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Oncologist">Oncologist</option>
                                <option value="Pediatrician">Pediatrician</option>
                                <option value="Psychiatrist">Psychiatrist</option>
                            </select>
                        </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                            <label htmlFor="providerName">Provider </label>
                            <select name="providerName" onChange={handleChange} required>
                                <option value="">Select a Name</option>
                                <option value="Pertamina">Pertamina</option>
                                <option value="Axa">Axa</option>
                                <option value="Grab">Grab</option>
                            </select>
                        </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="workName">work name</label>
                                <input 
                                    name="workName" 
                                    type="text"
                                    placeholder="work name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="photoProfile">Avatar URL</label>
                                <input 
                                    name="photoProfile" 
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "Already have an account?" 
                             : "Don't have an account?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? 'Sign In' : 'Sign Up'}
                             </span>
                        </p>
                    </div>
                </div> 
            </div>

        </div>
    )
}

export default Auth
