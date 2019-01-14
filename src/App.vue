<template>
  <div id="app">
    <div class="menu">
      <div v-for="link in links" :key="link.label">
        <a :href="link.href" v-smooth-scroll="smoothScroll">{{ link.label }}</a>
      </div>
    </div>

    <div class="page">
      <div class="flex" id="home">
        <div class="typewriter">
          <h1>Clémentine && Thomas</h1>
        </div>
      </div>

      <div class="date">
        <b>8 Juin 2019 à 15h00</b>
        <br/> -
        <i>Star date 72900.4</i> -
      </div>

      <section class="tardis"></section>

      <section id="ceremony">
        <h1 class="title">Cérémonie - 15h20</h1>
        <div class="padded">
          <iframe width="600" height="450" frameborder="0" style="border:0"
                  :src="'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJdbbQwbZx5kcR7ZKHnZ405Fg&key=' + apiKey"
                  allowfullscreen></iframe>
        </div>
      </section>

      <section id="reception">
        <h1 class="title">Réception - 19h00</h1>
        <div class="padded">
          <iframe width="600" height="450" frameborder="0" style="border:0"
                  :src="'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJgQfCkxNu5kcRcQi5NxUc9C8&key=' + apiKey"
                  allowfullscreen></iframe>
        </div>
      </section>

      <section id="presence">
        <h1 class="title">Présence</h1>
        <div>
          <terminal></terminal>
        </div>
      </section>

      <section id="faq">
        <h1 class="title">FAQ</h1>
        <div>uc.</div>
      </section>

      <div class="sombra"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import VisitorForm from './components/VisitorForm.vue';
  import Terminal from './components/Terminal.vue';
  import { config } from './config';
  import Component from 'vue-class-component';

  @Component({
    components: {
      VisitorForm,
      Terminal,
    },
  })
  export default class App extends Vue {
    private apiKey: string = config.maps.apiKey;
    private smoothScroll = {
      duration: 1000,
    };
    private links = [
      { href: '#app', label: 'home' },
      { href: '#ceremony', label: 'cérémonie' },
      { href: '#reception', label: 'réception' },
      { href: '#presence', label: 'présence' },
      { href: '#faq', label: 'faq' },
    ];
  }
</script>

<style lang="scss">
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
    padding-top: 20px;
  }

  .menu {
    position: fixed;
    left: 90px;
    top: 50%;
    font-family: 'Space Mono', serif;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 35px;

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

  .page {
    max-width: 1800px;
  }

  .flex {
    display: flex;
    justify-content: center;
  }

  .typewriter h1 {
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    border-right: 0.15em solid orange; /* The typwriter cursor */
    white-space: nowrap; /* Keeps the content on a single line */
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    letter-spacing: 0.15em; /* Adjust as needed */
    font-family: 'Space Mono', serif;
    animation: typing 2.5s steps(40, end), blink-caret 0.75s step-end infinite;
  }

  /* The typing effect */
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  /* The typewriter cursor effect */
  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: #9da7d5;
    }
  }

  .date {
    margin: 10px auto 30px;
    border-style: solid;
    border-width: 1px 0 1px 0;
    border-color: #9da7d5;
    max-width: 220px;
    padding: 10px;
  }

  .tardis {
    background: url('assets/tardis_big.jpg') center center;
    height: 500px;
  }

  h1 {
    font-family: 'Dosis', serif;
  }

  .title {
    display: inline-block;
    font-weight: 100;
    font-size: 2.5em;
    text-transform: uppercase;
    background: linear-gradient(to right, black 33%, rgba(255, 255, 255, 0) 0%)
      repeat-x bottom;
    background-size: 15px 1px;
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
    background: url('assets/sombra.png') no-repeat center bottom;
    height: 450px;
    width: 100%;
  }
</style>
