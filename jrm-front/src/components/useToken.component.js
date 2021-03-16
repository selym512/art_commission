import {useState} from 'react';

export default function useToken(){
    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.session_id;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = userToken =>{
        console.log(userToken.session_id);
        sessionStorage.setItem('token',JSON.stringify(userToken))
        setToken(userToken.session_id);
    };

    return {
        setToken : saveToken,
        token
    }
}