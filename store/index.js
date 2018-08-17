import Vue from 'vue/dist/vue.min.js'
import vuex from 'vuex'

// 使用vuex
Vue.use(vuex);

export default new vuex.Store({
    state: {
        // 导航栏上所有的菜单，添加id只是为了方便vue对元素进行渲染
        navMenus: [
            {id: 1, href: "/blogs", content: "博客"},
            {id: 1, href: "/books", content: "读书"},
            {id: 2, href: "/maotao/timeline", content: "毛桃的时光轴"},
            {id: 3, href: "/about", content: "关于"}
        ],
        // 存放当前路由的所有数据
        data: [],
        // 当前页面的页码，如果为0，表示没有更多的数据了
        page: 1,
        // 当前页面一次显示的数据最大个数
        num: 10,
        // 当前页面总共有多少条数据
        count: 0,
        // 当前页面的标签
        tag: "",
        // 系统中所有的博客标签和这个标签博客的个数： [{'tag1': 5}]
        blogTags: [],
        // 当前用户
        user: new Object(),
        // 是否为管理员用户
        isAdmin: false,
        // 是否为登陆用户
        isLogin: false
    },
    mutations: {        
        // 向data添加新的数据，新数据添加在data的末尾
        addData (state, newData) {
            state.data = state.data.concat(newData.content);
        },
        // 设置state中指定属性的值
        set (state, itemArr) {
            for (var i = itemArr.length - 1; i >= 0; i--) {
                state[itemArr[i].key] = itemArr[i].value;
            }          
        },
        // 更新当前用户
        updateUser (state, action) {
            if (action.operate == "add") {
                // sessionStorage只能存储字符串
                sessionStorage.setItem('user', JSON.stringify(action.user));
                sessionStorage.setItem('isLogin', true);
                if (action.user.admin == 1) {
                   sessionStorage.setItem('isAdmin', true); 
                }                               
            } else if (action.operate == "remove") {
                // 移除用户
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('isLogin');
                sessionStorage.removeItem('isAdmin');
            }
            // 立即响应
            state.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : new Object();
            state.isLogin = sessionStorage.getItem('isLogin') ? true : false;
            state.isAdmin = sessionStorage.getItem('isAdmin') ? true : false;
        }
    }
})