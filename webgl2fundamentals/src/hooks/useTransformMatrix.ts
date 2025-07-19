import { computed, ref } from "vue";
import { Mat3 } from "../utils/matrixUtils";

export function useTransformMatrix(canvasWidth: number, canvasHeight: number) {
    const translation = ref([0, 0]);
    const rotation = ref(0);
    const scaling = ref([1, 1]);

    const matrix = computed(() => {
        let matrix = Mat3.projection(canvasWidth, canvasHeight);
        matrix = Mat3.translate(matrix, translation.value[0], translation.value[1]);
        matrix = Mat3.rotate(matrix, rotation.value * Math.PI / 180);
        matrix = Mat3.scale(matrix, scaling.value[0], scaling.value[1]);
        return matrix;
    });

    return { translation, rotation, scaling, matrix }
}
