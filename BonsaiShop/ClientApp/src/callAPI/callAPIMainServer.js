import axios from 'axios';

export default function callAPIMainServer(enpoint, method='GET', paramObj,body){

    let token = localStorage.getItem('token');
    return axios({
        headers: { Authorization: `Bearer ${token}` },
        method : method,
        url : `${process.env.REACT_APP_API_URL}${enpoint}`,
        params : paramObj,
        data : body
    })
}