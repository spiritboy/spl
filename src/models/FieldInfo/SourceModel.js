export class SourceModel {
    constructor() {
        this.url = '';
        this.script = '';
        this.refreshTime = -1;
    }
    deserialize(input){
        if(input == null)
            return null;
        this.refreshTime = input.refreshTime;
        this.script = input.script;
        this.url = input.url;
        return this;
    }
}