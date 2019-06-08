<template>
    <div>
        <top-bar></top-bar>
        <div style="background:#fff;width: 400px;margin: 180px auto;padding: 0 16px">
            <Card>
                <p slot="title">登录</p>
                   <i-form ref="user" :model="user" :rules="ruleInline" label-position="top">
                       <FormItem prop="username" label="用户名">
                           <Input v-model="user.username"></Input>
                       </FormItem>
                       <FormItem prop="password" label="密码">
                           <Input v-model="user.password" type="password"></Input>
                       </FormItem>
                       <FormItem>
                           <Button @click="submit('user')" type="success" long style="height: 35px">登录</Button>
                       </FormItem>
                       <FormItem>
                           <Button type="warning" long style="height: 35px" @click="toRegister">没有账号？去注册</Button>
                       </FormItem>
                   </i-form>
            </Card>
        </div>
    </div>
</template>

<script>
    import TopBar from "../../components/TopBar";

    export default {
        name: "login",
        data: () => ({
            user: {
                username: "",
                password: ""
            },
            ruleInline: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }),
        methods:{
            toRegister:function () {
                this.$router.push("register");
            },
            submit:function (name) {
                let self = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        self.$http.post("/rest/user/login", self.user).then(function (res) {
                            if(res.data.ok){
                                localStorage.setItem("user",JSON.stringify(res.data.obj));
                                self.$router.push("/");
                            }else {
                                self.$Message.error(res.data.message);
                            }
                        });
                    } else {
                        this.$Message.error('请输入必填项!');
                    }
                })
            }
        },
        mounted:function () {
            document.getElementsByTagName("body")[0].setAttribute("style","background-image: url('http://cdn.hrbust.vip/bg.svg')")
        },
        beforeDestroy:function () {
            document.getElementsByTagName("body")[0].removeAttribute("style")
        },
        components: {TopBar}
    }
</script>
