//main.js 
import Vue from 'vue/dist/vue.min.js'
import store from './store/index'
import App from './App'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import marked from 'marked'

// ************************************************自定义指令************************************************
Vue.directive('highlight', function (el) { 
    // 语法高亮
    let blocks = el.querySelectorAll('pre code'); 
    blocks.forEach((block)=>{ 
        hljs.highlightBlock(block) 
    }) 
})

// ************************************************公共方法************************************************
Vue.prototype.inputTab = function (event) {
    // 支持输入tab键
    if (event.keyCode == 9) {     
        event.preventDefault();                   
        var newCaretPosition = event.target.selectionStart + "  ".length;
        event.target.value = event.target.value.substring(0, event.target.selectionStart) + "  " + event.target.value.substring(event.target.selectionStart, event.target.value.length);
        event.target.selectionStart = newCaretPosition;
        event.target.selectionEnd = newCaretPosition;
        event.target.focus();
    }
}

Vue.prototype.checkEmail = function (email) {
    // 检查邮箱地址的有效性
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if(email == "") {
        return false;
    } else if(!reg.test(email)) {
        return false;
    } else {
        return true;
    }
}

Vue.prototype.markedContent = function (content) {
    // 返回markdown格式的内容
    return marked(content, { sanitize: true });
}
// ************************************************过滤器配置************************************************
Vue.filter('datetime', function (value) {
    // 将数据库中的时间转化为更友好的时间显示
    var date = new Date();
    var delta = date.getTime() - value*1000;
    if (delta < 60000) {
        return "一分钟前";
    } else if (delta < 3600000) {
        return parseInt(delta/60000) + "分钟前";
    } else if (delta < 86400000) {
        return parseInt(delta/3600000) + "小时前";
    } else if (delta < 604800000) {
        return parseInt(delta/86400000) + "天前";
    } else {
        var dt = new Date(value*1000);
        // 真正的月份需要加1，getMonth()返回的只是索引值，其从0开始；
        var month = dt.getMonth() + 1;
        return dt.getFullYear() + "年" + month + "月" + dt.getDate() + "日";
    }
})

Vue.filter('coverEmail', function (value) {
    // 将邮箱地址中间部分用*打码
    return value.replace(/(.{2}).+(.{2}@.+)/g, "$1****$2");
})

Vue.filter('maotaoDateTime', function(value) {    
    let birthday = new Date("2017/8/21 2:12:00");
    let now = new Date(value*1000);

    let M1=birthday.getMonth();
    let D1=birthday.getDate();
    let M2=now.getMonth();
    let D2=now.getDate();
    let years = now.getFullYear() - birthday.getFullYear() + (M1*100+D1 > M2*100+D2 ? -1 : 0); 
    let month = M2 >= M1 ? M2 - M1 : M2 + 11 - M1;
    let seconds = Math.floor((now-birthday)/1000);//差几秒
    let min = Math.floor(seconds/60);//差几分钟
    let hours = Math.floor(min/60);//差几小时
    let day = Math.floor(hours/24);//差几天  
    let str = ""
    if (years != 0) {
        str = str + years + "岁"
        if (month != 0) {
            str = str + month + "月"
        }
    } else if (day != 0) {
        str = str + day + "天"
    } else {
        str = str + hours + "小时"
    }
    return str;
});


// ************************************************axios配置************************************************
// 允许携带cookies
axios.defaults.withCredentials = true

// 配置响应拦截器
axios.interceptors.response.use(function (response) {
        // 成功返回时
        return response;
    }, function (error) {
        // 返回错误时
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401
                    store.commit('updateUser', {
                        operate: 'remove'
                    });
                    error.message = "密码错误";
                    router.push({
                        path: '/login'
                    });
                    break;
                case 403:
                    // 返回 403
                    store.commit('updateUser', {
                        operate: 'remove'
                    });
                    error.message = "用户不存在";
                    router.push({
                        path: '/'
                    });
                    break;
                case 404:
                    // 返回 404
                    error.message = "404";
                    break;
            }
        }
        return Promise.reject(error);;
    });

// 这样在模块中可以直接使用: this.$http
Vue.use(VueAxios, axios);


// ************************************************路由配置************************************************
// 使用路由
Vue.use(VueRouter)
const Blog = () => import('./pages/Blog');
const Blogs = () => import('./pages/Blogs');
const NewBlog = () => import('./pages/NewBlog');
const NewTimeLine = () => import('./pages/NewTimeLine');
const Login = () => import('./pages/Login');
const TimeLine = () => import('./pages/TimeLine');
const About = () => import('./pages/About');
const Books = () => import('./pages/Books');
const Register = () => import('./pages/Register');

// 定义路由
const routes = [
    { 
        path: '/', 
        redirect: '/maotao/timeline'
    },
    { 
        path: '/books',
        component: Books, 
        name: "读书"
    }, 
    {
        // 此路由一定要在'/blog/:id'路由上面，不然不会进入到这个路由里面
        path: '/blog/new',
        component: NewBlog,
        name: "新建博客",
        meta: {
            // 这个页面需要管理员权限才能访问
            requiresAdmin: true
        }
    },
    { 
        path: '/blog/:id', 
        component: Blog, 
        name: "博客正文"
    },
    { 
        path: '/blogs',
        component: Blogs, 
        name: "博客"
    },          
    { 
        path: '/login', 
        component: Login, 
        name: "登录"
    },
    { 
        path: '/register', 
        component: Register, 
        name: "注册"
    },
    { 
        path: '/maotao/timeline/new', 
        component: NewTimeLine, 
        name: "新建时光轴",
        meta: {
            // 这个页面需要管理员权限才能访问
            requiresAdmin: true
        }
    },
    { 
        path: '/maotao/timeline', 
        component: TimeLine, 
        name: "毛桃的时光轴"
    },
    { 
        path: '/about', 
        component: About, 
        name: "关于"
    }
];

// 创建router实例
const router = new VueRouter({
    routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
    // 更新登陆状态
    store.commit('set', [
        {
            key: 'user',
            value: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : new Object()
        },
        {
            key: 'isLogin',
            value: sessionStorage.getItem('isLogin') ? true : false,
        },
        {
            key: 'isAdmin',
            value: sessionStorage.getItem('isAdmin') ? true : false,
        }
    ]);

    if (to.meta.requiresLogin) {
        // 这个页面需要先登录
        if (!store.state.isLogin) {
            // 如果用户未登录，重定向到登陆界面
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }

    if (to.meta.requiresAdmin) {
        // 这个页面需要管理员权限        
        if (!store.state.isLogin) {
            // 如果用户未登录，重定向到登陆界面
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else if (!store.state.isAdmin) {
            // 如果已经登陆，但不是管理员，重定向到首页
            next({
                path: '/',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }

    // 进入每个路由之前，初始化数据
    store.commit('set', [
        {
            key: 'page',
            value: 1
        },
        {
            key: 'tag',
            value: ''
        },
        {
            key: 'data',
            value: []
        },
        {
            key: 'count',
            value: 0
        }
    ]);
    // 进入路由
    next();
});
router.afterEach((to, from, next) => {
    // 更改页面标题
    document.title = to.name;
});


// ************************************************实例化************************************************
new Vue({
    el: '#app',
    store,
    router,
    template: '<App />',
    components: {App}
});

