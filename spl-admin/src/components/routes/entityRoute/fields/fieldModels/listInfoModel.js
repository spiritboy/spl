export class listInfoModel{
    constructor(){
        this.showSelectAll = false;
        this.source = '';
        this.view = '';
        this.style = 'list';
        this.autoExpand = false;
        this.limitToList = false;
        this.isLoadOnStartup = false;
    }
    deserialize(inp){
        this.showSelectAll = inp.showSelectAll;
        this.source = inp.source;
        this.view = inp.view;
        this.style = inp.style;
        this.autoExpand = inp.autoExpand;
        this.limitToList = inp.limitToList;
        this.isLoadOnStartup = inp.isLoadOnStartup;
    }
}