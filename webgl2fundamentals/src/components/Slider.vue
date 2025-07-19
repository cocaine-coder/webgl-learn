<template>
    <input class="slider" type="range" :label="label" :value="value" :min="min" :max="max" :step="step"
        @input="handleInput">
</template>

<script setup lang="ts">
const props = defineProps<{
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    precision?: number;
}>();

const emits = defineEmits<{
    (e: 'update:value', value: number): void;
}>();

function handleInput(e: Event) {
    const value = (e.target as any).value;
    if (props.precision) {
        emits('update:value', Number.parseFloat(Number.parseFloat(value).toFixed(props.precision)));
    } else {
        emits('update:value', Number.parseInt(value));
    }
}
</script>

<style scoped>
.slider {
    position: relative;
    display: block;
}

.slider::before {
    content: attr(label);
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(calc(-100% - 8px));
    color: #111;
}

.slider::after {
    content: attr(value);
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(calc(100% + 8px));
    color: #111;
}
</style>