/**
 * 禁止区域和保留区域示例 (JavaScript版本)
 * 
 * 运行方式: node examples/keepout-keepin-areas.example.js
 */

const { ItemFactory } = require('../dist/core/ItemFactory');
const { ItemType, GeometryType } = require('../dist/types/enums');

// 创建ItemFactory实例
const factory = new ItemFactory();

console.log('=== 禁止区域和保留区域示例 ===\n');

// # 示例 1: 创建组件禁止区
console.log('1. 创建组件禁止区（KEEPOUT_AREA_COMPONENT）');
const componentKeepoutId = factory.createIdentifier('EDA', 'KEEPOUT-COMP-001', '1.0', 'A', 0);
const componentKeepout = factory.createItem(
  'keepout_comp_1',
  'Component Keepout Zone',
  ItemType.SINGLE,
  componentKeepoutId,
  GeometryType.KEEPOUT_AREA_COMPONENT,
  {
    description: 'No components allowed in this area',
    assembleToName: 'TOP'
  }
);
console.log(`   创建成功: ${componentKeepout.name} (${componentKeepout.geometryType})`);
console.log(`   关联层: ${componentKeepout.assembleToName}\n`);

// # 示例 2: 创建布线禁止区
console.log('2. 创建布线禁止区（KEEPOUT_AREA_ROUTE）');
const routeKeepoutId = factory.createIdentifier('EDA', 'KEEPOUT-ROUTE-001', '1.0', 'A', 0);
const routeKeepout = factory.createItem(
  'keepout_route_1',
  'Route Keepout Zone',
  ItemType.SINGLE,
  routeKeepoutId,
  GeometryType.KEEPOUT_AREA_ROUTE,
  {
    description: 'No routing allowed in this area',
    referenceName: 'ROUTE_KEEPOUT_1'
  }
);
console.log(`   创建成功: ${routeKeepout.name} (${routeKeepout.geometryType})`);
console.log(`   引用名称: ${routeKeepout.referenceName}\n`);

// # 示例 3: 创建过孔禁止区
console.log('3. 创建过孔禁止区（KEEPOUT_AREA_VIA）');
const viaKeepoutId = factory.createIdentifier('EDA', 'KEEPOUT-VIA-001', '1.0', 'A', 0);
const viaKeepout = factory.createItem(
  'keepout_via_1',
  'Via Keepout Zone',
  ItemType.SINGLE,
  viaKeepoutId,
  GeometryType.KEEPOUT_AREA_VIA,
  {
    description: 'No vias allowed in this area',
    assembleToName: 'SIGNAL_L1'
  }
);
console.log(`   创建成功: ${viaKeepout.name} (${viaKeepout.geometryType})`);
console.log(`   关联层: ${viaKeepout.assembleToName}\n`);

// # 示例 4: 创建测试点禁止区
console.log('4. 创建测试点禁止区（KEEPOUT_AREA_TESTPOINT）');
const testpointKeepoutId = factory.createIdentifier('EDA', 'KEEPOUT-TP-001', '1.0', 'A', 0);
const testpointKeepout = factory.createItem(
  'keepout_tp_1',
  'Testpoint Keepout Zone',
  ItemType.SINGLE,
  testpointKeepoutId,
  GeometryType.KEEPOUT_AREA_TESTPOINT,
  {
    description: 'No test points allowed in this area'
  }
);
console.log(`   创建成功: ${testpointKeepout.name} (${testpointKeepout.geometryType})\n`);

// # 示例 5: 创建热禁止区
console.log('5. 创建热禁止区（KEEPOUT_AREA_THERMAL）');
const thermalKeepoutId = factory.createIdentifier('EDA', 'KEEPOUT-THERMAL-001', '1.0', 'A', 0);
const thermalKeepout = factory.createItem(
  'keepout_thermal_1',
  'Thermal Keepout Zone',
  ItemType.SINGLE,
  thermalKeepoutId,
  GeometryType.KEEPOUT_AREA_THERMAL,
  {
    description: 'High temperature area - sensitive components not allowed'
  }
);
console.log(`   创建成功: ${thermalKeepout.name} (${thermalKeepout.geometryType})\n`);

