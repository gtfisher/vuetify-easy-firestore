<template>
  <v-app>
   <v-app-bar
      app
      color="indigo"
      dark
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title>Easy Firestore Sample</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn to="/" text>Home</v-btn>
          <v-btn to="/todo" text>Todo</v-btn>
          <v-btn to="/about" text>About</v-btn>
        </v-toolbar-items>
    </v-app-bar>


    <v-content>
     <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
    </v-content>
     <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    //
  }),
});
</script>
