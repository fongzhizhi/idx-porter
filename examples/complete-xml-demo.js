/**
 * 完整XML输出Demo - 展示包含几何形状的完整IDX文档
 * 
 * 运行方式: node examples/complete-xml-demo.js
 */

const { IDXBuilder } = require('../dist/core/IDXBuilder');
const { ItemFactory } = require('../dist/core/ItemFactory');
const { GeometryFactory } = require('../dist/core/GeometryFactory');
const { ItemType, GeometryType, UnitLength } = require('../dist/types/enums');
const fs = require('fs');
const path = require('path');

console.log('╔════════════════════════════════════════╗');
console.log('║   完整IDX XML输出Demo                 ║');
console.log('╚════════════════════════════════════════╝\n');

// 创建工厂实例
const itemFactory = new ItemFactory();
const geoFactory = new GeometryFactory();

// 创建IDX构建器
const builder = new IDXBuilder();

// 1. 创建Header
console.log('📝 创建IDX Header...');
builder.createHeader({
  globalUnitLength: UnitLength.UNIT_MM,
  creatorCompany: 'DemoCompany',
  creatorSystem: 'DemoEDA v1.0'
});
console.log('✅ Header创建完成\n');

console.log('📦 创建各种类型的Item...\n');

// 2. 创建带几何形状的组件禁止区
console.log('  1. 创建矩形组件禁止区（带几何形状）');
const rect1 = geoFactory.createPoint(10, 10);
const rect2 = geoFactory.createPoint(30, 10);
const rect3 = geoFactory.createPoint(30, 20);
const rect4 = geoFactory.createPoint(10, 20);
const rectPolyline = geoFactory.createPolyLine([rect1, rect2, rect3, rect4, rect1], 0.2);
const rectCurveSet = geoFactory.createCurveSet2d(rectPolyline, 0, 1.6);

const keepout1Id = itemFactory.createIdentifier('EDA', 'KEEPOUT-RECT-001', '1.0', 'A', 0);
const keepout1 = itemFactory.createItem(
  'keepout_rect_1',
  'Rectangular Component Keepout',
  ItemType.SINGLE,
  keepout1Id,
  GeometryType.KEEPOUT_AREA_COMPONENT,
  {
    description: '矩形组件禁止区 (10x10mm)',
    assembleToName: 'TOP',
    shape: rectCurveSet
  }
);
builder.addItem(keepout1);

// 3. 创建圆形过孔禁止区
console.log('  2. 创建圆形过孔禁止区');
const circleCenter = geoFactory.createPoint(50, 50);
const circle = geoFactory.createCircleCenter(circleCenter, 5.0);
const circleCurveSet = geoFactory.createCurveSet2d(circle, 0, 1.6);

const viaKeepoutId = itemFactory.createIdentifier('EDA', 'KEEPOUT-VIA-001', '1.0', 'A', 0);
const viaKeepout = itemFactory.createItem(
  'keepout_via_circle',
  'Circular Via Keepout',
  ItemType.SINGLE,
  viaKeepoutId,
  GeometryType.KEEPOUT_AREA_VIA,
  {
    description: '圆形过孔禁止区 (直径5mm)',
    assembleToName: 'ALL_LAYERS',
    shape: circleCurveSet
  }
);
builder.addItem(viaKeepout);

// 4. 创建布线保留区（带自定义属性）
console.log('  3. 创建布线保留区（带自定义属性）');
const keepinId = itemFactory.createIdentifier('EDA', 'KEEPIN-ROUTE-001', '1.0', 'A', 0);

const widthKey = itemFactory.createPropertyKey('EDA', 'MIN_TRACE_WIDTH');
const widthProp = itemFactory.createUserProperty(widthKey, '0.2');
const clearanceKey = itemFactory.createPropertyKey('EDA', 'MIN_CLEARANCE');
const clearanceProp = itemFactory.createUserProperty(clearanceKey, '0.15');

const routeKeepin = itemFactory.createItem(
  'keepin_route_1',
  'High-Speed Route Keepin Zone',
  ItemType.SINGLE,
  keepinId,
  GeometryType.KEEPIN_AREA_ROUTE,
  {
    description: '高速信号布线保留区',
    referenceName: 'HS_ROUTE_ZONE',
    userProperties: [widthProp, clearanceProp]
  }
);
builder.addItem(routeKeepin);

// 5. 创建热禁止区（带Z轴范围）
console.log('  4. 创建热禁止区（带Z轴高度限制）');
const thermalId = itemFactory.createIdentifier('EDA', 'KEEPOUT-THERMAL-001', '1.0', 'A', 0);

