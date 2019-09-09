<template>
  <div id="wrap">
    <div id="aside">
      <div id="filemanager">
        <button class="add-in-root" @click="addInRootClick">
          <i class="fa fa-plus"></i>
        </button>
        <file-list :opened="true" :directory="rootDir"></file-list>
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
    return {
      rootDir: ROOT_DIR
    }
  },
  methods: {
    addInRootClick: function() {
      EVENT_BUS.$emit('fmgr-add', ROOT_DIR);
    },
    fmrgAdd: function(path) {
      alert('Add into '+path);
    },
    fmrgCopy: function(path) {
      alert('Copy '+path);
    },
    fmrgRename: function(path) {
      alert('Rename '+path);
    },
    fmrgDelete: function(path) {
      alert('Delete '+path);
    }
  },
  created: function() {
    EVENT_BUS.$on('fmgr-add', this.fmrgAdd);
    EVENT_BUS.$on('fmgr-copy', this.fmrgCopy);
    EVENT_BUS.$on('fmgr-rename', this.fmrgRename);
    EVENT_BUS.$on('fmgr-unlink', this.fmrgDelete);
  }
}
</script>

<style></style>