/**
 * xmlbuilder2集成测试
 * 
 * @description
 * 验证xmlbuilder2库的基本功能和注释支持，确保库可以正常工作。
 * 这是一个基础测试，为后续的IDX XML生成器实现做准备。
 */

describe('xmlbuilder2 Integration', () => {
  test('should be able to import xmlbuilder2', () => {
    // TEST_CASE: xmlbuilder2 library import verification
    // TEST_INPUT: xmlbuilder2 module
    // TEST_EXPECT: create function is available and callable
    expect(() => {
      const { create } = require('xmlbuilder2');
      expect(typeof create).toBe('function');
    }).not.toThrow();
  });

  test('should generate basic XML with comments', () => {
    // TEST_CASE: Basic XML generation with comment support
    // TEST_INPUT: Simple XML structure with comments
    // TEST_EXPECT: Valid XML output with proper comment placement
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
    expect(xml).toContain('<!-- This is a test comment -->');
    expect(xml).toContain('<!-- Child element comment -->');
    expect(xml).toContain('<root id="1">');
    expect(xml).toContain('<child>content</child>');
  });

  test('should support multi-line comments', () => {
    // TEST_CASE: Multi-line comment functionality
    // TEST_INPUT: Array of comment lines
    // TEST_EXPECT: All comment lines appear in output
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
    // TEST_CASE: XML namespace support for IDX structure
    // TEST_INPUT: IDX-like XML structure with namespaces
    // TEST_EXPECT: Proper namespace declarations and usage
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
    expect(xml).toContain('<!-- IDX V4.5 Document Example -->');
    expect(xml).toContain('<!-- Header section -->');
    expect(xml).toContain('TestCompany');
  });
});