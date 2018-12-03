<template>
    <div>
        <h1>hello {{name}}</h1>
        <h2>hot module replacement is setup</h2>
        <div>welcome to the vue single file component</div>
        <!--<pop-over></pop-over>-->
        <!--<img src = "../../static/pic/2.JPG" />-->
    </div>
</template>
<script>
    //import popOver from 'com/popover.vue';
    export default {
        data() {
            return {
                name:"world!"
            }
        }
    }
</script>