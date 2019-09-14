<template>
  <div id="wrap">
    <div id="aside">
      <div id="filemanager">
        <file-list :path="rootDir"></file-list>
      </div>
      <div id="statusbar">
        Status bar
      </div>
    </div>
    <editor-tabs id="content"></editor-tabs>
  </div>
</template>


<script>
import FileList from './FileList.vue';
import EditorTabs from './EditorTabs.vue';

export default {
  name: 'editor',
  components: {
    'file-list': FileList,
    'editor-tabs': EditorTabs,
  },
  data: function() {
    return {rootDir: this.$store.state.rootDir};
  }
}
</script>

<style></style>