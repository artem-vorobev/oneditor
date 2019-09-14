<template>
  <div>
    <ul id="tabs">
      <li
        v-for="(file, n) in files"
        :class="{'active': active == n, 'unsaved': isUnsaved(file)}"
        @click="active = n"
      >
        {{ getName(file) }}
        <i class="fa fa-times" @click.stop="closeTab(n)"></i>
      </li>
    </ul>
    <ul id="documents">
      <li v-for="(file, n) in files" :class="{'active': active == n}" :key="file">
        <component :is="getViewerComponent(file)" :index="n"></component>
      </li>
    </ul>
  </div>
</template>

<script>
import ImageViewer from './ImageViewer.vue';
import TextEditor from './TextEditor.vue';

export default {
  name: 'editor-tabs',
  components: {
    'image-viewer': ImageViewer,
    'text-editor': TextEditor
  },
  computed: {
    files: function() {
      return this.$store.state.openedFiles;
    },
    active: {
      get: function() {
        return this.$store.state.activeTab;
      },
      set: function(value) {
        this.$store.commit('SET_ACTIVE_TAB', value);
      }
    }
  },
  methods: {
    isUnsaved: function(path) {
      return path in this.$store.state.unsavedChanges;
    },
    getViewerComponent: function(path) {
      var imageTypes = [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'svg',
        'ico'
      ];
      var ext = path.split('.').pop().toLowerCase();
      if (imageTypes.indexOf(ext) != -1) {
        return 'image-viewer';
      } else {
        return 'text-editor';
      }
    },
    getName: function(path) {
      return path.split('/').pop();
    },
    closeTab: function(index) {
      this.$store.commit('CLOSE_FILE', index);
    }
  }
}
</script>

<style></style>