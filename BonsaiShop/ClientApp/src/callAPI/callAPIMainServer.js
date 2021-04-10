import axios from 'axios';

export default function callAPIMainServer(enpoint, method='GET', paramObj,body){
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEyMzQ1Iiwicm9sZSI6IkFkbWluIiwianRpIjoiMDBhZGUxNTktNDgxZi00Yjg1LTk1MmItOGIwYWZlNmMyNzcwIiwiZXhwIjoyMjE4MDYwODUxLCJpc3MiOiJCYW9CYW9TaG9wLmxpdmUiLCJhdWQiOiJGb3JVc2VyTG9naW5lZCJ9._VE9Vjq04U5Pd4Dfu2ti3vmfsqCaVlWKd4eHi5-RM2Y"
    return axios({
        headers: { Authorization: `Bearer ${token}` },
        method : method,
        url : `${process.env.REACT_APP_API_URL}${enpoint}`,
        params : paramObj,
        data : body
    })
}