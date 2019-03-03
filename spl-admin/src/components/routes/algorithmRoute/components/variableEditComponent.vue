<template>
    <div>
        نام متغیر:<input/>
        <div class="row" style="border: 1px solid gray">
            <div class="col-3"></div>
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
                        <li v-for="input in selectedMethod.input">{{input.name}}</li>
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
                <ul>
                    <li @click="selectedMethod = Api"
                        v-for="Api in methods_Api"
                        :class="{'active':selectedMethod === Api}">{{Api.name}}
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

        },
        methods: {}
    }
</script>

<style scoped>
    ul {
        text-align: left;
    }

    ul.method-categories {
        padding: 0;
    }

    ul.methods {
        padding: 0;
        margin: 3px 3px 3px 15px;
    }

    ul.method-categories li {
        margin-left: 0px;
    }

    ul.method-categories .title {
        color: white;
        width: 100%;
    }

    li.active {
        background: #6066cc;
        color: white;
    }

    li {
        border-bottom: 1px solid lightgray;
        list-style: none;
        padding: 0;
    }
</style>