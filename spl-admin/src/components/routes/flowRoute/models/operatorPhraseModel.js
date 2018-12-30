import {phraseModel} from "./phraseModel";

export class operatorPhraseModel extends phraseModel{
    constructor(){
        super();
        this.type = 'operator';
        this.value = '';
    }
}