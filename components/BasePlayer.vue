<template>
    <div class="player">
      <video :src="src" controls="controls" height="100%" width="100%" 
            type="video/mp4" @contextmenu.prevent @error="setErrorVideo"
        ></video>
    </div>
</template>
 
<script>

    export default {
        props: {
            src: {
                type: String,
                required: true
            }
        },
        methods: {
            setErrorVideo () {
                this.src = '/static/image/err_defualt.mp4'
            }
        }
    }
</script>

