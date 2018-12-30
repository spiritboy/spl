import {phraseModel} from "./phraseModel";

export class questionPhraseModel extends phraseModel{
    constructor(){
        super();
        this.type = 'question';
        this.qid = '';
        this.gid='';
        this.cid='';
    }
}