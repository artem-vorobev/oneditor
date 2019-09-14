/*
  The window.STATE structure.
  It contains main state of whole application. This structure is loaded from server and while editor is working Vuex is synchronizing it by calling mutations on server-side. Main idea is to continuously maintain state of application whenever page will be reloading.

  - rootDir (string) path to DocumentRoot of this server
  - openedDirs (array) paths to directories which was opened in filemenager. At least contains rootDir value.
  - openedFiles (array) paths to files which was opened in editor.
  - activeTab (int) index of tab in 'openedFiles' array.
  - unsavedTabs (array) indexes of tabs contains unsaved code.
*/

function getState() {
  var state;
  if (Object.keys(window.STATE).length == 0) {
    state = {
      rootDir: window.DOCUMENT_ROOT,
      openedDirs: [window.DOCUMENT_ROOT],
      openedFiles: [],
      activeTab: 0,
      unsavedChanges: {}
    }
  } else {
    state = window.STATE;
  }

  state = Object.assign(state, {
    fileLists: {}
  });

  return state;
}


export default new Vuex.Store({
  state: getState(),
  mutations: {
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
  },

  actions: {
    'TOGGLE_DIR': function(context, path) {
      context.commit('TOGGLE_DIR', path);
    },

    'OPEN_FILE': function(context, path) {
      var index = context.state.openedFiles.indexOf(path);
      if (index === -1) {
        context.commit('ADD_OPENED_FILE', path);
        context.commit('SET_ACTIVE_TAB', context.state.openedFiles.length - 1);
      } else {
        context.commit('SET_ACTIVE_TAB', index);
      }
    },

    'CLOSE_FILE': function(context, index) {
      context.commit('REMOVE_OPENED_FILE', index);
      if (context.state.activeTab >= context.state.openedFiles.length && context.state.openedFiles.length > 0) {
        context.commit('SET_ACTIVE_TAB', context.state.openedFiles.length - 1);
      }
    },

    'SAVE_FILE_LIST': function(context, params) {
      context.commit('SAVE_FILE_LIST', params);
    },

    'SET_ACTIVE_TAB': function(context, index) {
      context.commit('SET_ACTIVE_TAB', index);
    }
  }
});