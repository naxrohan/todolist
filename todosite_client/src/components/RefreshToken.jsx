import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { privateRequest } from '../requestMethods';
import jwt_decode from "jwt-decode"
import { refreshToken } from '../redux/apiCalls';

const RefreshToken = () => {
    const {currentUser} = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [diffTime, setdiffTime] = useState(0);

    /**
     * Token refresh intercept
     */
    privateRequest.interceptors.request.use(async (config) => {
        let currentDate = new Date();
        const decodeToken = jwt_decode(
            currentUser.accessToken
        )
        setdiffTime((decodeToken.exp * 1000) - currentDate.getTime());

        if (decodeToken.exp * 1000 < currentDate.getTime()) {
            refreshToken(dispatch,{token:currentUser.refreshToken});

            //tofix: find better way to load the new token
            const newToken = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
            config.headers['authorization'] = `Bearer ${newToken}`;
        }
        return config;
    });

    return `<!--RefreshToken: ${diffTime}-->`
}

export default RefreshToken