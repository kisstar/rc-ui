# Contribution Guide

请在你提 Issue 或者 Pull Request 之前花点时间来阅读一遍这篇指南，这有利于我们一起构建更好的 RcUI。

## 开发流程

常规的开发通常包含以下几个步骤：

1. 克隆仓库。
2. 安装依赖 `yarn install`。
3. 启动本地服务，你可以在页面中实时验证修改的效果 `yarn start`。
4. 启动本地文档服务，如果你修改了文档可以进行验证 `yarn start:doc`。
5. 检查代码风格 `yarn lint`。
6. 运行测试 `yarn test`。
7. 编译 TypeScript 和样式文件到 `dist` 目录 `yarn build`。

## Pull Request

在你发送 Pull Request 之前，请确认你完成了以下工作：

- 基于正确的分支做修改。
- 如果你修复了一个问题或者新增了一个功能，请确保提供了相应的测试。
- 确认所有的测试都是通过的 `yarn test`。
- 确保你的代码通过了相应的格式和语法检查 `yarn lint`。
- 确保代码可以顺利的完成编译 `yarn build`。
