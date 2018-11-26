const axios = require('axios');
import {GroupModel} from "@/models/GroupModel";
import {QuestionModel} from "@/models/QuestionModel";
import {MenuModel} from "@/models/MenuModel";

export class spl {
    static menu(menuId) {
        return axios.get('http://172.16.0.110:3000/api/v1/spl/');
    }

    static getUrl(url) {
        return [{id: 1, name: "ایران"}, {id: 2, name: "آسیا"}, {id: 3, name: "اروپا"}];
    }
}