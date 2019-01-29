<template>
  <div>
    <div>Nombre total de réponses : {{users.length}}</div>
    <div>Nombre de oui pour la mairie : {{comingToCityHall}}</div>
    <div>Nombre d'accompagnants pour la mairie : {{companionsToCityHall}}</div>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Prénom</th>
          <th>Mairie ?</th>
          <th>Avec ?</th>
          <th>Bar ?</th>
          <th>Avec ?</th>
        </tr>
      </thead>
      <tr v-for="user in users" :key="user.id">
        <td>{{user.id}}</td>
        <td>{{user.firstname}}</td>
        <td>{{user.cityhall}}</td>
        <td>{{user.cityhall_companions}}</td>
        <td>{{user.bar}}</td>
        <td>{{user.bar_companions}}</td>
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
  }
</script>

<style lang="scss">
  table {
    td,
    th {
      padding: 5px;
      border: 1px solid black;
    }
  }
</style>
