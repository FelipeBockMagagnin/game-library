import { createContext, useState } from "react";
import axios from 'axios';
import { REACT_APP_API_URL } from '../../env';

const AuthContext = createContext({
    signed: false,
    token: '',
    user: {}
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    async function signIn(user) {
        if (user?.error) {
            console.log(user);
            return;
        }

        console.log(REACT_APP_API_URL + 'user')
        try {
            axios.post(REACT_APP_API_URL + 'user', user).then(x => { 
                setUser(x.data);
            }).catch(err => {
                console.log(JSON.stringify(err))
            })
        } catch(e) {
            console.log(e)
        }
    }

    function signOut() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={
            {
                signed: !!user,
                token: '',
                user: user,
                signIn,
                signOut
            }
        }>
            {children}
        </AuthContext.Provider>
    )

};


export default AuthContext;