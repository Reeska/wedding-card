<template></template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { OnMounted } from '../types';

  @Component
  export default class Konami extends Vue implements OnMounted {

    private const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'a',
        66: 'b',
    };

    private const konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

    private konamiCodePosition = 0;

    public mounted() {
        document.addEventListener('keydown', this.onKeyDown);
    }

    public onKeyDown(e) {
        // get the value of the key code from the key map
        var key = this.allowedKeys[e.keyCode];
        // get the value of the required key from the konami code
        var requiredKey = this.konamiCode[this.konamiCodePosition];

        // compare the key with the required key
        if (key == requiredKey) {
            // move to the next key in the konami code sequence
            this.konamiCodePosition++;
            // if the last key is reached, activate cheats
            if (this.konamiCodePosition == this.konamiCode.length) {
            console.log('konami !!!!');
            this.konamiCodePosition = 0;
            }
        } else {
            this.konamiCodePosition = 0;
        }
    }
  }
</script>

<style lang="scss"></style>
