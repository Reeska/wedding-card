<template>
  <div>
    <v-form class="col-lg-4 offset-lg-4" @submit.prevent="addVisitor()">
      <div v-if="step === 1">
        <v-text-field
          v-model="firstname"
          label="Votre prénom"
          color="#300924">
        </v-text-field>
        <v-btn :disabled="!firstname" type="button" @click="goToSecondStep()">Continuer</v-btn>
      </div>
      <div v-if="step === 2">
        <v-checkbox label="Je viens à la mairie" v-model="cityhall" color="#300924"></v-checkbox>
        <div v-show="cityhall">
          <v-text-field
            v-model="cityhall_companions"
            label="Nombre d'accompagnants à la mairie"
            type="number"
            color="#300924">
          </v-text-field>
        </div>
        <v-checkbox label="Je viens aux P'tites poules" v-model="bar" color="#300924"></v-checkbox>
        <div v-show="bar">
          <v-text-field
            v-model="bar_companions"
            label="Nombre d'accompagnants au bar"
            type="number"
            color="#300924">
          </v-text-field>
        </div>
        <v-btn type="submit">Enregistrer</v-btn>
      </div>
    </v-form>

    <div v-if="step === 3">
      Merci :)
    </div>

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
        cityhall_companions: 0,
        bar: false,
        bar_companions: 0,
        step: 1,
      };
    },
    created() {
      this.loadUsers();
    },
    methods: {
      async goToSecondStep() {
        const users = await visitorsRef
          .where('firstname', '==', this.firstname)
          .get();
        if (users.docs.length) {
          return;
        }
        this.step = 2;
      },
      async loadUsers() {
        const users = await visitorsRef.get();

        this.users = users.docs.map(user => ({
          id: user.id,
          ...user.data(),
        }));
      },

      async addVisitor() {
        try {
          await visitorsRef.add({
            firstname: this.firstname,
            cityhall: this.cityhall,
            cityhall_companions: this.cityhall_companions,
            bar: this.bar,
            bar_companions: this.bar_companions,
          });
        } catch (error) {
          console.log('error', error);
        }
        this.step = 3;
        this.loadUsers();
      },
    },
  };
</script>

<style scoped>
</style>
