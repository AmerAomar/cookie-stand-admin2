import { headers } from 'next/dist/client/components/headers';
import React from 'react';
import { createContext, useContext } from 'react';
import  Jwt  from 'jsonwebtoken';

const baseUrl = "https://cookie-stand-aj99el9it-ameraomar.vercel.app/";
const tokenUrl =baseUrl + "api/token/";

const AuthContext = createContext();

export function useAuth(){

   const auth = useContext(AuthContext);
   if(!auth){
    return("you are not logged in")
   }
   return auth;

}

export function AuthProvider(props){

    const [state, setState] = React.useState({
        tokens: null,
        user: null,
        login,
        logout,
    });

    //"http://127.0.0.1:8000/api/token/"
    async function login(username, password){
        const options = {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {"Content-Type": "application/json"}
        }
        
        const response = await fetch(tokenUrl,options)
        const data = await response.json();
        console.log("data",data);
        const decodedAccess = Jwt.decode(data.access);
        console.log("decodedAccess",decodedAccess);
        const newState = {
            tokens : data,
            user : {
                username : decodedAccess.username,
                email: decodedAccess.email,
                id: decodedAccess.user_id
            }
        }

        setState(prevState =>({...prevState, ...newState}));

    }

    function logout(){
        setState(prevState => ({...prevState, tokens: null, user: null}));
    }


    return (
        <AuthContext.Provider value={state}>
            {props.children}

        </AuthContext.Provider>
    )
}