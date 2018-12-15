export class StyleModel{
    constructor(){
        this.style = {};
    }
    deserialize(inp){
        if(inp!=null && Array.isArray(inp)) {
            for (let style of inp) {
                if ( ['fontweight', 'font-weight'].indexOf(style.Property.toLowerCase()) >= 0)
                    this.style['font-weight'] = style.Value.toLowerCase();
                else if (['fontsize', 'font-size'].indexOf(style.Property.toLowerCase()) >= 0)
                    this.style['font-size'] = style.Value + 'px';
                else if (['fontstyle', 'font-style'].indexOf(style.Property.toLowerCase()) >= 0)
                    this.style['font-style'] = style.Value.toLowerCase();
                else if (['Foreground', 'color'].indexOf(style.Property.toLowerCase()) >= 0)
                    this.style['color'] = style.Value.toLowerCase();
                else if (['background', 'background'].indexOf(style.Property.toLowerCase()) >= 0)
                    this.style['background'] = style.Value.toLowerCase();
            }

        }
        return this;
    }
}