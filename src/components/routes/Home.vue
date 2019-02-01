<template>
  <div id="app">
    <div class="menu">
      <input v-model="burger" class="burger" type="checkbox">
      <nav>
        <div v-for="link in links" :key="link.label">
          <a @click="burger = false" :href="link.href" v-smooth-scroll="smoothScroll">{{ link.label }}</a>
        </div>
      </nav>
    </div>

    <div class="page">
      <Konami />
      <div class="flex" id="home">
        <div class="typewriter">
          <h1>{{title}}</h1>
        </div>
      </div>

      <div class="date">
        <b>8 Juin 2019 à 15h00</b>
        <br>-
        <i>Star date 72900.4</i> -
      </div>

      <section class="tardis">
        <div @click="showJustMarried = true" id="star"></div>
        <div class="justMarried" v-if="showJustMarried"></div>
      </section>

      <section id="ceremony">
        <h1 class="titleCustom">Cérémonie - 15h20</h1>
        <div class="padded map-responsive">
          <iframe
            width="600"
            height="450"
            frameborder="0"
            style="border:0"
            :src="'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJdbbQwbZx5kcR7ZKHnZ405Fg&key=' + apiKey"
            allowfullscreen
          ></iframe>
        </div>
      </section>

      <section id="reception">
        <h1 class="titleCustom">Réception - 19h00</h1>
        <div class="padded map-responsive">
          <iframe
            width="600"
            height="450"
            frameborder="0"
            style="border:0"
            :src="'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJgQfCkxNu5kcRcQi5NxUc9C8&key=' + apiKey"
            allowfullscreen
          ></iframe>
        </div>
      </section>

      <section id="presence">
        <h1 class="titleCustom">Présence</h1>
        <div class="col-md-4 offset-md-5">
          <v-switch color="#300924" label="Mode geek" v-model="geekMode"></v-switch>
        </div>
        <div v-if="geekMode">
          <terminal></terminal>
        </div>
        <div v-else>
          <visitor-form></visitor-form>
        </div>
      </section>

      <section id="easterEggs">
        <h1 class="titleCustom">Easter Eggs</h1>
        <div class="row">
          <div class="faq col-lg-6 col-sm-12 offset-lg-3">
            Certains d'entre vous l'auront peut-être déjà remarqué, mais on s'est amusé à placer quelques
            <a href="https://fr.wikipedia.org/wiki/Easter_egg">easter eggs</a> sur le site
            <img class="smallGif" src="../../assets/hehe.gif"/><br/>
            Ils sont au nombre de <strong>5</strong> et on espère que personne ne les trouvera tous
            <img class="smallGif" src="../../assets/oups.gif"/><br/>
            <br/>Vous abandonnez déjà ? <img src="../../assets/tongue.png"/><br/>
            <div class="text-xs-center">
              <v-btn type="button" @click="easterEggFakeSolutionShown = true">Tricher</v-btn>
            </div>
            <div v-if="easterEggFakeSolutionShown" class="text-xs-center">
              <div>
                <img class="smallGif" src="../../assets/disappointment.gif" />
              </div>
              <div>
                <img class="smallGif" src="../../assets/not_mad.jpg" />
              </div>
              <v-btn type="button" @click="easterEggRealSolutionShown = true">Voir les indices</v-btn>
            </div>
            <div v-if="easterEggRealSolutionShown">
              <p>Allez, on est sympas, on vous aide un peu <img src="../../assets/hehe.gif"/></p>
              <p>Déjà il y a la moitié des easter eggs que vous ne pourrez trouver que sur ordinateur,
                donc si vous êtes sur mobile depuis le début, on vous conseille de changer.</p>
              <p><strong>1.</strong> Vous vous souvenez des cheat codes sur GTA pour avoir des vies infinies ou pouvoir piloter un avion ?
                Et bah là c'est pareil mais la référence est plus vieille <img src="../../assets/hehe.gif" /></p>
              <p><strong>2.</strong> Vous voyez Sombra en bas à droite sur le footer ? Elle n'est pas là que pour le plaisir des yeux
                <img src="../../assets/glasses.gif"/></p>
              <p><strong>3.</strong> Pour celui-ci, il va falloir faire preuve de curiosité et tenter de regarder sous le capot.</p>
              <p><strong>4.</strong> Il n'y a pas une étoile vers le TARDIS qui vous paraît bizarre, vous ?</p>
              <p><strong>5.</strong> Pour le dernier il va falloir rafraîchir la page à une heure bien spécifique, on vous laisse deviner laquelle <img src="../../assets/proud.gif"/></p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq">
        <h1 class="titleCustom">FAQ</h1>
        <div class="row">
          <div class="faq col-lg-6 col-sm-12 offset-lg-3">
            <div class="question">Qu'est-ce que je dois porter ?</div>
            <div
              class="answer"
            >Il n'y a pas de dress code, venez comme vous le souhaitez (promis, même en jean/t-shirt on vous laissera rentrer !).</div>
            <div class="question">Est-ce qu'il y a une liste de mariage ?</div>
            <div
              class="answer"
            >Non, on en a pas prévu, on a quand même créé une cagnotte en ligne si vous souhaitez participer à la note du bar :d Vous pouvez aussi nous offrir quelque chose si vous préférez et que ça vous fait plaisir, mais ne vous sentez pas obligés, ce qui compte pour nous c'est que vous soyiez là et que vous passiez un bon moment :)</div>
            <div class="question">Est-ce que je peux venir avec mes enfants ?</div>
            <div
              class="answer"
            >Vous pouvez venir avec vos enfants à la mairie et à l'activité qui suivra. Concernant la soirée, elle se déroulera dans un petit bar donc c'est à vos risques et périls.</div>
            <div class="question">Quel est le muscle ?</div>
            <div class="answer">42.</div>
            <div class="question">Comment est-ce que la journée va se passer ?</div>
            <div class="answer">
              15h - Cérémonie à la mairie du 14ème.
              <br>16h (environ) - Une "chasse au trésor" organisée par nous à côté si ça tente assez de monde.
              <br>19h - Soirée aux
              <a href="#reception" id="poule">P'tites Poules</a>.
            </div>
            <div class="question">Et sinon, qu'est-ce qu'on mange ?</div>
            <div class="answer">
              Le bar servira un buffet pendant la soirée, on a pas encore décidé exactement ce qu'il y aurait, mais il y aura des options végétariennes bien sûr et des places pour s'asseoir. Le bar est aussi jumelé à un très bon restaurant juste à côté au cas où.
            </div>
            <div class="question">Il faut prévoir quoi comme budget ?</div>
            <div class="answer">
              On paiera la note du repas et de la soirée, assurez-vous juste d'avoir de quoi vous rendre de la mairie au bar et de quoi rentrer.
            </div>
          </div>
        </div>
      </section>

      <div class="sombra">
        <div class="boop" @click="booped = true">
        </div>
        <v-dialog
          v-model="booped"
          fullscreen
          content-class="modalContent"
          dark
          class="sombraModal"
        >
          <v-card class="black">
            <v-toolbar dark class="primary">
                <v-btn icon @click.native="booped = false">
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>BOOP</v-toolbar-title>
            </v-toolbar>
            <div>
              <img class="resizable" src="../../assets/hacked.gif"/>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <v-dialog
      v-model="leet"
      content-class="modalContent"
      class="leet"
      max-width="450px"
    >
      <v-card>
        <v-toolbar class="primary">
            <v-btn icon @click.native="leet = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>l33t time</v-toolbar-title>
        </v-toolbar>
        <div class="leetContent">
          <img class="resizable" src="../../assets/leet.jpg"/>
        </div>
      </v-card>
    </v-dialog>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css';
  import 'material-icons/iconfont/material-icons.scss';
  import 'vuetify/dist/vuetify.min.css';

  import VisitorForm from '../VisitorForm.vue';
  import Terminal from '../Terminal.vue';
  import Konami from '../Konami.vue';
  import { config } from '../../config';
  import { OnCreated } from '../../types';

  @Component({
    components: {
      VisitorForm,
      Terminal,
      Konami,
    },
  })
  export default class Home extends Vue implements OnCreated {
    private apiKey: string = config.maps.apiKey;
    private smoothScroll = {
      duration: 1000,
    };
    private links = [
      { href: '#app', label: 'home' },
      { href: '#ceremony', label: 'cérémonie' },
      { href: '#reception', label: 'réception' },
      { href: '#presence', label: 'présence' },
      { href: '#easterEggs', label: 'easter eggs' },
      { href: '#faq', label: 'faq' },
    ];
    private burger = false;
    private geekMode = true;
    private booped = false;
    private leet = false;
    private easterEggFakeSolutionShown = false;
    private easterEggRealSolutionShown = false;
    private showJustMarried = false;
    private finalTitle = 'Clémentine && Thomas';
    private title = '';
    private counter = 0;

    public created() {
      setTimeout(this.printTitle, this.randomDelay());
      const now = new Date();
      this.leet = now.getHours() === 13 && now.getMinutes() === 37;
    }

    public printTitle() {
      if (this.counter < this.finalTitle.length) {
        this.title += this.finalTitle.charAt(this.counter);
        this.counter++;
        setTimeout(this.printTitle, this.randomDelay());
      }
    }

    public randomDelay() {
      const delay = Math.random() * 300;
      return Math.max(100, delay);
    }
  }
