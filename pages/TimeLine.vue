<template>
    <the-main-body>        
        <template slot='data'>
            <base-time-line-node v-for="tlnode in timeLineNodes" :todo="tlnode" :key="tlnode.id" @refresh="refresh">
                
            </base-time-line-node>
        </template>
        <template slot='more'>
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
    import BaseTimelineNode from '../components/BaseTimelineNode'

    export default {
        components: {
            "the-main-body": TheMainBody,
            "base-time-line-node": BaseTimelineNode
        },
        computed: {
            // 所有的时光节点
            timeLineNodes () {
                return this.$store.state.data;
            },
            // 当前页码，如果为0，表示没有更多的数据了
            page () {
                return this.$store.state.page;
            },
            // 当前页最大数据数量
            count () {
                return this.$store.state.num;    
            }
        },
        methods: {
            // 刷新页面
            refresh () {
                // 初始化各种数据
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
                    .get('/api/timelines', {
                        params: {
                            page: _this.page,
                            count: _this.count
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