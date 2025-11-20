<template>
    <div ref="markdown" :style="style">

    </div>
</template>

<script setup lang="ts">
import { marked } from 'marked';
import { onMounted, ref } from 'vue';
const markdown = ref<HTMLDivElement>();

const props = defineProps<{
    content: string;
    style?: CSSStyleDeclaration;
}>();

onMounted(() => {
    markdown.value!.innerHTML = marked.parse(props.content, { async: false });
});
</script>

<style scoped></style>