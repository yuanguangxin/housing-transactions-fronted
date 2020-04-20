<template>
    <div>
        <div class="layout">
            <Layout>
                <top-bar></top-bar>
                <Content>
                    <Card :dis-hover="true">
                        <div style="min-height: 800px;">
                            <div style="width: 80%;margin: 0 auto" @click="doQuery(1)">
                                <Input size="large" v-model="query.title" search enter-button placeholder="请输入关键字开始找房"/>
                            </div>
                            <div style="height: 30px"></div>
                            <div style="width: 80%;margin: 0 auto;background: #fbfbfb;padding: 20px">
                                <Row>
                                    <Col span="2" style="font-weight: bold;text-align:center">售价</Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.priceStr">
                                            <Radio label="">不限</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.priceStr">
                                            <Radio label="0,200">200万以下</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.priceStr">
                                            <Radio label="200,250">200-250万</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.priceStr">
                                            <Radio label="250,300">250-300万</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.priceStr">
                                            <Radio label="300,400">300-400万</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.priceStr">
                                            <Radio label="400,500">400-500万</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.priceStr">
                                            <Radio label="500,800">500-800万</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.priceStr">
                                            <Radio label="800,999999">800万以上</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                                <div style="height: 10px"></div>
                                <Row>
                                    <Col span="2" style="font-weight: bold;text-align:center">房型</Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.layout">
                                            <Radio label="">不限</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.layout">
                                            <Radio label="一室">一室</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.layout">
                                            <Radio label="二室">二室</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.layout">
                                            <Radio label="三室">三室</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.layout">
                                            <Radio label="四室">四室</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.layout">
                                            <Radio label="五室及以上">五室及以上</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                                <div style="height: 10px"></div>
                                <Row>
                                    <Col span="2" style="font-weight: bold;text-align:center">面积</Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.sizeStr">
                                            <Radio label="">不限</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.sizeStr">
                                            <Radio label="0,50">50平以下</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.sizeStr">
                                            <Radio label="50,70">50-70平</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.sizeStr">
                                            <Radio label="70,90">70-90平</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.sizeStr">
                                            <Radio label="90,110">90-110平</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.sizeStr">
                                            <Radio label="110,130">110-130平</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.sizeStr">
                                            <Radio label="130,150">130-150平</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.sizeStr">
                                            <Radio label="150,99999">150平以上</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                                <div style="height: 10px"></div>
                                <Row>
                                    <Col span="2" style="font-weight: bold;text-align:center">朝向</Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.towards">
                                            <Radio label="">不限</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.towards">
                                            <Radio label="朝东">朝东</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.towards">
                                            <Radio label="朝南">朝南</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.towards">
                                            <Radio label="朝西">朝西</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.towards">
                                            <Radio label="朝北">朝北</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.towards">
                                            <Radio label="南北">南北</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                                <div style="height: 10px"></div>
                                <Row>
                                    <Col span="2" style="font-weight: bold;text-align:center">楼层</Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.floor">
                                            <Radio label="">不限</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.floor">
                                            <Radio label="低楼层">低楼层</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.floor">
                                            <Radio label="中楼层">中楼层</Radio>
                                        </RadioGroup>
                                    </Col>
                                    <Col span="2">
                                        <RadioGroup v-model="query.floor">
                                            <Radio label="高楼层">高楼层</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                            </div>
                            <div style="height: 20px"></div>

                            <div style="width: 80%;margin: 0 auto;padding: 20px 0px">
                                <Tabs type="card">
                                    <TabPane label="最新">
                                        <div v-for="item of housePage.list">
                                            <Row style="padding:2px">
                                                <Col span="5">
                                                    <Card :bordered="false" :padding="0">
                                                        <div class="img_div"
                                                             :style="'background-image: url('+item.imgs.split(';')[0]+')'"></div>
                                                    </Card>
                                                </Col>
                                                <Col span="15" offset="2" style="margin-left: 25px">
                                                    <Card :bordered="false" :dis-hover="true" :padding="0"
                                                          style="height: 180px">
                                                        <p slot="title"
                                                           style="font-size: 25px;height: 50px;line-height: 50px;cursor: pointer"
                                                           @click="toDetail(item.id)">
                                                            {{item.title}}
                                                        </p>
                                                        <p style="padding:16px">
                                                            <Icon type="md-home" size="16" style="margin-bottom: 4px;"/>
                                                            {{item.estate}} | {{item.layout}} | {{item.size}}平米 |
                                                            {{item.towards}}
                                                        </p>
                                                        <p style="padding:16px">
                                                            <Icon type="md-pin" size="16" style="margin-bottom: 4px;"/>
                                                            {{item.floor}} （{{item.createTime}}发布）
                                                        </p>
                                                    </Card>
                                                </Col>
                                                <Col span="3">
                                                    <Card :bordered="false" :padding="0" :dis-hover="true"
                                                          style="margin-left: 55px">
                                                    <span class="price">
                                                        {{item.price}}
                                                    </span>
                                                        <span style="color:#db4c3f;">万</span>
                                                    </Card>
                                                </Col>
                                            </Row>
                                            <Divider/>
                                        </div>
                                        <Page :total="housePage.total" :page-size="5" @on-change="changePage"/>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                    </Card>
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
        name: "index",
        data: () => ({
            housePage: {},
            query: {
                priceStr:""
            }
        }),
        methods: {
            toDetail: function (id) {
                if (!JSON.parse(localStorage.getItem("user"))){
                    this.$Message.error("请先登录");
                    return;
                }
                this.$router.push({
                    name: "detail",
                    params: {
                        id: id
                    }
                });
            },
            changePage: function (pageNum) {
                this.doQuery(pageNum);
            },
            doQuery:function(pageNum){
                let self = this;
                self.query.pageNum = pageNum;
                this.$http.post("/rest/house/query",self.query).then(function (res) {
                    if (res.data.ok) {
                        self.housePage = res.data.obj;
                    } else {
                        self.$Message.error(res.data.message);
                    }
                })
            },
        },
        mounted: function () {
            this.doQuery(1);
        },
        components: {
            Copyright, TopBar
        }
    }
</script>

<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .img_div {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        height: 180px;
        width: 100%;
        position: relative;
        background-position: center center;
        background-size: cover;
    }

    .price {
        line-height: 160px;
        font-size: 26px;
        color: #db4c3f;
        font-weight: bold;
    }
</style>
