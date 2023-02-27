<template>
    <div class="line-shape"></div>
</template>

<script>
import OnEvent from '../common/OnEvent'

export default {
    extends: OnEvent, // 继承OnEvent组件
}
</script>

<style lang="scss" scoped>
.line-shape {
    width: 100%;
    height: 100%;
    overflow: auto;
    color: pink;
}
</style>
