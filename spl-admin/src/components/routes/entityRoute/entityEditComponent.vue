<template>
    <div class="modal fade" role="dialog" aria-hidden="true" ref="modal" v-if="entity!=null">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <span>ایجاد </span>
                    <span v-if="entity.classModel!=null">{{entity.classModel.name}}</span>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="form form-horizontal">

                        <div class="form-group">
                            <label class="control-label">
                                <span>نام</span>
                                <sup class="fa fa-asterisk"></sup>
                            </label>
                            <input v-model="entity.name" class="form-control" @change="nameChanged"/>
                        </div>

                        <div v-if="entity.classModel!=null && entity.extendeds.length > 0">
                            <div v-for="(property,i) in entity.classModel.properties" class="form-group">
                                <div v-if="property._dataType === 'string'">
                                    <label class="control-label">
                                        <span>{{property.name}} </span>
                                        <sup v-if="property.isRequired" class="fa fa-asterisk"></sup>
                                    </label>
                                    <input v-model="entity.extendeds[i].name" type="text" class="form-control"/>
                                </div>
                                <div v-else-if="property.dataType === 'number'">
                                    <label class="control-label">
                                        <span>{{property.name}} </span>
                                        <sup v-if="property.isRequired" class="fa fa-asterisk"></sup>
                                    </label>
                                    <input v-model="entity.extendeds[i].name" type="number" class="form-control"/>
                                </div>
                                <div v-else-if="property.dataType === 'date'">
                                    <label class="control-label">
                                        <span>{{property.name}} </span>
                                        <sup v-if="property.isRequired" class="fa fa-asterisk"></sup>
                                    </label>
                                    <input v-model="entity.extendeds[i].name" type="date" class="form-control"/>
                                </div>
                                <div v-else-if="property.dataType === 'fieldInfo'">
                                    <label class="control-label">
                                    </label>
                                    <FieldInfo v-model="entity.extendeds[i].fieldInfo"></FieldInfo>
                                </div>
                                <div v-else-if="property.dataType === 'lookup'">
                                    <label class="control-label">
                                        <span>{{property.name}} </span>
                                        <sup v-if="property.isRequired" class="fa fa-asterisk"></sup>
                                    </label>
                                    <Select2 v-model="entity.extendeds[i].fieldInfo" class="form-control"
                                             :multiple="entity.extendeds[i].classExtModel.isMultiSelect"
                                             :options="[{id:entity.extendeds[i].id,text:entity.extendeds[i].name}]"
                                             :api="doSearchTerms"
                                             :apiState="entity.extendeds[i].classExtModel.clsId"/>
                                </div>
                            </div>
                        </div>
                        <div v-if="errors.length" class="validation-error">
                            <ul>
                                <li v-for="error in errors">{{ error }}</li>
                            </ul>
                        </div>
                    </form>
                    <div v-if="similarProperties.length > 0" class="similar">
                        <hr/>
                        <span>موارد مشابه:</span>
                        <ul class="search-list">
                            <li v-for="searchBar in similarProperties" @click="selectSimilar(searchBar)"
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
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"></i>
                    </button>
                    <button type="button" class="btn btn-primary"
                            @click="popUpOkClicked">
                        <i class="fa fa-check"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Select2 from "../../shared/Select2";
    import {entity} from "../../../api/entity";
    import {term} from "../../../api/term";
    import {searchBarModel} from "./models/searchBarModel";
    import {entityModel} from "./models/entityModel";
    import FieldInfo from "./fields/FieldInfo";

    export default {
        name: "entityEditComponent",
        components: {FieldInfo, Select2},
        props: ["entity"],
        data() {
            return {
                errors: [],
                similarProperties: [],
                selectedSimilar: null
            }
        },
        methods: {
            async nameChanged() {
                this.similarProperties = (await entity.SelectSimilar(this.entity.levelId, this.entity.parentId, this.entity.name)).data.map(v => new searchBarModel().deserialize(v));
            },
            show() {
                this.similarProperties = [];
                //this.selectedSimilar = null
                $(this.$refs.modal).modal('show');
            },
            async doSearchTerms(q, pp, pn, state) {
                return term.TermSelect(state, q, pp, pn);
            },
            async popUpOkClicked() {
                this.errors = [];
                if (!this.entity.isValid())
                    this.errors.push('مقادیر ستاره دار را پر کنید')
                if (this.errors.length > 0)
                    return;
                let isInsert = this.entity.id === 0;
                if ((await this.entity.insertUpdate()).process()) {
                    this.$emit('entitySaved', this.entity, isInsert);
                    $(this.$refs.modal).modal('hide');
                }
            },
            async selectSimilar(searchBar) {
                let d = await entityModel.insertSimilar(searchBar.id, this.entity.parentId);
                if (d.process()) {
                    $(this.$refs.modal).modal('hide');
                    this.$emit('entitySaved', this.entity, false);
                }
            }
        }
    }
</script>

<style scoped>
    .similar li {
        cursor: pointer;
        list-style: none;
    }

    .similar li.active {
        background-color: rgb(231, 231, 231);
    }

    .similar li:hover {
        background-color: rgba(155, 154, 255, 0.41);
    }
</style>