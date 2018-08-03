<template>
    <a 
        class="btn btn-link" 
        id="back-to-top" 
        role="button"
        href="javascript:scroll(0,0)"
    >
        <span class="glyphicon glyphicon-chevron-up"></span>
    </a>
</template>

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