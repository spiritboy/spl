<template>
    <div>
        نام متغیر:<input v-model="variable.name"/>
        <div class="row" style="border: 1px solid lightgray;padding: 10px;">
            <div class="col-3">
                <ul class="navigate">
                    <li v-for="entity in navigate.filter(e=>e.ParentID === currentGroupID || e.ID === currentGroupID)"
                        @click="navigateClicked(entity)">
                        <span :class="[entity.EntityType,{'active':currentAttributeID === entity.ID}]">{{entity.Name}}</span>
                    </li>
                </ul>
                <ul class="navigate">
                    <li v-for="group in navigate.filter(e=>e.ParentID === currentCategoryID && e.ID !== currentGroupID)">
                        <span :class="group.EntityType">{{group.Name}}</span>
                        <ul class="navigate">
                            <li v-for="attribute in navigate.filter(e=>e.ParentID === group.ID && e.ID !== currentGroupID)"
                                @click="navigateClicked(attribute)">
                                <span :class="attribute.EntityType">{{attribute.Name}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="col-6">
                <div class="col-12">
                    <div v-if="variable.method!=null">
                        <h2>ورودی ها</h2>
                        <ul class="methods">
                            <li v-for="input in variable.method.input"
                                :class="{'active':selectedInput === input}"
                                @click="inputClicked(input)">
                                <span class="m-1" style="display: block;">{{input.name}}</span>
                                <span class="badge badge-light m-1" v-for="disp in input.display">{{disp}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-12">
                    <div v-if="variable.method!=null">
                        <h2>خروجی ها</h2>
                        {{variable.method.isArray}}
                        <ul class="methods">
                            <li v-for="output in variable.method.output">{{output.name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-3" style="direction: ltr">
                <ul class="method-non-api">
                    <li v-for="category in methods_nonApiCategories">
                        <span class="title">{{category}}</span>
                        <ul class="methods">
                            <li @click="methodsClicked(nonApi)"
                                v-for="nonApi in methods_nonApi.filter(m=>m.methodCategory === category)"
                                :class="{'active':variable.method === nonApi}">{{nonApi.name}}
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="method-api">
                    <li>
                        <span class="title">API</span>
                        <ul class="methods">
                            <li @click="methodsClicked(Api)"
                                v-for="Api in methods_Api"
                                :class="{'active':variable.method === Api}">{{Api.name}}
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        {{variable}}
    </div>
</template>

<script>
    import {algorithm} from "../../../../api/algorithm";
    import {methodModel} from "../models/method/methodModel";

    export default {
        name: "variableEditComponent",
        props:["variable"],
        data() {
            return {
                methods_nonApi: [],
                methods_nonApiCategories: [],
                methods_Api: [],
                navigate: [],
                currentAttributeID: 281,
                currentGroupID: 279,
                currentCategoryID: 274,
                selectedInput:null

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
        methods: {
            methodsClicked(method){
                this.variable.method = method;
                this.selectedInput = null;
            },
            inputClicked(input){
                this.selectedInput = input;
            },
            navigateClicked(entity){
                if(this.selectedInput!=null){
                    this.selectedInput.addValue(entity);
                }
            }
        }
    }
</script>

<style scoped>
    ul.method-non-api, ul.method-api {
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
    ul.methods li{
        padding: 5px;
        border: 1px dashed gray;
        margin: 3px;
    }

    ul.methods li:hover {
        background: #bfd5ff;
    }
    ul.method-non-api li, ul.method-api li {
        margin-left: 0;
    }

    ul.method-non-api .title, ul.method-api .title {
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