import {dbMessage} from "../components/shared/dbMessage";

const axios = require('axios');
import config from './config'

export class term {

    //////////////////
    //////ClassSelect///////
    //Expecting Name
    static ClassSelect(name, perpage, pageno) {
        return axios.post(config.webApi + '/api/v1/term/Class/Select', {
            Name: name,
            RowCountPerPage: perpage,
            PageNo: pageno
        });
    }

    //////////////////
    //////ClassSelectPropertyRecommend///////
    //Expecting Name
    static ClassSelectPropertyRecommend(name, perpage, pageno) {
        return axios.post(config.webApi + '/api/v1/term/Class/SelectPropertyRecommend', {
            Name: name,
            RowCountPerPage: perpage,
            PageNo: pageno
        });
    }
    //////////////////
    //////ClassInsert///////
    //Expecting Name,UserID
    static async ClassInsert(body) {
        let d = await axios.post(config.webApi + '/api/v1/term/Class/Insert', body);
        return new dbMessage().deserialize(d.data[0]);
    }

    //////////////////
    //////ClassUpdate///////
    //Expecting Name,UserIDوID
    static async ClassUpdate(body) {
        let d = await axios.post(config.webApi + '/api/v1/term/Class/Update', body);
        return new dbMessage().deserialize(d.data[0]);
    }

    //////////////////
    //////ClassDelete///////
    //Expecting ID
    static async ClassDelete(id) {
        let d = await axios.delete(config.webApi + '/api/v1/term/Class/Delete/' + id);
        return new dbMessage().deserialize(d.data[0]);
    }

    //////////////////
    //////ClassSelect///////
    //Expecting Name
    static ClassSelectEx(id) {
        return axios.get(config.webApi + '/api/v1/term/Class/SelectEx/' + id);
    }

    //////////////////
    //////SelectClassEntity///////
    //Expecting Name
    ///obtaining levels(menu,group,cat,question) and their class id
    static SelectClassEntity() {
        return axios.get(config.webApi + '/api/v1/term/Class/SelectClassEntity/');
    }
    //////////////////
    //////ClassInsertEx///////
    //Expecting ClassID,Property,DataType
    static async ClassInsertEx(body) {
        let d = await axios.post(config.webApi + '/api/v1/term/Class/InsertEx', body);
        return new dbMessage().deserialize(d.data[0]);
    }

    //////////////////
    //////ClassUpdateEx///////
    //Expecting Property,DataType,ID
    static async ClassUpdateEx(body) {
        console.log(body)
        let d = await axios.post(config.webApi + '/api/v1/term/Class/UpdateEx', body);
        return new dbMessage().deserialize(d.data[0]);
    }

    //////////////////
    //////ClassDeleteEx///////
    //Expecting Property,DataType,ID
    static async ClassDeleteEx(id) {
        let d = await axios.delete(config.webApi + '/api/v1/term/Class/DeleteEx/' + id);
        return new dbMessage().deserialize(d.data[0]);
    }

    ////////////////////////////////
    //////ClassSelectProperty///////
    //Expecting name,clsId
    static ClassSelectProperty(name,clsId) {
        return axios.post(config.webApi + '/api/v1/term/Class/SelectProperty', {
            Property: name,
            ID: clsId
        });
    }

    //////////////////
    //////TermSelect///////
    //Expecting ClassID,name
    static TermSelect(clsId, name, perpage, pageno) {
        return axios.post(config.webApi + '/api/v1/term/Term/Select', {
            ClassID: clsId,
            Name: name,
            RowCountPerPage: perpage,
            PageNo: pageno
        });
    }

    //////////////////
    //////SelectSimilarTerm///////
    //Expecting ClassID,name
    static TermSelectSimilarTerm(clsId, name) {
        return axios.post(config.webApi + '/api/v1/term/Term/SelectSimilarTerm', {
            ClassID: clsId,
            Name: name
        });
    }
    //////////////////
    //////TermInsertUpdate///////
    //Expecting ClassID,Name,Value,ID
    static async TermInsertUpdate(clsId, Name, Value, id) {
        let d = await axios.post(config.webApi + '/api/v1/term/Term/InsertUpdate', {
            ClassID: clsId,
            Name: Name,
            Value: Value,
            ID: id
        });
        return new dbMessage().deserialize(d.data[0]);
    }

    //////////////////
    //////TermDelete///////
    //Expecting Property,DataType,ID
    static async TermDelete(id) {
        let d = await axios.delete(config.webApi + '/api/v1/term/Term/Delete/' + id);
        return new dbMessage().deserialize(d.data[0]);
    }

    //////////////////
    //////SelectEx///////
    //Expecting ID (term id)
    static TermSelectEx(termId) {
        return axios.post(config.webApi + '/api/v1/term/Term/SelectEx', {ID: termId});
    }

    //////////////////
    //////SearchClass///////
    //Expecting name (to be searched)
    static TermSearchClassAndTerm(name, perpage, pageno) {
        return axios.post(config.webApi + '/api/v1/term/Term/SearchClass', {
            Name: name,
            RowCountPerPage: perpage,
            PageNo: pageno
        });
    }
}