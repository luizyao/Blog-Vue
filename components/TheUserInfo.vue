<!--
    当前用户展示区域
-->
<template>
    <ul class="nav navbar-nav">
        <template v-if="isLogin">
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    {{ user.name }}
                    <b class="caret"></b>
                </a>
                <ul class="dropdown-menu">
                    <li><router-link to="#">我的消息</router-link></li>
                    <template v-if="isAdmin">
                        <li><router-link to="/blog/new">新建博客</router-link></li>
                        <li><router-link to="/maotao/timeline/new">新建时光轴</router-link></li>
                    </template>
                    <li class="divider"></li>
                    <li><a @click.prevent="logout">
                        <span>登出</span>
                    </a></li>
                </ul>
            </li>
        </template>
        <template v-else>
            <li role="presentation">   
                <router-link to="/register">
                    注册
                </router-link>
            </li>
            <li role="presentation">   
                <router-link to="/login">
                    登录
                </router-link>
            </li>             
        </template>
    </ul>
</template>

<script type="text/javascript">
    export default {
        computed: {
            // 当前是否有登录用户
            isLogin () {
                return this.$store.state.isLogin;
            },
            // 当前用户是否是管理员
            isAdmin () {
                return this.$store.state.isAdmin;
            },
            // 如果登陆，获取登录用户
            user () {
                return this.$store.state.user;
            }
        },
        methods: {
            logout () {
                let _this = this;
                _this.$http
                    .get('/signout')
                    .then(function(response) {
                        _this.$store.commit('updateUser', {
                            operate: 'remove'
                        });
                        // 跳转到系统首页
                        _this.$router.push({path: '/'});
                    })
                    .catch(function(error) {
                        console.log(error)
                    })
            }
        }
    }
</script>