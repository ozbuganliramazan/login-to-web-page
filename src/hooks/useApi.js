import axios from 'axios'

export default function useApi() {
    axios.defaults.baseURL = 'https://api.adoptez1artisan.com'

    const token = localStorage.getItem('token')
    // Eğer token null değilse bu if'e girer.
    if (token) {
        axios.defaults.headers.common = {
            "Authorization": "Bearer " + token
        }
    }

    return axios
}