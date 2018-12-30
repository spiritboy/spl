<template>
    <div class="expansion-panel" v-on:contentUpdated="contentUpdated">
        <button class="accordion" @click="toggle" :class="{'expanded':expanded,'not-expanded':!expanded}">
            <i :class="{'fa chevron fa-chevron-up':expanded,'fa chevron fa-chevron-down':!expanded}"></i>
            <div class="head">
                <slot name="header"></slot>
            </div>
        </button>
        <div class="panel" ref="panel" :class="{'expanded':expanded,'not-expanded':!expanded}">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ExpansionPanelComponent",
        props: ["head", "body"],
        data() {
            return {expanded: false}
        },
        methods: {
            toggle() {
                this.expanded = !this.expanded;
                this.calcHeight();
            },
            calcHeight() {
                // if (this.$refs.panel.style.maxHeight && this.expanded === false) {
                //     this.$refs.panel.style.maxHeight = null;
                // } else {
                //     this.$refs.panel.style.maxHeight = this.$refs.panel.scrollHeight + "px";
                // }
                let panel = this.$refs.panel;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            },
            contentUpdated() {
                // setTimeout(() => {
                //     this.calcHeight()
                // }, 500);
            }
        }
    }
</script>

<style scoped>
    .expansion-panel {
        transition: 0.4s;
    }
.head{
    padding-right: 8px;
}
    .accordion {
        position: relative;
        cursor: pointer;
        background-color: #eee;
        color: #444;
        padding: 8px 40px;
        width: 100%;
        text-align: right;
        border: none;
        outline: none;
        transition: 0.4s;
        background-color: rgba(218, 218, 223, 0.41);
    }

    .accordion:hover {
        background-color: #ccc;
    }

    .accordion i.chevron {
        position: absolute;
        right: 5px;
        top: 5px;
        padding: 4px 5px;
        border: 1px solid lightgray;
        border-radius: 230px;
    }

    .panel {
        padding: 0 18px;
        background-color: white;
        display: none;
    }

    /*.panel.expanded{*/
    /*max-height: 500px;*/
    /*}*/
    /*.panel.not-expanded{*/
    /*max-height: 0px;*/
    /*}*/
</style>