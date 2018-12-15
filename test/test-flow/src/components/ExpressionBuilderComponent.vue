<template>
    <div>
        <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" ref="modal">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div style="text-align:left">
                            <button type="button" class="btn btn-primary" @click="popUpOkClicked"
                                    :disabled="!isExpressionValid()"><i
                                    class="fa fa-check"></i></button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"><i
                                    class="fa fa-times"></i>
                            </button>
                        </div>

                        <div class="row" style="direction: ltr;text-align: left">
                            <div class="col-md-3">
                                <div>
                                    <span>Value:</span><input style="width: 50px;margin: 3px;" type="text" v-model="plain"/>
                                    <a @click="valueClicked()">
                                        <i class="fa fa-forward"></i>
                                    </a>
                                </div>
                                <div>
                                    <a @click="selectQuestion">انتخاب سوال</a>
                                </div>
                                <draggable class="draggable"
                                           style="border:1px solid lightgray;padding: 3px;"
                                           :options="{group:{name:'phrase',  pull:'clone', put:false}}">
                                    <div v-for="(op,i) in operations">
                                        <span style="cursor: pointer;min-width:50px"
                                              class='badge badge-info'>{{op.value}}
                                        </span>
                                    </div>
                                </draggable>
                            </div>
                            <div class="col-md-9" style="border:1px solid lightgray;padding: 3px;">
                                <draggable v-model="condition.value" class="draggable"
                                           :options="{group:{name:'phrase' }}" style="height: 100px">
                            <span v-for="(v,i) in condition.value" v-model="condition.value[i]"
                                  class="select-order">
                            {{v.title}}
                            </span>
                                </draggable>
                                <a @click.prevent="removeLastOrder" class="btn btn-warning"><i
                                        class="fa fa-arrow-left"></i></a>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
        <QuestionSelectorComponent v-if="category!=null"
                                   :_category="category"
                                   ref="questionSelector"
                                   @onOk="questionSelectorOk"
                                   :is-multiple="false"
        />
    </div>
</template>

<script>
    import QuestionSelectorComponent from "./QuestionSelectorComponent";
    import draggable from 'vuedraggable'

    export default {
        name: "ExpressionBuilderComponent",
        components: {QuestionSelectorComponent, draggable},
        props: ["category", "condition"],
        data() {
            return {
                plain:'',
                operations: [
                    {type: 'operand', value: '+', title: '+'},
                    {type: 'operand', value: '-', title: '-'},
                    {type: 'operand', value: '*', title: '*'},
                    {type: 'operand', value: '/', title: '/'},
                    {type: 'operand', value: '(', title: '('},
                    {type: 'operand', value: ')', title: ')'}]
            }
        },
        methods: {
            valueClicked(){
                this.condition.value.push({value:this.plain,title:this.plain,type:'plain'});
                this.plain = '';
            },
            show() {
                $(this.$refs.modal).modal('show');
            },
            popUpOkClicked() {

            },
            isExpressionValid() {

            },
            removeLastOrder() {
                this.condition.value.pop();
            },
            selectQuestion() {
                 this.$refs.questionSelector.show();
            },
            questionSelectorOk(selected) {
                console.log(selected)
                this.condition.value.push({value:selected.id,title:selected.title,type:'question'})
            }
        }
    }
</script>

<style scoped>
    .select-order {
        border: 0px;
        border-bottom: 1px solid lightgray;
        margin: 2px;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: '';
        padding: 2px 8px;
        background-color: lightgray;
    }
</style>