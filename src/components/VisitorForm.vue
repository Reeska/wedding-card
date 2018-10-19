<template>
  <div>
    <form @submit.prevent="addVisitor()">
      <div>name: <input type="text" v-model="firstname"></div>
      <div>Mairie ?: <input type="checkbox" v-model="cityhall"></div>
      <div v-show="cityhall">Accompagnants : <input type="number" v-model="cityhall_companions"></div>
      <div>Bar ?: <input type="checkbox" v-model="bar"></div>
      <div v-show="bar">Accompagnants : <input type="number" v-model="bar_companions"></div>
      <button>Ajouter</button>
    </form>

    <ul>
      <li v-for="user in users" :key="user.id">{{ user.id }} - {{ user.firstname }}</li>
    </ul>
  </div>
</template>

<script>
  import { database } from '../services/firebase';

  const visitorsRef = database.collection('visitors');

  export default {
    data() {
      return {
        users: [],
        firstname: '',
        cityhall: false,
        cityhall_companions: 1,
        bar: false,
        bar_companions: 1,
      };
    },
    created() {
      this.loadUsers();
    },
    methods: {
      async loadUsers() {
        const users = await visitorsRef.get();

        this.users = users.docs.map(user => ({
          id: user.id,
          ...user.data(),
        }));
      },

      async addVisitor() {
        const users = await visitorsRef
          .where('firstname', '==', this.firstname)
          .get();

        if (users.docs.length) {
          alert('Already exists visitor');
          return;
        }

        await visitorsRef.add({
          firstname: this.firstname,
          cityhall: this.cityhall,
          cityhall_companions: this.cityhall_companions,
          bar: this.bar,
          bar_companions: this.bar_companions,
        });

        this.loadUsers();
      },
    },
  };
</script>

<style scoped>
</style>
