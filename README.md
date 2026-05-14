# HLBot_MCbot
欢迎使用HLB，官方全称Hallo Lele Bot，既然来了，就留下你的Star吧！
这是一个基于 Node.js 和 mineflayer 的 Minecraft 机器人启动与部署工具。交互式启动器可扫描并运行多个脚本，支持离线/微软正版登录（设备码授权），自动处理 SRV 记录。配套图形化部署工具（setup.exe）能一键检测并安装 Node.js、自动创建 package.json、安装依赖、创建桌面快捷方式，并支持无交互模式、一键启动、日志记录等高级功能。用户只需双击启动器即可选择手动输入服务器地址的通用机器人或其他预设脚本。项目开源（MIT 许可证），适合服务器管理员和挂机玩家。环境要求 Windows 10/11 及 Node.js v22+，部署工具可自动完成环境准备，降低使用门槛。
问题见“help.txt”
# Minecraft 机器人启动器

一个轻量、可配置的 Minecraft 机器人（Bot）启动与管理工具，基于 Node.js 和 mineflayer 库。

## 功能特性

- 自动扫描当前目录下的所有机器人脚本（`.js`），并允许你选择运行哪一个
- 支持**离线模式**和**微软正版账号登录**（设备码授权，安全便捷）
- 自动处理 SRV 记录，无需手动填写端口或真实 IP
- 内置**手动输入服务器地址**的通用机器人脚本
- 可配置默认玩家名（通过 `user.txt`）
- 提供**一键部署工具**（`setup.exe`），自动检测 Node.js/npm 并安装依赖
- 交互式菜单，支持中英文切换，可选择多种高级功能（自动安装 Node.js、一键启动、日志记录等）

## 环境要求

- Windows 10/11（其他操作系统未测试）
- **Node.js**（v22 或更高版本）—— 可通过部署工具自动安装（注意！依赖安装需要在你运行机器人的文件夹下进行安装依赖，否则将无法启动。打开setup即可开始安装依赖。有中英两种字体。）

## 快速开始

### 方式一：使用一键部署工具（推荐）

1. 下载项目压缩包并解压到任意文件夹。
2. 双击运行 `setup.exe`。
3. 在菜单中按需选择功能（推荐勾选“自动安装 Node.js”和“一键启动机器人”），按 Enter 开始。
4. 等待部署完成，机器人启动器会自动弹出。

### 方式二：手动部署

