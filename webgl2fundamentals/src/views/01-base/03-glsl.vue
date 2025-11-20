<template>
    <Markdown :content="content"></Markdown>
</template>

<script setup lang="ts">
import Markdown from '../../components/Markdown.vue';

const content = `
* 工作原理 : 每次画图需要2个着色器 \`顶点着色器\` \`片段着色器\`
`;

</script>

<style scoped></style>