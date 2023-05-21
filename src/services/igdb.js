import axios from 'axios';
import { IGDB_KEY, IGDB_SECRET_KEY } from '../../env';

const API = 'https://api.igdb.com/v4/'
var token = null;

async function createAxiosInstance() {
    if (token == null) {
        token = await getToken()
    }

    return await axios.create({
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Client-ID': IGDB_KEY,
        }
    })
}

async function getToken() {
    const api_link = 'https://id.twitch.tv/oauth2/token?client_id=' + IGDB_KEY
        + '&client_secret=' + IGDB_SECRET_KEY
        + '&grant_type=client_credentials';

    const key = await axios.post(api_link);
    return key.data.access_token
}

async function get(endpoint, fields, where = null, sort = null, limit = 50) {
    let searchString = `fields ${fields};`;

    if(sort) searchString += `sort ${sort};`
    if(limit) searchString += `limit ${limit};`
    if(where) searchString += `where ${where};`

    console.log(searchString)

    const axiosInstance = await createAxiosInstance()
    
    return axiosInstance.post(
        API + endpoint,
        searchString,
    );
}

const imgUrl = 'https://images.igdb.com/igdb/image/upload/';

function getImgUrl(imgSize, imgHash) {
    return imgUrl + imgSize + '/' + imgHash + '.jpg';
}

export { getToken, get, getImgUrl }