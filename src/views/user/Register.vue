<template>
    <div>
        <top-bar></top-bar>
        <div style="background:#fff;width: 400px;margin: 150px auto;padding: 0 16px">
            <Card>
                <p slot="title">注册</p>
                <i-form label-position="top" ref="user" :model="user" :rules="ruleInline">
                    <FormItem prop="username" label="用户名">
                        <Input v-model="user.username"></Input>
                    </FormItem>
                    <FormItem prop="password" label="密码">
                        <Input v-model="user.password" type="password"></Input>
                    </FormItem>
                    <FormItem prop="confirm" label="再次输入密码">
                        <Input type="password" v-model="user.confirm"></Input>
                    </FormItem>
                    <FormItem>
                        <Button @click="submit('user')" type="success" long style="height: 35px">注册</Button>
                    </FormItem>
                    <FormItem>
                        <Button @click="toLogin" type="warning" long style="height: 35px">已有账号？去登录</Button>
                    </FormItem>
                </i-form>
            </Card>
        </div>
    </div>
</template>

<script>
    import TopBar from "../../components/TopBar";

    export default {
        name: "register",
        data: () => ({
            user: {
                username: "",
                password: "",
                confirm: ""
            },
            ruleInline: {
                username: [
                    {required: true, message: '用户名不能为空', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '密码不能为空', trigger: 'blur'},
                    {type: 'string', min: 6, message: '密码长度不能小于6', trigger: 'blur'}
                ],
                confirm: [
                    {required: true, message: '密码不能为空', trigger: 'blur'}
                ],
            }
        }),
        methods: {
            toLogin: function () {
                this.$router.push("login");
            },
            submit: function (name) {
                let self = this;
                this.$refs[name].validate((valid) => {
                    if (!valid) {
                        this.$Message.error('格式校验失败!');
                        return;
                    }
                    if (self.user.password !== self.user.confirm) {
                        this.$Message.error('两次输入的密码不一致');
                        return;
                    }
                    self.$http.post("/rest/user/register", self.user).then(function (res) {
                        if(res.data.ok){
                            localStorage.setItem("user",JSON.stringify(res.data.obj));
                            self.$Message.success("注册成功，已为您自动登录");
                            self.$router.push("/");
                        }else {
                            self.$Message.error(res.data.message);
                        }
                    });
                })
            }
        },
        mounted: function () {
            document.getElementsByTagName("body")[0].setAttribute("style", "background-image: url('http://cdn.hrbust.vip/bg.svg')")
        },
        beforeDestroy: function () {
            document.getElementsByTagName("body")[0].removeAttribute("style")
        },
        components: {TopBar}
    }
</script>
