<template>
    <div class="row">
        <div class="col-md-4">

            <div class="class-ext">
                <div class="input-group mb-3">
                    <input v-model="searchText" @input="doSearch()" type="text" class="form-control"
                           placeholder="جستجو کنید ...">
                    <div class="input-group-prepend">
                        <button @click="doSearch()" class="btn input-group-text">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                    <div class="input-group-prepend">
                        <button @click="addClassClicked" :disabled="!canAddClass" class="btn input-group-text">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
                <ul class="search-list">
                    <li v-for="cls in searchedClasses" @click="selectClass(cls)"
                        :class="{'active':cls === selectedClass}">
                        {{cls.name}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-md-8" v-if="selectedClass!=null">
            <div class="class-ext">
                <form class="form-inline" style="position: relative;">
                    <div class="form-group">
                        <label class="control-label"> نام کلاس:</label>
                        <input v-model="selectedClass.name" class="form-control" style="width: 250px;"/>
                    </div>
                    <div class="form-group">
                        <button @click.prevent="saveClassClicked" class="btn btn-light"><i class="fa fa-save"></i>
                        </button>
                    </div>
                    <button v-if="selectedClass.id>0" @click.prevent="deleteClassClicked" class="btn btn-danger"
                            style="position: absolute;left:0"> حذف کلاس <i class="fa fa-times"></i></button>
                </form>
                <hr/>
                <div v-if="selectedClass!=null && selectedClass.id>0">
                    <button @click.prevent="addPropertyClicked" class="btn btn-light"><i class="fa fa-plus"></i>
                    </button>
                    <class-ext-component :ext="newProperty" ref="el0" @popupClosed="popupClosed"
                                         :parent-class="selectedClass"></class-ext-component>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>ردیف</th>
                            <th>نام</th>
                            <th>نوع داده</th>
                            <th>اجباری</th>
                            <th>چند مقدرای</th>
                            <th>قابل جستجو</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(p,i) in selectedClass.properties">
                            <td>{{i+1}}</td>
                            <td>{{p.name}} <sup v-if="p.isId"><span class="badge badge-info">ID</span></sup></td>
                            <td>{{p.classRefName? p.classRefName:p.dataType}}</td>
                            <td>
                                <i v-if="p.isRequired" class="fa fa-check"></i>
                                <i v-else></i>
                            </td>
                            <td>
                                <i v-if="p.isMultiSelect" class="fa fa-check"></i>
                                <i v-else></i>
                            </td>
                            <td>
                                <i v-if="p.isSearchable > 0" class="fa fa-check"></i>
                                <i v-else></i>
                            </td>
                            <td>
                                <button @click.prevent class="btn btn-light" @click.prevent="editPropertyClicked(p)"><i
                                        class="fa fa-edit"></i></button>
                                <button @click.prevent class="btn btn-light" @click.prevent="removePropertyClicked(p)">
                                    <i class="fa fa-times"></i>
                                </button>
                            </td>
                            <class-ext-component :key="p.id" :ext="p" :ref="'el' + p.id.toString()"
                                                 @popupClosed="popupClosed"
                                                 :parent-class="selectedClass"></class-ext-component>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {classModel} from "../model/classModel";
    import {classExtModel} from "../model/classExtModel";
    import ClassExtComponent from "./classExtComponent";

    let context = {
        searchedClasses: [],
        selectedClass: null,
        searchText: '',
        selectedProperty: null,
        newProperty: null
    }
    export default {
        name: "classComponent",
        components: {ClassExtComponent},
        data() {
            return context;
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            doSearch() {
                this.selectedClass = null;
                classModel.Select(this.searchText, 1, 100).then(d => this.searchedClasses = d);
            },
            async selectClass(cls) {
                this.selectedClass = null;
                this.selectedProperty = null;
                await cls.loadProperties();
                this.selectedClass = cls;
            },
            addPropertyClicked() {
                this.newProperty = new classExtModel();
                (this.$refs.el0).show();
            },
            editPropertyClicked(p) {
                this.selectedProperty = p;
                (this.$refs['el' + p.id.toString()][0]).show();
            },
            async addClassClicked() {
                this.selectedClass = new classModel();
                this.selectedClass.name = this.searchText;
                await this.saveClassClicked()
            },
            async deleteClassClicked() {
                if ((await this.selectedClass.delete()).process()) {
                    this.searchedClasses.splice(this.searchedClasses.indexOf(this.selectedClass), 1);
                    this.selectedClass = null;
                }
            },
            async removePropertyClicked(p) {
                if ((await this.selectedClass.deleteExt(p.id)).process())
                    this.selectedClass.properties.splice(this.selectedClass.properties.indexOf(p), 1);
            },
            async saveClassClicked() {
                if (this.selectedClass.id === 0) {
                    //add
                    if ((await this.selectedClass.insert()).process())
                        this.searchedClasses.push(this.selectedClass);
                }
                else {
                    //update ext
                    if ((await this.selectedClass.update()).process()) {

                    }
                }
            },
            popupClosed(mode) {
                if (mode === 'update') {

                }
                else if (mode === 'insert') {

                }
                else if (mode === 'failed') {
                    this.selectClass(this.selectedClass);
                }
            }
        },
        computed: {
            canAddClass() {
                return this.searchText && this.searchedClasses.filter(v => v.name === this.searchText).length === 0;
            }
        }
    }
</script>

<style scoped>

</style>