#!/usr/bin/env node

/**
 * 项目设置验证脚本
 * 
 * @description
 * 验证项目的基础设置是否正确，包括依赖安装、配置文件等。
 * 这个脚本可以在CI/CD流程中使用，确保项目环境正确。
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 验证IDXPorter项目设置...\n');

// ============= 验证必要文件存在 =============
const requiredFiles = [
  'package.json',
  'tsconfig.json',
  '.eslintrc.js',
  'jest.config.js',
  '.prettierrc',
  '.gitignore',
  'README.md',
  'LICENSE',
  'src/index.ts'
];

let allFilesExist = true;

console.log('📁 检查必要文件...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - 文件不存在`);
    allFilesExist = false;
  }
});

// ============= 验证目录结构 =============
const requiredDirs = [
  'src/interfaces',
  'src/types', 
  'src/models',
  'src/core',
  'src/utils',
  'src/errors',
  'tests'
];

console.log('\n📂 检查目录结构...');
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`  ✅ ${dir}/`);
  } else {
    console.log(`  ❌ ${dir}/ - 目录不存在`);
    allFilesExist = false;
  }
});

// ============= 验证package.json配置 =============
console.log('\n📦 检查package.json配置...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredFields = ['name', 'version', 'description', 'main', 'types', 'scripts'];
  requiredFields.forEach(field => {
    if (packageJson[field]) {
      console.log(`  ✅ ${field}: ${typeof packageJson[field] === 'object' ? 'configured' : packageJson[field]}`);
    } else {
      console.log(`  ❌ ${field} - 字段缺失`);
      allFilesExist = false;
    }
  });
  
  // ------------ 检查必要的脚本 ------------
  const requiredScripts = ['build', 'test', 'lint', 'type-check'];
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`  ✅ script.${script}`);
    } else {
      console.log(`  ❌ script.${script} - 脚本缺失`);
      allFilesExist = false;
    }
  });
  
  // ------------ 检查必要的依赖 ------------
  const requiredDeps = ['xmlbuilder2'];
  if (packageJson.dependencies) {
    requiredDeps.forEach(dep => {
      if (packageJson.dependencies[dep]) {
        console.log(`  ✅ dependency.${dep}`);
      } else {
        console.log(`  ❌ dependency.${dep} - 依赖缺失`);
        allFilesExist = false;
      }
    });
  } else {
    console.log('  ❌ dependencies - 依赖配置缺失');
    allFilesExist = false;
  }
  
} catch (error) {
  console.log('  ❌ package.json 解析失败:', error.message);
  allFilesExist = false;
}

// ============= 最终结果 =============
console.log('\n' + '='.repeat(50));
if (allFilesExist) {
  console.log('🎉 项目设置验证通过！');
  console.log('💡 现在可以运行以下命令开始开发：');
  console.log('   npm install    # 安装依赖');
  console.log('   npm run build  # 构建项目');
  console.log('   npm test       # 运行测试');
  process.exit(0);
} else {
  console.log('❌ 项目设置验证失败！');
  console.log('请检查上述错误并修复后重试。');
  process.exit(1);
}