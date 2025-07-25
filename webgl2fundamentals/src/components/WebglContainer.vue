<template>
    <canvas ref="canvas" :width="width" :height="height" style="background-color: #ccc;"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

export type TInits = [string, string, (gl: WebGL2RenderingContext, program: WebGLProgram) => void];

const props = withDefaults(defineProps<{
    width?: number;
    height?: number;
    inits: TInits
}>(), {
    width: 800,
    height: 600
});

const canvas = ref<HTMLCanvasElement>();
onMounted(() => {
    if (!canvas.value) return;

    const gl = canvas.value.getContext('webgl2');
    if (!gl) throw new Error('WebGL not supported');

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;

    gl.shaderSource(vertexShader, `#version 300 es
    ${props.inits[0]}`);
    gl.shaderSource(fragmentShader, `#version 300 es
    precision highp float;
    
    ${props.inits[1]}`);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);

    props.inits[2](gl, program);
});
</script>

<style scoped></style>