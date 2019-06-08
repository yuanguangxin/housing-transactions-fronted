<template>
    <div>
        <div class="layout">
            <Layout>
                <top-bar></top-bar>
                <Content v-if="houseVo.house">
                    <Row style="background:white;padding:20px;width: 80%;margin: 0 auto">
                        <Col span="16">
                            <Card :bordered="false">
                                <h1 slot="title">{{houseVo.house.title}}</h1>
                                <p>{{houseVo.house.intro}}</p>
                            </Card>
                        </Col>
                        <Col span="4" offset="4">
                            <Card shadow>
                                <Button v-if="isSelf" type="success" @click="del">删除房源</Button>
                                <Button v-else-if="!isWatch" type="success" @click="watch">关注房源</Button>
                                <Button v-else type="success" @click="unwatch">取消关注</Button>
                            </Card>
                        </Col>
                    </Row>

                    <Row style="background:white;padding:20px;width: 80%;margin: 0 auto">
                        <Col span="13">
                            <Card :bordered="false">
                                <Carousel autoplay loop>
                                    <CarouselItem v-for="item of imgs" v-if="item!=''">
                                        <div class="demo-carousel">
                                            <p><img :src="item" width="100%" height="500px"></p>
                                        </div>
                                    </CarouselItem>
                                </Carousel>

                            </Card>
                        </Col>
                        <Col span="9" offset="2">
                            <Card shadow>
                                <h1 slot="title">价格：<span style="color:#db4c3f;">{{houseVo.house.price}}</span><span
                                        style="font-size: 16px"> 万</span></h1>
                                <div>
                                    <h2 style="float: left;margin-right: 80px">{{houseVo.house.layout}}</h2>
                                    <h2 style="float: left;margin-right: 80px">{{houseVo.house.towards}}</h2>
                                    <h2 style="float: left;;font-weight: bold">{{houseVo.house.size}}平米</h2>
                                </div>
                                <div style="height: 15px;clear: left"></div>
                                <div style="clear: left">
                                    <div style="float: left;margin-right: 60px">小区名称</div>
                                    <div style="float: left;font-weight: bold">{{houseVo.house.estate}}</div>
                                </div>
                                <div style="height: 15px;clear: left"></div>
                                <div style="clear: left">
                                    <div style="float: left;margin-right: 60px">联系人员</div>
                                    <div style="float: left;font-weight: bold">{{houseVo.user.username}}</div>
                                </div>
                                <div style="height: 15px;clear: left"></div>
                                <div style="clear: left">
                                    <div style="float: left;margin-right: 60px">房主简介</div>
                                    <div style="float: left;font-weight: bold">{{houseVo.user.intro}}</div>
                                </div>
                                <div style="height: 15px;clear: left"></div>
                                <div style="clear: left">
                                    <div style="float: left;margin-right: 60px">电话号码</div>
                                    <div style="float: left;font-weight: bold">{{houseVo.user.tel}}</div>
                                </div>
                                <div style="height: 15px;clear: left"></div>
                                <div style="clear: left">
                                    <div style="float: left;margin-right: 60px">电子邮箱</div>
                                    <div style="float: left;font-weight: bold">{{houseVo.user.email}}</div>
                                </div>
                                <div style="height: 15px;clear: left"></div>
                            </Card>
                        </Col>
                    </Row>

                    <div style="padding: 20px;width: 82%;margin: 0 auto">
                        <Card :bordered="false">
                            <h1 slot="title">房源详情</h1>
                            <p v-html="houseVo.house.detail"></p>
                        </Card>
                    </div>
                </Content>
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
        name: "detail",
        data: () => ({
            houseVo: {},
            imgs: [],
            isWatch: false,
            isSelf: false
        }),
        methods: {
            watch: function () {
                let self = this;
                self.$http.get("/rest/house/watch", {
                    params: {
                        userId: JSON.parse(localStorage.getItem("user")).id,
                        houseId: self.houseVo.house.id
                    }
                }).then(function (res) {
                    if (res.data.ok) {
                        self.$Message.success("已关注");
                        self.isWatch = true;
                    }
                })
            },
            del: function () {
                let self = this;
                self.$http.get("/rest/house/del", {
                    params: {
                        houseId: self.houseVo.house.id
                    }
                }).then(function (res) {
                    if (res.data.ok) {
                        self.$Message.success("已删除");
                        self.$router.push("/");
                    }else {
                        self.$Message.error(res.data.message);
                    }
                })
            },
            unwatch: function () {
                let self = this;
                self.$http.get("/rest/house/unwatch", {
                    params: {
                        userId: JSON.parse(localStorage.getItem("user")).id,
                        houseId: self.houseVo.house.id
                    }
                }).then(function (res) {
                    if (res.data.ok) {
                        self.$Message.success("已取消关注");
                        self.isWatch = false;
                    }
                })
            }
        },
        mounted: function () {
            let self = this;
            let id = self.$route.params.id;
            if (!JSON.parse(localStorage.getItem("user"))){
                this.$Message.error("请先登录");
                return;
            }
            this.$http.get("/rest/house/detail", {
                params: {
                    id: id
                }
            }).then(function (res) {
                let reg = /\n/g;
                if (res.data.ok) {
                    let userId = JSON.parse(localStorage.getItem("user")).id;
                    self.houseVo = res.data.obj;
                    self.houseVo.house.detail = res.data.obj.house.detail.replace(reg, "<br/>");
                    self.imgs = res.data.obj.house.imgs.split(";");
                    if (userId == res.data.obj.house.userId) {
                        self.isSelf = true;
                    }
                    self.$http.get("/rest/house/isWatch", {
                        params: {
                            userId: userId,
                            houseId: self.houseVo.house.id
                        }
                    }).then(function (res) {
                        self.isWatch = res.data.obj;
                    })
                } else {
                    self.$Message.error(res.data.message);
                }
            });
        },
        components: {Copyright, TopBar}
    }
</script>
