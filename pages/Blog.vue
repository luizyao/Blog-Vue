<template>
    <the-main-body>        
        <template slot='data'>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <blockquote class="text-center">
                        <h3>
                            {{ blog.name }}
                        </h3>
                        <small>{{ blog.user_name }}发表于{{ blog.created_at | datetime }}</small>
                    </blockquote>
                    <ul class="list-inline well">
                        <li v-for="tagStr in blog.tag.split(',')">
                            <base-tag :tag="tagStr"></base-tag>
                        </li>
                    </ul>
                </div>
                <div class="panel-body" v-html="markedContent(blog.content)" v-highlight>
                </div>
                <div class="panel-footer">
                    <ul class="pager">
                        <li>
                            <button 
                                type="button" 
                                class="btn btn-default btn-lg" 
                                @click.prevent="like" 
                                title="赞"
                                style="border: 0px;" 
                                >
                                <span 
                                    :class="{
                                                'glyphicon glyphicon-heart-empty': !good,
                                                'glyphicon glyphicon-heart': good
                                            }" 
                                    style="color: red;"
                                ></span>
                            </button>
                        </li>
                    </ul>
                    <div class="panel panel-default">  
                        <div class="panel-heading">    
                            <base-new-comment @add="addComments"></base-new-comment>   
                        </div> 
                        <div class="panel-body">
                            <ul class="pager" ref="pager">
                                <li>
                                    <button type="button" class="btn btn-default" @click.prevent="getComments">显示评论
                                    </button>
                                </li>
                            </ul>
                            <!--展示评论-->
                            <ul class="media-list" v-if="Object.keys(comments).length > 0">
                                <li class="media" v-for="comment in comments" :key="comments.indexOf(comment)+1">
                                    <span class="media-left">{{ comment.user_name | coverEmail }}</span>
                                    <div class="media-body">
                                        <small class="media-heading pull-right">{{ comment.created_at | datetime }}</small>
                                        <div v-html="markedContent(comment.content)" v-highlight>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                        </div>
                    </div>
        </template>
        <template slot="right">
            <the-tags></the-tags>
        </template>
    </the-main-body>
</template>

<script>
    import TheMainBody from '../components/TheMainBody'
    import BaseTag from '../components/BaseTag'
    import TheTags from '../components/TheTags'    
    import BaseNewComment from '../components/BaseNewComment'

    export default {
        components: {
            'the-main-body': TheMainBody,
            "the-tags": TheTags,
            "base-new-comment": BaseNewComment,
            "base-tag": BaseTag
        },
        data: function () {
            return {
                // 博客
                blog: new Object,
                // 所有评论
                comments: new Object,
                // 点赞
                good: false
            }
        },
        methods: {
            // 点赞
            like () {
                let _this = this;
                _this.$http
                    .post('/api/manage/feedback/add', {
                        new: {
                                blog_id: _this.blog.id,
                                behavior: 2,
                                ip: returnCitySN['cip']
                            }
                        }
                    )
                    .then(function (response) {
                        _this.good = true;
                    })
                    .catch(function (error) {                        
                        alert("谢谢，你已经点过赞了(●'◡'●)。");
                    })
            },
            // 添加评论
            addComments (email, content) {
                // 构造评论数据，上传服务器
                let url = '/api/manage/blog/comment/add';
                let _this = this;
                var date = new Date();
                let data = {
                    new: {
                        "blog_id": _this.blog.id,
                        "user_id": '000',
                        "user_name": email,
                        "user_image": 'about:blank',
                        "content": content,
                        "created_at": date.getTime() / 1000
                    }
                };
                _this.$http.post(url, data)
                    .then(function (response) {
                        // 刷新评论
                        _this.getComments();
                    })
                    .catch(function (error) {
                        alert("评论提交失败");
                    });
            },
            // 获取这篇博客所有的评论
            getComments () {
                let _this = this; 
                // 初始化评论列表
                _this.comments = [];               
                _this.$http
                    .get('/api/blog/comments', {
                        params: {
                            // 博客id
                            id: _this.$route.params.id
                        }
                    })
                    .then(function (response) {
                        _this.$refs.pager.innerHTML = "<li><small>所有的评论都在这里喽！(●'◡'●)</small></li>"
                        _this.comments = response.data.results;
                    })
                    .catch(function (error) {
                        _this.$refs.pager.innerHTML = "<li><small>快做第一个评论的人吧！(●'◡'●)</small></li>"
                    })
            }
        },
        mounted: function () {
            // 页面加载时，获取博客信息
            let _this = this;
            _this.$http
                .get('/api/blog', {
                    params: {
                        // 博客id
                        id: _this.$route.params.id
                    }
                })
                .then(function (response) {
                    _this.blog = response.data.results[0];
                    _this.$http.post('/api/manage/feedback/add', {
                                new: {
                                    blog_id: _this.blog.id,
                                    behavior: 1,
                                    ip: returnCitySN['cip']
                                }
                            }
                        )
                        .then(function (response) {
                            console.log("阅读")
                        })
                        .catch(function (error) {                        
                            console.log(error)
                        })
                })
                .catch(function (error) {    
                    // 错误
                    if (error.response) {
                        switch (error.response.status) {
                            case 404:
                                // 如果服务器返回404错误，说明这篇博客没有了，转到博客首页
                                _this.$router.push({path: '/blogs'});            
                        }
                    }                   
                }) 
        }
    }
</script>

<style scoped>
    .glyphicon {
        animation: twinkle 2s infinite;
            -webkit-animation: twinkle 2s infinite;
    }
    @keyframes twinkle {
        0%{
            transform: scale(0.8,0.8);
            opacity: 1;
        }
        30%{
            transform: scale(1,1);
            opacity: 0.8;
        }
        100%{
            transform: scale(0.8,0.8);
            opacity: 1;
        }
    }
</style>