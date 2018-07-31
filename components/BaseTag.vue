<!--
基本标签链接
-->
<template>
    <a class="label label-default" @click.prevent='go'>{{ tag }}</a>
</template>

<script>
    
    export default {
        props: {
            tag: {
                type: String,
                required: true
            }
        },
        methods: {
            go () {
                // 更新页面标签
                this.$store.commit('set', [
                    {
                        key: 'tag',
                        value: this.tag
                    }
                ]);
                if (this.$router.currentRoute.path == '/blogs') {
                    // 上报事件，触发刷新
                    this.$emit('changeTag');
                } else {
                    // 跳转到博客首页
                    this.$router.push({path: '/blogs'});
                }
            }
        }
    }
</script>