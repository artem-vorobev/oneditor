<template>
  <div :class="{'loading-indicator':loading, 'image-viewer':!loading}">
    <span v-show="loading">
      <i class="fa fa-circle-o-notch fa-spin"></i><br>
      Loading file "{{path}}"
    </span>
    <img v-show="!loading" :src="url" :alt="path" @load="loading = false">
  </div>
</template>

<script>
export default {
  
  name: 'image-viewer',
  props: {
    index: Number
  },

  data: function() {
    return {
      url: '',
      loading: true,
      path: this.$store.state.openedFiles[this.index],
    };
  },

  created: function() {
    this.url = this.path.replace(this.$store.state.rootDir, '');
  }

}
</script>