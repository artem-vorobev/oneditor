export default new Vuex.Store({
  state: window.STATE,
  /*
  The window.STATE structure.
  It contains main state of whole application. This structure is loaded from server and while editor is working Vuex is synchronizing it by calling mutations on server-side. Main idea is to continuously maintain state of application whenever page will be reloading.

  - rootDir (string) path to DocumentRoot of this server
  - openedDirs (array) paths to directories which was opened in filemenager. At least contains rootDir value.
  - openedFiles (array) paths to files which was opened in editor.
  - activeTab (int) index of tab in 'openedFiles' array.
  - unsavedChanges (object) keys are paths to files, values are text of these files edited previously, but not saved yet.
  */

  mutations: {
    'TOGGLE_DIR': function(state, path) {
      var index = state.openedDirs.indexOf(path);
      if (index === -1) {
        state.openedDirs.push(path);
      } else {
        state.openedDirs.splice(index, 1);
      }
    },

    'OPEN_FILE': function(state, path) {
      var index = state.openedFiles.indexOf(path);
      if (index === -1) {
        state.openedFiles.push(path);
        state.activeTab = state.openedFiles.length - 1;
      } else {
        state.activeTab = index;
      }
    },

    'SET_ACTIVE_TAB': function(state, index) {
      if (index >= 0 && index < state.openedFiles.length) {
        state.activeTab = index;
      }
    },

    'CLOSE_FILE': function(state, index) {
      state.openedFiles.splice(index, 1);
      if (state.activeTab >= state.openedFiles.length && state.openedFiles.length > 0) {
        state.activeTab = state.openedFiles.length - 1;
      }
    }
  },
});