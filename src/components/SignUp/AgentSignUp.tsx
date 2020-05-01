import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { StoreContext } from 'stores';
import { useLocalStore, observer } from 'mobx-react-lite';

const AgentSignUp = () => {
    const state = useLocalStore(() => ({
        name: '',
    }));

    const context = useContext(StoreContext);
    const history = useHistory();

    /**
     * Create a user and an agent from the form info
     */
    const submit = async (event: React.FormEvent) => {
        event.preventDefault();

        // try {
        //     await context.userStore.createUser(state.username, state.password);
        // } catch (err) {
        //     console.error(err);
        // }
    };

    return (
        <div>
            <h1>Agent Signup</h1>
            <form>
                <div>
                    <label>username</label>
                    <input
                        value={state.name}
                        onChange={(e) => (state.name = e.target.value)}
                        placeholder="name"
                        type="text"
                        required
                    ></input>
                </div>

                <button onClick={submit}>Create Agent</button>
            </form>
        </div>
    );
};

export default observer(AgentSignUp);
