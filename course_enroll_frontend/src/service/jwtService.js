import axios from '../axios';
// from the axios file with base URL

export default class JwtService{
    static login(username, password){
        return axios.post('/api/token/', {
            username: username, //username,
            password,
        })


    }
}