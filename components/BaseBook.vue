<!--
博客列表
-->
<template>
    <article :id="book.douban_link.split('/')[-1]" class="book media">
        <a class="media-left" :href="book.douban_link">
            <img class="media-object" :src="book.image_paths" alt="" :title="book.name">
        </a>
        <div class="media-body">
            <div class="media-heading">
                <ul class="list-inline">
                    <li>
                        <h4>
                            <a class="media-left" :href="book.douban_link">
                                {{ book.name }}
                            </a>
                        </h4>
                    </li>
                    <li class="pull-right">                        
                        <div class="dropdown" v-if="isAdmin">
                            <button type="button" class="btn dropdown-toggle" id="status" data-toggle="dropdown">
                                <template v-if="status==0">未读</template>
                                <template v-else-if="status==1">阅读中</template>
                                <template v-else-if="status==2">已读</template>
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" aria-labelledby="status">
                                <li role="presentation">
                                    <a role="menuitem" tabindex="-1" @click.prevent="status=0">未读</a>
                                </li>
                                <li role="presentation">
                                    <a role="menuitem" tabindex="-1" @click.prevent="status=1">阅读中</a>
                                </li>
                                <li role="presentation">
                                    <a role="menuitem" tabindex="-1" @click.prevent="status=2">已读</a>
                                </li>
                            </ul>
                        </div>
                        <button class="btn" @click.prevent="filterByStatus" style="background-color: white;" v-else>
                            <span class="label label-default" v-if="status==0">未读</span>
                            <span class="label label-primary" v-else-if="status==1">阅读中</span>
                            <span class="label label-success" v-else-if="status==2">已读</span>    
                        </button>      
                    </li>
                </ul>
            </div>
            <p style="color: gray;">{{ book.author }}</p><br>
            <p style="color: gray;">豆瓣评分: {{ book.grade }} ({{ book.comments }}人评价)</p><br>
            <p>{{ book.intro }}</p><br>
        </div>
    </article>
</template>

<script>
    import _ from 'lodash'

    export default {
        props: {
            book: {
                type: Object,
                required: true
            }
        },
        data: function () {
            return {
                status: this.book.status
            }
        },
        computed: {
            // 当前用户是否是管理员
            isAdmin () {
                return this.$store.state.isAdmin;
            }
        },
        methods: {
            filterByStatus () {
                // 更新页面标签
                this.$store.commit('set', [
                    {
                        key: 'tag',
                        value: this.status
                    }
                ]);
                this.$emit('refresh');
            }
        },
        watch: {
            status: _.debounce(function(newVal, oldVal) {
                let _this = this;
                _this.$http
                .post('/api/manage/book/status', {
                        name: _this.book.name,
                        status: newVal
                    })
                .then(function (response) {
                    // 刷新
                    _this.$emit('refresh');
                })
                .catch(function (error) {
                    console.log(error)
                    alert("修改数据阅读状态失败");
                });
            }, 1000)
        }
    }
</script>

<style scoped>
    a img {
        width: 150px;
    }
    .book {
        margin-bottom: 35px;
        margin-top: 15px;
        display: block;
        word-break: break-all; 
        word-wrap:break-word;
        background-color: white;
    }
    .book:hover {
        position:relative;
        top:-5px;
        left:-5px;
        box-shadow: 5px 5px 5px #888888;
    }
</style>