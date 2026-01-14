# 禁止区域和保留区域使用指南

## 概述

IDXPorter支持创建各种类型的禁止区域（Keepout Areas）和保留区域（Keepin Areas），用于定义PCB设计中的约束和限制区域。这些区域帮助EDA和MCAD软件之间协调设计约束。

## 禁止区域类型（Keepout Areas）

禁止区域定义了不允许放置特定元素的区域。

### 支持的禁止区域类型

| 类型 | GeometryType | 说明 |
|------|--------------|------|
| 组件禁止区 | `KEEPOUT_AREA_COMPONENT` | 不允许放置组件的区域 |
| 布线禁止区 | `KEEPOUT_AREA_ROUTE` | 不允许布线的区域 |
| 过孔禁止区 | `KEEPOUT_AREA_VIA` | 不允许放置过孔的区域 |
| 测试点禁止区 | `KEEPOUT_AREA_TESTPOINT` | 不允许放置测试点的区域 |
| 热禁止区 | `KEEPOUT_AREA_THERMAL` | 高温区域，不允许放置敏感组件 |
| 其他禁止区 | `KEEPOUT_AREA_OTHER` | 自定义类型的禁止区域 |

### 创建禁止区域示例

```typescript
import { ItemFactory } from 'idx-porter';
import { ItemType, GeometryType } from 'idx-porter';

const factory = new ItemFactory();

// 创建组件禁止区
const identifier = factory.createIdentifier('EDA', 'KEEPOUT-001', '1.0', 'A', 1);
const keepout = factory.createItem(
  'keepout1',
  'Component Keepout',
  ItemType.SINGLE,
  identifier,
  GeometryType.KEEPOUT_AREA_COMPONENT,
  {
    description: 'No components allowed in this area',
    assembleToName: 'TOP'
  }
);
```

## 保留区域类型（Keepin Areas）

保留区域定义了必须放置特定元素的区域。

### 支持的保留区域类型

| 类型 | GeometryType | 说明 |
|------|--------------|------|
| 组件保留区 | `KEEPIN_AREA_COMPONENT` | 组件必须放置在此区域内 |
| 布线保留区 | `KEEPIN_AREA_ROUTE` | 布线必须在此区域内 |
| 过孔保留区 | `KEEPIN_AREA_VIA` | 过孔必须放置在此区域内 |
| 测试点保留区 | `KEEPIN_AREA_TESTPOINT` | 测试点必须放置在此区域内 |
| 其他保留区 | `KEEPIN_AREA_OTHER` | 自定义类型的保留区域 |

### 创建保留区域示例

```typescript
// 创建组件保留区
const identifier = factory.createIdentifier('EDA', 'KEEPIN-001', '1.0', 'A', 1);
const keepin = factory.createItem(
  'keepin1',
  'Component Keepin',
  ItemType.SINGLE,
  identifier,
  GeometryType.KEEPIN_AREA_COMPONENT,
  {
    description: 'Components must be placed in this area',
    assembleToName: 'TOP'
  }
);
```

## 高级功能

### 1. Z轴高度范围

通过用户属性定义禁止区域或保留区域的Z轴高度范围：

```typescript
const lowerBoundKey = factory.createPropertyKey('EDA', 'LOWER_BOUND');
const upperBoundKey = factory.createPropertyKey('EDA', 'UPPER_BOUND');
const lowerBoundProp = factory.createUserProperty(lowerBoundKey, '0.0');
const upperBoundProp = factory.createUserProperty(upperBoundKey, '5.0');

const identifier = factory.createIdentifier('EDA', 'KEEPOUT-002', '1.0', 'A', 2);
const keepout = factory.createItem(
  'keepout2',
  'Height Limited Keepout',
  ItemType.SINGLE,
  identifier,
  GeometryType.KEEPOUT_AREA_COMPONENT,
  {
    description: 'Component keepout with height restriction',
    userProperties: [lowerBoundProp, upperBoundProp],
    assembleToName: 'TOP'
  }
);
```

### 2. 约束类型信息

为保留区域添加约束类型信息：

