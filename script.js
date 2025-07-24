document.addEventListener('DOMContentLoaded', () => {
    // 游戏元素
    const liquidGlass = document.getElementById('liquidGlass');
    const target = document.getElementById('target');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    
    // 游戏状态
    let score = 0;
    let gameActive = false;
    let gameSpeed = 1500; // 目标出现的初始速度（毫秒）
    let minSpeed = 600; // 最快速度
    let blobs = []; // 存储液态玻璃效果的气泡
    
    // 初始化液态玻璃效果
    function initLiquidGlass() {
        // 创建5-8个随机大小和位置的气泡
        const blobCount = Math.floor(Math.random() * 4) + 5;
        
        for (let i = 0; i < blobCount; i++) {
            createBlob();
        }
        
        // 添加鼠标移动效果
        document.querySelector('.liquid-glass-container').addEventListener('mousemove', (e) => {
            const container = document.querySelector('.liquid-glass-container');
            const rect = container.getBoundingClientRect();
            
            // 计算鼠标在容器内的相对位置
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 创建跟随鼠标的光晕效果
            const mouseGlow = document.createElement('div');
            mouseGlow.classList.add('blob');
            mouseGlow.style.width = '100px';
            mouseGlow.style.height = '100px';
            mouseGlow.style.left = `${x - 50}px`;
            mouseGlow.style.top = `${y - 50}px`;
            mouseGlow.style.opacity = '0.3';
            mouseGlow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)';
            mouseGlow.style.filter = 'blur(15px)';
            mouseGlow.style.animation = 'none';
            
            container.appendChild(mouseGlow);
            
            // 淡出并移除光晕
            setTimeout(() => {
                mouseGlow.style.transition = 'opacity 0.8s ease';
                mouseGlow.style.opacity = '0';
                setTimeout(() => {
                    mouseGlow.remove();
                }, 800);
            }, 100);
        });
    }
    
    // 创建一个液态气泡
    function createBlob() {
        const blob = document.createElement('div');
        blob.classList.add('blob');
        
        // 随机大小
        const size = Math.floor(Math.random() * 200) + 100;
        blob.style.width = `${size}px`;
        blob.style.height = `${size}px`;
        
        // 随机位置
        const left = Math.floor(Math.random() * 100);
        const top = Math.floor(Math.random() * 100);
        blob.style.left = `${left}%`;
        blob.style.top = `${top}%`;
        
        // 随机颜色
        const hue = Math.floor(Math.random() * 60) + 180; // 蓝色到青色范围
        const opacity = Math.random() * 0.15 + 0.05;
        blob.style.background = `radial-gradient(circle, hsla(${hue}, 100%, 70%, ${opacity}) 0%, hsla(${hue}, 100%, 70%, 0) 70%)`;
        
        // 随机动画延迟
        blob.style.animationDelay = `${Math.random() * 5}s`;
        
        liquidGlass.appendChild(blob);
        blobs.push(blob);
        
        // 每隔一段时间更新气泡位置
        setTimeout(() => {
            if (liquidGlass.contains(blob)) {
                liquidGlass.removeChild(blob);
                blobs = blobs.filter(b => b !== blob);
                if (gameActive) {
                    createBlob();
                }
            }
        }, Math.random() * 15000 + 10000);
    }
    
    // 显示目标
    function showTarget() {
        if (!gameActive) return;
        
        // 随机位置
        const gameArea = document.querySelector('.game-content');
        const maxX = gameArea.clientWidth - 60;
        const maxY = gameArea.clientHeight - 60;
        
        const x = Math.floor(Math.random() * maxX);
        const y = Math.floor(Math.random() * maxY);
        
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
        
        // 显示目标并添加点击事件
        target.style.opacity = '1';
        target.style.transform = 'scale(0.8)';
        
        // 目标消失的动画
        setTimeout(() => {
            target.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            target.style.transform = 'scale(1)';
        }, 50);
        
        // 如果一段时间内没有点击，目标消失
        const timeout = setTimeout(() => {
            hideTarget();
            if (gameActive) {
                showTarget();
            }
        }, gameSpeed);
        
        // 存储超时ID以便在点击时清除
        target.dataset.timeoutId = timeout;
    }
    
    // 隐藏目标
    function hideTarget() {
        target.style.opacity = '0';
        
        // 清除可能存在的超时
        if (target.dataset.timeoutId) {
            clearTimeout(parseInt(target.dataset.timeoutId));
        }
    }
    
    // 点击目标
    target.addEventListener('click', () => {
        if (!gameActive) return;
        
        // 增加分数
        score++;
        scoreDisplay.textContent = score;
        
        // 创建点击效果
        const clickEffect = document.createElement('div');
        clickEffect.style.position = 'absolute';
        clickEffect.style.left = target.style.left;
        clickEffect.style.top = target.style.top;
        clickEffect.style.width = '60px';
        clickEffect.style.height = '60px';
        clickEffect.style.borderRadius = '50%';
        clickEffect.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)';
        clickEffect.style.zIndex = '3';
        clickEffect.style.transform = 'scale(0.8)';
        clickEffect.style.opacity = '1';
        
        document.querySelector('.game-content').appendChild(clickEffect);
        
        // 动画效果
        setTimeout(() => {
            clickEffect.style.transition = 'all 0.5s ease';
            clickEffect.style.transform = 'scale(2)';
            clickEffect.style.opacity = '0';
            setTimeout(() => {
                clickEffect.remove();
            }, 500);
        }, 10);
        
        // 隐藏当前目标并显示新目标
        hideTarget();
        
        // 加快游戏速度
        if (gameSpeed > minSpeed) {
            gameSpeed -= 30;
        }
        
        // 显示新目标
        setTimeout(showTarget, 300);
    });
    
    // 开始游戏
    startButton.addEventListener('click', () => {
        if (gameActive) return;
        
        gameActive = true;
        score = 0;
        scoreDisplay.textContent = score;
        gameSpeed = 1500;
        
        // 更新按钮状态
        startButton.textContent = '游戏进行中';
        startButton.disabled = true;
        
        // 开始游戏
        showTarget();
        
        // 添加更多的液态效果
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                if (gameActive) createBlob();
            }, i * 1000);
        }
    });
    
    // 重置游戏
    resetButton.addEventListener('click', () => {
        gameActive = false;
        hideTarget();
        
        // 更新按钮状态
        startButton.textContent = '开始游戏';
        startButton.disabled = false;
        
        // 重置分数
        score = 0;
        scoreDisplay.textContent = score;
        
        // 清除所有气泡并重新初始化
        blobs.forEach(blob => {
            if (liquidGlass.contains(blob)) {
                liquidGlass.removeChild(blob);
            }
        });
        blobs = [];
        
        // 重新初始化液态玻璃效果
        initLiquidGlass();
    });
    
    // 初始化游戏
    initLiquidGlass();
});