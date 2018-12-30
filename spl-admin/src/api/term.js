const axios = require('axios');
import config from './config'

export class term {
    static SearchTree(name) {
        return axios.get(config.webApi + '/api/v1/term/SearchTree/' + name);
    }
    static Children(id,name,perpage,page) {
        return axios.get(config.webApi + `/api/v1/term/Children/${id}/${perpage}/${page}/${name}`);
    }
    static InsertChild(child) {
        child.UserID = config.userId;
        return axios.post(config.webApi + `/api/v1/term/InsertChild`, child);
    }
}