<template>
  <div style="display: flex;width: 100%;height:  100vh;">

    <div style="display: flex; flex-direction: column; gap: 12px; width: 240px;height: 100vh;overflow-y: auto;">
      <template v-for="(item, key) in views">

        <div style="display: flex;justify-content: space-between;align-items: center;">
          <h1 style="font-size: 20px;">{{ key }}</h1>
          <button style="height: fit-content;width: fit-content;padding: 8px 12px;font-size: 12px;"
            @click="currentOpenViewsKeyRef = key">展开</button>
        </div>

        <div v-show="currentOpenViewsKeyRef === key" style="display: flex;flex-direction: column;gap: 8px;">
          <template v-for="(_, key1) in item">
            <button :class="{ 'active': currentViewKeyRef === key + '-' + key1 }"
              @click="currentViewKeyRef = key + '-' + key1">{{
                key1
              }}</button>
          </template>
        </div>

      </template>
    </div>

    <div style="flex: 1;height: 100vh;padding: 24px;">
      <div style="display: flex;align-items: baseline;gap: 12px;">
        <h1>webgl2fundamentals学习</h1>
        <a href="https://webgl2fundamentals.org/">原文链接</a>
        <h2>{{ currentViewKeyRef }}</h2>
      </div>

      <div style="flex: 1;height: 100vh;overflow-y: auto;">
        <template v-for="(item, key) in views">
          <template v-for="(item1, key1) in item">
            <component v-if="currentViewKeyRef === key + '-' + key1" :is="item1" :key="key1"></component>
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
import glsl from './views/01-base/03-glsl.vue';

const views: Record<string, Record<string, Component>> = {
  "基础概念": {
    "基本原理": basicprinciple,
    "如何工作": howword,
    "glsl学习": glsl
  },
  "图像处理": {

  },
  "二维矩阵运算": {

  },
  "三维": {

  },
  "光照": {

  },
  "组织和重构": {

  },
  "几何": {

  },
  "纹理": {

  },
  "渲染到纹理": {

  },
  "阴影": {

  },
  "二维技术": {

  },
  "三维技术": {

  },
  "文字": {},
  "gpgpu": {

  },
  "技巧": {

  },
  "优化": {

  }, "杂项": {

  }
};

const currentOpenViewsKeyRef = ref<string>(Object.keys(views)[0]);
const currentViewKeyRef = ref<string>(currentOpenViewsKeyRef.value + "-" + Object.keys(views[currentOpenViewsKeyRef.value])[0]);
</script>

<style scoped></style>
