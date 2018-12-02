<template>
    <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="300px">
                <el-menu
                    default-active="2"
                    @open="handleOpen"
                    @close="handleClose"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                        </template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                        <el-menu-item index="1-3">选项3</el-menu-item>
                        <el-menu-item index="1-4">选项4</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {
                abc:''
            }
        },
        created() {
            const prefix = this.$store.state.reqPrefix;
            this.$http.get(`${prefix}/menu`).then(function(res){
                console.log(res);
            }).catch(function(err) {
                console.log(err);
            });
        },
        methods:{
            handleOpen(key,keypath) {
                console.log(key,keypath);
            },
            handleClose(key,keypath) {
                console.log(key,keypath);
            },
            handleSelect(key,keypath) {
                if (key === '2') {
                    this.$router.push('/bar');
                } else {
                    this.$router.push('/foo');
                }
                
            }
        }

    }
</script>
<style scoped>

</style>