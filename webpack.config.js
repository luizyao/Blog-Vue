const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader');
// 抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssLoader = [
    // 'style-loader',
    {
        loader: 'css-loader',
        options: {
            // modules: true, // 为true会将类名打包成hash值
            importLoaders: 1 // 前面有几个loader 值就是多少
        }
    },
    {
        // 使用postcss时候必须要有选项，并且选项中必须有内容
        // 否则会报错：No Postcss config found.
        // 具体配置和选项参考：https://github.com/michael-ciniawsky/postcss-load-config
        loader: 'postcss-loader',
        // 配置也可以通过 postcss.config.js 指定
        options: {
            plugins: (loader) => [
                require('autoprefixer')()
            ]
        }
    }
];

module.exports = {
    mode: 'development',
        
    // 唯一入口文件
    entry:  path.resolve(__dirname, "main.js"),
    // 打包后的文件存放的地方
    output: {
        path: path.resolve(__dirname, "www", "static"),
        // 打包后输出文件的文件名 
        filename: "js/bundle.js",
        publicPath: "/static/"      
    },

    devServer: {
        contentBase: path.resolve(__dirname, "www"),//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        publicPath: "/static/"
    },

    // 其他解决方案
    resolve: {
        // require时省略的扩展名，遇到以.vue结尾的也要去加载
        extensions: ['.js', '.vue'],
        // 模块别名地址，方便后续直接引用别名，无须写长长的地址，注意如果后续不能识别该别名，需要先设置root
        alias: {}
    },    

    // 不进行打包的模块
    externals:{
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'vuex': 'Vuex',
        'marked': 'marked',
        'Hljs': 'highlight'
    },

    // 模块加载器
    module: {
        // rules用来处理在入口文件中require的和其他方式引用进来的文件，
        // test是正则表达式，匹配要处理的文件；
        // loader匹配要使用的loader，"-loader"可以省略；
        // include把要处理的目录包括进来，exclude排除不处理的目录       
        rules: [
            //  使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/, 
                loader: 'vue-loader'
            },
            // 使用babel 加载 .js 结尾的文件
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, 
            // 使用css-loader和style-loader 加载 .css 结尾的文件
            {  
                test: /\.css$/,  
                loader: 'style-loader!css-loader',                
                // 将样式抽取出来为独立的文件, 懒加载模式，有事后会导致样式加载不进来，暂时注掉
                //use: ExtractTextPlugin.extract({
                //    fallback: 'style-loader',
                //    use: cssLoader
                //})
            },
            // 加载图标
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                loader: 'file-loader',
                query: {               
                    // 把较小的图标转换成base64的字符串内嵌在生成的js文件里    
                    limit: 10000,
                    name:'../fonts/[name].[ext]?[hash:7]',
                    prefix:'font'
                }
            }             
        ] 
    }, 

    plugins: [
        new VueLoaderPlugin()
        // new ExtractTextPlugin("css/styles.css"),
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
            NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
            warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ])
}