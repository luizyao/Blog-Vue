<template>
    <the-main-body>      
        <template slot="data">
            <!--创建新的时间节点，只有管理员才可以-->
            <form role="form">
                <div class="form-group">
                    <label for="name">你想和宝宝说些什么？</label>
                    <textarea class="form-control" rows="6" v-model.trim="timeline.say" @keydown="inputTab"></textarea>
                </div>
                <div class="form-group">  
                    <!--只支持选择一张图片-->                
                    <label for="inputfile">照片视频什么的快来show一下吧！</label>
                    <input type="file" id="inputfile" ref="file" @change="getFile">
                </div>
                <!--注掉时间选择控件，以当时上传的时间为准-->
                <!--
                <div class="form-group">                    
                    <label for="datetimepicker">还记得是哪一天吗？</label>
                    <div id="datetimepicker">
                        <date-picker :date="nowTime" :option="option" :limit="limit" @change="transferTime"></date-picker>
                    </div>
                </div>
                -->
                <button type="submit" class="btn btn-primary" @click.prevent="save">快保存下来吧！</button>
            </form>
        </template>
    </the-main-body>
</template>

<script>
    //import myDatepicker from 'vue-datepicker'
    import TheMainBody from '../components/TheMainBody'

    export default {
        components: {
            //'date-picker': myDatepicker,
            'the-main-body': TheMainBody
        },
        data: function() {
            return {
                timeline: {
                    say: "",
                    created_at: "",
                    file: "",
                    fileName: "",
                    ftype: ""
                },

                /**
                // 配置时间控件
                // https://www.npmjs.com/package/vue-datepicker
                nowTime: {
                    time: ''
                },
                option: {
                    type: 'min',
                    week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    format: 'YYYY-MM-DD HH:mm',
                    placeholder: '还记得那一天吗？',
                    inputStyle: {
                        'display': 'inline-block',
                        'padding': '6px',
                        'line-height': '22px',
                        'font-size': '16px',
                        'border': '2px solid #fff',
                        'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                        'border-radius': '2px',
                        'color': '#5F5F5F'
                    },
                    color: {
                        header: '#ccc',
                        headerText: '#f00'
                    },
                    buttons: {
                        ok: '确定',
                        cancel: '取消'
                    },
                    overlayOpacity: 0.5,
                    dismissible: true
                },
                timeoption: {
                    type: 'min',
                    week: ['周一', '周二', '周三', '周四', '周五', '周六', '周末'],
                    month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    format: 'YYYY-MM-DD HH:mm'
                },
                multiOption: {
                    type: 'multi-day',
                    week: ['周一', '周二', '周三', '周四', '周五', '周六', '周末'],
                    month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    format:"YYYY-MM-DD HH:mm"
                },
                limit: [
                    {
                        type: Array,
                        default: function _default() {
                                return [];
                        }
                    }
                ]
                **/
            }
        },
        methods: {
            /**
            // 返回从 1970 年 1 月 1 日至今的秒数
            transferTime () {
                var time = new Date(this.nowTime.time.replace(/-/g, "/"));
                this.timeline.created_at = time.getTime() / 1000;
            },
            **/
            getFile (event) {
                // 获取上传的文件
                let _this = this;
                let item = event.target.files[0];
                // 判断文件类型
                if (/image\/\w+/.test(item.type)) {
                    // 图片
                    _this.timeline.ftype = 1                   
                } else if (/video\/\w+/.test(item.type)) {
                    // 视频
                    _this.timeline.ftype = 2
                }
                // 读取将文件到内存中
                var reader = new FileReader(); 
                reader.readAsDataURL(item);
                reader.onload = function(e){ 
                    // 图片base64格式
                    _this.timeline.file = this.result
                    _this.timeline.fileName = item.name
                }
            },
            dataURItoBlob (dataURI) {
                var byteString = atob(dataURI.split(',')[1]);
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ab], {type: mimeString});
            },
            save (event) {
                // 发送图片的信息
                let fd = new FormData();
                let _this = this;
                // 默认时间为当前时间
                if (_this.timeline.created_at == "") {
                    _this.timeline.created_at = new Date().getTime() / 1000;
                }
                fd.append('say', _this.timeline.say);  
                fd.append('created_at', _this.timeline.created_at);  
                fd.append('ftype', _this.timeline.ftype);                  
                fd.append('file', _this.dataURItoBlob(_this.timeline.file), _this.timeline.fileName);
                this.$http.post('/api/manage/timeline/add', fd)
                    .then(function (response) {
                        // 跳转到时光轴首页
                        _this.$router.push({path: "/maotao/timeline"}); 
                    }) 
            }
        }               
    }
</script>