1. 安装 [Node.js](https://nodejs.org/)（v22+）。
2. 在项目文件夹中打开命令提示符，执行 `npm install` 安装依赖。
3. 双击 `launcher.bat` 或运行 `node launcher.js` 启动。

## 使用说明

### 启动器操作

- 列出所有 `.js` 脚本（排除 `launcher.js` 自身）。
- 输入序号选择脚本，输入玩家名（可回车使用默认名）。
- 若脚本第一行为 `// auth:0/1/2`，启动器会根据模式处理登录：
  - `0`：离线模式
  - `1`：微软正版登录（需输入邮箱，首次需设备码授权）
  - `2`：每次询问使用哪种模式
- 在启动器主菜单输入 `h` 可查看帮助（内容来自 `help.txt`）。

### 机器人脚本说明

- `官方默认脚本.js`：运行时询问服务器地址，自动解析 SRV 并连接。
- 你可以复制此脚本并修改第一行 `// auth:0` 等来创建自己的固定服务器脚本。

## 高级配置

- **默认玩家名**：在 `launcher.js` 中修改 `DEFAULT_BOT_NAME`，或在同目录创建 `user.txt`（第一行写名字），启动器将自动读取。
- **帮助文件**：编辑 `help.txt`，启动器中按 `h` 显示。
- **正版登录**：首次使用设备码授权后，凭证会缓存，后续自动登录。

## 常见问题

| 问题 | 解决方法 |
|------|----------|
| 启动器闪退或提示“找不到脚本” | 确保所有机器人脚本以 `.js` 结尾，且第一行包含 `// auth:0/1/2`。 |
| 连接服务器失败 `ENOTFOUND` | 域名可能已失效或需要 SRV 解析。请使用 `官方默认脚本.js` 并输入完整域名。 |
| 正版登录要求输入代码 | 根据控制台提示，访问 `microsoft.com/link` 并输入设备码。若浏览器未自动打开，请手动复制链接。 |
| `npm install` 报错 `EPERM` | 关闭杀毒软件或使用管理员权限。如仍不行，将项目移动到纯英文路径。 |
| 机器人进服后立刻断开 | 检查服务器是否要求正版验证，或版本不匹配。可在脚本中指定 `version`。 |

## 许可证

本项目采用 **MIT 许可证**，详情见 [LICENSE](LICENSE) 文件。

## 联系方式

如有问题或建议，欢迎加入 QQ 群：**1101118946**

# HLBot_MCbot
Welcome to HLB, full name Hallo Lele Bot. Since you're here, don't forget to leave a Star!
This is a Minecraft bot launching and deployment tool based on Node.js and mineflayer. The interactive launcher scans and runs multiple scripts, supports offline/Microsoft genuine login (device code authorization), and automatically handles SRV records. The companion graphical deployment tool (setup.exe) can detect and install Node.js with one click, automatically create package.json, install dependencies, create desktop shortcuts, and supports advanced features like silent mode, one-click launch, and logging. Users just double-click the launcher to choose between a generic bot that manually enters the server address or other preset scripts. The project is open source (MIT license), suitable for server administrators and AFK players. System requirements: Windows 10/11 and Node.js v22+. The deployment tool automatically prepares the environment, lowering the barrier to entry.
For issues, see "help.txt"
# Minecraft Bot Launcher

A lightweight, configurable Minecraft bot launcher and management tool based on Node.js and the mineflayer library.

## Features

- Automatically scans all bot scripts (`.js`) in the current directory and lets you choose which one to run
- Supports **offline mode** and **Microsoft genuine account login** (device code authorization, secure and convenient)
- Automatically handles SRV records – no need to manually enter port or real IP
- Built-in **generic bot script** that manually enters the server address
- Configurable default player name (via `user.txt`)
- Provides a **one-click deployment tool** (`setup.exe`), automatically detects Node.js/npm and installs dependencies
- Interactive menu with Chinese/English switching; supports various advanced features (auto-install Node.js, one-click launch, logging, etc.)

## Requirements

- Windows 10/11 (other operating systems not tested)
- **Node.js** (v22 or higher) – can be automatically installed via the deployment tool (Note! Dependencies must be installed in the folder where you run the bot, otherwise it won't start. Open setup.exe to begin installing dependencies. Available in both Chinese and English.)

## Quick Start

### Method 1: Use the one-click deployment tool (recommended)

1. Download the project archive and extract it to any folder.
2. Double-click `setup.exe`.
3. Select the desired options in the menu (recommended: check "Auto-install Node.js" and "One-click launch bot"), then press Enter to start.
4. Wait for the deployment to complete; the bot launcher will automatically pop up.

### Method 2: Manual deployment

1. Install [Node.js](https://nodejs.org/) (v22+).
2. Open a command prompt in the project folder and run `npm install` to install dependencies.
3. Double-click `launcher.bat` or run `node launcher.js` to start.

## Usage

### Launcher Operations

- Lists all `.js` scripts (excluding `launcher.js` itself).
- Enter the number to select a script, then enter a player name (press Enter to use the default name).
- If the first line of the script is `// auth:0/1/2`, the launcher handles login according to the mode:
  - `0`: Offline mode
  - `1`: Microsoft genuine login (email required; device code authorization on first use)
  - `2`: Ask which mode to use each time
- Type `h` in the launcher main menu to view help (content from `help.txt`).

### Bot Script Description

- `官方默认脚本.js`: Asks for the server address at runtime, automatically resolves SRV and connects.
- You can copy this script and modify the first line `// auth:0` etc. to create your own fixed-server scripts.

## Advanced Configuration

- **Default player name**: Modify `DEFAULT_BOT_NAME` in `launcher.js`, or create `user.txt` (first line as the name) in the same directory; the launcher will read it automatically.
- **Help file**: Edit `help.txt`; press `h` in the launcher to display it.
- **Genuine login**: After the first device code authorization, credentials are cached and subsequent logins are automatic.

## Common Issues

| Issue | Solution |
|-------|----------|
| Launcher crashes or shows "Script not found" | Make sure all bot scripts end with `.js` and the first line contains `// auth:0/1/2`. |
| Connection failed `ENOTFOUND` | The domain may be invalid or require SRV resolution. Use `官方默认脚本.js` and enter the full domain name. |
| Genuine login asks for a code | Follow the console prompt, visit `microsoft.com/link` and enter the device code. If the browser doesn't open automatically, manually copy the link. |
| `npm install` error `EPERM` | Disable antivirus software or run as administrator. If still failing, move the project to a path with only English characters. |
| Bot disconnects immediately after joining server | Check if the server requires online mode authentication or if the version mismatches. Specify `version` in the script. |

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

## Contact

For questions or suggestions, welcome to join the QQ group: **1101118946**
