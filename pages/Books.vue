<template>
    <the-main-body>
        <template slot="data">
            <div class="well well-lg text-center">
                <h3>
                    <strong>豆瓣上一些评分大于9.0的书籍。</strong>
                </h3>
            </div>
            <div class="well well-lg text-center" v-if="tag != ''">
                <span>
                    <strong>
                        <template v-if="tag==0">未读</template>
                        <template v-else-if="tag==1">阅读中</template>
                        <template v-else-if="tag==2">已读</template>
                    </strong>
                    <button type="button" class="close" aria-hidden="true" @click.prevent="clearTag" title="清除标签">
                        &times;
                    </button>
                </span>
            </div>
            <base-book v-for="book in books" :book="book" :key="book.douban_link.split('/')[-1]" @refresh="refresh">
                
            </base-book>
        </template>
        <template slot="more">
            <ul class="pager">
                <li>
                    <a @click.prevent="getMore" v-if="page != 0">查看更多</a>
                    <small v-else>没有更多数据了</small>
                </li>
            </ul>
        </template>
    </the-main-body>
</template>

<script>
    import TheMainBody from '../components/TheMainBody'
    import BaseBook from '../components/BaseBook'

    export default {
        components: {
            "the-main-body": TheMainBody,
            "base-book": BaseBook
        },
        computed: {
            // 所有的书籍
            books () {
                return this.$store.state.data;
            },
            // 当前页码，如果为0，表示没有更多的数据了
            page () {
                return this.$store.state.page;
            },
            // 当前页面标签
            tag () {
                return this.$store.state.tag;
            },
            // 当前页最大数据数量
            count () {
                return this.$store.state.num;    
            }
        },
        methods: {
            // 清除当前标签，并刷新页面
            clearTag () {
                let _this = this;
                // 清除tag
                _this.$store.commit('set', [
                    {
                        key: 'tag',
                        value: ''
                    }
                ]);
                // 刷新页面
                _this.refresh();
            },
            // 刷新页面
            refresh () {
                // 初始化各种数据，除了tag
                let _this = this;
                _this.$store.commit('set', [
                    {
                        key: 'page',
                        value: 1
                    },
                    {
                        key: 'data',
                        value: []
                    }
                ]);
                // 重新请求数据   
                _this.getMore();
            },
            // 向服务器请求数据，默认一次请求10个
            getMore () {
                let _this = this;
                _this.$http
                    .get('/api/books', {
                        params: {
                            page: _this.page,
                            count: _this.count,
                            tag: _this.tag
                        }
                    })
                    .then(function (response) {
                        // 成功
                        // 提交数据
                        var newData = response.data.results;
                        _this.$store.commit('addData', {
                            content: newData
                        });                        
                        _this.$store.commit('set', [
                            {
                                key: 'page',
                                // 如果新数据少于本页面的最大数据，说明没有更多的数据了
                                value: newData.length == _this.count ? _this.page + 1 : 0
                            }
                        ])                                               
                    })
                    .catch(function (error) {
                        // 返回404错误，说明没有更多数据了
                        if (error.message == '404') {
                            // 发生错误
                            _this.$store.commit('set', [
                                {
                                    key: 'page',
                                    value: 0
                                }
                            ]) 
                        }  
                    })
            }
        },
        mounted: function () {
            // 页面组件成功挂载后，初始化页面数据
            this.getMore();             
        }
    }
</script>