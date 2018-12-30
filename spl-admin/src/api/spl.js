const axios = require('axios');

export class spl {
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

    static menu(menuId) {
        return axios.get('http://localhost:3000/api/v1/spl/menu/' + menuId);
    }

    static postFlow(flow) {
        flow.forEach((step) => {
            step.conditionGroups.forEach((conditionGroup) => {
                conditionGroup.conditions.forEach((condition) => {
                    if (condition.question) {
                        delete condition.question.title;
                        delete condition.question.source;
                    }
                })
            })
        });

        return axios.post('http://localhost:3000/api/v1/spl/group/flow', flow);
    }

    static getFlow(category, callback) {
        return axios.get('http://localhost:3000/api/v1/spl/group/flow').then(d => {
            d.data.forEach((step) => {
                step.questions.forEach((q) => q.title = spl.getQuestion(category, q.groupId, q.id).title);
                step.conditionGroups.forEach((conditionGroup) => {
                    conditionGroup.conditions.forEach((condition) => {
                        if (condition.question) {
                            condition.question.title = spl.getQuestion(category, condition.question.groupId, condition.question.id).title;
                            condition.question.source = spl.getQuestion(category, condition.question.groupId, condition.question.id).source;
                        }
                    })
                })
            });
            callback(d)
        });
    }

    static getQuestion(category, gId, qId) {
        for (let g of category.groups)
            if (g.id === parseInt(gId)) {
                for (let q of g.questions)
                    if (q.id === parseInt(qId))
                        return q;
            }
        return null;
    }

    static getUrl(url) {
        return [{id: 1, name: "ایران"}, {id: 2, name: "آسیا"}, {id: 3, name: "اروپا"}];
    }
}