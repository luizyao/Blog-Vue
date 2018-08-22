<template>
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">                
                <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#main-menu">
                    <span class="sr-only">切换导航</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button> 
                <!--Logo: 'LOVE'的摩斯电码-->
                <router-link class="navbar-brand" to="/maotao/timeline"> 
                    <img class="navbar-logo" src="/static/image/logo.svg">
                </router-link>               
            </div>            
            <div id="main-menu" class="navbar-collapse collapse navbar-right">
                <!--导航菜单-->
                <ul class="nav navbar-nav">
                    <template v-for="menu in navMenus">
                        <li role="presentation" :key="menu.id">   
                            <router-link :to="menu.href">
                                {{ menu.content }}
                            </router-link>
                        </li>                        
                    </template>
                    <li>
                        <a href="https://github.com/LuizYao" target="_blank">GitHub仓库</a>
                    </li>
                </ul><!--end-->
                <the-user-info></the-user-info>            
            </div>
        </div>
    </nav> <!--导航栏结束-->
</template>

<script>
    import TheUserInfo from './TheUserInfo'

    export default {
        components: {
            "the-user-info": TheUserInfo
        },
        data: function() {
            return {
                // 导航栏所有的菜单
                navMenus: this.$store.state.navMenus
            }            
        }
    }
</script>

<style>
    .navbar-logo {
        height: 28px;
        width: 150px;
    }
    .navbar-default .navbar-nav > li > a {
        font-size: 16px;
        padding: 16px 20px 5px !important;
        outline: none;
    } 
    .navbar-default .navbar-nav > li > a:active {
        star:expression(this.onFocus=this.blur());
    }   
    .navbar-default .navbar-nav > li > a:hover {
        font-weight: bold;
    }       
    :focus {
        outline:0;
    } 
</style>