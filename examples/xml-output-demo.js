/**
 * XML输出Demo - 展示生成的IDX XML文件内容
 * 
 * 运行方式: node examples/xml-output-demo.js
 */

const { IDXBuilder } = require('../dist/core/IDXBuilder');
const { ItemFactory } = require('../dist/core/ItemFactory');
const { GeometryFactory } = require('../dist/core/GeometryFactory');
const { ItemType, GeometryType, UnitLength } = require('../dist/types/enums');
const fs = require('fs');
const path = require('path');

console.log('╔════════════════════════════════════════╗');
console.log('║   IDX XML输出Demo                     ║');
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
  creatorCompany: 'MyCompany',
  creatorSystem: 'MyEDA'
});
console.log('✅ Header创建完成\n');

// 2. 创建一些Item示例
console.log('📦 创建Item示例...\n');

// 2.1 创建组件禁止区
console.log('  - 创建组件禁止区');
const keepoutId = itemFactory.createIdentifier('EDA', 'KEEPOUT-001', '1.0', 'A', 0);
const keepout = itemFactory.createItem(
  'keepout_zone_1',
  'Component Keepout Zone',
  ItemType.SINGLE,
  keepoutId,
  GeometryType.KEEPOUT_AREA_COMPONENT,
  {
    description: '此区域禁止放置组件',
    assembleToName: 'TOP'
  }
);
builder.addItem(keepout);

// 2.2 创建布线保留区
console.log('  - 创建布线保留区');
const keepinId = itemFactory.createIdentifier('EDA', 'KEEPIN-001', '1.0', 'A', 0);
const keepin = itemFactory.createItem(
  'keepin_zone_1',
  'Route Keepin Zone',
  ItemType.SINGLE,
  keepinId,
  GeometryType.KEEPIN_AREA_ROUTE,
  {
    description: '布线必须在此区域内',
    referenceName: 'ROUTE_ZONE_1'
  }
);
builder.addItem(keepin);

// 2.3 创建带自定义属性的禁止区
console.log('  - 创建带自定义属性的禁止区');
const customId = itemFactory.createIdentifier('EDA', 'CUSTOM-001', '1.0', 'A', 0);
const heightKey = itemFactory.createPropertyKey('EDA', 'MAX_HEIGHT');
const heightProp = itemFactory.createUserProperty(heightKey, '3.5');
const priorityKey = itemFactory.createPropertyKey('EDA', 'PRIORITY');
const priorityProp = itemFactory.createUserProperty(priorityKey, 'HIGH');

const customKeepout = itemFactory.createItem(
  'custom_keepout',
  'Custom Keepout with Properties',
  ItemType.SINGLE,
  customId,
  GeometryType.KEEPOUT_AREA_COMPONENT,
  {
    description: '带高度限制的禁止区',
    userProperties: [heightProp, priorityProp],
    assembleToName: 'TOP'
  }
);
builder.addItem(customKeepout);

console.log('✅ 所有Item创建完成\n');

// 3. 生成XML
console.log('🔨 生成IDX XML...');
try {
  const xmlContent = builder.toXML();
  
  // 输出到控制台
  console.log('✅ XML生成成功！\n');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('生成的XML内容:');
  console.log('═══════════════════════════════════════════════════════════\n');
  console.log(xmlContent);
  console.log('\n═══════════════════════════════════════════════════════════\n');
  
  // 保存到文件
  const outputDir = path.join(__dirname, '../output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputFile = path.join(outputDir, 'demo-output.idx');
  fs.writeFileSync(outputFile, xmlContent, 'utf8');
  
  console.log(`💾 XML已保存到文件: ${outputFile}`);
  console.log(`📊 文件大小: ${Buffer.byteLength(xmlContent, 'utf8')} bytes\n`);
  
  console.log('✨ Demo完成！');
  
} catch (error) {
  console.error('❌ 生成XML时出错:', error.message);
  if (error.stack) {
    console.error('\n错误堆栈:');
    console.error(error.stack);
  }
}
