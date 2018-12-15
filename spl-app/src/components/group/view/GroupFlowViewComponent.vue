<template>
    <div class="group-details" v-if="groupValue!=null" >
        <div class="head">
            <span>{{groupValue.groupModel.title}}</span> <a href="#" @click.stop="edit()"><i class="fa fa-cogs"></i></a>
        </div>
        <div class="details">
            <div class="question row" v-for="qValue in groupValue.questionValues.filter(q=>!q.isEmpty())">
                <span class="question-title col-md-3">
                    {{qValue.questionModel.title}}:
                </span>
                <span class="question-value col-md-9">
                    <BaseFieldInfoViewComponent :question-value="qValue"/>
                </span>
            </div>
        </div>
        <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" ref="modal">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <GroupFlowComponent @finished="finish" v-if="groupValue!=null" v-bind:group-value="groupValue" ref="groupFlowComponent"/>
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
    import GroupFlowComponent from "../GroupFlowComponent";
    import BaseFieldInfoViewComponent from "../../fieldComponents/view/BaseFieldInfoViewComponent";

    export default {
        name: "GroupFlowViewComponent",
        components: {BaseFieldInfoViewComponent, GroupFlowComponent},
        props: ['groupValue', 'hideEmptyQuestions'],
        methods: {
            edit() {
                this.$refs.groupFlowComponent.stepId = -1;
                this.$refs.groupFlowComponent.nextStep();
                $(this.$refs.modal).modal('show');
            },
            popUpOkClicked() {
                $(this.$refs.modal).modal('hide');
            },
            finish(){
                $(this.$refs.modal).modal('hide');
            }
        }
    }
</script>

<style scoped>
    .group-details:hover {
        box-shadow: 1px 1px 10px #000;
    }

    .group-details {
        border-bottom: 1px solid lightgray;
        padding: 20px 10px;
    }

    .head {
        line-height: 50px;
        padding: 0 10px;
        font-size: larger;
    }
    .head span{
        vertical-align: top;
    }

.head i{
    font-size: xx-large;
    border:1px solid lightgray;
    border-radius: 5px;
    padding: 5px;
}
    .details {
        padding: 10px;

    }

    .question-title {
        color: gray;
    }
</style>