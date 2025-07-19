<template>
  <div style="display: flex;width: 100%;height:  100vh;">

    <div style="display: flex; flex-direction: column; gap: 12px; width: 240px;height: 100vh;overflow-y: auto;">
      <template v-for="(item, key) in views">
        <h1>{{ key }}</h1>
        <template v-for="(item1, key1) in item">
          <button :class="{ 'active': key1 === currentViewKeyRef }" @click="currentViewKeyRef = key1">{{ item1.label
            }}</button>
        </template>
      </template>
    </div>

    <div style="flex: 1;height: 100vh;padding: 12px;">
      <div style="display: flex;align-items: baseline;gap: 12px;">
        <h1>webgl2fundamentals学习</h1>
        <a href="https://webgl2fundamentals.org/">原文链接</a>
      </div>

      <div style="flex: 1;height: 100vh;overflow-y: auto;">
        <template v-for="(item, key) in views">
          <template v-for="(item1, key1) in item">
            <component v-if="currentViewKeyRef === key1" :is="item1.component" :key="key1"></component>
          </template>
        </template>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, type Component } from 'vue';
import basicprinciple from "./views/01-base/01-basic-principle.vue";
import howword from './views/01-base/02-how-work.vue';

const views: Record<string, Record<string, {
  label: string,
  component: Component
}>> = {
  "基础概念": {
    "基本原理": {
      label: "基本原理",
      component: basicprinciple
    },
    "如何工作": {
      label: "如何工作",
      component: howword
    }
  }
};

const currentViewKeyRef = ref<string>(Object.keys(views[Object.keys(views)[0]])[0]);
</script>

<style scoped></style>
