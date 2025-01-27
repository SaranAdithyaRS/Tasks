import React from 'react';

const User = ({ user }) => {
    return (
        <div>
            <h1>Welcome: {user.Name}</h1>
        </div>
    );
};

// Higher-Order Component to handle authorization
const Auth = (WrappedComponent) => {
    return function Authorized({ isAuth, ...props }) {
        if (!isAuth) {
            return <h2>Unauthorized Access</h2>;
        }
        return <WrappedComponent {...props} />;
    };
};

function App() {
    const user = { Name: "Adithya" };
    const isAuth = true; 
    const AuthorizedUser = Auth(User);

    return (
        <div>
            <h1>User Profile</h1>
            <AuthorizedUser isAuth={isAuth} user={user} />
        </div>
    );
}

export default App;