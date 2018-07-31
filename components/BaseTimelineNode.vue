<template>
    <div class="timeline">
        <div class="row">
            <button type="button" class="btn-sm btn-link pull-right" aria-hidden="true" @click.prevent="del" v-if="isAdmin">
                删除
            </button>
        </div>
        <div class="row panel panel-default">
            <div class="panel-heading text-right">
                <small class="panel-title" style="color: red;">
                    {{ todo.created_at | maotaoDateTime }}
                </small>                                   
            </div>
            <div class="panel-body">
                <div class="col-sm-6 col-md-6">  
                    <img :src="todo.image" alt="" class="img-responsive" v-if="todo.ftype == 1" @contextmenu.prevent>
                    <base-player :src="todo.image" v-else-if="todo.ftype == 2"></base-player>
                </div>
                <div class="col-sm-1 col-md-1">
                </div>
                <div class="col-sm-5 col-md-5">
                    <p style="text-indent: 2em;">
                        {{ todo.say }}
                    </p>
                </div>                
            </div>
            <div class="panel-footer">
                <ul class="pager">
                    <li class="pull-right">
                        <button 
                            type="button" 
                            class="btn btn-default btn-link" 
                            @click.prevent="like" 
                            title="赞"
                            style="background-color: white;" 
                            >
                            <span 
                                class="glyphicon glyphicon-heart"
                                style="color: red;"
                            >
                                {{ todo.good }}
                            </span>
                        </button>
                    </li>
                </ul>
            </div>               
        </div>        
    </div>    
</template>

<script>
    import BasePlayer from './BasePlayer'

    export default {
        components: {
            "base-player": BasePlayer
        },
        computed: {
            // 当前用户是否是管理员
            isAdmin () {
                return this.$store.state.isAdmin;
            },
            // 当前用户
            user () {
                return this.$store.state.user;
            }
        },
        props: {
            todo: {
                type: Object,
                required: true
            }
        }, 
        methods: {
            // 点赞
            like () {
                let _this = this;
                _this.$http
                    .post('/api/manage/feedback/add', {
                        new: {
                                timeline_id: _this.todo.id,
                                behavior: 2,
                                ip: returnCitySN['cip']
                            }
                        }
                    )
                    .then(function (response) {
                        _this.todo.good += 1;
                    })
                    .catch(function (error) {                        
                        alert("谢谢，一个IP只能点一次赞哦。");
                    })
            },
            del () {
                const answer = window.confirm("确认删除吗？")
                if (answer) {
                    let _this = this;
                    let url = '/api/manage/timeline/delete';
                    let data = {
                            id: _this.todo.id
                        };
                    this.$http.post(url, data)
                        .then(function (response) {
                            _this.$emit('refresh');
                        })
                        .catch(function (error) {
                            alert('删除失败！');
                        });  
                }    
            }
        }
    }
</script>

<style scoped>
    .timeline {
        padding-top: 15px;
        padding-bottom: 35px;
        display: block;
        word-break: break-all; 
        word-wrap:break-word;
    }
</style>