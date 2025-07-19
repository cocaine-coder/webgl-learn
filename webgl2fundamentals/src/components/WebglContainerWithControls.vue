<template>
    <div class="webgl-container">
        <div class="controls">
            <Slider label="x" v-model:value="translation[0]" :max="width" :min="0" :step="1"></Slider>
            <Slider label="y" v-model:value="translation[1]" :max="height" :min="0" :step="1"></Slider>
            <Slider label="r" v-model:value="rotation" :max="360" :min="0" :step="1"></Slider>
            <Slider label="scale-x" v-model:value="scaling[0]" :max="5" :min="0" :step="0.01" :precision="2"></Slider>
            <Slider label="scale-y" v-model:value="scaling[1]" :max="5" :min="0" :step="0.01" :precision="2"></Slider>
        </div>
        <WebglContainer :inits="[inits[0], inits[1], handleCallback]"></WebglContainer>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useTransformMatrix } from '../hooks/useTransformMatrix';
import Slider from './Slider.vue';
import WebglContainer, { type TInits } from './WebglContainer.vue';

export type TInitsResult = [...TInits,
    (gl: WebGL2RenderingContext, program: WebGLProgram, mat: Float32Array) => void
];
export type TInitsWithControls = TInitsResult | ((mat: Float32Array) => TInitsResult);

const props = withDefaults(defineProps<{
    width?: number;
    height?: number;
    inits: TInitsWithControls;
}>(), {
    width: 800,
    height: 600
});

let glctx: WebGL2RenderingContext | undefined;
let prog: WebGLProgram | undefined;

const { translation, scaling, rotation, matrix } = useTransformMatrix(props.width, props.height);
const inits = typeof props.inits === 'function' ? props.inits(matrix.value) : props.inits;

watch(matrix, () => {
    if (!glctx || !prog) return;
    inits[3](glctx, prog, matrix.value);
});
function handleCallback(gl: WebGL2RenderingContext, program: WebGLProgram) {
    glctx = gl;
    prog = program;
    inits[2](gl, program);
};

</script>

<style scoped>
.webgl-container {
    width: fit-content;
    position: relative;
}

.controls {
    position: absolute;
    top: 12px;
    right: 36px;
}
</style>