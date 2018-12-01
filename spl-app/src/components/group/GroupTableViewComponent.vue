<template>
    <div class="group-details" v-if="groupModel!=null">
        <div class="head">
            {{groupModel.title}}
            <div class="btn-group" role="group">
                <a class="btn" @click="btnAddClick"><i class="fa fa-plus"></i></a>
            </div>
        </div>
        <div class="details">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-for="q in groupModel.questions">{{q.title}}</th>
                    <th width="70px"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="groupValue in groupModel.groupValues">
                    <td v-for="questionValue in groupValue.questionValues">
                        <div v-if="Array.isArray(questionValue.value)">
                            <span class="badge badge-primary" v-for="qv_ in questionValue.value" style="margin: 0 2px">{{qv_}}</span>
                        </div>
                        <div v-else>{{questionValue.value}}</div>
                    </td>
                    <td>
                        <a href="#" class="btn edit"><i class="fa fa-edit" @click="editClicked(groupValue)"></i></a>
                        <a href="#" class="btn remove"><i class="fa fa-times" @click="deleteClicked(groupValue)"></i></a>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
        <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" ref="modal">
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
    import GroupComponent from "@/components/group/GroupComponent";
    import {GroupValue} from "@/models/GroupValue";

    export default {
        components: {GroupComponent},
        props: ["groupModel"],
        name: "GroupTableDetailsComponent",
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
            }
        }
    }
</script>

<style scoped>
    .group-details:hover {
        box-shadow: 1px 1px 10px #000;
    }
    .group-details:hover a.btn {
        display: initial;
    }

    .group-details {
        border-bottom: 1px solid lightgray;
        padding: 20px 10px;
    }

    .head {
        padding: 0 10px;
        font-size: larger;
    }

    .details {
        padding: 10px;

    }
    .remove {
        color: red;
    }
    a.btn{
        font-size: small;
        padding: 3px!important;
    }

</style>