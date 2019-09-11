import Main from './components/Main.vue';
import Store from './store.js';

window.EVENT_BUS = new Vue({});

new Vue({
  el: '#root',
  store: Store,
  render: h => h(Main)
});
