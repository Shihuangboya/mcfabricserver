import minecraftstatus
import json
import time

# 定义服务器地址和端口
server_address = 'play.simpfun.cn'  # 替换为你的服务器地址
server_port = 25465  # 替换为你的服务器端口

# 创建服务器实例
server = minecraftstatus.MinecraftServer(server_address, server_port)

# 定期检查服务器状态
while True:
    try:
        # 获取服务器状态
        status = server.status()
        
        # 创建一个包含状态信息的字典
        status_info = {
            'status': 'online' if status.online else 'offline',
            'online_players': status.players_online,
            'max_players': status.players_max,
            'version': status.version,
            'tps': status.tps  # 假设服务器返回TPS信息
        }
        
        # 将状态信息保存到JSON文件
        with open('server_status.json', 'w') as f:
            json.dump(status_info, f)
            
    except Exception as e:
        print(f"Error: {e}")
        
    # 每隔10秒检查一次
    time.sleep(10)