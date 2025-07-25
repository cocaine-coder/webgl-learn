<template>
    <h2>顶点着色器这样执行</h2>
    <img src="https://webgl2fundamentals.org/webgl/lessons/resources/vertex-shader-anim.gif">

    <h2>片段着色器颜色会自动插值</h2>
    <WebglContainer :inits="inits1"></WebglContainer>

    <h2>颜色固定下来吧</h2>
    <WebglContainer :inits="intit2"></WebglContainer>
</template>

<script setup lang="ts">
import WebglContainer, { type TInitsWithControls } from '../../components/WebglContainerWithControls.vue';

const inits1: TInitsWithControls = (mat: Float32Array) => {
    function drawScene(gl: WebGL2RenderingContext, program: WebGLProgram, m: Float32Array) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
        gl.uniformMatrix3fv(matrixLocation, false, m);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    return [`
in vec2 a_position;
uniform mat3 u_matrix;
out vec4 v_color;
void main() {
  gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
  v_color = gl_Position * 0.5 + 0.5;
}
`,
        `
in vec4 v_color;
out vec4 outColor;
void main(){
   outColor = v_color;
}
`,
        (gl, program) => {
            const positionLocation = gl.getAttribLocation(program, 'a_position');

            // 这个可以加速绘制
            const vao = gl.createVertexArray();
            gl.bindVertexArray(vao);

            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                0, 0,
                150, 150,
                0, 150,
            ]), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

            drawScene(gl, program, mat);
        },
        drawScene];
};

const intit2: TInitsWithControls = (mat) => {

    let vao: WebGLVertexArrayObject | undefined;

    function drawScene(gl: WebGL2RenderingContext, program: WebGLProgram, mat: Float32Array) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        if (vao)
            gl.bindVertexArray(vao);

        const matrixLocation = gl.getUniformLocation(program, "u_matrix");
        gl.uniformMatrix3fv(matrixLocation, false, mat);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    return [
        `
        in vec2 a_position;
        in vec4 a_color;
        uniform mat3 u_matrix;

        out vec4 v_color;

        void main(){
            gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
            v_color = a_color;
        }
        `,
        `
        in vec4 v_color;
        out vec4 outColor;
        void main(){
            outColor = v_color;
        }
        `,
        (gl, program) => {
            const positionLocation = gl.getAttribLocation(program, 'a_position');
            const colorLocation = gl.getAttribLocation(program, 'a_color');

            vao = gl.createVertexArray();
            gl.bindVertexArray(vao);

            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                0, 0, 1, 0, 0, 1,
                150, 150, 1, 0, 0, 1,
                0, 150, 1, 0, 0, 1
            ]), gl.STATIC_DRAW);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 6, 0);
            gl.enableVertexAttribArray(positionLocation);

            gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 6, Float32Array.BYTES_PER_ELEMENT * 2);
            gl.enableVertexAttribArray(colorLocation);
            drawScene(gl, program, mat);
        },
        drawScene
    ]
}
</script>

<style scoped></style>