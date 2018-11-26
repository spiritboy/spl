<template>
  <div v-if="groupValue!=null">
    <h2 >{{groupValue.groupModel.title}}</h2>
    <hr/>
    <form class="inline-form">
      <div class="form-row">
        <div class="form-group col-md-3" v-if="groupValue.groupModel!=null"
             v-for="qv in groupValue.questionValues">
            <TextComponent v-if="qv.questionModel.fieldInfo.name === 'text'" v-bind:question-value="qv"/>
            <DateComponent v-else-if="qv.questionModel.fieldInfo.name === 'date'" v-bind:question-value="qv"/>
            <SelectComponent v-else-if="qv.questionModel.fieldInfo.name === 'select'" v-bind:question-value="qv"/>
        </div>
      </div>
      <div class="form-row">
        <button class="btn btn-success" v-on:click.prevent="save()">+</button>
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
      props: ['groupValue'],
    name: "GroupComponent",
    methods: {
      save() {
        for (let q of this.groupValue.questionValues) {
          console.log(q.value);
        }
      }
    }
  }
</script>

<style scoped>

</style>
