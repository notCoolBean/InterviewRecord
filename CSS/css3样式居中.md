# CSS3 样式居中

### 水平居中
  1. 行内元素水平居中：
      ```html
      <style>
        .box {
          text-align: center;
        }
      </style>
      <div class="box">
        <span>行内元素居中</span>
      </div>
      ```
  2. 块级元素水平居中：
      a. 将块级子元素外边距设置auto（子元素宽度已知）：
        ```html
        <style>
          .child {
            width: 100px; // 子元素宽度必须确定
            margin: 0 auto;
          }
        </style>
        <div class="box">
          <div class="child">行内元素居中</div>
        </div>
        ```
      b. 使用table + margin(子元素确不确定宽度都可以)：
        ```html
        <style>
          .child {
            display: table;
            margin: 0 auto;
          }
        </style>
        <div class="box">
          <div class="child">行内元素居中</div>
        </div>
        ```
      c. 使用定位以及transform（适用于任何情况，但是子元素会脱离文档流）：
        ```html
        <style>
          .box {
            position: relative;
          }
          .child {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
        </style>
        <div class="box">
          <div class="child">行内元素居中</div>
        </div>
        ```
      d. 使用flex + justify-content（弹性盒布局）：
        ```html
        <style>
          .box {
            display: flex;
            justify-content: center;
          }
        </style>
        <div class="box">
          <div class="child">行内元素居中</div>
        </div>
        ```
      e. flex + margin：
        ```html
        <style>
          .box {
            display: flex;
          }
          .child {
            margin: 0 auto;
          }
        </style>
        <div class="box">
          <div class="child">行内元素居中</div>
        </div>
        ```
  3. 多个块级元素水平居中：
      a. flex + justify-content:
        ```html
        <style>
          .box {
            display: flex;
            justify-content: center;
          }
        </style>
        <div class="box">
          <div class="child">行内元素居中</div>
          <div class="child">行内元素居中</div>
          <div class="child">行内元素居中</div>
        </div>
        ```
      b. 父元素设置text-align，子元素变为行内块级元素:
        ```html
        <style>
          .box {
            text-align: center;
          }
          .child {
            display: inline-block;
          }
        </style>
        <div class="box">
          <div class="child">行内元素居中</div>
          <div class="child">行内元素居中</div>
          <div class="child">行内元素居中</div>
        </div>
        ```
  4. 浮动元素水平居中：
      a. 对于定宽的元素设置子元素relative定位+margin：
      ```html
        <style>
          .child {
            float: left;
            width: 100px;
            position: relative;
            left: 50%;
            margin-left: -50px;
          }
        </style>
        <div class="box">
          <div class="child">行内元素居中</div>
        </div>
        ```
      b. 对于不定宽的元素设置子元素relative定位+transform:
      ```html
        <style>
          .child {
            float: left;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
          }
        </style>
        <div class="box">
          <div class="child">行内元素居中</div>
        </div>
        ```
      c. 通用方法flex:
      ```html
        <style>
          .box {
            display: flex;
          }
        </style>
        <div class="box">
          <div class="child">行内元素居中</div>
        </div>
        ```
