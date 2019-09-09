<template>
  <div>
    <ul id="tabs">
      <li
        v-for="(file, n) in files"
        :class="{'active': active == n, 'unsaved': file.isUnsaved}"
        @click="active = n"
      >
        {{file.name}}
        <i class="fa fa-times" @click.stop="close(n)"></i>
      </li>
    </ul>
    <ul id="documents">
      <li v-for="(file, n) in files" :class="{'active': active == n}" :key="file.path">
        <component :is="file.viewer" :path="file.path"></component>
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

  data: function() {
    return {
      files: [
        // name
        // path
        // viewer
        // isUnsaved
      ],
      active: 0
    }
  },

  methods: {
    open: function(path) {
      for (var i=0; i<this.files.length; i++) {
        if (this.files[i].path == path) {
          this.active = i;
          return;
        }
      }

      var file = {
        name: path.split('/').pop().toLowerCase(),
        path: path,
        isUnsaved: false
      }

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
        file.viewer = 'image-viewer';
      } else {
        file.viewer = 'text-editor';
      }

      this.files.push(file);
      this.active = this.files.length - 1; 
    },

    close: function(index) {
      // todo check if need to show prompt
      this.files.splice(index, 1);
      if (this.active >= this.files.length && this.files.length > 0) {
        this.active = this.files.length - 1;
      }
    }
  },

  created: function() {
    EVENT_BUS.$on('fmgr-open', this.open);
  }
}
</script>

<style></style>