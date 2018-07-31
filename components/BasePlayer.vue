<template>
    <div class="player">
      <video :src="src" controls="controls" height="100%" width="100%" @contextmenu.prevent>

      </video>
    </div>
</template>
 
<script>

    export default {
        props: {
            src: {
                type: String,
                required: true
            }
        }
    }
</script>

