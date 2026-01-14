/**
 * 项目结构测试
 * 
 * @description
 * 验证项目的基础结构和配置是否正确设置。
 * 这是一个基础的冒烟测试，确保项目可以正常构建和运行。
 */

describe('Project Structure', () => {
  test('should have correct package.json configuration', () => {
    // TEST_CASE: Package.json配置验证
    // TEST_INPUT: package.json文件内容
    // TEST_EXPECT: 正确的name、version、main和types字段
    const packageJson = require('../package.json');

    expect(packageJson.name).toBe('idx-porter');
    expect(packageJson.version).toBe('1.0.0');
    expect(packageJson.main).toBe('dist/index.js');
    expect(packageJson.types).toBe('dist/index.d.ts');
  });

  test('should be able to import main module', () => {
    // TEST_CASE: 主模块导入验证
    // TEST_INPUT: src/index.ts模块
    // TEST_EXPECT: 不抛出导入错误
    expect(() => {
      require('../src/index');
    }).not.toThrow();
  });

  test('should have TypeScript configuration', () => {
    // TEST_CASE: TypeScript配置文件存在性检查
    // TEST_INPUT: tsconfig.json文件
    // TEST_EXPECT: 文件存在且可读
    const fs = require('fs');
    expect(fs.existsSync('tsconfig.json')).toBe(true);
  });

  test('should have ESLint configuration', () => {
    // TEST_CASE: ESLint配置文件存在性检查
    // TEST_INPUT: .eslintrc.js文件
    // TEST_EXPECT: 文件存在且可读
    const fs = require('fs');
    expect(fs.existsSync('.eslintrc.js')).toBe(true);
  });

  test('should have Jest configuration', () => {
    // TEST_CASE: Jest配置文件存在性检查
    // TEST_INPUT: jest.config.js文件
    // TEST_EXPECT: 文件存在且可读
    const fs = require('fs');
    expect(fs.existsSync('jest.config.js')).toBe(true);
  });

  test('should have proper directory structure', () => {
    // TEST_CASE: 目录结构验证
    // TEST_INPUT: 项目目录结构
    // TEST_EXPECT: 所有必需的目录都存在
    const fs = require('fs');

    expect(fs.existsSync('src')).toBe(true);
    expect(fs.existsSync('src/interfaces')).toBe(true);
    expect(fs.existsSync('src/types')).toBe(true);
    expect(fs.existsSync('src/models')).toBe(true);
    expect(fs.existsSync('src/core')).toBe(true);
    expect(fs.existsSync('src/utils')).toBe(true);
    expect(fs.existsSync('src/errors')).toBe(true);
    expect(fs.existsSync('tests')).toBe(true);
  });
});