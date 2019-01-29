<template>
  <div>
    <v-form class="col-lg-4 offset-lg-4" @submit.prevent="submit()">
      <div v-if="step === 1">
        <v-text-field
          v-model="firstname"
          label="Votre prénom"
          color="#300924">
        </v-text-field>
        <v-btn :disabled="!firstname" type="button" @click="goToNextStep()">Continuer</v-btn>
      </div>
      <div v-if="step === 2">
        <component
          :is="firstname">
        </component>
        <v-btn type="button" @click="goToNextStep()">Continuer</v-btn>
      </div>
      <div v-if="step === 3">
        <v-checkbox label="Je viens à la mairie" v-model="cityhall" color="#300924"></v-checkbox>
        <div v-show="cityhall">
          <v-text-field
            v-model="cityhallCompanions"
            label="Nombre d'accompagnants à la mairie"
            type="number"
            color="#300924">
          </v-text-field>
        </div>
        <v-checkbox label="Je viens aux P'tites poules" v-model="bar" color="#300924"></v-checkbox>
        <div v-show="bar">
          <v-text-field
            v-model="barCompanions"
            label="Nombre d'accompagnants au bar"
            type="number"
            color="#300924">
          </v-text-field>
        </div>
        <v-btn type="submit">Enregistrer</v-btn>
      </div>
    </v-form>

    <div v-if="step === 4">
      <div v-if="!bar && !cityhall">
        <img src="../assets/dwight.gif"/>
      </div>
      <div v-if="!bar && cityhall">
        <img src="../assets/disappointed.gif"/>
      </div>
      <div v-if="bar && !cityhall">
        <img src="../assets/drunk_ron.gif"/>
      </div>
      <div v-if="bar && cityhall">
        Merci !<br/>
        <img src="../assets/monica.gif"/>
      </div>
    </div>

    <!-- <ul>
      <li v-for="user in users" :key="user.id">{{ user.id }} - {{ user.firstname }}</li>
    </ul> -->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { database } from '../services/firebase';

  import { FirebaseFirestore } from '@firebase/firestore-types';
  import Component from 'vue-class-component';
  import Cyrielle from './guests/Cyrielle.vue';
  import { OnCreated, User } from '../types';

  const visitorsRef = database.collection('visitors');

  @Component({
    components: { Cyrielle },
  })
  export default class VisitorForm extends Vue implements OnCreated {
    private users: User[] = [];
    private firstname: string = '';
    private cityhall: boolean = false;
    private cityhallCompanions: number = 0;
    private bar: boolean = false;
    private barCompanions: number = 0;
    private step: number = 1;
    private specialUsers: string[] = ['cyrielle'];

    public created() {
      this.loadUsers();
    }

    public async goToNextStep() {
      if (this.step === 1) {
        const users = await visitorsRef.where('firstname', '==', this.firstname).get();
        if (users.docs.length) {
          console.log('user deja enregistre');
        }
        if (!this.specialUsers.includes(this.firstname.toLowerCase())) {
          this.step = 3;
          return;
        }
      }
      this.step += 1;
    }

    public async loadUsers() {
      const users = await visitorsRef.get();

      this.users = users.docs.map(user => ({
        id: user.id,
        ...user.data(),
      }));
    }

    public async submit() {
      if (this.step < 3) {
        this.goToNextStep();
        return;
      }
      try {
        await visitorsRef.add({
          firstname: this.firstname,
          cityhall: this.cityhall,
          cityhall_companions: this.cityhallCompanions,
          bar: this.bar,
          bar_companions: this.barCompanions,
        });
      } catch (error) {
        console.log('error', error);
      }
      this.step = 4;
      this.loadUsers();
    }
  }
</script>

<style scoped>
</style>
