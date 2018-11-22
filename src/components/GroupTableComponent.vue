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
            <tr v-for="groupValue in groupModel.groupValues">
                <td v-for="questionValue in groupValue.questionValues">{{questionValue.value}}</td>
                <td>
                    <a href="#" class="button edit"><i class="fa fa-edit" @click="editClicked(groupValue)"></i></a>
                    <a href="#" class="button remove"><i class="fa fa-times" @click="deleteClicked(groupValue)"></i></a>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{groupModel.title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <GroupComponent v-if="editingGroupValue!=null" v-bind:group-value="editingGroupValue"/>
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
    import GroupComponent from "@/components/GroupComponent";
    import {GroupValue} from "@/models/GroupValue";

    export default {
        components: {GroupComponent},
        props: ["groupModel"],
        name: "GroupTableComponent",
        data: function () {
            return {
                editingGroupValue: null
            }
        },
        methods: {
            btnAddClick: function () {
                //open modal GroupComponent
                let groupValue = new GroupValue(this.groupModel);
                this.editingGroupValue = groupValue;
                $('.modal').modal('show');
            },
            popUpOkClicked: function () {
                if (this.groupModel.groupValues.indexOf(this.editingGroupValue) === -1)
                    this.groupModel.groupValues.push(this.editingGroupValue);
                this.editingGroupValue = null;
                $('.modal').modal('hide');
            },
            editClicked: function (groupValue) {
                this.editingGroupValue = groupValue;
                $('.modal').modal('show');
            },
            deleteClicked: function (groupValue) {
                this.groupModel.groupValues.splice(this.groupModel.groupValues.indexOf(groupValue),1);
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
    .button{
        margin:3px;
    }
    .remove{
        color:red;
    }
    .edit{
    }
</style>