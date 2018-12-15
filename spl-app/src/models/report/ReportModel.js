import {ReportFieldModel} from "./ReportFieldModel";
import {spl} from "../../api/spl";

export class ReportModel{
    constructor(reportId,fkId){
        this.fields = [];
        spl.report(reportId,fkId).then(d=>{
            console.log(d.data)
        })
    }
    deserialize(inp){
        for (let _field of inp) {
            this.fields.push(new ReportFieldModel().deserialize(_field));
        }
        return this;
    }
}