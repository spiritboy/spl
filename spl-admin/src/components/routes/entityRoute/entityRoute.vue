<template>
    <div class="container full-width-container" style="margin-top: 10px;position: relative;min-height: 400px">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb" style="position: relative;">
                <a @click="closeBradCrumbClicked"
                   style="color:#a90000;margin:0px 10px;position: absolute;top:0;right:-5px;cursor: pointer;">
                    <i class="fa fa-times"></i>
                </a>
                <li class="breadcrumb-item" v-if="selectedSearchBarItem!=null && selectedSearchBarItem.MenuItem!=null">
                    <a @click="breadCrumbSelect(selectedSearchBarItem.MenuItem)" href="#">{{selectedSearchBarItem.MenuItem.name}}</a>
                </li>
                <li class="breadcrumb-item"
                    v-if="selectedSearchBarItem!=null && selectedSearchBarItem.CategoryItem!=null">
                    <a @click="breadCrumbSelect(selectedSearchBarItem.CategoryItem)" href="#">{{selectedSearchBarItem.CategoryItem.name}}</a>
                </li>
                <li class="breadcrumb-item" v-if="selectedSearchBarItem!=null && selectedSearchBarItem.GroupItem!=null">
                    <a @click="breadCrumbSelect(selectedSearchBarItem.GroupItem)" href="#">{{selectedSearchBarItem.GroupItem.name}}</a>
                </li>
                <li class="breadcrumb-item"
                    v-if="selectedSearchBarItem!=null && selectedSearchBarItem.QuestionItem!=null">
                    <a href="#">{{selectedSearchBarItem.QuestionItem.name}}</a>
                </li>
            </ol>
        </nav>
        <div class="row">
            <div class="col-3">
                <div class="class-ext">
                    <div class="input-group mb-6">
                        <input v-model="searchText" @input="debounceDoSearch" type="text" class="form-control"
                               placeholder="جستجو کنید ...">
                        <div class="input-group-prepend">
                            <button @click="doSearch()" class="btn input-group-text">
                                <i class="fa fa-search"></i>
                            </button>
                            <div class="input-group-prepend">
                                <button @click="addNewMenuClicked()" class="btn input-group-text"
                                        title="افزودن منوی جدید">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <ul class="search-list">
                        <li v-for="searchBar in searchedArray" @click="selectSearch(searchBar)"
                            :class="{'active':searchBar === selectedSearchBarItem}"
                            style="direction: rtl;text-align: right">
                           <span class="bar-item"
                                 v-if="searchBar.MenuItem!=null"
                                 :class="{'found':searchBar.MenuItem!=null && searchBar.id.toString() === searchBar.MenuItem.id.toString()}">
                               {{searchBar.MenuItem.name}}
                           </span>
                            <i v-if="searchBar.CategoryItem!=null" class="fa fa-chevron-left"></i>
                            <span class="bar-item" v-if="searchBar.CategoryItem!=null"
                                  :class="{'found':searchBar.CategoryItem!=null && searchBar.id.toString() === searchBar.CategoryItem.id.toString()}">
                                {{searchBar.CategoryItem.name}}
                           </span>
                            <i v-if="searchBar.GroupItem!=null" class="fa fa-chevron-left"></i>
                            <span class="bar-item" v-if="searchBar.GroupItem!=null"
                                  :class="{'found':searchBar.GroupItem!=null && searchBar.id.toString() === searchBar.GroupItem.id.toString()}">
                                {{searchBar.GroupItem.name}}
                           </span>
                            <i v-if="searchBar.QuestionItem!=null" class="fa fa-chevron-left"></i>
                            <span class="bar-item" v-if="searchBar.QuestionItem!=null"
                                  :class="{'found':searchBar.QuestionItem!=null && searchBar.id.toString() === searchBar.QuestionItem.id.toString()}">
                                {{searchBar.QuestionItem.name}}
                           </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-9">
                <div v-if="selectedSearchBarItem!=null && selectedSearchBarItem.LastItem.treeLevel!==4">
                    <div class=" alert alert-primary">
                        <i class="fa fa-sitemap" style="font-size: 13px"></i>
                        <span class="font-weight-bold"> {{getTitle()}}</span>
                    </div>
                    <div class="input-group mb-8" style="max-width: 350px">
                        <input v-model="searchChildText" @input="debounceDoSearchChildren()" type="text"
                               class="form-control"
                               placeholder="جستجو کنید ...">
                        <div class="input-group-prepend">
                            <button @click="doSearchChildren()" class="btn input-group-text">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                        <div class="input-group-prepend">
                            <button @click="addNewChildClicked()" class="btn input-group-text">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <table class="children table table-striped table-bordered table-sm">
                        <thead>
                        <tr>
                            <th>ردیف</th>
                            <th>نام</th>
                            <th>عنوان</th>
                            <th>عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="row,i in children">
                            <td>{{i+1}}</td>
                            <td lang="en">
                                <a href="#" @click="selectAsParent(row)"><span>{{row.entityName}}</span></a>
                            </td>
                            <td >
                                <a href="#" @click="selectAsParent(row)"><span>{{row.name}}</span></a>
                            </td>
                            <td>
                                <div>
                                    <a class="btn-icon" @click="selectAsParent(row)"><i class="fa fa-sitemap fa-rotate-90"></i></a>
                                    <a class="btn-icon" @click="editEntity(row)"><i class="fa fa-edit"></i></a>
                                    <a class="btn-icon" @click="deleteEntity(row)"><i class="fa fa-times"></i></a>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <hr>
                <div v-if="lastEntityModel!=null && selectedSearchBarItem!=null && selectedSearchBarItem.LastItem.treeLevel!==4">
                    <div class="alert alert-primary">
                        <i class="fa fa-sitemap" style="font-size: 13px"></i>
                        <span class="font-weight-bold"> خصوصیات </span>{{selectedSearchBarItem.LastItem.name}} <i class="fa fa-edit" @click="editLastEntity()"></i>
                    </div>
                    <table v-if="lastEntityModel.classModel!=null" class="children table table-striped table-bordered table-sm">
                        <thead>
                        <tr>
                            <th>ردیف</th>
                            <th>نام</th>
                            <th>مقدار</th>
                            <th>عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr  v-for="p,i in lastEntityModel.classModel.properties">
                            <td>{{i+1}}</td>
                            <td lang="en">
                                <span>{{p.name}}</span>
                            </td>
                            <td>
                                <span>{{lastEntityModel.getValueOfProperty(p.id)}}</span>
                            </td>
                            <td>
                                <div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <loading :active.sync="isLoading"
                 :is-full-page="!isLoading"></loading>

        <entity-edit-component ref="entityModal" :entity="newEntity"
                               @entitySaved="newEntitySaved"></entity-edit-component>
    </div>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import {searchBarModel} from "./models/searchBarModel";
    import {searchChildrenModel} from "./models/searchChildrenModel";
    import EntityEditComponent from "./entityEditComponent";
    import {entityModel} from "./models/entityModel";

    let context = {
        searchText: '',
        searchedArray: [],
        selectedSearchBarItem: null,
        lastEntityModel:null,
        children: [],
        searchChildText: '',
        newEntity: new entityModel(),
        isLoading: false,
        searchResult: []
    };
    let $vm = null;
    export default {
        name: "entityRoute",
        components: {EntityEditComponent, Loading},
        data() {
            return context;
        },
        mounted() {
            $vm = this;
            this.doSearch();
        },
        methods: {
            debounceDoSearch: _.debounce(() => {
                $vm.doSearch();
            }, 500),
            debounceDoSearchChildren: _.debounce(() => {
                $vm.doSearchChildren();
            }, 500),
            async doSearch() {
                try {
                    this.isLoading = true;
                    this.searchedArray = [];
                    this.selectedSearchBarItem = null;
                    this.searchedArray = await searchBarModel.searchTree(this.searchText, 100, 1);
                } catch (e) {

                }
                this.isLoading = false;
            },
            async doSearchChildren() {
                try {
                    this.isLoading = true;
                    this.children = [];
                    this.children = await searchChildrenModel.children(this.selectedSearchBarItem.LastItem.id, this.searchChildText, 100, 1);
                } catch (e) {

                }
                this.isLoading = false;
            },
            async selectSearch(selectedSearchItem) {
                this.isLoading = true;
                try{
                    this.searchChildText = '';
                    this.selectedSearchBarItem = selectedSearchItem;
                    await this.setLastEnitityModel(this.selectedSearchBarItem.LastItem.id,this.selectedSearchBarItem.LastItem.entityName);
                    await this.doSearchChildren();
                } catch(e){

                }
                this.isLoading = false;

            },
            closeBradCrumbClicked() {
                this.searchText = '';
                this.selectedSearchBarItem = null;
                this.doSearch();
            },
            async addNewChildClicked() {
                let levelId = this.selectedSearchBarItem.LastItem.treeLevel + 1;
                let clsId = await entityModel.getClsIdsByLevel(levelId);
                this.newEntity = new entityModel(levelId, clsId, this.selectedSearchBarItem.LastItem.id);
                this.newEntity.name = this.searchTermText;
                await this.newEntity.initFull();
                this.$refs.entityModal.show();
            },
            async addNewMenuClicked() {
                this.isLoading = true;
                this.newEntity = new entityModel(1, await entityModel.getClsIdsByLevel(1), 0);
                this.newEntity.name = this.searchTermText;
                await this.newEntity.initFull();
                this.isLoading = false;
                this.$refs.entityModal.show();
            },
            async newEntitySaved() {
                await this.doSearchChildren();
            },
            editLastEntity(){
                this.newEntity = this.lastEntityModel;
                this.$refs.entityModal.show();
            },
            async editEntity(entity) {
                this.isLoading = true;
                let levelId = this.selectedSearchBarItem.LastItem.treeLevel + 1;
                let clsId = await entityModel.getClsIdsByLevel(levelId);
                this.newEntity = new entityModel(levelId, clsId, this.selectedSearchBarItem.LastItem.id);
                this.newEntity.name = entity.entitiyName;
                this.newEntity.id = entity.id;
                await this.newEntity.initFull();
                this.isLoading = false;
                this.$refs.entityModal.show();
            },
            async deleteEntity(e) {
                this.isLoading = true;
                if(confirm('آیا حذف شود؟')){
                    await entityModel.deleteEntity(e.id);
                    await this.doSearchChildren();
                }
                this.isLoading = false;
            },
            async selectAsParent(child) {
                this.isLoading = true;
                try{
                    this.selectedSearchBarItem.addChild(child.id, child.name);
                    await this.setLastEnitityModel(child.id,child.entityName);
                    await this.doSearchChildren();
                }catch(e){

                }
                this.isLoading = false;
            },
            async setLastEnitityModel(id,name){
                let levelId = this.selectedSearchBarItem.LastItem.treeLevel;
                let clsId = await entityModel.getClsIdsByLevel(levelId);
                this.lastEntityModel = new entityModel(levelId, clsId);
                this.lastEntityModel.name = name;
                this.lastEntityModel.id = id;
                await this.lastEntityModel.initFull();
            },
            async breadCrumbSelect(item) {
                while (this.selectedSearchBarItem.LastItem !== null && this.selectedSearchBarItem.LastItem.id !== item.id) {
                    this.selectedSearchBarItem.popChild();
                }
                await this.doSearchChildren();
            },
            getTitle() {
                switch (this.selectedSearchBarItem.LastItem.treeLevel) {
                    case 1:
                        return "کتگوری ها";
                    case 2:
                        return "گروه ها";
                    case 3:
                        return "سوال ها";
                }
                return this.selectedSearchBarItem.LastItem.treeLevel;
            },
            getAddClassId() {
                if (this.selectedSearchBarItem == null || this.selectedSearchBarItem.LastItem == null)
                    return -1;
                switch (this.selectedSearchBarItem.LastItem.treeLevel) {
                    case 1:
                        return 6;
                    case 2:
                        return 7;
                    case 3:
                        return 8;
                }
                return this.selectedSearchBarItem.LastItem.treeLevel;
            }
        }
    }
</script>

<style scoped>
    .breadcrumb-item {
        cursor: pointer;
    }

    .breadcrumb {
        min-height: 48px;
    }

    .breadcrumb-item:last-child a {
        border: 1px solid lightgray;
        padding: 2px;
        border-radius: 5px;
        background-color: #cce5ff;
    }

    ul.search-list li {
        padding: 5px;
        border-bottom: 1px solid #eaeaea;
    }

    ul.search-list li span.bar-item {
        text-decoration: none;
        display: inline-block;
    }

    ul.search-list li span.found {
        text-decoration: underline;
        font-size: 17px;
    }
</style>