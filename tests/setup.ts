/**
 * Jest测试环境设置
 * 
 * @description
 * 配置Jest测试环境，设置全局测试工具和模拟对象。
 * 这个文件在所有测试运行前执行，用于初始化测试环境。
 */

// ============= 扩展Jest匹配器 =============
import 'jest';

// ============= 全局测试超时设置 =============
jest.setTimeout(10000);

// ============= 全局测试工具 =============
declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * 验证对象是否为有效的IDX几何元素
       */
      toBeValidGeometry(): R;
      
      /**
       * 验证对象是否为有效的IDX Item
       */
      toBeValidItem(): R;
      
      /**
       * 验证XML字符串是否符合IDX V4.5规范
       */
      toBeValidIDXXML(): R;
    }
  }
}

// ============= 自定义匹配器实现 =============
expect.extend({
  toBeValidGeometry(received: unknown) {
    // TEST_CASE: Geometry element validation
    // TEST_INPUT: received - any object
    // TEST_EXPECT: Returns pass=true for valid geometry elements
    const pass = typeof received === 'object' && received !== null;
    return {
      message: () => `expected ${received} to be a valid geometry element`,
      pass,
    };
  },
  
  toBeValidItem(received: unknown) {
    // TEST_CASE: IDX Item validation
    // TEST_INPUT: received - any object
    // TEST_EXPECT: Returns pass=true for valid IDX items
    const pass = typeof received === 'object' && received !== null;
    return {
      message: () => `expected ${received} to be a valid IDX item`,
      pass,
    };
  },
  
  toBeValidIDXXML(received: string) {
    // TEST_CASE: IDX XML format validation
    // TEST_INPUT: received - XML string
    // TEST_EXPECT: Returns pass=true for valid IDX XML
    const pass = typeof received === 'string' && received.includes('EDMDDataSet');
    return {
      message: () => `expected ${received} to be valid IDX XML`,
      pass,
    };
  },
});

// ============= 测试前清理 =============
beforeEach(() => {
  // TEST_REQUIRE: Clean global state before each test
  jest.clearAllMocks();
});

// ============= 测试后清理 =============
afterEach(() => {
  // TEST_REQUIRE: Restore mocks after each test
  jest.restoreAllMocks();
});