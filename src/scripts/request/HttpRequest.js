import axios from 'axios';
import * as constants from '../resources/constants';

export function getPhotos(pageNumber, searchQuery){
    const requestURL = createRequestURL(pageNumber, searchQuery);
    return axios.get(requestURL)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error);
        })
}

export function createRequestURL(pageNumber, searchQuery) {
    return constants.FLICKR_API_URL + '?' + constants.PHOTO_API
        + '&api_key=' + constants.FLICKR_API_KEY
        + '&tags=' + searchQuery
        + '&per_page=' + constants.PAGE_SIZE
        + '&format=json&nojsoncallback=1'
        + '&page=' + pageNumber
        + constants.EXTRAS;
}