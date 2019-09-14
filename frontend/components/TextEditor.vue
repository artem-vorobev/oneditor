<template>
  <div class="loading-indicator">
    <span>
      <i class="fa fa-circle-o-notch fa-spin"></i><br>
      Loading file "{{path}}"
    </span>
  </div>
</template>

<script>
var loadedModes = ['text/plain', 'xml', 'clike', 'php', 'javascript', 'css', 'htmlmixed'];
function loadMode(mode) {
  return new Promise(function(resolve, reject) {
    if (loadedModes.indexOf(mode) != -1) {
      resolve();
      return;
    }
    var s = document.createElement('SCRIPT');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/'+mode+'/'+mode+'.min.js';
    s.onload = function() {
      loadedModes.push(mode);
      resolve();
    }
    s.onerror = function() {
      reject();
    }
    document.head.appendChild(s);
  });
}

function loadText(path) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', window.location.href+'?fn=openfile', true);
    xhr.onload = function() {
      resolve(xhr.responseText);
    }
    xhr.onerror = function() {
      reject();
    }
    var params = new FormData();
    params.append('path', path);
    xhr.send(params);
  });
}

export default {
  name: 'text-editor',
  props: {
    index: Number
  },

  data: function() {
    return {
      path: this.$store.state.openedFiles[this.index],
    };
  },

  created: function() {
    var component = this;
    var path = component.path;
    var ext = path.split('.').pop().toLowerCase();
    var ext2mode = {
      'css': 'css',
      'htm': 'htmlmixed',
      'html': 'htmlmixed',
      'js': 'javascript',
      'json': 'javascript',
      'jsx': 'jsx',
      'md': 'markdown',
      'php': 'php',
      'sass': 'sass',
      'scss': 'sass',
      'sh': 'shell',
      'sql': 'sql',
      'twig': 'twig',
      'xml': 'xml'
    }
    var mode = (ext in ext2mode) ? ext2mode[ext] : 'text/plain';
    loadMode(mode)
    .then(loadText.bind(null, path))
    .then(function(text) {
      var cm = component.codeMirror = CodeMirror(
        function(c) {
          component.$el.parentNode.appendChild(c);
          component.$el.style.display = 'none';
        },
        {
          value: text,
          mode: mode,
          theme: 'material',
          lineNumbers: true,
          lineWrapping: true
        }
      );
      if (CodeMirror.keyMap.default == CodeMirror.keyMap.macDefault) {
        cm.addKeyMap({'Cmd-S': component.save});
        cm.addKeyMap({'Shift-Cmd-S': component.saveAs});
      } else {
        cm.addKeyMap({'Ctrl-S': component.save});
        cm.addKeyMap({'Ctrl-Shift-S': component.saveAs});
      }
    })
    .catch(e => console.dir(e));
  },

  methods: {
    save: function() {
      alert('save');
    },

    saveAs: function() {
      alert('saveAs');
    }
  }

}
</script>

<style></style>