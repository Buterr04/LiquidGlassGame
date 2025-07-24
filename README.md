# 液态玻璃游戏 (Liquid Glass Game)

![液态玻璃游戏](https://img.shields.io/badge/游戏-液态玻璃-blue)
![版本](https://img.shields.io/badge/版本-1.0.0-green)
![许可证](https://img.shields.io/badge/许可证-MIT-orange)

一个基于Web的小游戏，采用Apple最新的Liquid Glass液态玻璃设计效果。这个游戏结合了现代UI设计趋势和简单有趣的游戏玩法，展示了如何在Web应用中实现高级视觉效果。

## 预览

![游戏预览](https://via.placeholder.com/800x450.png?text=液态玻璃游戏预览)

## 特点

- **Apple风格的液态玻璃效果**：半透明、模糊背景与动态气泡
- **响应式设计**：适配各种屏幕尺寸
- **互动元素**：鼠标移动产生光晕效果
- **简单有趣的游戏玩法**：点击出现的目标获得分数
- **渐进式难度**：随着得分增加，游戏速度加快

## 技术栈

- HTML5
- CSS3 (使用现代CSS特性如backdrop-filter)
- 原生JavaScript (无需任何框架)

## 如何使用

1. 克隆仓库到本地：
   ```bash
   git clone https://github.com/Buterr04/liquid-glass-game.git
   ```

2. 进入项目目录：
   ```bash
   cd liquid-glass-game
   ```

3. 使用任何HTTP服务器启动项目，例如：
   ```bash
   # 如果你有Python
   python -m http.server 8000
   
   # 如果你有Node.js
   npx serve
   ```

4. 在浏览器中访问：
   ```
   http://localhost:8000
   ```

## 游戏玩法

1. 点击"开始游戏"按钮开始
2. 随机位置会出现圆形目标，需要快速点击
3. 每点击一次得1分，并且目标出现的速度会逐渐加快
4. 点击"重置"按钮可以重新开始游戏

## 浏览器兼容性

游戏使用了一些现代CSS特性，如`backdrop-filter`，最佳体验需要在以下浏览器中运行：

- Safari 9+
- Chrome 76+
- Firefox 70+
- Edge 17+

## 自定义

你可以通过修改CSS变量来自定义游戏的外观：

```css
:root {
    --glass-bg: rgba(255, 255, 255, 0.1);
    --glass-border: rgba(255, 255, 255, 0.2);
    --glass-highlight: rgba(255, 255, 255, 0.3);
    --glass-shadow: rgba(0, 0, 0, 0.1);
    --accent-color: #06c;
    --text-color: #fff;
}
```

## 扩展想法

- 添加音效
- 实现多级难度
- 添加计时模式
- 保存高分记录
- 添加更多游戏元素

## 许可证

[MIT](LICENSE)

## 致谢

- 灵感来源于Apple的Liquid Glass设计语言
- 感谢所有为现代Web标准做出贡献的开发者

## 作者

[Buterr04] 

---

如果你喜欢这个项目，请给它一个星标 ⭐