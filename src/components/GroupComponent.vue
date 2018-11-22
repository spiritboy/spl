<template>
  <div v-if="groupModel!=null">
    <h2 >{{groupModel.title}}</h2>
    <hr/>
    <form class="inline-form">
      <div class="form-row">
        <div class="form-group col-md-3" v-if="groupModel!=null" v-for="qv in groupModel.groupValues[0].questionValues">
            <TextComponent v-if="qv.questionModel.fieldInfo.name === 'text'" v-bind:question-value="qv"/>
            <DateComponent v-else-if="qv.questionModel.fieldInfo.name === 'date'" v-bind:question-value="qv"/>
            <SelectComponent v-else-if="qv.questionModel.fieldInfo.name === 'select'" v-bind:question-value="qv"/>
        </div>
      </div>
      <div class="form-row">
        <button class="btn btn-success" v-on:click="save()">+</button>
      </div>
    </form>
  </div>
</template>

<script>
  import TextComponent from "@/components/fieldComponents/TextComponent";
  import DateComponent from "@/components/fieldComponents/DateComponent";
  import SelectComponent from "@/components/fieldComponents/SelectComponent";
  export default {
      components: {SelectComponent, DateComponent, TextComponent},
      props: ['groupModel'],
    name: "GroupComponent",
    methods: {
      save() {
        for (let q of this.groupModel.questions) {
          console.log(q.value);
        }
      }
    }
  }
</script>

<style scoped>

</style>
