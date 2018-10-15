<template>
  <div id="app">
    <div class="menu">
      <div>
        <a href="#">cérémonie</a>
      </div>
      <div>
        <a href="#">réception</a>
      </div>
      <div>
        <a href="#">présence</a>
      </div>
      <div>
        <a href="#">faq</a>
      </div>
    </div>
    <div class="page">
      <!-- page content -->
      <div class="flex">
        <div class="typewriter">
          <h1>Clémentine && Thomas</h1>
        </div>
      </div>
      <div class="date">
        <b>8 Juin 2019 à 15h00</b>
        <br/> -
        <i>Star date 72900.4</i> -
      </div>
      <div class="tardis"></div>
      <section>
        <h1 class="title">Cérémonie - 15h20</h1>
        <div class="padded">
          <iframe width="600" height="450" frameborder="0" style="border:0"
                  :src="'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJdbbQwbZx5kcR7ZKHnZ405Fg&key=' + apiKey"
                  allowfullscreen></iframe>
        </div>
      </section>
      <section class="violet">
        <h1 class="title">Réception - 19h00</h1>
        <div class="padded">
          <iframe width="600" height="450" frameborder="0" style="border:0"
                  :src="'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJgQfCkxNu5kcRcQi5NxUc9C8&key=' + apiKey"
                  allowfullscreen></iframe>
        </div>
      </section>
      <section>
        <h1 class="title">Présence</h1>
        <div>
          <terminal></terminal>
        </div>
      </section>
      <section class="violet">
        <h1 class="title">FAQ</h1>
        <div>uc.</div>
      </section>
    </div>
  </div>
</template>

<script>
  import VisitorForm from './components/VisitorForm';
  import Terminal from './components/Terminal';
  import { config } from './config';

  export default {
    name: 'app',
    components: {
      VisitorForm,
      Terminal
    },
    data: () => {
      return { apiKey: config.maps.apiKey };
    }
  };
</script>

<style>
  body {
    padding-top: 5em;
    text-align: center;
    font-family: 'Roboto';
    margin-left: 0px;
    margin-right: 0px;
    padding-top: 20px;
  }

  a {
    text-decoration: none;
  }

  .menu {
    position: fixed;
    left: 90px;
    top: 50%;
    font-family: 'Space Mono';
    background-color: rgba(255, 255, 255, 0.5);
    padding: 35px;
  }

  .menu a {
    color: #2f4f82;
    font-weight: bold;
  }

  .menu a:hover {
    font-style: italic;
  }

  .menu div {
    padding: 5px 0px 5px 0px;
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
    font-family: 'Space Mono';
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
    margin: auto;
    margin-bottom: 30px;
    border-style: solid;
    border-width: 1px 0px 1px 0px;
    /*border-color: #EEE0E0;*/
    border-color: #9da7d5;
    max-width: 220px;
    padding: 10px;
    margin-top: 10px;
  }

  .tardis {
    background-image: url('assets/tardis_big.jpg');
    background-position: center center;
    width: 100%;
    height: 500px;
  }

  h1 {
    font-family: 'Dosis';
  }

  .title {
    font-weight: 100;
    font-size: 2.5em;
    text-transform: uppercase;
    /*border: none;
    border-bottom: 1px black dashed;*/
    background-image: linear-gradient(
      to right,
      black 33%,
      rgba(255, 255, 255, 0) 0%
    );
    background-position: bottom;
    background-size: 15px 1px;
    background-repeat: repeat-x;
    display: inline-block;
  }

  .bold {
    font-weight: bold;
  }

  .padded {
    padding: 30px;
  }

  .violet {
    background-color: #f9f6fa;
  }

  section {
    padding-bottom: 30px;
  }
</style>
