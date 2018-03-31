---
title: 在vscode中调试gulp task
date: "2018-03-31T12:31:12.599Z"
---

一共三步

### 第一步：添加配置
选择菜单，调试 -> 添加配置

### 第二步：添加调试任务
在打开/新建的launch.json中添加一条新配置，下面这条配置中`dev`就是我要调试的任务
```
{
    "type": "node",
    "request": "launch",
    "name": "Gulp dev",
    "program": "${workspaceFolder}/node_modules/gulp/bin/gulp.js",
    "args": [
        "dev"
    ]
}
```

### 第三步：启动调试任务
选择菜单，调试 -> 启动调试

>结束了？恩，结束了。结就是这么简单o(*￣︶￣*)o
