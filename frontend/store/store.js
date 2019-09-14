/*
  The state structure.
  It contains main state of whole application. This structure is loaded from server and while editor is working it sending mutations to the server. Main idea is to continuously maintain state of application whenever page will be reloading.

  - rootDir (string) path to DocumentRoot of this server
  - openedDirs (array) paths to directories which was opened in filemenager. At least contains rootDir value.
  - openedFiles (array) paths to files which was opened in editor.
  - activeTab (int) index of tab in 'openedFiles' array.
  - unsavedChanges (object) keys are paths to files, values are arrays of changes made.
*/
import mutations from './mutations.js';
import actions from './actions.js';

function createStore(state) {
  return new Vuex.Store({
    state: Object.assign(state, {
      fileLists: {}
    }),
    mutations: mutations,
    actions: actions
  });
}

export default new Promise(function(resolve, reject) {
  var xhr = new XMLHttpRequest;
  xhr.open('GET', window.location.href+'?fn=getstate', true);
  xhr.onload = function() {
    console.log(xhr.responseText);
    var state = JSON.parse(xhr.responseText);
    var store = createStore(state);
    resolve(store);
  }
  xhr.onerror = function() {
    reject();
  }
  xhr.send();
});