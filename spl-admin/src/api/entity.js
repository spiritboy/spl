import {dbMessage} from "../components/shared/dbMessage";

const axios = require('axios');
import config from './config'

export class entity {
    //////////////////
    //////Entity - SearchTree///////
    //Expecting Name
    static SearchTree(name, perpage, pageno) {
        return axios.post(config.webApi + '/api/v1/entity/SearchTree', {
            Name: name,
            RowCountPerPage: perpage,
            PageNo: pageno
        });
    }

    //////////////////
    //////Entity - Children///////
    //Expecting Name,ParentID
    static Children(parentID, name, perpage, pageno) {
        return axios.post(config.webApi + '/api/v1/entity/Children', {
            Name: name,
            ParentID: parentID,
            RowCountPerPage: perpage,
            PageNo: pageno
        });
    }
}