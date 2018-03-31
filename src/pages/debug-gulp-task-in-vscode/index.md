---
title: 在vscode中调试gulp task
date: "2018-03-31T12:31:12.599Z"
---
## 问题
Q:请问，为什么要调试gulp任务？
A:接手了一个老项目，用gulp做的自动化流程，调试一个页面的时候结果和预期总有差距，排查下来怀疑问题是由gulp的一个任务导致的。一开始傻乎乎地写了很多`console.log()`,然后就想能不能调试gulp任务啊，google了一下，果然可以，炒鸡方便。

## 步骤

### 第一步：添加配置
选择菜单，调试 -> 添加配置

### 第二步：添加调试任务
在打开/新建的launch.json中添加一条新配置，下面这条配置中`dev`就是我要调试的任务
```json
{
    "type": "node",
    "request": "launch",
    "name": "Gulp dev",
    "program": "${workspaceFolder}/node_modules/gulp/bin/gulp.js",
    "args": [
        "dev"
    ]·
}
```

### 第三步：启动调试任务
选择菜单，调试 -> 启动调试 或者快捷键F5

结束了？恩，结束了。结就是这么简单o(*￣︶￣*)o
