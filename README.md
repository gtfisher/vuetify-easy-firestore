# vuetify-easy-firestore

## Project setup

Added vuetify with command `vue add vuetify`, this runs but has lint errors to get it to run cleanly you need to:
* change `import Vuetify from 'vuetify/lib';` to `import Vuetify from 'vuetify';` in [vuetify.ts](src\plugins\vuetify.ts)
* add `import 'vuetify/dist/vuetify.min.css';` to [main.ts](src\main.ts)

### Vuetify icons not working

Vurtify icons were displaying as text and not showing the icon, this can be solved by:
* `npm install --save material-design-icons-iconfont` and then
* in [main.ts](src\main.ts) `import 'material-design-icons-iconfont/dist/material-design-icons.css'`

## Project overview
Demno project uses Firestore as backing data and the [Vuetify Material Design](https://vuetifyjs.com/en/) framework for layout. To ease the use of Firestore it uses [Vuex Easy Firestore]](https://mesqueeb.github.io/vuex-easy-firestore/), this enables data access as follows:

```javascript
const myTasks = {
    firestorePath: 'tasks',
    firestoreRefType: 'collection', // or 'doc'
    moduleName: 'myTasks',
    statePropName: 'data',
    namespaced: true, // automatically added

    // this object is your store module (will be added as '/myModule')
    // you can also add state/getters/mutations/actions
    state: {},
    getters: {

    },
    mutations: {},
    actions: {},
  };

export default myTasks;
```

 In the created on the Vue view you then call:
 `this.$store.dispatch('myTasks/openDBChannel').catch(console.error)`

 Then to read the cointent of the collection tasks from firestore  `this.$store.state.myTasks.data`
 to create `this.$store.dispatch('myTasks/set', this.editedItem)` nb: if edited item does not have an id, the id will be allocated by firestore, easy firestore also add's a created at and the use id of the creatore (if signed in)
 to delete
 `this.$store.dispatch('myTasks/delete', item.id);`

 to update, the same event can be used but ensure the edited item has an existring id, then the item will be updated in stead of creating a new item
 `this.$store.dispatch('myTasks/set', this.editedItem)`

 the details of the implementation can be seen in:
 * [Todo.vue](src/views/Todo.vue)
 * [myTasks.ts](src/modules/myTasks.ts)

 To do
 * add authentication
 * ~~tidy-up typescript linting errors~~
 * deploy on firebase
 * fix/add the navigation drawer




## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## to setup and deploy on firebase

firebase login

firebase init (initialised for functions, database and hosting)

part of hosting setup told firebase to deploy from dist (to allow for vue deployments)

To build the vue app run npm run build

then run npm run build

firebase deploy --only hosting
