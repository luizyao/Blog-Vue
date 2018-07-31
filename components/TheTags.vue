<!--
标签云
-->
<template>
    <div id="tags" v-if="tags.length > 0">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h4 class="panel-title">标签云</h4>
            </div>
            <div class="panel-body">
                <ul class="list-inline">
                    <li v-for="tag in tags">
                        <h4><base-tag :tag="tag" @changeTag="$emit('refresh')"></base-tag></h4>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseTag from './BaseTag'

    export default {
        computed: {
            // 所有标签
            tags: function() {
                return this.$store.state.blogTags;
            }
        },
        components: {
            "base-tag": BaseTag
        },
        mounted: function() {
            let _this = this;
            // 初始化标签云为空
            _this.$store.commit('set', [
                    {
                        key: 'blogTags',
                        value: []
                    }
                ]);
            // 获取最新的标签云
            _this.$http
                .get('/api/blogs/tag')
                .then(function (response) {
                    // 获取服务器结果
                    let tagsArr = response.data.results;
                    // 同一篇博客可能有多个标签，存储时，不同的标签之间以逗号相隔，所以需要一些处理，才能提取所有的有效标签
                    let tags = []
                    for (var i = 0; i <= tagsArr.length - 1; i++) {
                        tags = tags.concat(tagsArr[i].tag.split(",").filter(function(val) {
                            return tags.indexOf(val) == -1
                        }));
                    }
                    // 更新数据
                    _this.$store.commit('set', [
                        {
                            key: 'blogTags',
                            value: tags
                        }
                    ]);
                })
                .catch(function (error) {
                    //错误时
                })
        }
    }
</script>

<style scoped>
    #tags {
        margin-bottom: 35px;
        margin-top: 15px;
    }
</style>