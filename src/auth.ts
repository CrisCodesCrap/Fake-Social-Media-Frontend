import { isExpired, decodeToken } from "react-jwt";
import axios from 'axios'

export const auth = {
    isAuthenticated: false,
    username: "",
     async checkToken(){
        let refresh_token = window.localStorage.getItem('token')
        if(refresh_token !== undefined && refresh_token !== null){
            if(!isExpired(refresh_token)){
                const decoded_token:any = decodeToken(refresh_token)
                if (decoded_token !== null && decoded_token !== undefined){
                    auth.isAuthenticated = true
                    auth.username = decoded_token['sub']
                    console.log(decoded_token['sub'])
                    axios.post('http://127.0.0.1:8000/refresh_token_renew',
                    {
                        'refresh_token':refresh_token,
                        'user':auth.username
                    }).then(response => {
                        if(response.data["refresh_token"] !== undefined){
                            localStorage.setItem('token', response.data["refresh_token"])
                            console.log(response.data['user'],'ahmed')
                        }
                        if(response.data['user'] !== undefined){
                            window.localStorage.setItem('user', auth.username)
                        
                        }
                    }).catch(error=>{
                        console.error(error)
                    })
                }
            }
        }
    },
    signin(user:string){
        auth.isAuthenticated = true
        auth.username = user
    },
    signout(){
        auth.isAuthenticated = false
        auth.username = ""
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('token')
    }
}

