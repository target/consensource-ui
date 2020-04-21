import React, { useState } from 'react';
import Landing from 'images/landing.svg';
import AuthService from 'services/auth';
import * as AgentService from 'services/agent';
import { useHistory } from 'react-router-dom';

export default function Layout() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const history = useHistory();

    // let history = useHistory();

    // TODO: Pretty sure we can use a hook feature for this
    const clear = () => {
        setUsername('');
        setPassword('');
        setName('');
    };

    /**
     * Create a user and an agent from the form info
     */
    const submit = async () => {
        setIsSubmitting(true);

        await AuthService.createUser(
            { username, password },
            async (signer: sawtooth.signing.Signer) => {
                await AgentService.createAgent(name, signer).catch(
                    (e: Error) => {
                        console.error(e);
                        setIsSubmitting(false);
                        setErrMsg('Failed to create an agent!');
                    },
                );
                clear();
                history.push('/');
            },
        ).catch((e: Error) => {
            console.error(e);
            setIsSubmitting(false);
            setErrMsg('Failed to create a user!');
        });
    };

    return (
        <div>
            <h1>Login</h1>
            {errMsg && <h2>{errMsg}</h2>}
            <form>
                <div>
                    <label>username</label>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="username"
                        type="text"
                        required
                    ></input>
                </div>
                <div>
                    <label>password</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="password"
                        type="text"
                        required
                    ></input>
                </div>
                <div>
                    <label>name</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="name"
                        type="text"
                        required
                    ></input>
                </div>

                <button onClick={submit} disabled={isSubmitting}>
                    Log in
                </button>
            </form>

            <img src={Landing} />
        </div>
    );
}
