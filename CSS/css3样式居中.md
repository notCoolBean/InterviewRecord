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
  5. 绝对定位元素水平居中：
      ```html
      <style>
        .box {
          position: relative;
        }
        .child {
          width: 100px;
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 auto;
        }
      </style>
      <div class="box">
        <div class="child">行内元素居中</div>
      </div>
      ```

### 垂直居中
  1. 单行内元素垂直居中：
      ```html
      <style>
        .box {
          height: 100px;
          line-height: 100px;
        }
      </style>
      <div class="box">
        <span>行内元素居中</span>
      </div>
      ```
  2. 多行行内元素词垂直居中：
      a. 利用flex布局：
      ```html
      <style>
        .box {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      </style>
      <div class="box">
        <span>行内元素居中</span>
      </div>
      ```
      b. 利用table+子元素vertical-align：
      ```html
      <style>
        .box {
          display: table;
        }
        .child {
          display: table-cell;
          vertical-align: middle;
        }
      </style>
      <div class="box">
        <p class="child">行内元素居中行内元素居中行内元素居中行内元素居中行内元素居中行内元素居中行内元素居中行内元素居中行内元素居中行内元素居中行内元素居中</p>
      </div>
      ```
  3. 块级元素垂直居中：
      a. 绝对定位+负距离边距absolute+margin(子元素已知高度)：
      ```html
      <style>
        .box {
          position: relation;
        }
        .child {
          height: 100px;
          position: absolute;
          top: 50%;
          margin-top: -50px;
        }
      </style>
      <div class="box">
        <div class="child">行内元素</div>
      </div>
      ```
      b. 绝对定位+反向移动absolute+transform(子元素高度不要求)：
      ```html
      <style>
        .box {
          position: relation;
        }
        .child {
          height: 100px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      </style>
      <div class="box">
        <div class="child">行内元素</div>
      </div>
      ```
      c. 弹性盒布局flex + align-items
      ```html
      <style>
        .box {
          display: flex;
          align-items: center;
        }
      </style>
      <div class="box">
        <div class="child">行内元素</div>
      </div>
      ```
      d. table布局+子元素table-cell+vertical-align
      ```html
      <style>
        .box {
          display: table-cell;
          vertical-align: middle;
        }
      </style>
      <div class="box">
        <div class="child">行内元素</div>
      </div>
      ```

### 水平垂直居中
  1. 绝对定位+负边距（已知元素高度宽度）：
      ```html
      <style>
        .box {
          position: relative;
        }
        .child {
          width: 100px;
          height: 100px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin: -50px 0 0 -50px;
        }
      </style>
      <div class="box">
        <div class="child">行内元素</div>
      </div>
      ```
  2. 绝对定位+margin auto（已知元素高度宽度）：
      ```html
      <style>
        .box {
          position: relative;
        }
        .child {
          width: 100px;
          height: 100px;
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
      </style>
      <div class="box">
        <div class="child">行内元素</div>
      </div>
      ```
