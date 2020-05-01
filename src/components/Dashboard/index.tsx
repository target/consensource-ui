import React, { useContext } from 'react';
import { StoreContext } from 'stores';

export default function Dashboard() {
    const context = useContext(StoreContext);

    return (
        <h1>{`Hello, ${
            context.userStore.user && context.userStore.user.username
        }`}</h1>
    );
}
