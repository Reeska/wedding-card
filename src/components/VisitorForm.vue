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
          :is="firstnameAsComponent">
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
        <div class="justified">
          Entre la cérémonie à la mairie et la soirée au bar nous souhaitons organiser un petit "jeu de piste" personnalisé près de chez nous (et de la mairie). Nous avons donc besoin de savoir si assez de personne seraient intéressés pour participer.
        </div>
        <v-checkbox label="Je veux participer au jeu de piste" v-model="scavengerHunt" color="#300924"></v-checkbox>
        <div v-show="scavengerHunt">
          <v-text-field
            v-model="scavengerHuntCompanions"
            label="Nombre d'accompagnants au jeu de piste"
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
        <img src="../assets/dwight.gif"/><br/>
        C'est noté, on espère pouvoir fêter avec toi une autre fois <img src="../assets/cute.gif"/>
      </div>
      <div v-if="!bar && cityhall">
        <img src="../assets/disappointed.gif"/><br/>
        C'est noté, dommage on aurait voulu boire un verre avec toi pour fêter, mais ce sera pour une autre fois <img src="../assets/cute.gif"/>
      </div>
      <div v-if="bar && !cityhall">
        <img src="../assets/drunk_ron.gif"/><br/>
        Ah ouais, on voit le genre (et on respecte <img src="../assets/glasses.gif"/>), c'est bien noté !
      </div>
      <div v-if="bar && cityhall">
        <img src="../assets/monica.gif"/><br/>
        Trop bien, hâte de pouvoir fêter ça avec toi <img src="../assets/sheep.gif"/>
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
  import Alexandre from './guests/Alexandre.vue';
  import Akli from './guests/Akli.vue';
  import Jeremie from './guests/Jeremie.vue';
  import Corentin from './guests/Corentin.vue';
  import Guillaume from './guests/Guillaume.vue';
  import Maelle from './guests/Maelle.vue';
  import Justine from './guests/Justine.vue';
  import Catherine from './guests/Catherine.vue';
  import Thierry from './guests/Thierry.vue';
  import Sabine from './guests/Sabine.vue';
  import Abdoulaye from './guests/Abdoulaye.vue';
  import { OnCreated, User } from '../types';

  const visitorsRef = database.collection('visitors');

  @Component({
    components: {
      Cyrielle,
      Alexandre,
      Akli,
      Jeremie,
      Corentin,
      Guillaume,
      Maelle,
      Justine,
      Catherine,
      Thierry,
      Sabine,
      Abdoulaye,
    },
  })
  export default class VisitorForm extends Vue implements OnCreated {
    private users: User[] = [];
    private firstname: string = '';
    private firstnameAsComponent: string = '';
    private cityhall: boolean = false;
    private cityhallCompanions: number = 0;
    private bar: boolean = false;
    private barCompanions: number = 0;
    private scavengerHunt: boolean = false;
    private scavengerHuntCompanions: number = 0;
    private step: number = 1;
    private specialUsers: any[] = [
      { name: 'cyrielle', alt: ['cy', 'cycy'] },
      { name: 'alexandre', alt: ['alex', 'microbe'] },
      { name: 'akli', alt: [] },
      { name: 'jeremie', alt: ['jerem'] },
      { name: 'corentin', alt: ['coretin'] },
      { name: 'guillaume', alt: ['guigui'] },
      { name: 'maelle', alt: ['maëlle'] },
      { name: 'justine', alt: [] },
      { name: 'catherine', alt: ['maman'] },
      { name: 'thierry', alt: ['papa'] },
      { name: 'sabine', alt: [] },
      { name: 'abdoulaye', alt: ['ablo'] },
    ];

    public created() {
      this.loadUsers();
    }

    public async goToNextStep() {
      if (this.step === 1) {
        const users = await visitorsRef.where('firstname', '==', this.firstname).get();
        if (users.docs.length) {
          console.log('user deja enregistre');
        }
        this.firstnameAsComponent = this.findFirstname();
        if (!this.firstnameAsComponent) {
          this.step = 3;
          return;
        }
      }
      this.step += 1;
    }

    public findFirstname() {
      const firstnameLowerCase = this.firstname.toLowerCase();
      if (this.specialUsers.find(u => u.name === firstnameLowerCase)) {
        return firstnameLowerCase;
      }
      const user = this.specialUsers.find(u => u.alt.includes(firstnameLowerCase));
      if (user) {
        return user.name;
      }
      return '';
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
          scavenger_hunt: this.scavengerHunt,
          scavenger_hunt_companions: this.scavengerHuntCompanions,
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
  .justified {
    text-align: justify;
    font-style: italic;
  }
</style>
