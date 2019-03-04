const axios = require('axios');
import config from './config'

export class algorithm {
    static selectMethodsCache = null;

    static async SelectMethods() {
        if (algorithm.selectMethodsCache == null)
            return algorithm.selectMethodsCache = await axios.get(config.webApi + '/api/v1/algorithm/SelectMethods');
        else
            return algorithm.selectMethodsCache;

    }

    static async Navigate(categoryId) {
        return await axios.get(config.webApi + '/api/v1/algorithm/Navigate/' + categoryId);
    }
}