# HLBot

> Hallo Lele Bot — 基于 Node.js 和 mineflayer 的 Minecraft 机器人启动与部署工具。

HLBot 提供一个交互式启动器，可扫描并运行多个机器人脚本，支持离线 / 微软正版 / 第三方皮肤站三种登录方式，自动处理 SRV 记录、自动检测更新、支持本地安装包。配套的安装器（`install.bat`）一键完成环境准备。

- **开源协议**：MIT
- **适用平台**：Windows 10 / 11
- **适合人群**：服务器管理员、挂机玩家

如果这个项目帮到你，欢迎点个 **Star** ⭐

---

## 特性

- **多脚本管理**：扫描当前目录所有 `.js` 脚本，菜单选择运行
- **三种登录方式**：离线 / 微软正版（设备码授权） / 第三方皮肤站（Yggdrasil）
- **智能连接**：自动查询 SRV、扫描常用端口，无需手动填端口
- **本地安装包**：直接把 zip 拖到 `install.bat` 即可离线安装
- **自动更新**：启动时双源检测（GitHub API + Latest.txt），发现新版本可选择更新
- **一键安装器**：自动检测并安装 Node.js、自动 `npm install`、自动启动主程序
- **双语支持**：首次运行选择语言，记忆后续使用
- **协议同意记忆**：同意一次后不再重复询问
- **隐藏生成文件**：日志和记忆文件默认隐藏，保持目录整洁

---

## 环境要求

| 项目 | 要求 |
|---|---|
| 操作系统 | Windows 10 / 11 |
| Node.js | v16 或更高（推荐 v22+） |
| PowerShell | 5.1 或更高（安装器使用，推荐 PowerShell 7） |

安装器会自动检测并引导安装 Node.js。

---

## 快速开始

### 方式一：一键安装（推荐）

1. 下载安装器（`install.bat` + `install.ps1`），放到你想安装的目录
2. 双击 `install.bat`
3. 按提示完成：
   - 选择语言（简体中文 / English）
   - 阅读并同意用户协议
   - 检测 Node.js（没有会自动下载安装）
   - 选择在线下载或使用本地安装包
   - 自动解压、安装依赖、启动启动器
安装器下载链接:https://github.com/287f2adb-f881-41c9-9728-da082565c0ff

### 方式二：手动安装

```bash
# 1. 安装 Node.js v16+（https://nodejs.org/）
# 2. 进入项目目录
cd path\to\hlbot
# 3. 安装依赖
npm install
# 4. 启动
launcher.bat
```

---

## 使用说明

### 启动器主菜单

启动后会自动：

1. 检测文件完整性、依赖是否齐全
2. 双源查询最新版本（如发现新版本会询问是否更新）
3. 扫描目录下所有 `.js` 机器人脚本

菜单操作：

- 输入**数字** → 选择脚本运行
- 输入 `h` → 显示帮助
- 输入 `0` → 退出

### 认证模式

每个机器人脚本第一行必须声明认证模式：

```js
// auth:0
```

| 模式 | 含义 | 需要输入 |
|---|---|---|
| `0` | 离线模式 | 玩家名 |
| `1` | 微软正版登录 | 玩家名 + 微软邮箱 |
| `2` | 每次询问 | 运行时选择 |
| `3` | 第三方皮肤站 | 皮肤站账号密码 |

**微软正版（`auth:1`）**

首次使用会输出设备码和链接（如 `https://www.microsoft.com/link?otc=XXXXXXXX`），浏览器会自动打开，输入设备码完成授权。授权成功后凭证缓存，后续无需重复授权。

**第三方皮肤站（`auth:3`）**

首次使用会依次询问：

1. 皮肤站账号（注册用的用户名或邮箱）
2. 皮肤站密码
3. 皮肤站认证地址（Yggdrasil API，例如 `skin.example.com` 或 `https://skin.example.com/api/yggdrasil`）

验证通过后，机器人会使用你在皮肤站的角色名（而非启动器里输入的玩家名）。

> ⚠️ 使用第三方皮肤站的服务器必须配置 authlib-injector，否则会因 `unverified_username` 拒绝登录。

### 机器人脚本

- `官方默认脚本.js`：运行后询问服务器地址，自动解析 SRV 并连接
- 可复制此脚本，修改第一行为 `// auth:0` 等，创建自己的固定服务器脚本

---

## 高级功能

### 本地安装包（离线安装）

不需要联网下载主程序，直接把 zip 拖到 `install.bat` **图标上**：

1. 脚本识别到 zip 路径
2. 询问"是否使用此本地安装包进行安装？"
3. 选择 `y` → 跳过在线下载，直接解压安装

也可以命令行传参：

