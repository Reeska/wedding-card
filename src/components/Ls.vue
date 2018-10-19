<template>
  <div>
    <span v-if="isAList()">
      total 34635<br/>
      <table cellspacing="0" cellpadding="0">
      <tr v-for="file in files" :key="file.key">
          <td>{{file.access}}</td>
          <td>{{file.type}}</td>
          <td>{{file.owner}}</td>
          <td>{{file.group}}</td>
          <td class="right">{{file.size}}</td>
          <td>{{file.month}}</td>
          <td>{{file.hour}}</td>
          <td :class="styleFromType(file.type)">{{file.name}}</td>
      </tr>
      </table>
    </span>
    <span v-else>
      <span v-for="file in files" :key="file.key">
        <span v-if="file.type !== 6">{{file.name}} </span>
      </span>
    </span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        files: [
          {
            access: 'drwxr-xr-x',
            type: 6,
            owner: 'thomas',
            group: 'thomas',
            size: '4096',
            month: 'feb',
            hour: '15:56',
            name: './'
          },
          {
            access: 'drwxr-xr-x',
            type: 6,
            owner: 'thomas',
            group: 'thomas',
            size: '4096678',
            month: 'feb',
            hour: '15:56',
            name: '../'
          },
          {
            access: 'drwxr-xr-x',
            type: 1,
            owner: 'thomas',
            group: 'thomas',
            size: '42424242',
            month: 'feb',
            hour: '15:56',
            name: 'mariage.sh'
          },
          {
            access: 'drwxr-xr-x',
            type: 1,
            owner: 'thomas',
            group: 'thomas',
            size: '666',
            month: 'feb',
            hour: '15:56',
            name: 'virus.sh'
          }
        ]
      };
    },
    props: {
      options: Array
    },
    created() {},
    methods: {
      isAList: function() {
        return this.options && this.options.includes('l');
      },
      styleFromType: function(type) {
        if (type === 6) {
          return 'bold blue';
        }
        if (type === 1) {
          return 'bold green';
        }
        return '';
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../colors.scss';
  .blue {
    color: $blue;
  }
  .green {
    color: $green;
  }
  .bold {
    font-weight: bold;
  }

  td:not(:first-child) {
    padding-left: 3px;
  }

  td {
    padding-right: 3px;
  }

  .right {
    text-align: right;
  }
</style>