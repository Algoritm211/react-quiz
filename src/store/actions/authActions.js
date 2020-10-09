import axios from 'axios'
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionTypes'


export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token: token
    }
}


export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {

    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    
    return {
        type: AUTH_LOGOUT,
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }

    }
}


export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url 

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcUdLl5WF0yPzwz3hnT7Eg8aB-JJ4I-G8'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAcUdLl5WF0yPzwz3hnT7Eg8aB-JJ4I-G8'
        }
        
        const response = await axios.post(url, authData)
        const data = response.data

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        // Для поддержания сессии положить token в localStorage
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    
    }
} 