```
install.bat "D:\path\to\HLBot.zip"
```

### 自动更新

启动器启动时并行查询两个源：

- GitHub Release API
- `Latest.txt` 首行 `# version=x.y.z`

两个源任一发现新版本即提示更新，取版本号更高的那个。更新流程：下载 → 测速选最快镜像 → 解压覆盖。用户数据（`HLBot_data`、`user.txt`）不会被覆盖。

### 语言切换

首次运行询问语言，写入 `.hlbot_lang`，后续自动读取。想换语言：删除该文件重新启动。

### 隐藏生成文件

以下文件默认带隐藏属性，资源管理器里看不到：

- `install.log`、`install_transcript.log`、`error.log`
- `.hlbot_agreement`、`.hlbot_lang`
- `launcher.js`、`auth.js`、`help.txt`、`package.json`、`package-lock.json`

**查看方法**：资源管理器 → 查看 → 勾选"隐藏的项目"

---

## 高级配置

| 配置项 | 位置 | 说明 |
|---|---|---|
| 默认玩家名 | `user.txt` 第一行 | 离线 / 微软登录时的默认名 |
| 帮助内容 | `help.txt` | 启动器输入 `h` 显示 |
| 皮肤站历史 | `HLBot_data/config.json` | 自动维护，最多 10 条 |
| 服务器历史 | `HLBot_data/servers.json` | 自动维护，最多 10 条 |

---

## 常见问题

| 问题 | 原因 / 解决 |
|---|---|
| 双击 `install.bat` 一闪而过 | 用命令行运行 `install.bat` 查看错误；或检查是否被杀毒软件拦截 |
| 提示"第一行缺少认证模式定义" | 脚本首行需要 `// auth:N` |
| 连接失败 `ENOTFOUND` | 域名无效，或服务器用 SRV 记录（用 `官方默认脚本.js`） |
| 正版登录没有自动打开浏览器 | 手动复制控制台里的 `microsoft.com/link` 链接 |
| `npm install` 报 `EPERM` | 关杀毒 / 管理员运行 / 路径改成纯英文 |
| 机器人进服就断开 | 服务器要求正版 / 版本不匹配 / 服务端未加载 authlib-injector |
| 中文乱码 | 用 PowerShell 7；`install.ps1` 保存为 UTF-8 with BOM；zip 用 UTF-8 或 GBK 压缩 |
| 找不到隐藏的日志文件 | 资源管理器 → 查看 → 勾选"隐藏的项目" |

---

## 目录结构

```
HLBot/
├── install.bat              # 安装器入口
├── install.ps1              # 安装器主逻辑
├── launcher.bat             # 启动器入口
├── launcher.js              # 启动器主逻辑（隐藏）
├── auth.js                  # 第三方皮肤站认证（隐藏）
├── 官方默认脚本.js           # 默认机器人脚本
├── help.txt                 # 帮助文本（隐藏）
├── package.json             # 依赖配置（隐藏）
├── package-lock.json        # 锁定版本（隐藏）
├── user.txt                 # （可选）默认玩家名
├── HLBot_data/              # 配置与历史
│   ├── config.json
│   └── servers.json
├── node_modules/            # 依赖（npm 生成）
└── backup/                  # 更新前自动备份
```

---

## 许可证

本项目采用 **MIT License** — 详见 [LICENSE](LICENSE)

---

## 联系

- **QQ 群**：1101118946
- **问题反馈**：见 `help.txt`

- # HLBot

> Hallo Lele Bot — a Minecraft bot launcher and deployment tool based on Node.js and mineflayer.

HLBot provides an interactive launcher that scans and runs multiple bot scripts, supports offline / Microsoft / third-party skin server authentication, handles SRV records automatically, checks for updates, and supports local packages. The bundled installer (`install.bat`) handles environment setup in one click.

- **License**: MIT
- **Platform**: Windows 10 / 11
- **Audience**: server admins, AFK players

If this project helps you, feel free to leave a **Star** ⭐

---

## Features

- **Multi-script management**: scans all `.js` scripts, menu-driven selection
- **Three login modes**: offline / Microsoft (device code) / third-party skin server (Yggdrasil)
- **Smart connection**: SRV lookup, common port scan, no manual port needed
- **Local package install**: drag a zip onto `install.bat` for offline install
- **Auto update**: dual-source check (GitHub API + Latest.txt), optional update
- **One-click installer**: auto-detect/install Node.js, run `npm install`, launch launcher
- **Bilingual**: choose language on first run, remembered afterward
- **Agreement memory**: agreed once, never asked again
- **Hidden generated files**: logs and state files hidden by default

---

## Requirements

