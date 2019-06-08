<template>
    <div>
        <div class="layout">
            <Layout>
                <top-bar></top-bar>
                <Content>
                    <Row style="background:white;padding:20px;width: 60%;margin: 0 auto">
                        <Button type="primary">发布房源</Button>
                        <div style="height: 20px"></div>
                        <Form :model="house" label-position="left" :label-width="100">
                            <FormItem label="房屋标题">
                                <Input v-model="house.title"></Input>
                            </FormItem>
                            <FormItem label="房屋简介">
                                <Input v-model="house.intro"></Input>
                            </FormItem>
                            <FormItem label="面积（平米）">
                                <Input v-model="house.size" type="number"></Input>
                            </FormItem>
                            <FormItem label="价格（万）">
                                <Input v-model="house.price" type="number"></Input>
                            </FormItem>
                            <FormItem label="房型">
                                <Select v-model="house.layout">
                                    <Option value="一室">一室</Option>
                                    <Option value="二室">二室</Option>
                                    <Option value="三室">三室</Option>
                                    <Option value="四室">四室</Option>
                                    <Option value="五室及以上">五室及以上</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="朝向">
                                <Select v-model="house.towards">
                                    <Option value="朝东">朝东</Option>
                                    <Option value="朝南">朝南</Option>
                                    <Option value="朝西">朝西</Option>
                                    <Option value="朝北">朝北</Option>
                                    <Option value="南北">南北</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="小区名称">
                                <Input v-model="house.estate"></Input>
                            </FormItem>
                            <FormItem label="所在楼层">
                                <Select v-model="house.floor">
                                    <Option value="低楼层">低楼层(1楼-3楼)</Option>
                                    <Option value="中楼层">中楼层(4楼-10楼)</Option>
                                    <Option value="高楼层">高楼层(11楼及以上)</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="详细信息">
                                <Input v-model="house.detail" type="textarea" :autosize="{minRows: 20,maxRows: 10}"
                                       placeholder="介绍一下.."></Input>
                            </FormItem>
                            <Upload :before-upload="handleUpload" multiple type="drag" action="/rest/house/post"
                                    accept="image/*">
                                <div style="padding: 20px 0">
                                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                    <p>点击或拖拽上传预览图（最多可上传五张）</p>
                                </div>
                                <div v-for="file of files" v-if="file!==null">Upload file: {{file.name}}
                                    <Button type="text" @click.stop="removeImg(file)">Delete</Button>
                                </div>
                            </Upload>
                            <Button type="success" style="margin-top: 10px" @click="submit" long>确认发布</Button>
                        </Form>
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
        name: "post",
        data: () => ({
            house: {
                title: "",
                intro: "",
                size: "",
                price: "",
                layout: "一室",
                towards: "朝东",
                estate: "",
                floor: "低楼层",
                detail: ""
            },
            files: [],
            canSub: true
        }),
        methods: {
            handleUpload: function (file) {
                this.files.push(file);
                return false;
            },
            removeImg: function (file) {
                let index = this.files.indexOf(file);
                this.files.splice(index, 1);
            },
            submit: function () {
                let self = this;
                let userId = JSON.parse(localStorage.getItem("user")).id;
                if (!userId){
                    this.$Message.error("请先登录");
                    return;
                }
                if (this.canSub) {
                    this.canSub = false;
                    if (this.files.length === 0) {
                        this.$Message.error("请上传图片");
                        this.canSub = true;
                        return;
                    }
                    if (this.files.length > 5) {
                        this.$Message.error("最多上传五张照片");
                        this.canSub = true;
                        return;
                    }
                    let param = new FormData();
                    param.append("title", this.house.title);
                    param.append("intro", this.house.intro);
                    param.append("size", this.house.size);
                    param.append("price", this.house.price);
                    param.append("layout", this.house.layout);
                    param.append("towards", this.house.towards);
                    param.append("estate", this.house.estate);
                    param.append("floor", this.house.floor);
                    param.append("detail", this.house.detail);
                    param.append("userId",userId);
                    for (const file of this.files) {
                        param.append("files", file);
                    }
                    this.$http.post("/rest/house/post", param, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }).then(function (res) {
                        self.canSub = true;
                        if (res.data.ok) {
                            self.$Message.success("发布成功");
                            self.$router.push("/");
                        } else {
                            self.$Message.error(res.data.message);
                        }
                    });
                }
            }
        },
        components: {Copyright, TopBar}
    }
</script>
