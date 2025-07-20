// 模拟服务器数据（实际应从API获取）
const mockData = {
    status: 'online',
    onlinePlayers: 25,
    maxPlayers: 100,
    tps: 20,
    gameVersion: '1.21.1',
    tpsHistory: {
        labels: ['5分钟前', '4分钟前', '3分钟前', '2分钟前', '1分钟前'],
        data: [19.8, 20.2, 20.5, 19.9, 20.1]
    }
};

// 更新服务器状态
function updateStatus() {
    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');

    if (mockData.status === 'online') {
        statusIndicator.style.backgroundColor = '#4CAF50';
        statusText.textContent = '服务器正常运行';
        statusText.style.color = '#4CAF50';
    } else {
        statusIndicator.style.backgroundColor = '#f44336';
        statusText.textContent = '服务器离线';
        statusText.style.color = '#f44336';
    }

    // 更新服务器信息
    document.getElementById('online-players').textContent = mockData.onlinePlayers;
    document.getElementById('max-players').textContent = mockData.maxPlayers;
    document.getElementById('tps').textContent = mockData.tps.toFixed(1);
    document.getElementById('game-version').textContent = mockData.gameVersion;

    // 更新TPS趋势图表
    updateTPSChart(mockData.tpsHistory);
}

// 更新TPS趋势图表
function updateTPSChart(data) {
    const ctx = document.getElementById('tps-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'TPS趋势',
                data: data.data,
                borderColor: '#4CAF50',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: '最近5分钟TPS趋势',
                    color: '#4CAF50'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    color: '#4CAF50'
                }
            }
        }
    });
}

// 定时更新数据
setInterval(updateStatus, 10000); // 每10秒更新一次
updateStatus();

// 更新历史记录
function updateHistory() {
    const historyContainer = document.getElementById('history-container');
    const currentTime = new Date().toLocaleTimeString();
    
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.textContent = `[${currentTime}] 服务器状态已更新 - 在线人数: ${mockData.onlinePlayers}/${mockData.maxPlayers}, TPS: ${mockData.tps.toFixed(1)}`;
    
    historyContainer.insertBefore(historyItem, historyContainer.firstChild);
    
    // 限制历史记录数量
    if (historyContainer.children.length > 10) {
        historyContainer.removeChild(historyContainer.lastChild);
    }
}

// 初始化历史记录
updateHistory();