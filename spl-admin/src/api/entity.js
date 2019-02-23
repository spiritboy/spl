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

    //////////////////
    //////Entity - Properties
    //is used when creating the edit/new form for the entities (add menu,category,group,question,attribute)
    //Expecting name (menu,category,group,question,attribute)
    static Properties(name) {
        return axios.get(config.webApi + '/api/v1/entity/Properties/'+name);
    }


    //////////////////
    //////SelectSimilar///////
    //Expecting EntityLevel,name,ParentId
    static SelectSimilar(EntityLevel,ParentId, name) {
        return axios.post(config.webApi + '/api/v1/entity/SelectSimilar', {
            ParentId: ParentId,
            EntityLevel: EntityLevel,
            Name: name
        });
    }
    //////////////////
    //////SelectEx///////
    //Expecting ID (term id)
    static EntitySelectEx(entityId) {
        return axios.post(config.webApi + '/api/v1/entity/SelectEx', {ID: entityId});
    }


    //////////////////
    //////EntityInsertUpdate///////
    //************************
    //************************
//Expecting ParentId,Name,Value,ID
    static async EntityInsertUpdate(level,parentId, Name, Value, id) {
        let d = await axios.post(config.webApi + '/api/v1/entity/InsertUpdate', {
            ParentId: parentId,
            Name: Name,
            EntityLevel: level,
            Value: Value,
            ID: id == null ? 0:id
        });
        return new dbMessage().deserialize(d.data[0]);
    }

    //////////////////
    //////EntityDelete///////
    //************************
    //************************
    //Expecting Property,DataType,ID
    static async EntitiyDelete(id) {
        let d = await axios.delete(config.webApi + '/api/v1/entity/Delete/' + id);
        return new dbMessage().deserialize(d.data[0]);
    }


}