<template>
    <div>
        نام متغیر:<input/>
        <div class="row" style="border: 1px solid lightgray;padding: 10px;">
            <div class="col-3">
                <ul class="navigate">
                    <li v-for="entity in navigate.filter(e=>e.ParentID === currentGroupID || e.ID === currentGroupID)">
                        <span :class="[entity.EntityType,{'active':currentAttributeID === entity.ID}]">{{entity.Name}}</span>
                    </li>
                </ul>
                <ul class="navigate">
                    <li v-for="entity in navigate.filter(e=>e.ParentID === currentCategoryID && e.ID !== currentGroupID)">
                        <span :class="entity.EntityType">{{entity.Name}}</span>
                        <ul class="navigate">
                            <li v-for="entity2 in navigate.filter(e=>e.ParentID === entity.ID && e.ID !== currentGroupID)">
                                <span :class="entity2.EntityType">{{entity2.Name}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="col-3">
                <div v-if="selectedMethod!=null">
                    <h2>خروجی ها</h2>
                    {{selectedMethod.isArray}}
                    <ul class="methods">
                        <li v-for="output in selectedMethod.output">{{output.name}}</li>
                    </ul>
                </div>
            </div>
            <div class="col-3">
                <div v-if="selectedMethod!=null">
                    <h2>ورودی ها</h2>
                    <ul class="methods">
                        <li v-for="input in selectedMethod.input">{{input}}</li>
                    </ul>
                </div>
            </div>
            <div class="col-3" style="direction: ltr">
                <ul class="method-categories">
                    <li v-for="category in methods_nonApiCategories">
                        <span class="title">{{category}}</span>
                        <ul class="methods">
                            <li @click="selectedMethod = nonApi"
                                v-for="nonApi in methods_nonApi.filter(m=>m.methodCategory === category)"
                                :class="{'active':selectedMethod === nonApi}">{{nonApi.name}}
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="method-api">
                    <li>
                        <span class="title">API</span>
                        <ul class="methods">
                            <li @click="selectedMethod = Api"
                                v-for="Api in methods_Api"
                                :class="{'active':selectedMethod === Api}">{{Api.name}}
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {algorithm} from "../../../../api/algorithm";
    import {methodModel} from "../models/method/methodModel";

    export default {
        name: "variableEditComponent",
        data() {
            return {
                methods_nonApi: [],
                methods_nonApiCategories: [],
                methods_Api: [],
                navigate: [],
                currentAttributeID: 281,
                currentGroupID: 279,
                currentCategoryID: 274,
                selectedMethod: null

            }
        },
        async mounted() {
            let allMethods = await methodModel.getMethods();
            this.methods_Api = allMethods.filter(m => m.methodCategory.toLowerCase() === 'webapi');
            this.methods_nonApi = allMethods.filter(m => m.methodCategory.toLowerCase() !== 'webapi');

            this.methods_nonApiCategories = allMethods
                .filter(m => m.methodCategory.toLowerCase() !== 'webapi')
                .map(m => m.methodCategory)
                .filter((m, i, self) => self.indexOf(m) === i);

            this.navigate = await methodModel.getNavigate(this.currentCategoryID);


        },
        methods: {}
    }
</script>

<style scoped>
    ul.method-categories, ul.method-api {
        text-align: left;
        border: 1px solid lightgray;
        padding: 5px;
    }

    ul.navigate {
        border: 1px solid lightgray;
        padding: 5px;
        max-height: 400px;
        overflow-y: auto;
    }

    ul.methods {
        padding: 0;
        margin: 3px 3px 3px 15px;
    }

    ul.method-categories li, ul.method-api li {
        margin-left: 0;
    }

    ul.method-categories .title, ul.method-api .title {
        display: block;
        border-bottom: 1px solid;
        width: 100%;
        font-style: italic;
        font-weight: bold;
    }

    li.active {
        background: #abbaf6;
        border-radius: 5px;
    }

    li {
        cursor: pointer;
        padding: 0px 0px 0px 2px;
        list-style: none;
    }

    li.Group {
        font-weight: bold;
        font-size: larger;
    }

    li .Attribute {
        color: darkgray;
        font-size: small;
    }
    li .Attribute.active {
        color: blue;
    }
</style>