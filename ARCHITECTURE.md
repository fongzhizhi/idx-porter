# IDXPorter 架构说明

## 几何计算库

### 技术选型

IDXPorter 使用 **[@flatten-js/core](https://github.com/alexbol99/flatten-js)** (MIT协议) 作为底层2D几何计算引擎。

### 为什么选择 @flatten-js/core？

| 特性 | 说明 |
|------|------|
| **协议** | MIT - 商业友好，无使用限制 |
| **大小** | 1.2MB - 轻量级，专注2D几何 |
| **功能** | 完整的2D几何支持（点、线、圆、弧、多边形） |
| **性能** | 高性能算法（距离、相交、边界框） |
| **类型** | 原生TypeScript支持 |
| **成熟度** | 1.1k+ stars，生产环境验证 |
| **依赖** | 仅依赖 @flatten-js/interval-tree |

### 架构模式：适配器模式

```
┌─────────────────────────────────────────┐
│          用户代码 (EDA软件)              │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────┐
│   src/models/geometry/ (适配器层)       │
│   ┌─────────────────────────────────┐   │
│   │ • ID管理 (geom_point_1)        │   │
│   │ • 业务验证 (弦长检查)          │   │
│   │ • JSON序列化 (toJSON)          │   │
│   │ • IDX特定方法 (toString)       │   │
│   └─────────────────────────────────┘   │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────┐
│   @flatten-js/core (几何计算引擎)       │
│   ┌─────────────────────────────────┐   │
│   │ • Point, Circle, Arc, Polygon  │   │
│   │ • distanceTo() 距离计算        │   │
│   │ • intersect() 相交检测         │   │
│   │ • box 边界框计算               │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### 设计优势

1. **职责分离**
   - IDX业务逻辑（ID、验证、序列化）在适配器层
   - 几何计算（距离、相交、边界）由 flatten-js 处理

2. **类型安全**
   - 保持IDX特定的接口定义
   - 利用TypeScript的类型系统

3. **易于扩展**
   - 可以使用 flatten-js 的高级功能
   - 布尔运算、相交检测等

4. **易于维护**
   - 几何算法由成熟库维护
   - 减少自己实现的bug风险

5. **性能优秀**
   - 优化的几何算法
   - 高效的数据结构

## 代码示例

### CartesianPoint 适配器

```typescript
import * as Flatten from '@flatten-js/core';

export class CartesianPoint {
  public readonly flattenPoint: Flatten.Point;

  constructor(
    public readonly id: string,      // IDX特定：ID管理
    public readonly x: number,
    public readonly y: number
  ) {
    // 创建底层几何对象
    this.flattenPoint = new Flatten.Point(x, y);
  }

  // 使用 flatten-js 的高性能计算
  distanceTo(other: CartesianPoint): number {
    return this.flattenPoint.distanceTo(other.flattenPoint)[0];
  }

  // IDX特定：JSON序列化
  toJSON() {
    return { id: this.id, x: this.x, y: this.y };
  }
}
```

### PolyLine 适配器

```typescript
export class PolyLine {
  public readonly flattenShape: Flatten.Polygon | Flatten.Segment[];

  constructor(
    public readonly id: string,
    public readonly points: CartesianPoint[],
    public readonly closed: boolean,
    public readonly thickness?: number
  ) {
    // 根据闭合状态选择合适的 flatten-js 对象
    if (closed) {
      const flattenPoints = points.map(p => p.flattenPoint);
      this.flattenShape = new Flatten.Polygon(flattenPoints);
    } else {
      this.flattenShape = [];
      for (let i = 0; i < points.length - 1; i++) {
        this.flattenShape.push(
          new Flatten.Segment(points[i].flattenPoint, points[i + 1].flattenPoint)
        );
      }
    }
  }

  // 使用 flatten-js 计算长度
  calculateLength(): number {
    if (this.closed && this.flattenShape instanceof Flatten.Polygon) {
      let length = 0;
      for (const edge of this.flattenShape.edges) {
        length += edge.length;
      }
      return length;
    }
    // ...
  }
}
```

## 依赖管理

### 运行时依赖

```json
{
  "dependencies": {
    "@flatten-js/core": "^1.6.10",  // 2D几何计算
    "tslib": "^2.8.1",               // TypeScript运行时
    "xmlbuilder2": "^3.1.1"          // XML生成
  }
}
```

### 为什么保留 src/models/geometry？

**不是重复实现，而是适配器封装**：

- ❌ **错误理解**：既然用了 flatten-js，为什么还要自己的几何类？
- ✅ **正确理解**：适配器模式，封装 flatten-js 并添加IDX特定功能

**如果直接使用 flatten-js 会有什么问题？**

```typescript
// ❌ 问题1：没有ID管理
const point = new Flatten.Point(10, 20);  // 没有 id 属性

// ❌ 问题2：没有IDX验证
const arc = new Flatten.Arc(...);  // 不会检查弦长是否超过直径

// ❌ 问题3：GeometryFactory无法工作
factory.createPoint(10, 20);  // 谁来生成和管理ID？

// ❌ 问题4：无法序列化为IDX格式
point.toJSON();  // Flatten.Point 没有这个方法
```

**使用适配器的好处**：

```typescript
// ✅ 有ID管理
const point = new CartesianPoint('geom_point_1', 10, 20);

// ✅ 有业务验证
const arc = new Arc('arc1', start, end, radius, ccw);  // 会验证弦长

// ✅ GeometryFactory正常工作
const point = factory.createPoint(10, 20);  // 自动生成ID

// ✅ 可以序列化
point.toJSON();  // { id: 'geom_point_1', x: 10, y: 20 }
```

## 总结

IDXPorter 采用**适配器模式**封装 @flatten-js/core，实现了：

1. **最佳实践**：使用成熟的几何库，避免重复造轮子
2. **业务隔离**：IDX特定逻辑与几何计算分离
3. **类型安全**：保持完整的TypeScript类型系统
4. **高性能**：利用优化的几何算法
5. **易维护**：减少自己维护几何算法的成本

这是一个经典的**适配器模式**应用案例，既利用了第三方库的优势，又保持了项目的特定需求。