</script>

<style lang="scss">
  @import '../../common';

  body {
    text-align: center;
    font-family: 'Roboto', serif;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  #app {
    padding-top: 50px;
  }

  @include desktop {
    .menu {
      position: fixed;
      left: 90px;
      top: 50%;
      font-family: 'Space Mono', serif;
      background-color: rgba(255, 255, 255, 0.5);
      padding: 35px;
      z-index: 100;

      .burger {
        display: none;
      }

      a {
        color: #2f4f82;
        font-weight: bold;

        &:hover {
          font-style: italic;
        }
      }

      div {
        padding: 5px 0 5px 0;
      }
    }
  }

  @include mobile {
    .menu {
      background: #9da7d5;
      color: #fff;
      height: 50px;
      top: 0;
      width: 100%;
      position: fixed;
      z-index: 100;

      nav {
        background: inherit;
        font-size: 20px;
        font-weight: bold;
        height: 0;
        overflow: hidden;
        text-transform: uppercase;
        transition: height 0.2s;
        position: fixed;

        a {
          color: white;
          &:hover {
            color: #2f4f82;
          }
        }

        > * {
          display: block;
          letter-spacing: 1px;
          line-height: 2.5;
          padding: 0 20px;
          width: 100%;
        }
      }

      .burger {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        color: inherit;
        cursor: pointer;
        font-family: 'Material Icons';
        font-size: 30px;
        line-height: 50px;
        margin: 0;
        outline: 0;
        padding: 0;
        position: fixed;
        z-index: 400;
        text-align: center;
        top: 0;
        right: 10px;
        width: 50px;

        &:before {
          content: 'menu';
        }

        &:checked {
          &:before {
            content: 'close';
          }

          ~ nav {
            height: 100%;
            width: 100%;
            position: fixed;
            top: 0;
            padding-top: 50px;
            z-index: 100;
          }
        }
      }
    }
  }

  .page {
    max-width: 1800px;
  }

  .flex {
    display: flex;
    justify-content: center;
  }

  .date {
    margin: 10px auto 30px;
    border-style: solid;
    border-width: 1px 0 1px 0;
    border-color: #9da7d5;
    max-width: 220px;
    padding: 10px;
  }

  .typewriter {
    h1 {
      margin: 0 auto;
      letter-spacing: 0.15em;
      font-family: 'Space Mono', serif;

      &:after {
        content: '';
        height: 40px;
        width: 4px;
        background-color: #9da7d5;
        animation: blink-caret 0.75s step-end infinite;
        display: inline-block;
        vertical-align: bottom;
      }
    }
  }

  @keyframes blink-caret {
    from,
    to {
      background-color: transparent;
    }
    50% {
      background-color: #9da7d5;
    }
  }

  .tardis {
    background: url('../../assets/tardis_big.jpg') center center;
    height: 500px;
    position: relative;

    @include mobile {
      height: 300px;
      background-size: 322%;
      background-repeat: no-repeat;
    }
  }

  .justMarried {
    height: 100%;
    width: 100%;
    background: url('../../assets/just_married.png') center center;
    @include mobile {
      height: 300px;
      background-size: 322%;
      background-repeat: no-repeat;
    }
  }

  h1 {
    font-family: 'Dosis', serif;
  }

  .titleCustom {
    display: inline-block;
    font-weight: 100;
    font-size: 2.5em;
    text-transform: uppercase;
    background: linear-gradient(to right, black 33%, rgba(255, 255, 255, 0) 0%) repeat-x bottom;
    background-size: 15px 1px;
    padding-top: 10px;
  }

  .padded {
    padding: 30px;
  }

  section {
    padding-bottom: 30px;

    &:nth-child(odd) {
      background-color: #f9f6fa;
    }
  }

  .sombra {
    background: url('../../assets/sombra2.png') no-repeat right bottom;
    background-size: auto;
    height: 260px;
    width: 100%;
  }

  .faq {
    text-align: left;
    padding: 10px;
  }

  .question {
    font-weight: bold;
    background: linear-gradient(to right, black 33%, rgba(255, 255, 255, 0) 0%) repeat-x bottom;
    background-size: 8px 1px;
    display: inline-block;
  }

  .answer {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: justify;
  }

  .row {
    margin-left: 0px;
    margin-right: 0px;
  }

  a#poule:hover:after {
    content: '';
    background: url('../../assets/poule.gif');
    width: 250px;
    height: 140px;
    position: absolute;
    display: block;
  }

  a {
    color: #2f4f82;

    &:hover {
      color: #9da7d5;
      font-style: italic;
      text-decoration: none;
    }
  }

  @include mobile {
    .map-responsive {
      overflow: hidden;
      padding-bottom: 56.25%;
      position: relative;
      height: 0;

      iframe {
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        max-width: 600px;
        position: absolute;
      }
    }
  }

  .center {
    margin: auto;
  }

  .boop {
    width: 3px;
    height: 12px;
    position: absolute;
    margin-top: 64px;
    right: 287px;
    cursor: pointer;
  }

  .resizable {
    max-width: 100%;
  }

  .sombraModal, .leet {
    z-index: 101;
  }

  .leetContent {
    padding: 20px;
  }

  #star {
    background-color: white;
    opacity: 0.7;
    width: 3px;
    height: 3px;
    position: absolute;
    top: 80%;
    left: 90%;
    cursor: pointer;
  }
</style>
