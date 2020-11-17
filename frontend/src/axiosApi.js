import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const baseURL = 'http://localhost:8000/api/'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        // 'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null,
        'Authorization': cookies.get('access_token') ? "Bearer " + cookies.get('access_token') : null,
        'Content-Type': 'application/json',
        'accept': 'application/json',
        // "X-Frame-Options": "DENY",//clickjacking
        // "X-XSS-Protection": "1;mode=block", //crossite
        // "Access-Control-Allow-Headers": "Accept",
        // X-XSS-Protection: 1; mode=block
        // "Referrer-Policy": "no-referrer",
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': "GET,POST",
        // "Access-Control-Allow-Headers": "content-type",
        // "Access-Control-Allow-Credentials": "true"
    }
});


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === baseURL+'token/refresh/') {
            cookies.remove("access_token")
            cookies.remove("refresh_token")
            window.location.href = '/signin';
            return Promise.reject(error);
        }

        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401 && 
            error.response.statusText === "Unauthorized") 
            {
                // const refreshToken = localStorage.getItem('refresh_token');
                const refreshToken = cookies.get('refresh_token');

                if (refreshToken){
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000);
                    console.log(tokenParts.exp);

                    if (tokenParts.exp > now) {
                        return axiosInstance
                        .post('/token/refresh/', {refresh: refreshToken})
                        .then((response) => {
            
                            // localStorage.setItem('access_token', response.data.access);
                            // localStorage.setItem('refresh_token', response.data.refresh);
                            cookies.set('access_token', response.data.access)
                            // cookies.set('refresh_token', response.data.refresh)
            
                            axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                            originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
            
                            return axiosInstance(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                    }else{
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        cookies.remove("access_token")
                        cookies.remove("refresh_token")
                        window.location.href = '/signin';
                    }
                }else{
                    console.log("Refresh token not available.")
                    cookies.remove("access_token")
                    cookies.remove("refresh_token")
                    window.location.href = '/signin';
                }
        }
      
     
      // specific error handling done elsewhere
      return Promise.reject(error);
  }
);

export default axiosInstance