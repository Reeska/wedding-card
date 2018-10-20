<template>
  <pre class="terminal-output" v-html="$options.filters.nl2br(output)"></pre>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import fs from '../fs.json';
  import { Prop } from 'vue-property-decorator';

  const HIDDEN = 'hidden';

  type FileField =
    | 'access'
    | 'type'
    | 'name'
    | 'owner'
    | 'group'
    | 'size'
    | 'month'
    | 'hour';

  interface File {
    [key: string]: string | number;

    access: string;
    type: number;
    owner: string;
    group: string;
    size: string;
    month: string;
    hour: string;
    name: string;
  }

  interface FileFieldSize {
    [key: string]: number;
  }

  @Component
  export default class Ls extends Vue {
    @Prop() public options?: string[];

    private files: File[] = fs;
    private output: string = '';

    public created() {
      this.output = this.isAList()
        ? this.ls(this.files).join('\n')
        : this.ls(this.files, ['name']).join(' ');
    }

    isAList() {
      return this.options && this.options.includes('l');
    }

    showHiddenFiles() {
      return this.options && this.options.includes('a');
    }

    ls(files: File[], fields?: FileField[]) {
      const sizes: FileFieldSize = files.reduce((prev, cur) => {
        const fileFieldSize: FileFieldSize = prev || {};

        Object.keys(cur).forEach(key => {
          const prevValue = fileFieldSize[key] || 0;
          const curValue = String(cur[key]).length;
          fileFieldSize[key] = prevValue > curValue ? prevValue : curValue;
        });

        return fileFieldSize;
      }, {});

      return files
        .filter(file => this.showHiddenFiles() || !file.name.startsWith('.'))
        .map(file => {
          const fileDescription = (fields || (Object.keys(file) as FileField[]))
            .map(
              key =>
                `<span class="field-${key}">${String(file[key]).padEnd(
                  sizes[key],
                  ' ',
                )}</span>`,
            )
            .join(' ');

          return `<span class="type-${file.type}">${fileDescription}</span>`;
        });
    }
  }
</script>

<style lang="scss">
  @import '../variables';

  pre.terminal-output {
    font-family: $term-font;
    margin: 0;

    .type-1 {
      .field-name {
        color: $green;
        font-weight: bold;
      }
    }

    .type-6 {
      .field-name {
        color: $blue;
        font-weight: bold;
      }
    }
  }
</style>
