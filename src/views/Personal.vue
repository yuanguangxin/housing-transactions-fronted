<template>
    <div>
        <div class="layout">
            <Layout>
                <top-bar></top-bar>
                <Content>
                    <div style="height: 10px"></div>
                    <Row style="background:white;padding:20px;width: 60%;margin: 0 auto" v-if="user.username">
                        <Tabs>
                            <TabPane label="个人信息" name="personal">
                                <Form label-position="left" :label-width="100">
                                    <FormItem label="用户名">
                                        <Input v-model="user.username" disabled></Input>
                                    </FormItem>
                                    <FormItem label="个人简介">
                                        <Input v-model="user.intro"></Input>
                                    </FormItem>
                                    <FormItem label="联系电话">
                                        <Input v-model="user.tel"></Input>
                                    </FormItem>
                                    <FormItem label="邮箱">
                                        <Input v-model="user.email"></Input>
                                    </FormItem>
                                    <FormItem label="性别">
                                        <Select v-model="user.sex">
                                            <Option value="1">男</Option>
                                            <Option value="2">女</Option>
                                        </Select>
                                    </FormItem>
                                    <Button type="success" @click="updateUserInfo" style="margin-top: 10px" long>确认修改</Button>
                                </Form>
                            </TabPane>
                            <TabPane label="我的房源" name="houses">
                                <div @click="toDetail(item.id)" style="padding: 10px;cursor: pointer" v-for="item of myHouse">
                                    <Card>
                                        <p slot="title">{{item.title}}</p>
                                        <p>{{item.intro}}</p>
                                    </Card>
                                </div>
                            </TabPane>
                            <TabPane label="我的关注" name="watch">
                                <div @click="toDetail(item.id)" style="padding: 10px;cursor: pointer" v-for="item of watchHouse">
                                    <Card>
                                        <p slot="title">{{item.title}}</p>
                                        <p>{{item.intro}}</p>
                                    </Card>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Row>
                </Content>
                <div style="height: 20px"></div>
                <BackTop></BackTop>
                <Copyright></Copyright>
            </Layout>
        </div>
    </div>
</template>

<script>
    import TopBar from "../components/TopBar";
    import Copyright from "../components/Copyright";

    export default {
        name: "personal",
        data: () => ({
            user: {},
            myHouse:[],
            watchHouse:[]
        }),
        methods:{
            updateUserInfo:function () {
                let self = this;
                self.$http.post("/rest/user/updateUserInfo",self.user).then(function (res) {
                    if (res.data.ok){
                        self.$Message.success("修改成功");
                        localStorage.setItem("user",JSON.stringify(res.data.obj))
                    } else {
                        self.$Message.error(res.data.message);
                    }
                })
            },
            toDetail: function (id) {
                this.$router.push({
                    name: "detail",
                    params: {
                        id: id
                    }
                });
            },
        },
        mounted: function () {
            let self = this;
            this.user = JSON.parse(localStorage.getItem("user"));
            if (!this.user) {
                this.$Message.error("请先登录");
                return;
            }

            self.$http.get("/rest/house/selPost",{
                params:{
                    userId:self.user.id
                }
            }).then(function (res) {
                if (res.data.ok){
                    self.myHouse = res.data.obj;
                }
            });

            self.$http.get("/rest/house/selWatch",{
                params:{
                    userId:self.user.id
                }
            }).then(function (res) {
                if (res.data.ok){
                    self.watchHouse = res.data.obj;
                }
            });
        },
        components: {Copyright, TopBar}
    }
</script>
