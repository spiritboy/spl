import {CategoryModel} from "@/models/CategoryModel";
import {QuestionValidationModel} from "./QuestionValidationModel";

export class MenuModel {
    constructor() {
        this.id = "";
        this.title = "";
        this.categories = [];
    }

    init() {
        for (let c of this.categories)
            c.init();
    }

    deserialize(input) {
        if (input == null)
            return null;
        this.id = input.id;
        this.title = input.title;
        for (let c of input.categories)
            this.categories.push(new CategoryModel(this).deserialize(c));
        return this;
    }
}