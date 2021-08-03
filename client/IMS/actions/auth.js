import {
    ADMIN_LOGIN_SUCCESS,
    EMPLOYEE_LOGIN_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';
import { useNavigation } from '@react-navigation/native';


export const login = (userName, password) => async dispatch => {
    try {
        let formData = {
            userName,
            password,
            type: 'admin'
        }
        const res = await axios.post(`http://192.168.18.7:5000/api/auth/login`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        dispatch({
            type: ADMIN_LOGIN_SUCCESS,
            payload: res.data.token
        })
        dispatch(loadUser())

    } catch (error) {

        // const err = error.response.data.errors[0]
        console.log(error)
        dispatch({
            type: LOGIN_FAIL
        })

    }



}


export const loadUser = () => async dispatch => {
    let token = await AsyncStorage.getItem('token')
    const navigation = useNavigation()
    if (token) {
        setAuthToken(token)
    }
    try {
        const res = await axios.get(`http://192.168.18.7:5000/api/auth`)
        dispatch({
            type: USER_LOADED,
            payload: res.data.user
        })
        // navigation.navigate({ routeName: 'main' })


    } catch (err) {
        console.log(err)
        dispatch({
            type: AUTH_ERROR
        })
    }
}