<template>
    <the-main-body>
        <div class="panel panel-default about" slot="data">
            <div class="panel-heading text-center">
                    <h2>一个新手爸爸的“不知所云”</h2>
            </div> 
            <div class="panel-body">
                <p>“毛桃”是我儿子的小名，他快一岁了。这个网站更多的也是因为他才做的，是送给他的一周岁礼物，希望能够记录他的成长；他出生的时候很小，现在也不大，每天最喜欢傻笑，还不好好吃饭，可是我还是很高兴你能成为我的孩子。</p>
                <p>成为一个父亲，对男人来说是一个重大的分水岭。孩子一天天的长大，责任感也越来越重，在如今的社会中，如何让他安全的长大，也是一个不小的挑战。希望你能像自己的名字一样：“如月之恒，如日之升”。</p>
                <p>我们想要成为一个什么样的父母？尊重孩子？陪伴孩子？我觉得现在的社会每天都很焦虑，更多的是父母的焦虑。我希望以后我们能多换位思考，尽量给他一个丰富多彩的童年。</p>
                <p>另外，网站的源码托管在GitHub上面，欢迎访问。</p>
                <span class="pull-right" style="padding-right: 2em;">毛桃爸爸</span><br>
                <span class="pull-right" style="padding-right: 1.5em">2018.7.27</span>
            </div>               
        </div>
    </the-main-body>
</template>

<script>
    import TheMainBody from '../components/TheMainBody'

    export default {
        components: {
            "the-main-body": TheMainBody
        }
    }
</script>

<style scoped>
    p {
        text-indent: 2em;
    }
    .about {
        margin-top: 35px;
        font-size: medium;
    }
</style>