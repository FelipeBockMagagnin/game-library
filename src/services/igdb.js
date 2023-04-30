import axios from 'axios';
import { IGDB_KEY, IGDB_SECRET_KEY } from '@env';

const API = 'https://api.igdb.com/v4/'
function createAxiosInstance(token) {
    return axios.create({
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Client-ID': IGDB_KEY,
        }
    })
}

function getToken() {
    const api_link = 'https://id.twitch.tv/oauth2/token?client_id=' + IGDB_KEY
        + '&client_secret=' + IGDB_SECRET_KEY
        + '&grant_type=client_credentials';

    return axios.post(
        api_link
    );
}

function get(token, endpoint, data) {
    return createAxiosInstance(token).post(
        API + endpoint,
        data,
    );
}

const imgUrl = 'https://images.igdb.com/igdb/image/upload/';

function getImgUrl(imgSize, imgHash){
    return imgUrl + imgSize + '/' + imgHash + '.jpg';
}

export { getToken, get, getImgUrl }