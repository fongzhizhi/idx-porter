/**
 * 测试辅助工具
 * 
 * @description
 * 提供测试中常用的辅助函数和模拟数据，提高测试代码的复用性和可读性。
 */

/**
 * 创建测试用的笛卡尔坐标点
 * 
 * @param x - X坐标值，默认为0
 * @param y - Y坐标值，默认为0
 * @returns 测试用的坐标点对象
 * 
 * @testCase Create point at origin
 * @testInput x=0, y=0
 * @testExpected Returns point with id="point_0_0"
 */
export function createTestPoint(x: number = 0, y: number = 0): any {
  return {
    id: `point_${x}_${y}`,
    x,
    y,
  };
}

/**
 * 创建测试用的多段线
 * 
 * @param points - 点坐标数组
 * @returns 测试用的多段线对象
 * 
 * @testCase Create rectangular polyline
 * @testInput points=[{x:0,y:0}, {x:10,y:0}, {x:10,y:10}, {x:0,y:10}]
 * @testExpected Returns polyline with 4 points and closed=true
 */
export function createTestPolyLine(points: Array<{ x: number; y: number }>): any {
  return {
    id: 'test_polyline',
    points: points.map((p, i) => ({ ...p, id: `point_${i}` })),
    thickness: 0,
    closed: true,
  };
}

/**
 * 创建测试用的圆形
 * 
 * @param centerX - 圆心X坐标，默认为0
 * @param centerY - 圆心Y坐标，默认为0
 * @param diameter - 直径，默认为10
 * @returns 测试用的圆形对象
 * 
 * @testCase Create circle at origin
 * @testInput centerX=0, centerY=0, diameter=10
 * @testExpected Returns circle with center at (0,0) and diameter=10
 */
export function createTestCircle(centerX: number = 0, centerY: number = 0, diameter: number = 10): any {
  return {
    id: 'test_circle',
    centerPoint: createTestPoint(centerX, centerY),
    diameter,
  };
}

/**
 * 创建测试用的Item标识符
 * 
 * @param sequence - 序列号，默认为0
 * @returns 测试用的标识符对象
 * 
 * @testCase Create identifier with sequence
 * @testInput sequence=5
 * @testExpected Returns identifier with number="TEST_5" and sequence=5
 */
export function createTestIdentifier(sequence: number = 0): any {
  return {
    systemScope: 'ECADSYSTEM',
    number: `TEST_${sequence}`,
    version: '1',
    revision: '0',
    sequence,
  };
}

/**
 * 创建测试用的用户属性
 * 
 * @param name - 属性名称
 * @param value - 属性值
 * @returns 测试用的用户属性对象
 * 
 * @testCase Create user property
 * @testInput name="THICKNESS", value="1.6"
 * @testExpected Returns property with correct key-value structure
 */
export function createTestUserProperty(name: string, value: string): any {
  return {
    key: {
      systemScope: 'ECADSYSTEM',
      objectName: name,
    },
    value,
  };
}

/**
 * 验证XML字符串的基本格式
 * 
 * @param xml - 待验证的XML字符串
 * @returns 是否为有效的基本XML格式
 * 
 * @testCase Validate basic XML format
 * @testInput xml='<?xml version="1.0"?><EDMDDataSet></EDMDDataSet>'
 * @testExpected Returns true
 */
export function validateBasicXMLFormat(xml: string): boolean {
  // TEST_CASE: 基本XML格式验证
  return xml.includes('<?xml') && xml.includes('EDMDDataSet');
}

/**
 * 模拟异步操作的延迟
 * 
 * @param ms - 延迟毫秒数
 * @returns Promise，在指定时间后resolve
 * 
 * @testCase Async delay simulation
 * @testInput ms=100
 * @testExpected Promise resolves after 100ms
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}