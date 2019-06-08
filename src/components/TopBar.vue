<template>
    <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <MenuItem name="1" @click.native="toIndex">
                    <Icon type="md-home"></Icon>
                    首页
                </MenuItem>
                <MenuItem name="2" @click.native="toPost">
                    <Icon type="ios-navigate"></Icon>
                    发布房源
                </MenuItem>
                <MenuItem name="3" @click.native="toPersonal">
                    <Icon type="md-person"></Icon>
                    <span v-if="user">{{user.username}}</span>
                    <span v-else>个人中心</span>
                </MenuItem>
                <MenuItem name="4" @click.native="toLogin">
                    <Icon type="md-log-in"></Icon>
                    <span v-if="user">注销</span>
                    <span v-else>登录</span>
                </MenuItem>
            </div>
        </Menu>
    </Header>
</template>

<script>
    import Copyright from "./Copyright";

    export default {
        name: "topBar",
        data: () => ({
            user: {}
        }),
        methods: {
            toLogin: function () {
                localStorage.removeItem("user");
                this.$router.push("/login");
            },
            toIndex: function () {
                this.$router.push("/");
            },
            toPost: function () {
                if (this.user) {
                    this.$router.push("/post");
                } else {
                    this.$Message.error("请先登录");
                }
            },
            toPersonal: function () {
                if (this.user) {
                    this.$router.push("/personal");
                } else {
                    this.$Message.error("请先登录");
                }
            }
        },
        mounted: function () {
            this.user = JSON.parse(localStorage.getItem("user"));
        },
        components: {Copyright}
    }
</script>

<style scoped>
    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .layout-nav {
        width: 430px;
        margin: 0 auto;
        margin-right: 20px;
    }
</style>
