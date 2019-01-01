<template>
    <div class="row">

        <div class="col-md-3">
            <div class="class-ext">
                <div class="input-group mb-3">
                    <input v-model="searchText" @input="doSearch()" type="text" class="form-control"
                           placeholder="جستجو کنید ...">
                    <div class="input-group-prepend">
                        <button @click="doSearch()" class="btn input-group-text">
                            <i class="fa fa-search"></i>
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
        <div class="col-md-9" v-if="selectedClass!=null">
            <div class="class-ext">
                <h3>
                    <small>تعریف ترم برای</small>
                    {{selectedClass.name}}
                </h3>
                <div class="input-group mb-3" style="max-width: 250px">
                    <input v-model="searchTermText" @input="doSearchTerms()" type="text" class="form-control"
                           placeholder="جستجو کنید ...">
                    <div class="input-group-prepend">
                        <button @click="doSearchTerms()" class="btn input-group-text">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                    <div class="input-group-prepend">
                        <button @click="addNewTermClicked()" class="btn input-group-text">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                    <term-edit-component ref="termModal" :term="newTerm" @termSaved="termSaved"></term-edit-component>
                </div>
                <hr/>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th width="80">ردیف</th>
                        <th>نام</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(p,i) in searchedTerms">
                        <td width="80">{{i+1}}</td>
                        <td>{{p.name}}</td>
                        <td>
                            <button @click.prevent class="btn btn-light" @click.prevent="editPropertyClicked(p)"><i
                                    class="fa fa-edit"></i></button>
                            <button @click.prevent class="btn btn-light" @click.prevent="removePropertyClicked(p)">
                                <i
                                        class="fa fa-times"></i></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import {classModel} from "../model/classModel";
    import TermEditComponent from "./termEditComponent";
    import {termModel} from "../model/termModel";

    let context = {
        searchedClasses: [],
        selectedClass: null,
        searchedTerms: [],
        searchTermText: '',
        searchText: '',
        newTerm: null
    }
    export default {
        name: "termComponent",
        components: {TermEditComponent},
        data() {
            return context;
        },
        methods: {
            doSearch() {
                classModel.Select(this.searchText, 1, 100).then(d => this.searchedClasses = d);
            },
            async doSearchTerms() {
                this.searchedTerms = await this.selectedClass.SelectTerms(this.searchTermText, 1, 100);
            },
            selectClass(cls) {
                this.selectedClass = cls;
                this.doSearchTerms();
            },
            async addNewTermClicked() {
                this.newTerm = new termModel(this.selectedClass.id);
                await this.newTerm.initFull();
                //this.$refs.termModal.term = newTerm;
                this.$refs.termModal.show();
            },
            editPropertyClicked() {

            },
            async removePropertyClicked(p) {
                if((await p.delete()).process())
                    this.searchedTerms.splice(this.searchedTerms.indexOf(p),1);
            },
            termSaved(term, isInsert) {
                if (isInsert) {
                    this.searchedTerms.push(term);
                }
            }
        }
    }
</script>

<style scoped>

</style>