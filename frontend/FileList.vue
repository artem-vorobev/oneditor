<template>
  <ul v-show="opened">
    <li v-if="isLoading" class="loading-indicator">
      <i class="fa fa-circle-o-notch fa-spin"></i>
    </li>
    <li v-for="file in files">
      <div v-if="file.isDirectory" class="filename">
        <div :class="['folder', {'opened':file.isOpened}]" @click="toggleSubdir(file)">
          {{file.name}}
        </div>
        <div class="fmgr-controls">
          <button title="Rename folder" @click="rename(file.path)">
            <i class="fa fa-pencil"></i>
          </button>
          <button title="Add file or folder" @click="add(file.path)">
            <i class="fa fa-plus"></i>
          </button>
          <button class="delete" title="Delete file" @click="unlink(file.path)">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
      <file-list v-if="file.isDirectory" :opened="file.isOpened" :directory="file.path"></file-list>
      <div v-else class="filename">
        <div :class="['file-'+file.extension]" @click="open(file.path)">
          {{file.name}}
        </div>
        <div class="fmgr-controls">
          <button title="Rename file" @click="rename(file.path)">
            <i class="fa fa-pencil"></i>
          </button>
          <button title="Copy file" @click="copy(file.path)">
            <i class="fa fa-copy"></i>
          </button>
          <button class="delete" title="Delete file" @click="unlink(file.path)">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {

  name: 'file-list',
  props: {
    opened: Boolean,
    directory: String
  },

  data: function() {
    return {
      isLoading: false,
      isLoaded: false,
      files: [],
    }
  },

  methods: {
    add: function(path) {
      EVENT_BUS.$emit('fmgr-add', path);
    },
    copy: function(path) {
      EVENT_BUS.$emit('fmgr-copy', path);
    },
    rename: function(path) {
      EVENT_BUS.$emit('fmgr-rename', path);
    },
    unlink: function(path) {
      EVENT_BUS.$emit('fmgr-unlink', path);
    },
    open: function(path) {
      EVENT_BUS.$emit('fmgr-open', path);
    },
    toggleSubdir: function(file) {
      file.isOpened = !file.isOpened;
    },
    loadFiles: function() {
      var component = this;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', window.location.href+'?fn=getfiles', true);
      xhr.onload = function() {
        try {
          component.files = JSON.parse(xhr.responseText);
        } catch(e) {
          component.files = [];
          xhr.onerror();
          return;
        }
        component.isLoaded = true;
        component.isLoading = false;
      }
      xhr.onerror = function() {
        console.error(xhr.responseText);
        component.isLoading = false;
      }
      var params = new FormData();
      params.append('path', component.directory);
      component.isLoading = true;
      xhr.send(params);
    },
  },

  watch: {
    opened: function(newval) {
      // var xhr = new XMLHttpRequest();
      // xhr.open('POST', window.location.href+'?fn=opendir', true);
      // xhr.onload = function() {
      //   if (xhr.responseText != '') xhr.onerror();
      // }
      // xhr.onerror = function() {
      //   console.error(xhr.responseText);
      // }
      // var params = new FormData();
      // params.append('path', this.directory);
      // xhr.send(params);
      if (newval == true && !this.isLoaded) this.loadFiles();
    }
  },

  created: function() {
    if (this.opened && !this.isLoaded) this.loadFiles();
  }
}
</script>

<style></style>