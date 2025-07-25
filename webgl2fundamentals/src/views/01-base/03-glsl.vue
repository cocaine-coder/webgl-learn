<template>
    <div>
        <p>每个webgl程序有很多着色器程序，每个着色器一定包含两个着色器，顶点着色器 和 片段着色器</p>
        <p>顶点着色器用于裁剪空间坐标</p>
        <code>#version 300 es</code>
        <code>void main() {</code>
        <code>gl_Position = doMathToMakeClipspaceCoordinates</code>
        <code>}</code>
        <div>
            顶点着色器传入变量的三种方式：属性、uniform（单次绘制过程中，数据不变）、纹理
        </div>

        <p>属性的传值流程：</p>
        <ol>
            <li>创建缓冲区</li>
            <code>const buffer = gl.createBuffer();</code>
            <li>把数据放入缓冲区</li>
            <code>gl.bindBuffer(gl.ARRAY_BUFFER, buffer);</code>
            <code>gl.bufferData(gl.ARRAY_BUFFER, someData, gl.STATIC_DRAW);</code>
            <li>在着色器中找到属性变量的位置</li>
            <code>var positionLoc = gl.getAttribLocation(someShaderProgram, "a_position");</code>
            <li>告诉webgl数据从缓冲区中取出，并放入属性变量中</li>
            <code>gl.enableVertexAttribArray(positionLoc);</code>
            <code>gl.vertexAttribPointer(positionLoc, numComponents, type, false, stride, offset);</code>
        </ol>

        <div>vertexAttribPointer: 这个函数重点说一下：
        </div>
        <ol>
            <li>positionLoc：是变量位置，</li>
            <li>numComponents：一组数据包含几个元素，如vec2包含两个元素(x,y)，这里设置为2</li>
            <li>type: 元素类型，如 gl.FLOAT</li>
            <li>stride: 读取分段byte长度</li>
        </ol>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>