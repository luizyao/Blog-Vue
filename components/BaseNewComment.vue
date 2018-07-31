<template>
    <form class="form-horizontal" role="form">
        <div class="form-group">
            <label for="email" class="col-sm-2 control-label">邮箱</label>
            <div class="col-sm-10">
                <input type="text" id="email" class="form-control" v-model.trim="email" placeholder="请输入邮箱(必需)">
            </div>
        </div>
        <div class="form-group">
            <label for="content" class="col-sm-2 control-label">评论</label>
            <div class="col-sm-10">
                <textarea 
                    id="content"
                    class="form-control" 
                    v-model.trim="content" 
                    rows="3" 
                    @keydown="inputTab"
                    placeholder='评论支持Markdown格式'
                ></textarea>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button class="btn btn-primary pull-right" @click.prevent="add">提交</button>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        data: function () {
            return {
                email: '',
                content: ''
            }
        },
        methods: {
            add () {
                if (this.checkEmail(this.email) && this.content != '') {
                    this.$emit('add', this.email, this.content);
                    this.email='';
                    this.content='';
                } else {
                    alert('请输入有效的邮箱，或者评论内容不能为空');
                }
            }
        }
    }
</script>