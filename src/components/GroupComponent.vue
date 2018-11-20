<template>
  <div>
    <h2 v-if="GroupItem!=null">{{GroupItem.title}}</h2>
    <hr/>
    <form class="inline-form">
      <div class="form-row">
        <div class="form-group col-md-3" v-if="GroupItem!=null" v-for="question in GroupItem.questions">
          <label class="control-label">{{question.title}}</label>
          <input class="form-control" v-model="question.value"/>
        </div>
      </div>
      <div class="form-row">
        <button class="btn btn-success" v-on:click="save()">+</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    props: ['GroupItem'],
    name: "GroupComponent",
    methods: {
      save() {
        for (let q of this.GroupItem.questions) {
          console.log(q.value);
        }
      }
    }
  }
</script>

<style scoped>

</style>
