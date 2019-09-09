<template>
  <div :class="{'loading-indicator':isLoading, 'image-viewer':!isLoading}">
    <span v-show="isLoading">
      <i class="fa fa-circle-o-notch fa-spin"></i><br>
      Loading file "{{path}}"
    </span>
    <img v-show="!isLoading" :src="url" :alt="path" @load="isLoading = false">
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
      isLoading: true
    };
  },

  created: function() {
    this.url = this.path.replace(ROOT_DIR, '');
  }

}
</script>