| Item | Requirement |
|---|---|
| OS | Windows 10 / 11 |
| Node.js | v16+ (v22+ recommended) |
| PowerShell | 5.1+ (installer; PowerShell 7 recommended) |

The installer auto-detects and guides Node.js installation.

---

## Quick Start

### Method 1: One-click install (recommended)

1. Download the installer (`install.bat` + `install.ps1`) into your target folder
2. Double-click `install.bat`
3. Follow the prompts:
   - Choose language
   - Accept the agreement
   - Node.js detection (auto-install if missing)
   - Choose online download or local package
   - Auto extract, install deps, launch
Installer download link: https://github.com/287f2adb-f881-41c9-9728-da082565c0ff

### Method 2: Manual install

```bash
# 1. Install Node.js v16+ (https://nodejs.org/)
# 2. cd into the project
cd path\to\hlbot
# 3. Install dependencies
npm install
# 4. Launch
launcher.bat
```

---

## Usage

### Launcher menu

On startup:

1. File integrity and dependency checks
2. Dual-source version check (prompts update if available)
3. Scans for `.js` bot scripts

Menu:

- **Number** → run script
- `h` → help
- `0` → exit

### Auth modes

First line of every bot script declares auth mode:

```js
// auth:0
```

| Mode | Meaning | Input needed |
|---|---|---|
| `0` | Offline | Player name |
| `1` | Microsoft login | Player name + email |
| `2` | Ask each time | Choose at runtime |
| `3` | Third-party skin server | Account + password |

**Microsoft (`auth:1`)**

First use prints a device code and link (`https://www.microsoft.com/link?otc=XXXXXXXX`). Browser opens automatically. After authorizing, credentials are cached.

**Third-party skin server (`auth:3`)**

First use asks for:

1. Account (username or email)
2. Password
3. Auth server (Yggdrasil API, e.g. `skin.example.com`)

After verification, the bot uses your skin server character name (not the launcher-input name).

> ⚠️ Servers using third-party auth require authlib-injector.

### Bot scripts

- `官方默认脚本.js`: asks for server address, resolves SRV automatically
- Copy it and change the first line (e.g. `// auth:0`) to make your own

---

## Advanced

### Local package (offline install)

Drag a zip onto the `install.bat` **icon**:

1. Script captures the zip path
2. Asks whether to use it
3. Choose `y` → skip online download

Or via command line:

```
install.bat "D:\path\to\HLBot.zip"
```

### Auto update

Two sources queried in parallel:

- GitHub Release API
- `Latest.txt` first line `# version=x.y.z`

Whichever reports a higher version triggers an update prompt. Update flow: download → speed test → extract/overwrite. User data (`HLBot_data`, `user.txt`) is preserved.

### Language

First run asks language; stored in `.hlbot_lang`. Delete to re-choose.

### Hidden files

These have the hidden attribute:

- `install.log`, `install_transcript.log`, `error.log`
- `.hlbot_agreement`, `.hlbot_lang`
- `launcher.js`, `auth.js`, `help.txt`, `package.json`, `package-lock.json`

View via Explorer → View → Show hidden items.

---

## Configuration

| Item | Location | Notes |
|---|---|---|
| Default player name | `user.txt` line 1 | Used in offline/Microsoft mode |
| Help content | `help.txt` | Shown with `h` |
| Skin server history | `HLBot_data/config.json` | Auto, up to 10 |
| Server history | `HLBot_data/servers.json` | Auto, up to 10 |

---

## FAQ

| Issue | Cause / Fix |
|---|---|
| `install.bat` flashes and closes | Run from a terminal; check AV |
| "Missing auth mode" | First line must be `// auth:N` |
| `ENOTFOUND` | Invalid domain, or SRV needed (use `官方默认脚本.js`) |
| Browser not opening on MS login | Manually copy the `microsoft.com/link` URL |
| `npm install` `EPERM` | Disable AV / run as admin / ASCII path only |
| Disconnects immediately | Online-mode required / version mismatch / authlib-injector missing |
| Garbled Chinese | Use PowerShell 7; save install.ps1 as UTF-8 with BOM; zip in UTF-8 or GBK |
| Can't find log files | Explorer → View → Show hidden items |

---

## Layout

```
HLBot/
├── install.bat
├── install.ps1
├── launcher.bat
├── launcher.js              # hidden
├── auth.js                  # hidden
├── 官方默认脚本.js
├── help.txt                 # hidden
├── package.json             # hidden
├── package-lock.json        # hidden
├── user.txt                 # optional
├── HLBot_data/
├── node_modules/
└── backup/
```

---

## License

MIT — see [LICENSE](LICENSE)

---

## Contact

- **QQ Group**: 1101118946
- **Issues**: see `help.txt`
