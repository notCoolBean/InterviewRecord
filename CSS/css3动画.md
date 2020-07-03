# CSS3动画属性

CSS3动画属性分为：transition、transform、animation

### transition 过渡

transition是一个合并属性：
- transition-property：元素参与过渡的属性；(all只要支持过渡属性的都可以变化)
- transition-duration：过渡需要花费的时间；(m，ms)
- transition-delay：设置过渡的延迟时间；(m， ms)
- transition-timing-function：过渡的动画类型；(匀速linear，慢快慢ease，慢开始ease-in，慢结束ease-out，慢快慢ease-in-out比ease快一点、、、)

例如：transition: all 2s 3s linear;

### transform 静态

> 描述了元素的静态样式，本身不会呈现动画效果，常配合transition跟animation使用；其中transform-origin可以设置参考中心；

#### 2D
 1. 位移：transform: translate(X, Y)、translateX(X)、translateY(Y);坐标移动X、Y轴的位置坐标；
 2. 缩放：transform: scale(X, Y)、scaleX(X)、scaleY(Y);坐标缩放X、Y轴的方向缩放大小；参数大于1放大，小于1缩小；
 3. 旋转：transform: rotate(X, Y)、rotateX(X)、rotateY(Y);坐标旋转X、Y轴来进行旋转；
 4. 缩放：transform: skew(X, Y)、skewX(X)、skew(Y);

#### 3D
 1. 位移：transform: translate(X, y, Z)、translateZ(Z);坐标移动X、Y、Z轴的位置坐标；
 2. 旋转：transform: rotateZ(Z)（与2D类似）、rotate3D(X, Y, Z, deg)（X、Y、Z是0-1之间的数值描述各个轴之间的旋转矢量值deg代表旋转角度，正值顺时针反之相反）;坐标旋转X、Y、Z轴来进行旋转；
 3. transform-style：规定被嵌套元素如何在3D空间中显示。
 4. perspective：规定3D元素的透视效果。
 5. perspective-origin：规定3D元素的底部位置。
 6. backface-visibility：定义元素在不面对屏幕时是否可见。

### animation

> animation属性可以想Flash制作动画一样，通过控制关键帧来控制动画的每一步，实现更为复杂的动画效果；

属性：
  - animation-name：关键帧动画名称（通过keyFrames生命一个动画），none为默认值，覆盖所有的动画效果；
  - animation-duration：动画持续的时间，默认为0，意味着动画周期为0，也就是没有任何动画效果；
  - animation-timing-function：动画的过渡形式（linear、、、）；
  - animation-delay：动画执行的延迟时间；
  - animation-iteration-count：定义动画的播放次数，默认为1，如果为infinite，则为无限循环播放；
  - animation-direction：默认为normal，每次循环都是向前播放；alternate，动画播放为偶数次则向前播放，基数次则反方向播放；alternate-reverse，先反后正；reverse，反向；
  - animation-state：默认为running，播放；pause，暂停；
  - animation-fill-mode：定义动画开始之前和结束之后发生的操作，默认值为none，动画结束时回到动画没开始时的状态；forwards，动画结束时继续应用最后关键帧的位置，即保存在结束是的状态；backwards，让动画回到第一帧的状态；both，轮流应用forwards和backwards规则；
