<template>
    <div class="container" style="position: relative;min-height: 400px">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb" v-if="selectedTreeModel!=null" style="position: relative;">
                <a @click="closeBradCrumbClicked"
                   style="color:#a90000;margin:0px 10px;position: absolute;top:0;right:-5px;cursor: pointer;"><i
                        class="fa fa-times"></i></a>
                <li class="breadcrumb-item" v-for="(term,i) in selectedTreeModel.terms">
                    <a @click="selectMeAsParent(term)">{{term.name}}
                    </a>
                </li>
            </ol>
        </nav>
        <form class="form-inline" style="position: relative;margin: 10px;">
            <input class="form-control mr-sm-2" type="text" v-model="searchText" @input="_doSearch()"
                   placeholder="جستجو کنید ..." aria-label="Search">
            <button @click.prevent="addTerm" class="btn btn-info">
                <i class="fa fa-plus"></i>
                <i v-if="selectedTreeModel!=null" class="fa fa-level-down-alt fa-flip-horizontal"></i>
            </button>
            <div class="search-results pop-up" ref="popup">
                <ul>
                    <li v-for="searchTreeModel in searchResult" class="search-result-item"
                        @click="onSearchClicked(searchTreeModel)">
                        <div :class="{'other':searchTreeModel.OID > 0}">
                            <span v-for="(term,i) in searchTreeModel.terms"
                                  :class="{'highlight':i == searchTreeModel.terms.length-1}">
                            {{term.name}}
                            <i v-if="i<searchTreeModel.terms.length-1" class="fa fa-chevron-left"></i>
                        </span>
                        </div>
                    </li>
                </ul>
            </div>
        </form>
        <hr>
        <div v-if="selectedTreeModel!=null" class="row">
            <div class="col-6">
                <div>
                    <i class="fa fa-sitemap" style="font-size: 13px"></i>
                    <span> فرزندان</span>
                    <span> ({{selectedTreeModel.lastTerm.name}})</span>
                </div>
                <table class="children table table-responsive">
                    <thead>
                    <tr>
                        <th width="150">ردیف</th>
                        <th width="150">نام</th>
                        <th width="150">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="row,i in searchChildren">
                        <td>{{i+1}}</td>
                        <td>
                            <input v-if="row.editting === true" v-model="row.name"/>
                            <span v-else>{{row.name}}</span>
                        </td>
                        <td>
                            <div>
                                <a>
                                    <i @click="row.editting = !row.editting"
                                       :class='["fa", {"fa-check":row.editting == true}, {"fa-edit":row.editting == false}]'></i>
                                </a>
                                <a @click="selectMeAsParent(row,true)"><i class="fa fa-sitemap fa-rotate-90"></i></a>
                                <a @click="deleteFromChildren(row)"><i class="fa fa-times"></i></a>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-6">
                <form class="form-inline">
                    <label>نام:</label>
                    <input class="form-control mr-sm-2" type="text" v-model="selectedTreeModel.lastTerm.name"
                           placeholder="عنوان ..." aria-label="Search">
                </form>
                <hr/>
                <div>
                    <i class="fa fa-list" style="font-size: 13px"></i>
                    <span>خصوصیات اضافه</span>
                    <span> ({{selectedTreeModel.lastTerm.name}})</span>
                </div>
                <table class="children table table-responsive">
                    <thead>
                    <tr>
                        <th width="150">ردیف</th>
                        <th width="150">خصوصیت</th>
                        <th width="150">مقدار</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
        <div v-show="busy > 0" class="busy-div">
            <img src="img/loader.gif"/>
        </div>
    </div>
</template>

