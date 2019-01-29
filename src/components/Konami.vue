<template>
    <div v-if="active">
        <img src="../assets/enterprise.png" id="ship" />
    </div>
</template>

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

    private active = false;

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
            this.active = true;
            setTimeout(() => {this.active = false;}, 7000);
            this.konamiCodePosition = 0;
            }
        } else {
            this.konamiCodePosition = 0;
        }
    }
  }
</script>

<style lang="scss">
    #ship {
        position: fixed;
        top: 20%;
        right: -500px;
        animation: flyshipfly 7s cubic-bezier(.03,.34,1,.05) alternate;
        opacity: 0;
        z-index: 3000;
    }

    @keyframes flyshipfly {
        from { transform: rotate(4deg) scale(0.001); opacity:1; }
        to { transform: rotate(0deg) scale(1) translate(-500px); opacity:1; }
    }
</style>
