export class dbMessage {
    constructor() {
        this.id = -1;
        this.result = true;
        this.messageId = -1;
        this.message = '';
    }

    deserialize(inp) {
        console.log(inp)
        if (inp != null) {
            this.messageId = inp.MsgID;
            this.result = this.messageId === 0;
            this.message = inp.Msg;
            this.id = inp.ID;
        }
        return this;
    }
    process(){
        if(this.message){
            alert(this.message)
        }
        return this.result === true;
    }
}