<template>
  <v-data-table
    :headers="headers"
    :items="mytasks"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Tasks</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.action" label="Task"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.priority" label="Priority"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.complexity" label="Complexity"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.myaction="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script lang="ts">
export interface TodoRecord {
    id: string;
    action: string;
    priority: string;
    complexity: string;
}

export function DocToTodoRecordMap(doc: any): TodoRecord {
    // var rowData = doc.data();
    const record = {
        id: doc.id,
        action: doc.action,
        priority: doc.priority,
        complexity: doc.complexity,
    };

    return record;
}




import Vue from 'vue';



export default Vue.extend({
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Task',
          align: 'left',
          sortable: true,
          value: 'action',
        },
        { text: 'Priority', value: 'priority' },
        { text: 'Complexity', value: 'complexity' },
        { text: 'Actions', value: 'myaction', sortable: false },
      ],
      editedItem: {
        id: '',
        action: '',
        priority: 0,
        complexity: '',
      },
      defaultItem: {
        id: '',
        action: 'dummy',
        priority: 1,
        complexity: 'easy',
      },
    }),
      computed: {
      formTitle(): string {

        return this.editedItem.id === '' ? 'New Item' : 'Edit Item';
      },
        mytasks(): any {

          const parsedObj = JSON.parse(JSON.stringify(this.$store.state.myTasks.data));
          // tslint:disable-next-line:no-console
          console.log('parsedOb---->', parsedObj, '----', typeof parsedObj);
          const result = [];

          for (const i in parsedObj) {
              if (i) {
              const rec = DocToTodoRecordMap (parsedObj[i]);
              console.log('rec---->', i, '=======', rec);
              result.push(rec);
              }
            }
          return result;
      },

    },
      watch: {
      dialog(val) {
        val || this.close();
      },
    },

    created() {

      this.$store.dispatch('myTasks/openDBChannel').catch(console.error);
    },
     methods: {
      editItem(item: any) {

        console.log('------edited item:', item);

        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item: any) {
        if (confirm('Are you sure you want to delete this item?')) {
          this.$store.dispatch('myTasks/delete', item.id);
        }
      },

      close() {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
        }, 300);
      },

      save() {
        this.$store.dispatch('myTasks/set', this.editedItem);
        this.close();
      },
    },

});
</script>
