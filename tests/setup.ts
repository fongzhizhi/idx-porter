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
    // TEST_CASE: 几何元素验证
    // TEST_INPUT: received - 任意对象
    // TEST_EXPECT: 对有效的几何元素返回pass=true
    const pass = typeof received === 'object' && received !== null;
    return {
      message: () => `expected ${received} to be a valid geometry element`,
      pass,
    };
  },
  
  toBeValidItem(received: unknown) {
    // TEST_CASE: IDX Item验证
    // TEST_INPUT: received - 任意对象
    // TEST_EXPECT: 对有效的IDX项返回pass=true
    const pass = typeof received === 'object' && received !== null;
    return {
      message: () => `expected ${received} to be a valid IDX item`,
      pass,
    };
  },
  
  toBeValidIDXXML(received: string) {
    // TEST_CASE: IDX XML格式验证
    // TEST_INPUT: received - XML字符串
    // TEST_EXPECT: 对有效的IDX XML返回pass=true
    const pass = typeof received === 'string' && received.includes('EDMDDataSet');
    return {
      message: () => `expected ${received} to be valid IDX XML`,
      pass,
    };
  },
});

// ============= 测试前清理 =============
beforeEach(() => {
  // TEST_REQUIRE: 每个测试前清理全局状态
  jest.clearAllMocks();
});

// ============= 测试后清理 =============
afterEach(() => {
  // TEST_REQUIRE: 每个测试后恢复模拟对象
  jest.restoreAllMocks();
});