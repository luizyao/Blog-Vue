<!--
博客列表
-->
<template>
    <article :id="blog.id" class="blog">
        <div class="row">
            <button type="button" class="btn-sm btn-link pull-right" aria-hidden="true" @click.prevent="del" v-if="isAdmin" style="padding-right: 20px;">
                删除
            </button>
        </div>
        <div class="panel panel-default">
            <div class="panel-body">
                <Blockquote>
                    <div>
                        <h3 class="post-title">
                            <router-link :to="'/blog/' + blog.id">{{ blog.name }}</router-link>
                        </h3>
                    </div>
                    <small>{{ blog.summary }}</small>
                </Blockquote>
            </div>
            <div class="panel-footer">
                <ul class="list-inline">
                    <li>
                        <span class="glyphicon glyphicon-folder-open"></span>
                    </li>
                    <li v-for="tag in blog.tag.split(',')">
                        <base-tag :tag="tag" @changeTag="$emit('refresh')"></base-tag>
                    </li>                                        
                    <li class="pull-right">
                        <span class="badge glyphicon glyphicon-book" title="阅读">
                            {{ blog.reading }}
                        </span>
                    </li>
                    <li class="pull-right">
                        <span class="badge glyphicon glyphicon-comment" title="评论">
                            {{ blog.ccount }}
                        </span>
                    </li>
                    <li class="pull-right">
                        <span class="badge glyphicon glyphicon-thumbs-up" title="有用">
                            {{ blog.good }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </article>
</template>

<script>
    import BaseTag from './BaseTag'

    export default {
        components: {
            'base-tag': BaseTag
        },
        props: {
            blog: {
                type: Object,
                required: true
            }
        },
        computed: {
            // 当前用户是否是管理员
            isAdmin () {
                return this.$store.state.isAdmin;
            }
        },
        methods: {
            del () {
                const answer = window.confirm("确认删除吗？")
                if (answer) {
                    let _this = this
                    let url = '/api/manage/blog/delete';
                    let data = {
                            new: _this.blog
                        };
                    this.$http.post(url, data)
                        .then(function (response) {
                            _this.$emit('refresh');
                        })
                        .catch(function (error) {
                            alert('删除失败！');
                        });  
                }    
            }
        }
    }
</script>

<style scoped>
    .blog {
        margin-bottom: 35px;
        margin-top: 15px;
        display: block;
        word-break: break-all; 
        word-wrap:break-word;
    }
    .blog:hover {
        position:relative;
        top:-5px;
        left:-5px;
        box-shadow: 5px 5px 5px #888888;
    }
</style>