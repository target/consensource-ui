import React, { useState } from 'react';
import Landing from 'images/landing.svg';
import AuthService from 'services/auth';
import { useHistory } from 'react-router-dom';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const history = useHistory();

    /**
     * Create a user and an agent from the form info
     */
    const submit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await AuthService.createUserWithAgent(username, password, name);
            history.push('/dashboard');
        } catch (e) {
            console.error(e);
            setErrMsg('Failed to create a user!');
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            {errMsg && <h2>{errMsg}</h2>}
            <form>
                <div>
                    <label>username</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                        type="text"
                        required
                    ></input>
                </div>
                <div>
                    <label>password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        type="text"
                        required
                    ></input>
                </div>
                <div>
                    <label>name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="name"
                        type="text"
                        required
                    ></input>
                </div>

                <button onClick={submit}>Log in</button>
            </form>

            <img src={Landing} alt="background" />
        </div>
    );
}
