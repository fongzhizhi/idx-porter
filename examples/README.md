# IDXPorter 示例文档

本目录包含了IDXPorter库的各种使用示例，帮助你快速了解如何使用该库生成IDX V4.5格式的XML文件。

## 📁 示例文件列表

### 1. 简单Demo
- **文件**: `simple-demo.js` / `simple-demo.ts`
- **用途**: 快速入门示例，展示基本的Item创建功能
- **运行**: `node examples/simple-demo.js`
- **内容**:
  - 创建组件禁止区
  - 创建布线保留区
  - 创建带自定义属性的禁止区
  - 显示统计信息

### 2. XML输出Demo
- **文件**: `xml-output-demo.js`
- **用途**: 展示如何生成完整的IDX XML文档
- **运行**: `node examples/xml-output-demo.js`
- **输出**: `output/demo-output.idx`
- **内容**:
  - 创建IDX Header
  - 添加多个Item
  - 生成并保存XML文件

### 3. 完整XML Demo
- **文件**: `complete-xml-demo.js`
- **用途**: 展示包含几何形状和自定义属性的完整示例
- **运行**: `node examples/complete-xml-demo.js`
- **输出**: `output/complete-demo.idx`
- **内容**:
  - 矩形组件禁止区（带几何形状）
  - 圆形过孔禁止区（带几何形状）
  - 布线保留区（带自定义属性）
  - 热禁止区（带Z轴高度限制）
  - 测试点保留区
  - 自定义禁止区

### 4. 禁止/保留区域完整示例
- **文件**: `keepout-keepin-areas.example.js` / `keepout-keepin-areas.example.ts`
- **用途**: 展示所有类型的禁止区和保留区
- **运行**: `node examples/keepout-keepin-areas.example.js`
- **内容**:
  - 6种禁止区类型（组件、布线、过孔、测试点、热、其他）
  - 6种保留区类型（组件、布线、过孔、测试点、其他）
  - 带Z轴高度范围的禁止区
  - 带约束类型的保留区
  - 带形状引用的禁止区

## 🚀 快速开始

### 运行所有示例

```bash
# 简单Demo
node examples/simple-demo.js

# XML输出Demo
node examples/xml-output-demo.js

# 完整XML Demo
node examples/complete-xml-demo.js

# 禁止/保留区域示例
node examples/keepout-keepin-areas.example.js
```

### 查看生成的XML文件

生成的IDX文件保存在 `output/` 目录下：
- `output/demo-output.idx` - 基础XML输出
- `output/complete-demo.idx` - 完整XML输出

你可以用任何文本编辑器打开这些文件查看内容。

## 📊 生成的XML结构

生成的IDX XML文件符合IDX V4.5标准，包含以下主要部分：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<foundation:EDMDDataSet>
  <!-- 文档头部 -->
  <foundation:Header>
    <foundation:CreatorCompany>...</foundation:CreatorCompany>
    <foundation:CreatorSystem>...</foundation:CreatorSystem>
    <foundation:CreationDateTime>...</foundation:CreationDateTime>
    <foundation:GlobalUnitLength>UNIT_MM</foundation:GlobalUnitLength>
  </foundation:Header>
  
  <!-- 文档主体 -->
  <foundation:Body/>
  
  <!-- Item列表 -->
  <foundation:Item id="..." itemType="..." geometryType="...">
    <foundation:Name>...</foundation:Name>
    <foundation:Description>...</foundation:Description>
    <!-- 可选的几何形状、自定义属性等 -->
  </foundation:Item>
  
  <!-- 处理指令 -->
  <foundation:ProcessInstruction>
    <foundation:SendInformation/>
  </foundation:ProcessInstruction>
</foundation:EDMDDataSet>
```

## 🎯 支持的几何类型

### 禁止区域 (KEEPOUT_AREA)
- `KEEPOUT_AREA_COMPONENT` - 组件禁止区
- `KEEPOUT_AREA_ROUTE` - 布线禁止区
- `KEEPOUT_AREA_VIA` - 过孔禁止区
- `KEEPOUT_AREA_TESTPOINT` - 测试点禁止区
- `KEEPOUT_AREA_THERMAL` - 热禁止区
- `KEEPOUT_AREA_OTHER` - 其他类型禁止区

### 保留区域 (KEEPIN_AREA)
- `KEEPIN_AREA_COMPONENT` - 组件保留区
- `KEEPIN_AREA_ROUTE` - 布线保留区
- `KEEPIN_AREA_VIA` - 过孔保留区
- `KEEPIN_AREA_TESTPOINT` - 测试点保留区
- `KEEPIN_AREA_OTHER` - 其他类型保留区

## 💡 使用技巧

### 1. 创建带几何形状的Item

```javascript
const geoFactory = new GeometryFactory();

// 创建矩形
const p1 = geoFactory.createPoint(0, 0);
const p2 = geoFactory.createPoint(10, 0);
const p3 = geoFactory.createPoint(10, 10);
const p4 = geoFactory.createPoint(0, 10);
const polyline = geoFactory.createPolyLine([p1, p2, p3, p4, p1], 0.2);
const curveSet = geoFactory.createCurveSet2d(polyline, 0, 1.6);

// 创建Item并关联几何形状
const item = itemFactory.createItem(
  'my_item',
  'My Item',
  ItemType.SINGLE,
  identifier,
  GeometryType.KEEPOUT_AREA_COMPONENT,
  { shape: curveSet }
);
```

### 2. 添加自定义属性

```javascript
// 创建属性键
const heightKey = itemFactory.createPropertyKey('EDA', 'MAX_HEIGHT');
// 创建属性值
const heightProp = itemFactory.createUserProperty(heightKey, '3.5');

// 创建Item时添加属性
const item = itemFactory.createItem(
  'my_item',
  'My Item',
  ItemType.SINGLE,
  identifier,
  GeometryType.KEEPOUT_AREA_COMPONENT,
  { userProperties: [heightProp] }
);
```

### 3. 生成并保存XML

```javascript
const builder = new IDXBuilder();

builder
  .createHeader({
    globalUnitLength: UnitLength.UNIT_MM,
    creatorCompany: 'MyCompany',
    creatorSystem: 'MyEDA'
  })
  .addItem(item1)
  .addItem(item2);

// 生成XML字符串
const xmlContent = builder.toXML();

// 保存到文件
fs.writeFileSync('output.idx', xmlContent, 'utf8');
```

## 🔍 验证XML输出

生成的XML文件可以通过以下方式验证：

1. **XML格式验证**: 使用任何XML验证工具检查格式是否正确
2. **IDX标准验证**: 确认命名空间和元素符合IDX V4.5标准
3. **导入测试**: 尝试将生成的文件导入到支持IDX的ECAD/MCAD工具中

## 📚 更多资源

- [IDX V4.5 规范文档](https://www.prostep.org/en/projects/ecad-mcad-collaboration/)
- [项目README](../README.md)
- [API文档](../docs/)

## ❓ 常见问题

### Q: 为什么有些属性没有出现在XML中？
A: 某些可选属性（如几何形状、自定义属性等）只有在明确设置时才会出现在XML中。

### Q: 如何添加更复杂的几何形状？
A: 使用GeometryFactory创建各种几何元素（点、线、圆、弧等），然后组合成CurveSet2d。

### Q: 生成的XML文件可以直接用于生产吗？
A: 生成的XML符合IDX V4.5标准，但建议在实际使用前进行充分测试和验证。

## 🤝 贡献

如果你有新的示例想法或发现问题，欢迎提交Issue或Pull Request！
