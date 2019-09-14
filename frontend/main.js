import Main from './components/Main.vue';
import loadStore from './store/store.js';

loadStore.then(store => {
  new Vue({
    el: '#root',
    store: store,
    render: h => h(Main)
  });
});