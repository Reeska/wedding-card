<template></template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { OnMounted } from '../types';

  @Component
  export default class Konami extends Vue implements OnMounted {
    public mounted() {
        const allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            65: 'a',
            66: 'b',
        };

        // the 'official' Konami Code sequence
        const konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

        var konamiCodePosition = 0;
        document.addEventListener('keydown', function(e) {
            // get the value of the key code from the key map
            var key = allowedKeys[e.keyCode];
            // get the value of the required key from the konami code
            var requiredKey = konamiCode[konamiCodePosition];

            // compare the key with the required key
            if (key == requiredKey) {
                // move to the next key in the konami code sequence
                konamiCodePosition++;
                // if the last key is reached, activate cheats
                if (konamiCodePosition == konamiCode.length) {
                console.log('konami !!!!');
                konamiCodePosition = 0;
                }
            } else {
                konamiCodePosition = 0;
            }
        });
    }
  }
</script>

<style lang="scss"></style>
