// auth:2
const dns = require('dns');
const mineflayer = require('mineflayer');
const readline = require('readline');

// ========== 从启动器传入的参数 ==========
const args = process.argv.slice(2);
let BOT_NAME = args[0];
let AUTH_MODE = parseInt(args[1]);    // 0=离线, 1=正版
let EMAIL = args[2];                  // 正版邮箱（仅当 AUTH_MODE==1 时有效）

if (!BOT_NAME) {
    console.error('❌ 未提供玩家名，请使用启动器运行。');
    process.exit(1);
}

// 如果模式不明确，默认为离线
if (isNaN(AUTH_MODE)) AUTH_MODE = 0;

// 强制使用公共 DNS（保证 SRV 查询）
dns.setServers(['8.8.8.8', '1.1.1.1', '114.114.114.114']);
dns.setDefaultResultOrder('ipv4first');

// 询问服务器地址
const rlServer = readline.createInterface({ input: process.stdin, output: process.stdout });
rlServer.question('请输入要连接的服务器地址 (域名或IP): ', (server) => {
    rlServer.close();
    let serverHost = server.trim();
    if (!serverHost) {
        console.log('❌ 未输入服务器地址，退出。');
        process.exit(1);
    }
    startBot(serverHost, BOT_NAME, AUTH_MODE, EMAIL);
});

// 带超时的 SRV 查询
function querySrv(host, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('SRV 查询超时')), timeout);
        dns.resolveSrv(`_minecraft._tcp.${host}`, (err, records) => {
            clearTimeout(timer);
            if (err) return reject(err);
            if (records && records.length > 0) {
                resolve(records[0]);
            } else {
                reject(new Error('无 SRV 记录'));
            }
        });
    });
}

async function startBot(serverHost, botName, authMode, email) {
    let targetHost = serverHost;
    let targetPort = 25565;

    // 自动 SRV 查询
    try {
        console.log(`🔍 查询 SRV: _minecraft._tcp.${serverHost}`);
        const srv = await querySrv(serverHost);
        targetHost = srv.name;
        targetPort = srv.port;
        console.log(`✅ 使用 SRV: ${targetHost}:${targetPort}`);
    } catch (err) {
        console.log(`ℹ️ 无 SRV 记录，使用 ${serverHost}:25565`);
    }

    console.log(`🎯 目标: ${targetHost}:${targetPort}`);
    console.log(`🤖 玩家: ${botName}`);
    console.log(`🔐 认证: ${authMode === 0 ? '离线' : '微软正版'}`);

    // 构建 bot 选项
    const botOptions = {
        host: targetHost,
        port: targetPort,
        username: botName,
        version: false,
        connectTimeout: 60 * 1000
    };

    if (authMode === 1 && email) {
        botOptions.auth = 'microsoft';
        // 注意：mineflayer 的微软登录需要 email，首次会弹出浏览器或设备码
        // 不需要密码，会自动处理
        botOptions.email = email;   // 部分版本支持直接传入 email
    } else {
        botOptions.auth = 'offline';
    }

    const bot = mineflayer.createBot(botOptions);

    // ========== 控制台交互 ==========
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> '
    });

    rl.on('line', (line) => {
        const cmd = line.trim().toLowerCase();
        if (cmd === 'left') {
            bot.swingArm('right');
            console.log(`🖱️ 左键模拟`);
        } else if (cmd) {
            bot.chat(line.trim());
        }
        rl.prompt();
    });

    bot.once('login', () => {
        console.log(`✅ 机器人 ${botName} 已上线`);
        console.log(`💡 输入命令直接聊天，输入 "left" 模拟左键`);
        rl.prompt();
    });

    bot.on('message', (msg) => console.log(`[消息] ${msg.toString()}`));
    bot.on('chat', (username, message) => {
        if (username === botName) return;
        if (message === '!come') {
            bot.chat(`/tpa ${username}`);
            console.log(`📨 收到 ${username} 的召唤`);
        }
    });
    bot.on('message', (msg) => {
        const text = msg.toString();
        if (text.includes('has requested to teleport to you.')) {
            bot.chat('/tpaccept');
            console.log(`✅ 接受传送`);
        }
    });
    bot.on('move', () => {
        if (Math.abs(bot.entity.velocity.x) > 0.01 || Math.abs(bot.entity.velocity.z) > 0.01) {
            bot.clearControlStates();
        }
    });
    setInterval(() => {
        bot.chat('.');
        console.log(`⏲️ 心跳包`);
    }, 10 * 60 * 1000);

    bot.on('error', (err) => console.error(`❌ 错误: ${err.message}`));
    bot.on('end', (reason) => console.log(`⚠️ 断开: ${reason}`));

    process.on('SIGINT', () => {
        console.log('\n正在退出...');
        rl.close();
        bot.end();
        process.exit(0);
    });
}