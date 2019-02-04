<template>
  <div>
    <div class="stats">
      <div><strong>Nombre total de réponses :</strong> {{users.length}}</div><br/>
      <div><strong>Nombre de oui pour la mairie :</strong> {{comingToCityHall}}</div>
      <div><strong>Nombre d'accompagnants pour la mairie :</strong> {{companionsToCityHall}}</div><br/>
      <div><strong>Nombre de oui pour le jeu de piste :</strong> {{comingToScavengerHunt}}</div>
      <div><strong>Nombre d'accompagnants pour le jeu de piste :</strong> {{companionsToScavengerHunt}}</div><br/>
      <div><strong>Nombre de oui pour les p'tites poules :</strong> {{comingToBar}}</div>
      <div><strong>Nombre d'accompagnants pour les p'tites poules :</strong> {{companionsToBar}}</div><br/>
      <div><strong>Pourcentage de remplissage par terminal :</strong> {{percentageTerminal}}%</div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Prénom</th>
          <th>Mairie ?</th>
          <th>Avec ?</th>
          <th>Jeu de piste ?</th>
          <th>Avec ?</th>
          <th>P'tites poules ?</th>
          <th>Avec ?</th>
          <th>Depuis terminal</th>
        </tr>
      </thead>
      <tr v-for="user in users" :key="user.id">
        <td>{{user.id}}</td>
        <td>{{user.firstname}}</td>
        <td :class="user.cityhall ? 'coming' : 'notComing'">{{normalizeBoolean(user.cityhall)}}</td>
        <td>{{user.cityhall_companions}}</td>
        <td :class="user.scavenger_hunt ? 'coming' : 'notComing'">{{normalizeBoolean(user.scavenger_hunt)}}</td>
        <td>{{user.scavenger_hunt_companions}}</td>
        <td :class="user.bar ? 'coming' : 'notComing'">{{normalizeBoolean(user.bar)}}</td>
        <td>{{user.bar_companions}}</td>
        <td>{{normalizeBoolean(user.by_terminal)}}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { database } from '../../services/firebase';

  import { OnCreated, Attendee } from '../../types';

  const visitorsRef = database.collection('visitors');

  @Component
  export default class Dashboard extends Vue implements OnCreated {
    private users: Attendee[] = [];
    public async created() {
      const tmp = await visitorsRef.get();

      this.users = tmp.docs.map(user => ({
        id: user.id,
        ...user.data(),
      })) as Attendee[];
    }

    get comingToCityHall() {
      return this.users.filter(user => user.cityhall).length;
    }

    get companionsToCityHall() {
      return this.users.map(user => +user.cityhall_companions).reduce((a, b) => a + b, 0);
    }

    get comingToScavengerHunt() {
      return this.users.filter(user => user.scavenger_hunt).length;
    }

    get companionsToScavengerHunt() {
      return this.users.map(user => +user.scavenger_hunt_companions || 0).reduce((a, b) => a + b, 0);
    }

    get comingToBar() {
      return this.users.filter(user => user.bar).length;
    }

    get companionsToBar() {
      return this.users.map(user => +user.bar_companions).reduce((a, b) => a + b, 0);
    }

    get percentageTerminal() {
      const numberOfTerminal = this.users.filter(user => user.by_terminal).length;
      const percentage = (numberOfTerminal / this.users.length) * 100;
      return Math.round(percentage * 100) / 100;
    }

    normalizeBoolean(b: boolean) {
      return b ? 'Oui' : 'Non';
    }
  }
</script>

<style lang="scss">
  table {
    width: 100%;
    td,
    th {
      padding: 5px;
      border: 1px solid black;
    }
    .coming {
      background-color: #7fe497;
    }
    .notComing {
      background-color: #ec606e;
    }
  }
  .stats {
    text-align: justify;
    margin: 15px;
  }
</style>
