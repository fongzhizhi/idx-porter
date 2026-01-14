/**
 * xmlbuilder2集成测试
 * 
 * @description
 * 验证xmlbuilder2库的基本功能和注释支持，确保库可以正常工作。
 * 这是一个基础测试，为后续的IDX XML生成器实现做准备。
 */

describe('xmlbuilder2 Integration', () => {
  test('should be able to import xmlbuilder2', () => {
    // TEST_CASE: xmlbuilder2库导入验证
    // TEST_INPUT: xmlbuilder2模块
    // TEST_EXPECT: create函数可用且可调用
    expect(() => {
      const { create } = require('xmlbuilder2');
      expect(typeof create).toBe('function');
    }).not.toThrow();
  });

  test('should generate basic XML with comments', () => {
    // TEST_CASE: 基本XML生成及注释支持
    // TEST_INPUT: 带注释的简单XML结构
    // TEST_EXPECT: 生成有效的XML输出，注释位置正确
    const { create } = require('xmlbuilder2');

    const doc = create({ version: '1.0', encoding: 'UTF-8' })
      .com('This is a test comment')
      .ele('root', { id: '1' })
      .com('Child element comment')
      .ele('child')
      .txt('content')
      .up()
      .up();

    const xml = doc.end({ prettyPrint: true });

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<!--This is a test comment-->');
    expect(xml).toContain('<!--Child element comment-->');
    expect(xml).toContain('<root id="1">');
    expect(xml).toContain('<child>content</child>');
  });

  test('should support multi-line comments', () => {
    // TEST_CASE: 多行注释功能
    // TEST_INPUT: 注释行数组
    // TEST_EXPECT: 所有注释行都出现在输出中
    const { create } = require('xmlbuilder2');

    const doc = create({ version: '1.0', encoding: 'UTF-8' })
      .com(['Multi-line comment', 'Second line', 'Third line'])
      .ele('root')
      .up();

    const xml = doc.end({ prettyPrint: true });

    expect(xml).toContain('Multi-line comment');
    expect(xml).toContain('Second line');
    expect(xml).toContain('Third line');
  });

  test('should support namespaces like IDX', () => {
    // TEST_CASE: IDX结构的XML命名空间支持
    // TEST_INPUT: 带命名空间的类IDX XML结构
    // TEST_EXPECT: 正确的命名空间声明和使用
    const { create } = require('xmlbuilder2');

    const doc = create({ version: '1.0', encoding: 'UTF-8' })
      .com('IDX V4.5 Document Example')
      .ele('foundation:EDMDDataSet', {
        'xmlns:foundation': 'http://www.prostep.org/ecad-mcad/edmd/4.0/foundation',
        'xmlns:pdm': 'http://www.prostep.org/ecad-mcad/edmd/4.0/pdm'
      })
      .com('Header section')
      .ele('foundation:Header')
      .ele('foundation:CreatorCompany')
      .txt('TestCompany')
      .up()
      .up()
      .com('Body section')
      .ele('foundation:Body')
      .up()
      .up();

    const xml = doc.end({ prettyPrint: true });

    expect(xml).toContain('foundation:EDMDDataSet');
    expect(xml).toContain('xmlns:foundation');
    expect(xml).toContain('xmlns:pdm');
    expect(xml).toContain('<!--IDX V4.5 Document Example-->');
    expect(xml).toContain('<!--Header section-->');
    expect(xml).toContain('TestCompany');
  });
});