// # 示例 6: 创建其他类型禁止区
console.log('6. 创建其他类型禁止区（KEEPOUT_AREA_OTHER）');
const otherKeepoutId = factory.createIdentifier('EDA', 'KEEPOUT-OTHER-001', '1.0', 'A', 0);
const otherKeepout = factory.createItem(
  'keepout_other_1',
  'Other Keepout Zone',
  ItemType.SINGLE,
  otherKeepoutId,
  GeometryType.KEEPOUT_AREA_OTHER,
  {
    description: 'Custom keepout area'
  }
);
console.log(`   创建成功: ${otherKeepout.name} (${otherKeepout.geometryType})\n`);

// # 示例 7: 创建带Z轴高度范围的禁止区
console.log('7. 创建带Z轴高度范围的禁止区');
const heightKeepoutId = factory.createIdentifier('EDA', 'KEEPOUT-HEIGHT-001', '1.0', 'A', 0);

const lowerBoundKey = factory.createPropertyKey('EDA', 'LOWER_BOUND');
const upperBoundKey = factory.createPropertyKey('EDA', 'UPPER_BOUND');
const lowerBoundProp = factory.createUserProperty(lowerBoundKey, '0.0');
const upperBoundProp = factory.createUserProperty(upperBoundKey, '5.0');

const heightKeepout = factory.createItem(
  'keepout_height_1',
  'Height Limited Keepout',
  ItemType.SINGLE,
  heightKeepoutId,
  GeometryType.KEEPOUT_AREA_COMPONENT,
  {
    description: 'Component keepout with height restriction',
    userProperties: [lowerBoundProp, upperBoundProp],
    assembleToName: 'TOP'
  }
);
console.log(`   创建成功: ${heightKeepout.name}`);
console.log(`   Z轴范围: ${lowerBoundProp.value}mm - ${upperBoundProp.value}mm\n`);

// # 示例 8: 创建组件保留区
console.log('8. 创建组件保留区（KEEPIN_AREA_COMPONENT）');
const componentKeepinId = factory.createIdentifier('EDA', 'KEEPIN-COMP-001', '1.0', 'A', 0);
const componentKeepin = factory.createItem(
  'keepin_comp_1',
  'Component Keepin Zone',
  ItemType.SINGLE,
  componentKeepinId,
  GeometryType.KEEPIN_AREA_COMPONENT,
  {
    description: 'Components must be placed in this area',
    assembleToName: 'TOP'
  }
);
console.log(`   创建成功: ${componentKeepin.name} (${componentKeepin.geometryType})`);
console.log(`   关联层: ${componentKeepin.assembleToName}\n`);

// # 示例 9: 创建布线保留区
console.log('9. 创建布线保留区（KEEPIN_AREA_ROUTE）');
const routeKeepinId = factory.createIdentifier('EDA', 'KEEPIN-ROUTE-001', '1.0', 'A', 0);
const routeKeepin = factory.createItem(
  'keepin_route_1',
  'Route Keepin Zone',
  ItemType.SINGLE,
  routeKeepinId,
  GeometryType.KEEPIN_AREA_ROUTE,
  {
    description: 'Routing must stay within this area',
    referenceName: 'ROUTE_KEEPIN_1'
  }
);
console.log(`   创建成功: ${routeKeepin.name} (${routeKeepin.geometryType})`);
console.log(`   引用名称: ${routeKeepin.referenceName}\n`);

// # 示例 10: 创建过孔保留区
console.log('10. 创建过孔保留区（KEEPIN_AREA_VIA）');
const viaKeepinId = factory.createIdentifier('EDA', 'KEEPIN-VIA-001', '1.0', 'A', 0);
const viaKeepin = factory.createItem(
  'keepin_via_1',
  'Via Keepin Zone',
  ItemType.SINGLE,
  viaKeepinId,
  GeometryType.KEEPIN_AREA_VIA,
  {
    description: 'Vias must be placed in this area'
  }
);
console.log(`   创建成功: ${viaKeepin.name} (${viaKeepin.geometryType})\n`);

