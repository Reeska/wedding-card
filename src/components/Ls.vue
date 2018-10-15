<template>
    <div>total 34635<br/>
        <table cellspacing="0" cellpadding="0">
            <tr>
                <td>drwxr-xr-x</td>
                <td>6</td>
                <td>thomas</td>
                <td>thomas</td>
                <td class="right">4096</td>
                <td>feb</td>
                <td>15:29</td>
                <td class="blue bold">./</td>
            </tr>
            <tr>
                <td>drwxr-xr-x</td>
                <td>4</td>
                <td>thomas</td>
                <td>thomas</td>
                <td class="right">4096678</td>
                <td>feb</td>
                <td>15:29</td>
                <td class="blue bold">../</td>
            </tr>
            <tr>
                <td>drwxr-xr-x</td>
                <td>1</td>
                <td>thomas</td>
                <td>thomas</td>
                <td class="right">42424242</td>
                <td>feb</td>
                <td>15:29</td>
                <td class="green bold">mariage.sh</td>
            </tr>
            <tr>
                <td>drwxr-xr-x</td>
                <td>1</td>
                <td>thomas</td>
                <td>thomas</td>
                <td class="right">666</td>
                <td>feb</td>
                <td>15:29</td>
                <td class="green bold">virus.sh</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
  created() {}
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