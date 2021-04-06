import axios from 'axios';

export default function callAPIMainServer(enpoint, method='GET', paramObj,body){
    return axios({
        method : method,
        url : `${process.env.REACT_APP_API_URL}${enpoint}`,
        params : paramObj,
        data : body
    })
}