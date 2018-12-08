import {spl} from "@/api/spl";

export class SourceModel {
    constructor(_parentQuestion) {
        this.parentQuestion = _parentQuestion;
        this.url = '';
        this.script = '';
        this.refreshTime = -1;
    }

    getSources(callback) {
        if (this.script) {
            console.log(this.parentQuestion)
            if (this.script != null && this.script.startsWith('js:')) {
                //js
                let script = "(function(){" + this.script.replace('js:', '') + "})()";
                let array = eval(script);
                callback(array.map((item)=>{return {id:item.ID,name:item.Name}}));
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
                let array = spl.exec(script).then((d) => {
                    callback(d.data.map((item)=>{return {id:item.ID,name:item.Name}}));
                });
            }
        }
        else if (this.url)
            return spl.getUrl(this.url);
    }

    deserialize(input) {
        if (input == null)
            return null;
        this.refreshTime = input.refreshTime;
        this.script = input.script;
        this.url = input.url;
        return this;
    }
}