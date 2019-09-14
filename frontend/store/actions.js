export default {
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