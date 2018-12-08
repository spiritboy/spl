<template>
    <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" ref="modal">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <input type="text" v-model="searchText">
                    <div style="float:left">
                        <button type="button" class="btn btn-primary" @click="popUpOkClicked"><i
                                class="fa fa-check"></i></button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"></i>
                        </button>

                    </div>
                    <span  v-if="Array.isArray(selectedQuestions)===true">
                        <span v-for="selectedQuestion in selectedQuestions"
                              class="badge badge-info"
                              @click="removeQuestion(selectedQuestion)">{{selectedQuestion.title}}</span>
                    </span>
                    <span v-else>
                        <span class="badge badge-info"
                              @click="removeQuestion(selectedQuestion)">{{selectedQuestions.title}}</span>
                    </span>
                    <hr>
                    <div v-for="g in groups">
                        <h4 style="margin-top: 10px">{{g.title}}</h4>
                        <hr>
                        <div class="row">
                            <div v-for="question in g.questions" class="col-md-3">
                                <input :type="isMultiple?'checkbox':'radio'" :value="question"
                                       v-model="selectedQuestions"
                                       :id="random+question.id">
                                <label :for="random+question.id"> {{question.title}} </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "QuestionSelectorComponent",
        props: ["_category", "isMultiple", "idPrefix"],
        data() {
            return {
                selectedGroup: null,
                selectedQuestions: [],
                searchText: '',
                random:Math.random()
            }
        },

        methods: {
            setSelectedGroup(g) {
                this.selectedGroup = g;
            },
            removeQuestion(q) {
                if (Array.isArray(this.selectedQuestions))
                    this.selectedQuestions.splice(this.selectedQuestions.indexOf(q), 1);
                else
                    this.selectedQuestions = null;
            },
            show() {
                $(this.$refs.modal).modal('show');
            },
            popUpOkClicked() {
                if (this.isMultiple)
                    this.$emit('onOk', this.selectedQuestions)
                else
                    this.$emit('onOk', this.selectedQuestions)
                $(this.$refs.modal).modal('hide');
            }
        },
        computed: {
            groups: function () {
                let _groups = [];

                this._category.groups.forEach(g => {
                    let _g = {title: g.title, questions: []};
                    g.questions.forEach(q => {
                        if (q.title.indexOf(this.searchText) !== -1)
                            _g.questions.push(q);
                    })
                    if (_g.questions.length > 0)
                        _groups.push(_g);
                });
                return _groups;
            }
        }
    }
</script>

<style scoped>
    label {
        margin: 5px;
    }

    .btn {
        margin: 5px;
    }

    .badge {
        margin: 3px;
        cursor: pointer;
        font-size: 13px;
    }
</style>