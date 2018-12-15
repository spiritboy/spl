const axios = require('axios');
import {GroupModel} from "@/models/GroupModel";
import {QuestionModel} from "@/models/QuestionModel";
import {MenuModel} from "@/models/MenuModel";

export class spl {
    static menu(menuId) {
        return axios.get('http://localhost:3000/api/v1/spl/menu/854');
    }

    static getUrl(url) {
        return [{id: 1, name: "ایران"}, {id: 2, name: "آسیا"}, {id: 3, name: "اروپا"}];
    }


    static normalize(tsql, menuId, categoryId, groupId, questionId, userId, lang) {
        tsql = tsql.replace(/{pid}/gi, "'" + questionId + "'");
        tsql = tsql.replace(/{groupid}/gi, "'" + groupId + "'");
        tsql = tsql.replace(/{categoryid}/gi, "'" + categoryId + "'");
        tsql = tsql.replace(/{menuid}/gi, "'" + menuId + "'");
        tsql = tsql.replace(/{userid}/gi, "'" + userId + "'");
        tsql = tsql.replace(/{language}/gi, "'" + lang + "'");
        tsql = tsql.replace(/{search}/gi, '');
        tsql = tsql.replace(/{\w+}/gi, "''");
        return tsql;
    }

    static exec(tsql) {
        return axios.post('http://localhost:3000/api/v1/spl/exec', {source: tsql});
    }
    static report(reportId,fkId){
        return axios.post('http://localhost:3000/api/v1/spl/report', {reportId,fkId});
    }
}