<template>
    <div id="app">
        <the-navigation-bar></the-navigation-bar>
        <div class="main">
            <router-view></router-view>
        </div>        
        <the-back-to-top-link></the-back-to-top-link>
        <the-footer></the-footer>
    </div> 
</template>

<script>
    import TheNavigationBar from './components/TheNavigationBar'
    import TheBackToTopLink from './components/TheBackToTopLink'
    import TheFooter from './components/TheFooter'

    export default {
        components: {
            "the-navigation-bar": TheNavigationBar,
            "the-back-to-top-link": TheBackToTopLink,
            "the-footer": TheFooter
        }
    }
</script>

<style scoped>
    .main {
        padding-bottom:70px;
    }
</style>