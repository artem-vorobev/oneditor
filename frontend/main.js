import Editor from './Editor.vue';

window.EVENT_BUS = new Vue({});

new Vue({
  el: '#root',
  render: h => h(Editor)
});
