import {termModel} from "./termModel";

export class treeModel{
    constructor(){
        this.PathID = '';
        this.PathName = '';
        this.OID = 0;
        this.terms = [];
    }
    get lastTerm(){
        if(this.terms == null || this.terms.length === 0) return null;
        return this.terms[this.terms.length-1];
    }
    deserialize(inp){
        this.PathID = inp.PathID;
        this.PathName = inp.PathName;
        this.OID = inp.OID;
        for (let i = 0;i<this.PathID.split('>').length;i++) {
            let id = this.PathID.split('>')[i];
            let name = this.PathName.split('>')[i];
            let term = new termModel();
            term.id = id;
            term.name = name;
            this.terms.push(term);
        }
    }
}