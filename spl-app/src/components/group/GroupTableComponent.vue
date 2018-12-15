<template>
    <div>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-primary" @click="btnAddClick"><i class="fa fa-plus"></i></button>
            <button type="button" class="btn btn-secondary"><i class="fa fa-save"></i></button>
        </div>
        <table class="table table-striped">
            <thead>
            <tr>
                <th v-for="q in groupModel.questions">{{q.title}}</th>
                <th>عملیات</th>
            </tr>
            </thead>
            <tbody>
            <tr v-bind:key="groupValue.id" v-for="groupValue in groupModel.groupValues">
                <td v-for="questionValue in groupValue.questionValues">
                    <div v-if="Array.isArray(questionValue.value)">
                        <span class="badge badge-primary" v-for="qv_ in questionValue.value" style="margin: 0 2px">{{qv_}}</span>
                    </div>
                    <div v-else>{{questionValue.value}}</div>
                </td>
                <td>
                    <a href="#" class="button edit"><i class="fa fa-edit" @click="editClicked(groupValue)"></i></a>
                    <a href="#" class="button remove"><i class="fa fa-times" @click="deleteClicked(groupValue)"></i></a>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" ref="modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{groupModel.title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" @keyup.enter="addAndNew">

                        <GroupComponent v-if="editingGroupValue!=null" v-bind:group-value="editingGroupValue"/>
                        <button type="button" class="btn btn-primary" @click="addAndNew">
                            <i class="fa fa-plus"></i>
                        </button>

                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"></i>
                        </button>
                        <button type="button" class="btn btn-primary" @click="popUpOkClicked"><i
                                class="fa fa-check"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GroupComponent from "@/components/group/GroupComponent";
    import {GroupValue} from "@/models/GroupValue";
    import GroupTableDetailsComponent from "@/components/group/view/GroupTableViewComponent";

    export default {
        components: {GroupTableDetailsComponent, GroupComponent},
        props: ["groupModel", "isDetails"],
        name: "GroupTableComponent",
        data: function () {
            return {
                editingGroupValue: null
            }
        },
        methods: {
            btnAddClick() {
                //open modal GroupComponent
                let groupValue = new GroupValue(this.groupModel);
                this.editingGroupValue = groupValue;
                $(this.$refs.modal).modal('show');
            },
            popUpOkClicked() {
                if (this.groupModel.groupValues.indexOf(this.editingGroupValue) === -1)
                //add
                    this.groupModel.groupValues.push(this.editingGroupValue);
                this.editingGroupValue = null;
                $(this.$refs.modal).modal('hide');
            },
            editClicked(groupValue) {
                this.editingGroupValue = groupValue;
                $(this.$refs.modal).modal('show');
            },
            deleteClicked(groupValue) {
                this.groupModel.groupValues.splice(this.groupModel.groupValues.indexOf(groupValue), 1);
            },
            addAndNew() {
                if (this.groupModel.groupValues.indexOf(this.editingGroupValue) === -1)
                //add
                    this.groupModel.groupValues.push(this.editingGroupValue);
                this.editingGroupValue.questionValues[0].events.emit('focus');
                this.editingGroupValue = new GroupValue(this.groupModel);

            }
        }
    }
</script>

<style scoped>
    .btn-group {
        font-size: small;
    }

    .btn {
        margin: 3px;
    }

    .button {
        margin: 3px;
    }

    .remove {
        color: red;
    }

    .edit {
    }
</style>