/**
 * 简单Demo - 快速展示IDXPorter的基本功能
 * 
 * 运行方式: node examples/simple-demo.js
 */

const { ItemFactory } = require('../dist/core/ItemFactory');
const { ItemType, GeometryType } = require('../dist/types/enums');

console.log('╔════════════════════════════════════════╗');
console.log('║   IDXPorter - 简单Demo演示            ║');
console.log('╚════════════════════════════════════════╝\n');

// 创建工厂实例
const factory = new ItemFactory();

// 1. 创建一个简单的组件禁止区
console.log('📦 创建组件禁止区...');
const keepoutId = factory.createIdentifier('EDA', 'KEEPOUT-001', '1.0', 'A', 0);
const keepout = factory.createItem(
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

console.log(`✅ 成功创建: ${keepout.name}`);
console.log(`   类型: ${keepout.geometryType}`);
console.log(`   描述: ${keepout.description}`);
console.log(`   关联层: ${keepout.assembleToName}\n`);

// 2. 创建一个布线保留区
console.log('🔌 创建布线保留区...');
const keepinId = factory.createIdentifier('EDA', 'KEEPIN-001', '1.0', 'A', 0);
const keepin = factory.createItem(
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

console.log(`✅ 成功创建: ${keepin.name}`);
console.log(`   类型: ${keepin.geometryType}`);
console.log(`   描述: ${keepin.description}`);
console.log(`   引用名: ${keepin.referenceName}\n`);

// 3. 创建带自定义属性的禁止区
console.log('⚙️  创建带自定义属性的禁止区...');
const customId = factory.createIdentifier('EDA', 'CUSTOM-001', '1.0', 'A', 0);

// 添加自定义属性
const heightKey = factory.createPropertyKey('EDA', 'MAX_HEIGHT');
const heightProp = factory.createUserProperty(heightKey, '3.5');

const priorityKey = factory.createPropertyKey('EDA', 'PRIORITY');
const priorityProp = factory.createUserProperty(priorityKey, 'HIGH');

const customKeepout = factory.createItem(
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

console.log(`✅ 成功创建: ${customKeepout.name}`);
console.log(`   最大高度: ${heightProp.value}mm`);
console.log(`   优先级: ${priorityProp.value}\n`);

// 4. 显示统计信息
console.log('📊 统计信息:');
console.log(`   总Item数: ${factory.getItemCount()}`);
console.log(`   序列号计数: ${factory.getSequenceCount()}\n`);

// 5. 获取所有创建的Item
const allItems = factory.getAllItems();
console.log('📋 所有创建的Item列表:');
allItems.forEach((item, index) => {
  console.log(`   ${index + 1}. ${item.name} (${item.geometryType})`);
});

console.log('\n✨ Demo完成！\n');
console.log('💡 提示: 这只是基础功能演示');
console.log('   查看 examples/keepout-keepin-areas.example.ts 了解更多高级用法\n');
