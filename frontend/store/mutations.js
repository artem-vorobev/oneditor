export default {
  'TOGGLE_DIR': function(state, path) {
    var index = state.openedDirs.indexOf(path);
    if (index === -1) {
      state.openedDirs.push(path);
    } else {
      state.openedDirs.splice(index, 1);
    }
  },

  'ADD_OPENED_FILE': function(state, path) {
    state.openedFiles.push(path);
  },

  'REMOVE_OPENED_FILE': function(state, index) {
    state.openedFiles.splice(index, 1);
  },

  'SET_ACTIVE_TAB': function(state, index) {
    if (index >= 0 && index < state.openedFiles.length) {
      state.activeTab = index;
    }
  },

  'SAVE_FILE_LIST': function(state, params) {
    state.fileLists[params.path] = params.list;
  }
}