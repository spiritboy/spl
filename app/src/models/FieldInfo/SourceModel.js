import {spl} from "@/api/spl";

export class SourceModel {
    constructor() {
        this.url = '';
        this.script = '';
        this.refreshTime = -1;
    }

    getSources() {
        if (this.script)
            return eval(this.script);
        else if(this.url)
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