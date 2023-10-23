/*
 * @FilePath: \vscode-settings\bin\copy_vscode_config.js
 * @Author: zhangxin
 * @Date: 2023-10-23 14:41:04
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-10-23 14:45:30
 * @Description:
 */

const fs = require('fs');
const path = require('path');

// 电脑E盘上的.vscode文件夹位置
const eDriveVscodeDir = 'E:/vscode-settings/.vscode';

// 当前项目的根目录
const currentProjectDir = process.cwd();

// 目标文件夹路径
const targetDir = path.join(currentProjectDir, '.vscode');

// 检查目标文件夹是否存在，如果不存在则创建
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

// 复制.vscode文件夹到当前项目
copyVscodeConfig(eDriveVscodeDir, targetDir);

console.log('已将.vscode文件夹从E盘复制到当前项目。');

// 复制.vscode文件夹的函数
function copyVscodeConfig(sourceDir, targetDir) {
  const files = fs.readdirSync(sourceDir);
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    if (fs.statSync(sourcePath).isDirectory()) {
      // 如果是目录，递归复制
      copyVscodeConfig(sourcePath, targetPath);
    } else {
      // 如果是文件，复制到目标文件夹
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}
