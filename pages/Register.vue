<template>
    <div class="container">
        <form class="form-signin form-horizontal">
            <h2 class="form-signin-heading">请注册</h2>
            <div class="form-group">
                <label for="inputName" class="sr-only">昵称</label>
                <input type="name" id="inputName" class="form-control" v-model="name" placeholder="昵称" required autofocus>
            </div>
            <div class="form-group">
                <label for="inputEmail" class="sr-only">邮箱</label>
                <input type="email" id="inputEmail" class="form-control" v-model="email" placeholder="邮箱" required autofocus>
            </div>
            <div class="form-group">
                <label for="inputPassword" class="sr-only">密码</label>
                <input type="password" id="inputPassword" class="form-control" v-model="passwd" placeholder="密码" required>
            </div>
            <div class="form-group">
                <button class="btn btn-lg btn-primary btn-block" @click.prevent="register">注册</button>
            </div>
        </form>
    </div> <!-- /container -->
</template>

<script>
    export default {
        data: function() {
            return {
                name: "",
                email: "",
                passwd: ""
            }
        },
        methods: {
            register () {
                let _this = this;
                if (_this.checkEmail(this.email) && _this.passwd != '') {
                    _this.$http
                        .post('/api/register', {
                            name: _this.name,
                            email: _this.email,
                            passwd: _this.passwd
                        })
                        .then(function(response) {
                            // 跳转到系统首页
                            _this.$router.push({path: '/login'});
                        })
                        .catch(function(error) {
                            alert('注册失败');
                        })
                } else {
                    alert('请输入有效的邮箱，或者密码不能为空'); 
                }
            } 
        }
    }
</script>

<style scoped>
    .form-signin {
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }
    .form-signin .form-signin-heading,
    .form-signin .checkbox {
        margin-bottom: 10px;
    }
    .form-signin .checkbox {
        font-weight: normal;
    }
    .form-signin .form-control {
        position: relative;
        height: auto;
        -webkit-box-sizing: border-box;
         -moz-box-sizing: border-box;
              box-sizing: border-box;
        padding: 10px;
        font-size: 16px;
    }
    .form-signin .form-control:focus {
        z-index: 2;
    }
    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>