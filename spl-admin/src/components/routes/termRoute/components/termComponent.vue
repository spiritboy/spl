<template>
    <div class="vdl-parent">
        <div class="row">

            <div class="col-md-3">
                <div class="class-ext">
                    <div class="input-group mb-3">
                        <input v-model="searchText" @input="debounceDoSearch" type="text" class="form-control"
                               placeholder="جستجو کنید ...">
                        <div class="input-group-prepend">
                            <button @click="doSearch()" class="btn input-group-text">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <ul class="search-list">
                        <li v-for="search in searchedClasses" @click="selectSearch(search)"
                            :class="{'active':search === selectedSearch}">
                            <span :style="{opacity:(search.termId?.5:1)}">{{search.cls.name}}</span>
                            <small v-if="search.termId" class="fa fa-chevron-left"
                                   style="opacity: .5;margin: 3px"></small>
                            <span v-if="search.termId"> {{search.termName}}</span>
                            <sup v-if="search.oId == 2"><span class="badge badge-info">id</span> </sup>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-9" v-if="selectedSearch!=null && selectedSearch.cls!=null">
                <div class="class-ext">
                    <h3>
                        <small>تعریف ترم برای</small>
                        {{selectedSearch.cls.name}}
                    </h3>
                    <div class="input-group mb-8" style="max-width: 350px">
                        <input v-model="searchTermText" @input="debounceDoSearchTerms()" type="text" class="form-control"
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
                        <term-edit-component ref="termModal" :term="newTerm"
                                             @termSaved="termSaved"></term-edit-component>
                    </div>
                    <table class="table table-sm table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>نام</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(p,i) in searchedTerms">
                            <td>{{i+1}}</td>
                            <td  @click="showInfo(p)"><i class="fa fa-info-circle"></i> <span>{{p.name}}</span></td>
                            <td>
                                <button @click.prevent class="btn btn-light" @click.prevent="editTermClicked(p)">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button @click.prevent class="btn btn-light" @click.prevent="removeTermClicked(p)">
                                    <i class="fa fa-times"></i>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
        <loading :active.sync="isLoading"
                 :is-full-page="!isLoading"></loading>
    </div>
</template>

<script>
    import TermEditComponent from "./termEditComponent";
    import {termModel} from "../model/termModel";
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    let context = {
        searchedClasses: [],
        selectedSearch: null,
        searchedTerms: [],
        searchTermText: '',
        searchText: '',
        newTerm: null,
        isLoading: false
    };
    let $vm = null;
    export default {
        name: "termComponent",
        components: {TermEditComponent, Loading},
        data() {
            return context;
        },
        mounted() {
            $vm = this;
            this.doSearch();
        },
        methods: {
            debounceDoSearch: _.debounce(()=>{
                $vm.doSearch();
            },500),
            async doSearch() {
                try {
                    this.isLoading = true;
                    this.searchedTerms = [];
                    this.selectedSearch = null;
                    this.searchedClasses = await termModel.SearchClassAndTerms(this.searchText, 1, 100);
                } catch (e) {

                }
                this.isLoading = false;
            },
            debounceDoSearchTerms: _.debounce(()=>{
                $vm.doSearchTerms();
            },500),
            async doSearchTerms() {
                try {
                    this.isLoading = true;
                    this.searchedTerms = await this.selectedSearch.cls.SelectTerms(this.searchTermText, 1, 10);
                } catch (e) {

                }
                this.isLoading = false;
            },
            selectSearch(search) {
                this.searchTermText = '';
                this.selectedSearch = search;
                if (this.selectedSearch.termId)
                    this.searchTermText = this.selectedSearch.termName;
                this.doSearchTerms();
            },
            async addNewTermClicked() {
                this.newTerm = new termModel(this.selectedSearch.cls.id);
                this.newTerm.name = this.searchTermText;
                await this.newTerm.initFull();
                this.$refs.termModal.show();
            },
            async editTermClicked(term) {
                this.newTerm = term;
                await this.newTerm.initFull();
                this.$refs.termModal.show();
            },
            async removeTermClicked(p) {
                if ((await p.delete()).process())
                    this.searchedTerms.splice(this.searchedTerms.indexOf(p), 1);
            },
            termSaved(term, isInsert) {
                if (isInsert) {
                    this.searchedTerms.push(term);
                }
            },
            showInfo(p){
                alert(p.propertiesString)
            }
        }
    }
</script>

<style scoped>
    table button {
        padding: 0px 5px;
    }

    td.properties {
        font-size: 12px
    }

    table th:first-child {
        width: 0px;
    }

    table th:last-child {
        width: 60px;
    }
    table td .fa-info-circle{
        margin: 0 0 0 10px;
    }
</style>