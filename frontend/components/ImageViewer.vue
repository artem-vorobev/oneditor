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
    path: String
  },

  data: function() {
    return {
      url: '',
      loading: true
    };
  },

  created: function() {
    this.url = this.path.replace(ROOT_DIR, '');
  }

}
</script>