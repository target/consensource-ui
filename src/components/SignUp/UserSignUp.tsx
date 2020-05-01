import React, { useContext } from 'react';
import { StoreContext } from 'stores';
import { useLocalStore, observer } from 'mobx-react-lite';

const UserSignUp = () => {
    const state = useLocalStore(() => ({
        username: '',
        password: '',
    }));

    const context = useContext(StoreContext);

    /**
     * Create a user and an agent from the form info
     */
    const submit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await context.userStore.createUser(state.username, state.password);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>User Signup</h1>
            <form>
                <div>
                    <label>username</label>
                    <input
                        value={state.username}
                        onChange={(e) => (state.username = e.target.value)}
                        placeholder="username"
                        type="text"
                        required
                    ></input>
                </div>
                <div>
                    <label>password</label>
                    <input
                        value={state.password}
                        onChange={(e) => (state.password = e.target.value)}
                        placeholder="password"
                        type="text"
                        required
                    ></input>
                </div>

                <button onClick={submit}>Create User</button>
            </form>
        </div>
    );
};

export default observer(UserSignUp);
