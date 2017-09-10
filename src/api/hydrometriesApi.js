import axios from 'axios';

class hydrometriesApi {  
    static getAll() {
        return axios('http://home.suriona.com/home-center/api/hydrometries').then(response => {
            console.log('response', response.data);
            return response.data;
        }).catch(error => {
            return error;
        });
    }
}
export default hydrometriesApi;