// # 示例 11: 创建测试点保留区
console.log('11. 创建测试点保留区（KEEPIN_AREA_TESTPOINT）');
const testpointKeepinId = factory.createIdentifier('EDA', 'KEEPIN-TP-001', '1.0', 'A', 0);
const testpointKeepin = factory.createItem(
  'keepin_tp_1',
  'Testpoint Keepin Zone',
  ItemType.SINGLE,
  testpointKeepinId,
  GeometryType.KEEPIN_AREA_TESTPOINT,
  {
    description: 'Test points must be placed in this area'
  }
);
console.log(`   创建成功: ${testpointKeepin.name} (${testpointKeepin.geometryType})\n`);

// # 示例 12: 创建其他类型保留区
console.log('12. 创建其他类型保留区（KEEPIN_AREA_OTHER）');
const otherKeepinId = factory.createIdentifier('EDA', 'KEEPIN-OTHER-001', '1.0', 'A', 0);
const otherKeepin = factory.createItem(
  'keepin_other_1',
  'Other Keepin Zone',
  ItemType.SINGLE,
  otherKeepinId,
  GeometryType.KEEPIN_AREA_OTHER,
  {
    description: 'Custom keepin area'
  }
);
console.log(`   创建成功: ${otherKeepin.name} (${otherKeepin.geometryType})\n`);

// # 示例 13: 创建带约束类型的保留区
console.log('13. 创建带约束类型的保留区');
const constraintKeepinId = factory.createIdentifier('EDA', 'KEEPIN-CONSTRAINT-001', '1.0', 'A', 0);

const constraintTypeKey = factory.createPropertyKey('EDA', 'CONSTRAINT_TYPE');
const constraintTypeProp = factory.createUserProperty(constraintTypeKey, 'MANDATORY');

const constraintKeepin = factory.createItem(
  'keepin_constraint_1',
  'Mandatory Keepin Zone',
  ItemType.SINGLE,
  constraintKeepinId,
  GeometryType.KEEPIN_AREA_COMPONENT,
  {
    description: 'Mandatory component placement area',
    userProperties: [constraintTypeProp],
    assembleToName: 'TOP'
  }
);
console.log(`   创建成功: ${constraintKeepin.name}`);
console.log(`   约束类型: ${constraintTypeProp.value}\n`);

// # 示例 14: 创建带形状引用的禁止区
console.log('14. 创建带形状引用的禁止区');
const shapeKeepoutId = factory.createIdentifier('EDA', 'KEEPOUT-SHAPE-001', '1.0', 'A', 0);
const shapeKeepout = factory.createItem(
  'keepout_shape_1',
  'Shaped Keepout Zone',
  ItemType.SINGLE,
  shapeKeepoutId,
  GeometryType.KEEPOUT_AREA_COMPONENT,
  {
    description: 'Keepout area with complex shape',
    shape: 'shape_polygon_001',
    assembleToName: 'TOP',
    referenceName: 'SHAPED_KEEPOUT_1'
  }
);
console.log(`   创建成功: ${shapeKeepout.name}`);
console.log(`   形状引用: ${shapeKeepout.shape}`);
console.log(`   引用名称: ${shapeKeepout.referenceName}\n`);

// 统计信息
console.log('=== 统计信息 ===');
console.log(`总共创建的Item数量: ${factory.getItemCount()}`);
console.log(`序列号计数: ${factory.getSequenceCount()}`);

// 获取所有Item并按类型分组
const allItems = factory.getAllItems();
const keepoutItems = allItems.filter(item => 
  item.geometryType?.toString().startsWith('KEEPOUT_AREA')
);
const keepinItems = allItems.filter(item => 
  item.geometryType?.toString().startsWith('KEEPIN_AREA')
);

console.log(`禁止区域数量: ${keepoutItems.length}`);
console.log(`保留区域数量: ${keepinItems.length}`);

console.log('\n=== 示例完成 ===');
