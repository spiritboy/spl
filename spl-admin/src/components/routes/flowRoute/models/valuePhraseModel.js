import {phraseModel} from "./phraseModel";

export class valuePhraseModel extends phraseModel{
    constructor(){
        super();
        this.type = 'value';
        this.value = '';
    }
}