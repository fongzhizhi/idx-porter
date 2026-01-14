/**
 * 项目结构测试
 * 
 * @description
 * 验证项目的基础结构和配置是否正确设置。
 * 这是一个基础的冒烟测试，确保项目可以正常构建和运行。
 */

describe('Project Structure', () => {
  test('should have correct package.json configuration', () => {
    // TEST_CASE: Package.json configuration validation
    // TEST_INPUT: package.json file content
    // TEST_EXPECT: Correct name, version, main, and types fields
    const packageJson = require('../package.json');
    
    expect(packageJson.name).toBe('idx-porter');
    expect(packageJson.version).toBe('1.0.0');
    expect(packageJson.main).toBe('dist/index.js');
    expect(packageJson.types).toBe('dist/index.d.ts');
  });

  test('should be able to import main module', () => {
    // TEST_CASE: Main module import verification
    // TEST_INPUT: src/index.ts module
    // TEST_EXPECT: No import errors thrown
    expect(() => {
      require('../src/index');
    }).not.toThrow();
  });

  test('should have TypeScript configuration', () => {
    // TEST_CASE: TypeScript configuration file existence
    // TEST_INPUT: tsconfig.json file
    // TEST_EXPECT: File exists and is readable
    const fs = require('fs');
    expect(fs.existsSync('tsconfig.json')).toBe(true);
  });

  test('should have ESLint configuration', () => {
    // TEST_CASE: ESLint configuration file existence
    // TEST_INPUT: .eslintrc.js file
    // TEST_EXPECT: File exists and is readable
    const fs = require('fs');
    expect(fs.existsSync('.eslintrc.js')).toBe(true);
  });

  test('should have Jest configuration', () => {
    // TEST_CASE: Jest configuration file existence
    // TEST_INPUT: jest.config.js file
    // TEST_EXPECT: File exists and is readable
    const fs = require('fs');
    expect(fs.existsSync('jest.config.js')).toBe(true);
  });

  test('should have proper directory structure', () => {
    // TEST_CASE: Directory structure validation
    // TEST_INPUT: Project directory structure
    // TEST_EXPECT: All required directories exist
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