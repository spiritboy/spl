import {dbMessage} from "../components/shared/dbMessage";

const axios = require('axios');
import config from './config'

export class term {

    //////////////////
    //////ClassSelect///////
    //Expecting Name
    static ClassSelect(name,perpage,pageno) {
        return axios.post(config.webApi + '/api/v1/term/Class/Select',{Name:name,RowCountPerPage:perpage,PageNo:pageno});
    }
    //////////////////
    //////ClassInsert///////
    //Expecting Name,UserID
    static async ClassInsert(body) {
        let d = await  axios.post(config.webApi + '/api/v1/term/Class/Insert',body);
        return new dbMessage().deserialize(d.data[0]);
    }
    //////////////////
    //////ClassUpdate///////
    //Expecting Name,UserIDوID
    static async ClassUpdate(body) {
        let d = await  axios.post(config.webApi + '/api/v1/term/Class/Update',body);
        return new dbMessage().deserialize(d.data[0]);
    }
    //////////////////
    //////ClassDelete///////
    //Expecting ID
    static async ClassDelete(id) {
        let d = await axios.delete(config.webApi + '/api/v1/term/Class/Delete/'+id);
        return new dbMessage().deserialize(d.data[0]);
    }
    //////////////////
    //////ClassSelect///////
    //Expecting Name
    static ClassSelectExt(id) {
        return axios.get(config.webApi + '/api/v1/term/Class/SelectExt/' + id);
    }
    //////////////////
    //////ClassInsertExt///////
    //Expecting ClassID,Property,DataType
    static async ClassInsertExt(body) {
        let d = await axios.post(config.webApi + '/api/v1/term/Class/InsertExt',body);
        return new dbMessage().deserialize(d.data[0]);
    }
    //////////////////
    //////ClassUpdateExt///////
    //Expecting Property,DataType,ID
    static async ClassUpdateExt(body) {
        let d = await axios.post(config.webApi + '/api/v1/term/Class/UpdateExt',body);
        return new dbMessage().deserialize(d.data[0]);
    }
    //////////////////
    //////ClassDeleteExt///////
    //Expecting Property,DataType,ID
    static async ClassDeleteExt(id) {
        let d = await axios.delete(config.webApi + '/api/v1/term/Class/DeleteExt/'+id);
        return new dbMessage().deserialize(d.data[0]);
    }


    //////////////////
    //////ClassSelect///////
    //Expecting ClassID,name
    static TermSelect(id,name,perpage,pageno) {
        return axios.post(config.webApi + '/api/v1/term/Term/Select',{ClassID:id,Name:name,RowCountPerPage:perpage,PageNo:pageno});
    }

    //////////////////
    //////ClassSelect///////
    //Expecting ClassID,Name,Value,ID
    static async  TermInsertUpdate(clsId,Name,Value,ID) {
        let d = await axios.post(config.webApi + '/api/v1/term/Term/InsertUpdate',{ClassID:clsId,Name:Name,Value:Value,ID:ID});
        return new dbMessage().deserialize(d.data[0]);
    }
    //////////////////
    //////ClassDeleteExt///////
    //Expecting Property,DataType,ID
    static async TermDelete(id) {
        let d = await axios.delete(config.webApi + '/api/v1/term/Term/Delete/'+id);
        return new dbMessage().deserialize(d.data[0]);
    }
}