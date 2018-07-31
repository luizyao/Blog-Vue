<template>
    <the-main-body>      
        <template slot="data">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <form role="form">
                        <div class="form-group">
                            <textarea 
                                rows='1' 
                                v-model='blog.name' 
                                placeholder='请输入文章标题'
                                style="width: 100%;" 
                            ></textarea>
                        </div>
                        <div class="form-group">
                            <textarea 
                                id="summary"
                                rows="3" 
                                v-model='blog.summary' 
                                placeholder='请输入内容提要，其将展示在博客首页'
                                @keydown="inputTab"
                                style="width: 100%;" 
                            ></textarea>
                        </div>
                        <div class="form-group">
                            <textarea 
                                rows='1' 
                                v-model='blog.tag' 
                                placeholder='请输入标签，多个标签以逗号间隔'
                                style="width: 100%;" 
                            ></textarea>
                        </div>
                    </form>
                </div>
                <div class="panel-body">
                    <div class="form-group" id="editor">
                        <textarea 
                            id="content" 
                            :value="blog.content" 
                            rows="100" 
                            @input="update"
                            @keydown="inputTab"
                            placeholder='请输入正文，支持markdown格式'
                        ></textarea>
                        <div v-html="compiledMarkdown" v-highlight></div>
                    </div>
                </div>
                <div class="panel-footer">
                    <button class="btn-primary" @click.prevent="save">发表</button>
                </div>
            </div>
        </template>
    </the-main-body>
</template>

<script>
    import TheMainBody from '../components/TheMainBody'

    export default {
        data: function () {
            return {
                blog: {
                    name: "",
                    summary: "",
                    tag: "",
                    content: ""
                }
            }
        },
        computed: {
            compiledMarkdown () {
                return this.markedContent(this.blog.content);
            },
            // 获取登录用户
            user () {
                return this.$store.state.user;
            }
        },
        methods: {
            update: _.debounce(function (e) {
                this.blog.content = e.target.value;
            }, 300),
            save () {
                let date = new Date();
                let _this = this;
                let url = '/api/manage/blog/update';
                let data = {
                    new: {
                        "content": _this.blog.content,
                        // id为0，表示新建博客
                        "id": 0,
                        "name": _this.blog.name,
                        "tag": _this.blog.tag,
                        "summary": _this.blog.summary,
                        "user_id": _this.user.id,
                        "user_name": _this.user.name,
                        "user_image": _this.user.image,
                        "created_at": date.getTime() / 1000
                    }
                };
                _this.$http.post(url, data)
                    .then(function (response) {
                        // 跳转到首页
                        _this.$router.push({path: "/blogs"});       
                    })
                    .catch(function (error) {
                        alert("创建博客失败");  
                    });                      
            }
        },
        components: {
            'the-main-body': TheMainBody
        },
    }
</script>

<style scoped>
    textarea, #editor div {
        display: inline-block;
        width: 49%;
        height: 100%;
        vertical-align: top;
        box-sizing: border-box;
        padding: 0 20px;
    }

    textarea {
        border: none;
        border-right: 1px solid #ccc;
        resize: none;
        outline: none;
        background-color: #f6f6f6;
        font-size: 14px;
        font-family: 'Monaco', courier, monospace;
        padding: 20px;
    }
</style>