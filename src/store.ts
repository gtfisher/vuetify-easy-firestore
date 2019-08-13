import Vue from 'vue';
import Vuex from 'vuex';
import VuexEasyFirestore from 'vuex-easy-firestore';

Vue.use(Vuex);

// import from step 1
import { Firebase, initFirebase } from './config/firebase';
// import from step 3 (below)
import myTasks from './modules/myTasks';

// do the magic 🧙🏻‍♂️
const easyFirestore = VuexEasyFirestore(
  [myTasks],
  {logging: true, FirebaseDependency: Firebase},
);

// include as PLUGIN in your vuex store
// please note that "myModule" should ONLY be passed via the plugin
const storeData = {
  plugins: [easyFirestore],
  // ... your other store data
  // customers: [
  //   { id: '1', name: 'user 1'},
  // ],
};


// initialise Vuex
const store = new Vuex.Store(storeData);

// initFirebase
initFirebase()
  .catch((error) => {
    // take user to a page stating an error occurred
    // (might be a connection error, or the app is open in another tab)
  });

export default store;

// export default new Vuex.Store({
//   state: {

//   },
//   mutations: {

//   },
//   actions: {

//   },
// });