<script>
    import {term} from "../../../api/term";
    import {treeModel} from "./model/searchTreeModel";
    import {termModel} from "./model/termModel";

    let _ = require('lodash');
    let busyTimer = null;
    let debouncedSearch = null;
    let context = {
        searchResult: [],
        searchChildren: [],
        selectedTreeModel: null,
        searchText: '',
        busy: 0,
    }
    export default {
        name: "termRoute",
        data() {
            return context;
        },
        mounted() {
            debouncedSearch = _.debounce(this.doSearch, 250, {'maxWait': 1000});
        },
        methods: {
            setIsBusy(busy) {
                if (busy === false) {
                    this.busy--;
                }
                else {
                    busyTimer = setTimeout((function() {
                        this.busy++;
                    }).bind(this), 500);
                }
            },
            _doSearch() {
                debouncedSearch();
            },
            doSearch(selectSingle) {
                this.setIsBusy(true);
                if (this.selectedTreeModel == null) {
                    //search everything
                    $(this.$refs.popup).addClass('open');
                    this.searchResult = [];
                    term.SearchTree(this.searchText).then(d => {
                        this.searchResult = [];
                        for (let item of d.data) {
                            let itemModel = new treeModel();
                            itemModel.deserialize(item);
                            this.searchResult.push(itemModel);
                        }
                        if (selectSingle === true && this.searchResult.length === 1) {
                            this.onSearchClicked(this.searchResult[0])
                        }
                    }).finally(() => {
                        this.setIsBusy(false);
                    });
                }
                else {
                    //search children
                    this.searchChildren = [];
                    term.Children(this.selectedTreeModel.lastTerm.id, this.searchText, 30, 1).then(d => {
                        this.searchChildren = [];
                        for (let item of d.data) {
                            let term = new termModel();
                            term.id = (item.ID);
                            term.name = (item.Name);
                            this.searchChildren.push(term);
                        }
                    }).finally(() => {
                        this.setIsBusy(false);
                    });
                    ;
                }
            },
            onSearchClicked(select) {
                this.searchText = '';
                this.selectedTreeModel = select;
                $(this.$refs.popup).removeClass('open');
                this.doSearch();
            },
            closeBradCrumbClicked() {
                this.searchText = '';
                this.selectedTreeModel = null;
            },
            addTerm() {
                let child = {
                    ParentID: this.selectedTreeModel == null ? 0 : this.selectedTreeModel.lastTerm.id,
                    Name: this.searchText
                };
                this.setIsBusy(true);
                term.InsertChild(child).then(d => {

                    if (this.selectedTreeModel == null) {
                        this.doSearch(true)
                    }
                    else {
                        this.searchText = '';
                        this.doSearch();
                    }
                }).finally(() => {
                    this.setIsBusy(false);
                });
            },
            selectMeAsParent(term, fromChild) {
                if (this.selectedTreeModel != null) {
                    if (fromChild === true) {
                        let t = new termModel();
                        t.id = term.id;
                        t.name = term.name;
                        this.selectedTreeModel.terms.push(t)
                        this.doSearch();
                    }
                    else {
                        let foundId = -1;
                        for (let i = 0; i < this.selectedTreeModel.terms.length; i++) {
                            if (this.selectedTreeModel.terms[i].id === term.id) {
                                foundId = this.selectedTreeModel.terms[i].id;
                                break;
                            }
                        }
                        while (foundId !== -1 && this.selectedTreeModel.lastTerm.id !== foundId)
                            this.selectedTreeModel.terms.pop();
                        this.doSearch();
                    }
                }
            },
            deleteFromChildren(term) {
                //this.selectedTreeModel.terms.sp
            }
        }

    }
</script>

<style scoped>
    .breadcrumb-item {
        cursor: pointer;
    }

    .breadcrumb-item:last-child a {
        border: 1px solid lightgray;
        padding: 2px;
        border-radius: 5px;
        background-color: rgba(199, 185, 255, 0.75);
    }

    .search-results.open {
        display: block;
    }

    .search-results {
        display: none;
        cursor: pointer;
        background-color: white;
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 5px;
        position: absolute;
        top: 40px;
        z-index: 1000;
        min-width: 200px;
    }

    ul {
        padding: 5px;
    }

    li {
        list-style: none;
    }

    .search-results .search-result-item .fa {
        font-size: 10px;
    }

    .search-results .search-result-item .highlight {
        color: red;
    }

    .search-results .search-result-item:hover {
        background-color: #c5c5c5;
    }

    .search-results .search-result-item .other .highlight {
        color: rgba(156, 0, 8, 0.55);
    }

    .other {
        color: #a3a3a3;
    }

    td a {
        font-size: smaller;
        margin: 5px;
    }

    .busy-div {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
        vertical-align: center;
        background-color: rgba(181, 172, 255, 0.76);
    }

    .busy-div img {
        vertical-align: middle;
        position: absolute;
        top: 40%;
    }
</style>