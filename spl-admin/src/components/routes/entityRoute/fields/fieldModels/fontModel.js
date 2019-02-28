export class fontModel {
    constructor() {
        this.name = 'B Koodak';
        this.size = 12;
        this.bold = false;
        this.italic = false;
        this.underline = false;
        this.color = 'black';
    }

    deserialize(inp) {
        if (inp.name)
            this.name = inp.name;
        if (inp.size)
            this.size = inp.size;
        if (inp.bold)
            this.bold = inp.bold;
        if (inp.italic)
            this.italic = inp.italic;
        if (inp.underline)
            this.underline = inp.underline;
        if (inp.color)
            this.color = inp.color;
        return this;
    }
}