```typescript
const constraintTypeKey = factory.createPropertyKey('EDA', 'CONSTRAINT_TYPE');
const constraintTypeProp = factory.createUserProperty(constraintTypeKey, 'MANDATORY');

const identifier = factory.createIdentifier('EDA', 'KEEPIN-002', '1.0', 'A', 2);
const keepin = factory.createItem(
  'keepin2',
  'Mandatory Keepin',
  ItemType.SINGLE,
  identifier,
  GeometryType.KEEPIN_AREA_COMPONENT,
  {
    description: 'Mandatory component placement area',
    userProperties: [constraintTypeProp],
    assembleToName: 'TOP'
  }
);
```

### 3. 层关联（AssembleToName）

使用`assembleToName`属性将禁止区域或保留区域关联到特定的层或表面：

```typescript
// 关联到TOP层
const topKeepout = factory.createItem(
  'keepout3',
  'Top Layer Keepout',
  ItemType.SINGLE,
  identifier,
  GeometryType.KEEPOUT_AREA_COMPONENT,
  {
    assembleToName: 'TOP'
  }
);

// 关联到BOTTOM层
const bottomKeepout = factory.createItem(
  'keepout4',
  'Bottom Layer Keepout',
  ItemType.SINGLE,
  identifier,
  GeometryType.KEEPOUT_AREA_ROUTE,
  {
    assembleToName: 'BOTTOM'
  }
);

// 关联到特定信号层
const signalKeepout = factory.createItem(
  'keepout5',
  'Signal Layer Keepout',
  ItemType.SINGLE,
  identifier,
  GeometryType.KEEPOUT_AREA_VIA,
  {
    assembleToName: 'SIGNAL_L1'
  }
);
```

### 4. 形状引用

将禁止区域或保留区域关联到特定的几何形状：

```typescript
const identifier = factory.createIdentifier('EDA', 'KEEPOUT-003', '1.0', 'A', 3);
const keepout = factory.createItem(
  'keepout6',
  'Shaped Keepout',
  ItemType.SINGLE,
  identifier,
  GeometryType.KEEPOUT_AREA_COMPONENT,
  {
    description: 'Keepout area with complex shape',
    shape: 'shape_polygon_001',
    assembleToName: 'TOP',
    referenceName: 'SHAPED_KEEPOUT_1'
  }
);
```

### 5. 引用名称和描述

为禁止区域或保留区域添加引用名称和详细描述：

```typescript
const identifier = factory.createIdentifier('EDA', 'KEEPOUT-004', '1.0', 'A', 4);
const keepout = factory.createItem(
  'keepout7',
  'Critical Keepout',
  ItemType.SINGLE,
  identifier,
  GeometryType.KEEPOUT_AREA_THERMAL,
  {
    description: 'High temperature area - no components allowed',
    referenceName: 'THERMAL_ZONE_1'
  }
);
```

## 最佳实践

### 1. 命名规范

- 使用清晰的命名约定，如 `KEEPOUT-<TYPE>-<NUMBER>` 或 `KEEPIN-<TYPE>-<NUMBER>`
- 为Item提供有意义的名称和描述
- 使用referenceName提供简化的引用标识

### 2. 层关联

- 始终使用`assembleToName`明确指定禁止区域或保留区域所属的层
- 对于双面板，区分TOP和BOTTOM层的约束
- 对于多层板，使用具体的层名称（如SIGNAL_L1, SIGNAL_L2等）

### 3. 高度范围

- 对于有高度限制的区域，使用LOWER_BOUND和UPPER_BOUND用户属性
- 确保高度值使用正确的单位（通常为毫米）
- 考虑组件高度和间隙要求

### 4. 约束类型

- 使用CONSTRAINT_TYPE用户属性明确约束的强制性
- 常见值：MANDATORY（强制）、RECOMMENDED（推荐）、OPTIONAL（可选）

### 5. 几何形状

- 为复杂的禁止区域或保留区域创建独立的几何形状
- 使用`shape`属性引用几何形状ID
- 确保几何形状在使用前已经定义

## 完整示例

查看 `examples/keepout-keepin-areas.example.ts` 获取完整的使用示例。

## 相关文档

- [Item基础概念](./items.md)
- [几何形状定义](./geometry.md)
- [层叠结构](./layers.md)
- [用户属性](./user-properties.md)

## IDX V4.5规范参考

禁止区域和保留区域的实现遵循IDX V4.5规范中关于约束区域的定义。更多详细信息请参考IDX V4.5官方文档。
