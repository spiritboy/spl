export class ItemModel {
    constructor(id, name, obj) {
        this.id = id;
        this.name = name;
        this.obj = obj;
        this.items = [];
        this.level = 0;
        this.open = false;
        this.found = false;
        this.highlight = false;
        this.searchItems = [];
    }

    addItem(item) {
        item.level = this.level + 1;
        this.items.push(item);
    }

    search(text, filterLevel) {
        this.searchItems = [];

        this.found = this.highlight = this.name.indexOf(text) >= 0;
        if (text == null || text.trim() === "" ) {
            this.highlight = false;
        }
        for (let item of this.items) {
            let itemSearch = item.search(text, filterLevel);
            if (itemSearch === true) {
                this.found = true;
            }
            if (filterLevel <= this.level)
                this.searchItems.push(item);
            else if (itemSearch === true)
                this.searchItems.push(item);
        }

        return this.found;
    }
}