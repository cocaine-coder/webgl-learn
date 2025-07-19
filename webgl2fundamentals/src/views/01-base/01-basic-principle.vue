<template>
    <h2>画一个简单的三角形</h2>
    <WebglContainer :inits="inits1"></WebglContainer>

    <h2>使用像素坐标而不是小数裁剪</h2>
    <WebglContainer :inits="inits2"></WebglContainer>

    <h2>好多好多正方形</h2>
    <WebglContainer :inits="inits3"></WebglContainer>
</template>

<script setup lang="ts">
import WebglContainer, { type TInits } from '../../components/WebglContainer.vue';

const inits1: TInits = [`
        in vec4 a_position;

        void main(){
            gl_Position = a_position;
        }
        `, `
        out vec4 outColor;

        void main(){
            outColor = vec4(1, 0, 0.5, 1);
        }
        `, (gl, program) => {
        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0, 0,
            0, 0.5,
            0.7, 0,
        ]), gl.STATIC_DRAW);

        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        gl.enableVertexAttribArray(positionAttributeLocation);

        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }];

const inits2: TInits = [`
in vec2 a_position;
uniform vec2 u_resolution;

void main(){
    // 将像素坐标缩放到 0 ~ 1
    vec2 zeroToOne = a_position / u_resolution;

    // 缩放到 0 ~ 2
    vec2 zeroToTwo = zeroToOne * 2.0;

    // 缩放到 -1 ~ 1
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace, 0, 1);
}
`, `
out vec4 outColor;

void main(){
    outColor = vec4(1, 0, 0.5, 1);
}
`, (gl, program) => {
        // look up where the vertex data needs to go.
        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

        // look up uniform locations
        const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        const positions = [
            10, 20,
            80, 20,
            10, 30,
            10, 30,
            80, 20,
            80, 30,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        gl.enableVertexAttribArray(positionAttributeLocation);

        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindVertexArray(vao);
        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }]

const inits3: TInits = [
    `in vec2 a_position;
 uniform vec2 u_resolution;
 void main(){
    vec2 zeroToOne = a_position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0, 1);
 }
`,
    `
uniform vec4 u_color;
out vec4 outColor;

void main() {
  outColor = u_color;
}
`,
    (gl, program) => {
        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
        const colorUniformLocation = gl.getUniformLocation(program, "u_color");

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(
            positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionAttributeLocation);

        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

        function randomInt(range: number) {
            return Math.floor(Math.random() * range);
        }

        // 向buffer中写矩形
        function setRectangle(x: number, y: number, width: number, height: number) {
            var x1 = x;
            var x2 = x + width;
            var y1 = y;
            var y2 = y + height;
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                x1, y1,
                x2, y1,
                x1, y2,
                x1, y2,
                x2, y1,
                x2, y2,
            ]), gl.STATIC_DRAW);
        }

        for (var ii = 0; ii < 50; ++ii) {
            // 往buffer里面写数据
            setRectangle(
                randomInt(300), randomInt(300), randomInt(300), randomInt(300));

            // 设置颜色
            gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

            // 绘制两个三角形
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }
]
</script>

<style scoped></style>