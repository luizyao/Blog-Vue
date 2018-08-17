<template>
    <a 
        class="btn btn-link" 
        id="back-to-top" 
        role="button"
        href="javascript:scroll(0,0)"
        v-show="show"
    >
        <span class="glyphicon glyphicon-chevron-up"></span>
    </a>
</template>

<script>
    export default {
        data: function () {
            return {
                show: false
            }
        },
        methods: {
            reach () {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > 100) {
                    this.show = true
                } else {
                    this.show = false
                }
            }
        },
        mounted: function () {
            // 添加对鼠标的监听事件
            window.addEventListener('scroll', this.reach);              
        },
        destroyed: function () {
            // 移除对鼠标的监听事件
            window.removeEventListener('scroll', this.reach);
        }
    }
</script>

<style scoped>
    #back-to-top {
        position: fixed;
        right: 10px;
        bottom: 60px;
        background: rgba(230, 126, 34, 0.6);
        color: #ffffff;
    }
    #back-to-top i {
        width: 30px;
        height: 30px;
        line-height: 30px;
    }
</style>