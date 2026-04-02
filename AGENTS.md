# 项目上下文

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 项目概述

这是一个**竞赛平台前端项目**，包含5个页面：
- 登录页 (`/login`)
- 竞赛浏览页 (`/competitions`) - 核心页面
- 组队社区页 (`/teams`) - 核心页面
- AI Agent 页 (`/ai-agent`) - 占位页
- 个人主页 (`/profile`)

### 核心特性
- SPA 单页应用，客户端路由切换（无刷新）
- 固定左侧导航栏
- 卡片式布局设计
- 清新配色方案（米白背景 + 浅橙主色）

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
│   ├── build.sh            # 构建脚本
│   ├── dev.sh              # 开发环境启动脚本
│   ├── prepare.sh          # 预处理脚本
│   └── start.sh            # 生产环境启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   │   ├── login/          # 登录页
│   │   ├── competitions/   # 竞赛浏览页
│   │   ├── teams/          # 组队社区页
│   │   ├── ai-agent/       # AI Agent 占位页
│   │   └── profile/        # 个人主页
│   ├── components/         # 组件
│   │   ├── ui/             # Shadcn UI 组件库
│   │   ├── main-layout.tsx # 主布局组件
│   │   └── sidebar-nav.tsx # 侧边栏导航组件
│   ├── data/
│   │   └── mock.ts         # Mock 数据
│   ├── hooks/              # 自定义 Hooks
│   └── lib/                # 工具库
│       └── utils.ts        # 通用工具函数 (cn)
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

- 项目文件（如 app 目录、pages 目录、components 等）默认初始化到 `src/` 目录下。

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

- **项目理解加速**：初始可以依赖项目下`package.json`文件理解项目类型，如果没有或无法理解退化成阅读其他文件。
- **Hydration 错误预防**：严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染；同时严禁非法 HTML 嵌套（如 <p> 嵌套 <div>）。

## UI 设计与组件规范 (UI & Styling Standards)

- 模板默认预装核心组件库 `shadcn/ui`，位于`src/components/ui/`目录下
- Next.js 项目**必须默认**采用 shadcn/ui 组件、风格和规范，**除非用户指定用其他的组件和规范。**

## 配色方案

- 背景：米白 #F7F6F2
- 主色：浅橙 #FFB347
- 辅助：淡黄 #FFF3BF
- 点缀：浅蓝 #D0EBFF、浅绿 #D3F9D8

## Mock 数据

所有 mock 数据位于 `src/data/mock.ts`，包含：
- `competitions` - 竞赛列表数据
- `teams` - 组队信息数据
- `currentUser` - 当前用户数据
- `filterOptions` - 筛选选项