const lowerKey = itemFactory.createPropertyKey('EDA', 'Z_LOWER_BOUND');
const lowerProp = itemFactory.createUserProperty(lowerKey, '0.0');
const upperKey = itemFactory.createPropertyKey('EDA', 'Z_UPPER_BOUND');
const upperProp = itemFactory.createUserProperty(upperKey, '5.0');
const tempKey = itemFactory.createPropertyKey('EDA', 'MAX_TEMPERATURE');
const tempProp = itemFactory.createUserProperty(tempKey, '85');

const thermalKeepout = itemFactory.createItem(
  'keepout_thermal_1',
  'High Temperature Zone',
  ItemType.SINGLE,
  thermalId,
  GeometryType.KEEPOUT_AREA_THERMAL,
  {
    description: '高温区域 - 敏感元件禁止放置',
    assembleToName: 'TOP',
    userProperties: [lowerProp, upperProp, tempProp]
  }
);
builder.addItem(thermalKeepout);

// 6. 创建测试点保留区
console.log('  5. 创建测试点保留区');
const tpKeepinId = itemFactory.createIdentifier('EDA', 'KEEPIN-TP-001', '1.0', 'A', 0);

const tpSizeKey = itemFactory.createPropertyKey('EDA', 'TESTPOINT_SIZE');
const tpSizeProp = itemFactory.createUserProperty(tpSizeKey, '1.0');
const tpTypeKey = itemFactory.createPropertyKey('EDA', 'TESTPOINT_TYPE');
const tpTypeProp = itemFactory.createUserProperty(tpTypeKey, 'SMD');

const tpKeepin = itemFactory.createItem(
  'keepin_testpoint_1',
  'Test Point Area',
  ItemType.SINGLE,
  tpKeepinId,
  GeometryType.KEEPIN_AREA_TESTPOINT,
  {
    description: '测试点放置区域',
    assembleToName: 'TOP',
    referenceName: 'TP_ZONE_1',
    userProperties: [tpSizeProp, tpTypeProp]
  }
);
builder.addItem(tpKeepin);

// 7. 创建其他类型禁止区（自定义用途）
console.log('  6. 创建自定义禁止区');
const customId = itemFactory.createIdentifier('EDA', 'KEEPOUT-CUSTOM-001', '1.0', 'A', 0);

const purposeKey = itemFactory.createPropertyKey('EDA', 'PURPOSE');
const purposeProp = itemFactory.createUserProperty(purposeKey, 'ANTENNA_CLEARANCE');
const priorityKey = itemFactory.createPropertyKey('EDA', 'PRIORITY');
const priorityProp = itemFactory.createUserProperty(priorityKey, 'CRITICAL');

const customKeepout = itemFactory.createItem(
  'keepout_custom_1',
  'Antenna Clearance Zone',
  ItemType.SINGLE,
  customId,
  GeometryType.KEEPOUT_AREA_OTHER,
  {
    description: '天线净空区域',
    assembleToName: 'TOP',
    referenceName: 'ANTENNA_ZONE',
    userProperties: [purposeProp, priorityProp]
  }
);
builder.addItem(customKeepout);

console.log('\n✅ 所有Item创建完成\n');

// 生成XML
console.log('🔨 生成IDX XML...');
try {
  const xmlContent = builder.toXML();
  
  console.log('✅ XML生成成功！\n');
  
  // 统计信息
  const lines = xmlContent.split('\n').length;
  const size = Buffer.byteLength(xmlContent, 'utf8');
  
  console.log('📊 文档统计:');
  console.log(`   - 总行数: ${lines}`);
  console.log(`   - 文件大小: ${size} bytes (${(size / 1024).toFixed(2)} KB)`);
  console.log(`   - Item数量: 6`);
  console.log(`   - 包含几何形状: 2个`);
  console.log(`   - 自定义属性: 9个\n`);
  
  // 输出XML内容
  console.log('═══════════════════════════════════════════════════════════');
  console.log('生成的完整XML内容:');
  console.log('═══════════════════════════════════════════════════════════\n');
  console.log(xmlContent);
  console.log('\n═══════════════════════════════════════════════════════════\n');
  
  // 保存到文件
  const outputDir = path.join(__dirname, '../output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputFile = path.join(outputDir, 'complete-demo.idx');
  fs.writeFileSync(outputFile, xmlContent, 'utf8');
  
  console.log(`💾 XML已保存到文件: ${outputFile}\n`);
  console.log('✨ Demo完成！');
  console.log('\n💡 提示:');
  console.log('   - 可以用文本编辑器打开 output/complete-demo.idx 查看完整内容');
  console.log('   - 可以用XML验证工具验证文档结构');
  console.log('   - 该文件符合IDX V4.5标准\n');
  
} catch (error) {
  console.error('❌ 生成XML时出错:', error.message);
  if (error.stack) {
    console.error('\n错误堆栈:');
    console.error(error.stack);
  }
}
