import {spl} from "@/api/spl";

export class SourceModel {
    constructor(_parentQuestion) {
        this.parentQuestion = _parentQuestion;
        this.url = '';
        this.script = '';
        this.refreshTime = -1;
        this.preLoad = true;
        this.sourceCache = null;
    }

    getById(id, callback) {
        this.getSources((sources) => {
            let _filter = sources.filter(item => item.id.toString() === id.toString());
            callback(_filter.length >= 0 ? _filter[0] : null);
        })
    }

    getSources(callback) {
        if (this.sourceCache != null) {
            if (callback != null)
                callback(this.sourceCache);
            return;
        }
        if (this.script) {
            if (this.script != null && this.script.startsWith('js:')) {
                //js
                let script = "(function(){" + this.script.replace('js:', '') + "})()";
                let array = [];
                try {
                    array = eval(script);
                    this.sourceCache = array.map((item) => {
                        return {id: item.ID, name: item.Name}
                    });
                }
                catch {
                }

                if (callback != null)
                    callback(this.sourceCache);
            }
            else if (this.script != null) {
                //sp
                let script = this.script;
                script = spl.normalize(script,
                    this.parentQuestion.parentGroup.parentCategory.parentMenu.id,
                    this.parentQuestion.parentGroup.parentCategory.id,
                    this.parentQuestion.parentGroup.id,
                    this.parentQuestion.id,
                    6462, 'fa');
                spl.exec(script).then((d) => {
                    try {
                        this.sourceCache = d.data[0].map((item) => {
                            return {id: item.ID, name: item.Name}
                        });
                        if (callback != null)
                            callback(this.sourceCache);
                    }
                    catch {

                    }
                });
            }
        }
        else if (this.url) {
            this.sourceCache = spl.getUrl(this.url);
            callback(this.sourceCache);
        }
    }

    deserialize(input) {
        if (input == null)
            return null;
        this.refreshTime = input.refreshTime;
        this.script = input.script;
        this.url = input.url;
        if (this.preLoad)
            this.getSources(null);
        return this;
    }
}