import axios from 'axios';
const bearerURL = "http://localhost:3001"

const publicApi = {
    get : async(url) => {
        const res = await axios.get(`${bearerURL}/${url}`);
        return res;
    },

    post : async(url, body)  =>{
        const res = await axios.post(`${bearerURL}/${url}`, body);
        return res;
    },
};

export default publicApi;