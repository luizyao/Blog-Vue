<template>
    <a 
        class="btn btn-link" 
        id="back-to-top" 
        role="button"
        @click="backToTop"
    >
        <span class="glyphicon glyphicon-chevron-up"></span>
    </a>
</template>

<script>
    export default {
        methods: {        
            scrollTo: function(element, to, duration) {
                if (duration <= 0) return;
                var diff = to - element.scrollTop;
                var perTick = diff / duration * 10;
                setTimeout(function() {
                    element.scrollTop = element.scrollTop + perTick;
                    if (element.scrollTop == to) return;
                    scrollTo(element, to, duration - 10);
                }, 3000);
            },
            // 返回顶部
            backToTop: function(event) {
                event.preventDefault()
                var obj = document.body || document.documentElement;
                scrollTo(obj, 0, 600000);
            }
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