# IDXPorter

> TypeScript library for generating IDX V4.5 protocol files for ECAD/MCAD collaboration

[![npm version](https://badge.fury.io/js/idx-porter.svg)](https://badge.fury.io/js/idx-porter)
[![Build Status](https://github.com/your-org/idx-porter/workflows/CI/badge.svg)](https://github.com/your-org/idx-porter/actions)
[![Coverage Status](https://coveralls.io/repos/github/your-org/idx-porter/badge.svg?branch=main)](https://coveralls.io/github/your-org/idx-porter?branch=main)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## 概述

IDXPorter是一个专门用于生成符合IDX V4.5版本标准的协议文件的TypeScript工具库。IDX（ECAD/MCAD Collaboration）是一种基于XML的开放数据交换标准，用于电子设计自动化（ECAD）系统和机械设计自动化（MCAD）系统之间的印刷电路板（PCB）设计数据协作。

## 特性

- ✅ **完整的IDX V4.5支持**: 支持所有标准的几何类型和Item类型
- ✅ **TypeScript优先**: 完整的类型定义和智能提示支持
- ✅ **模块化设计**: 清晰的架构和可扩展的插件系统
- ✅ **2.5D几何建模**: 支持复杂的PCB几何形状描述
- ✅ **流式API**: 直观的构建器模式API
- ✅ **灵活的XML注释**: 支持在任意位置添加单行和多行注释，提高文件可读性
- ✅ **严格验证**: 全面的数据验证和错误处理
- ✅ **高性能**: 优化的内存使用和处理速度
- ✅ **测试覆盖**: 完善的单元测试和集成测试

## 安装

```bash
npm install idx-porter
```

## 快速开始

```typescript
import { IDXBuilder, GeometryType } from 'idx-porter';

// 创建IDX构建器
const builder = new IDXBuilder();

// 构建IDX文档（支持注释）
const idxContent = await builder
  .createHeader({
    creatorCompany: 'MyCompany',
    creatorSystem: 'MyEDA',
    globalUnitLength: 'UNIT_MM'
  })
  .addComment('板框轮廓定义')
  .addBoardOutline({
    name: 'MainBoard',
    thickness: 1.6,
    outline: [
      { x: 0, y: 0 },
      { x: 50, y: 0 },
      { x: 50, y: 30 },
      { x: 0, y: 30 }
    ]
  })
  .addComment('主要组件 - 微控制器')
  .addComponent({
    refdes: 'U1',
    partNumber: 'STM32F407',
    position: { x: 25, y: 15 },
    rotation: 0,
    side: 'TOP'
  })
  .export();

// 保存到文件
import { writeFileSync } from 'fs';
writeFileSync('design.idx', idxContent);
```

## 支持的几何类型

### 板级类型
- `BOARD_OUTLINE` - 板框轮廓
- `BOARD_AREA_RIGID` - 刚性板区域
- `BOARD_AREA_FLEXIBLE` - 柔性板区域
- `BOARD_AREA_STIFFENER` - 加强区域

### 组件类型
- `COMPONENT` - 电气组件
- `COMPONENT_MECHANICAL` - 机械组件

### 孔类型
- `VIA` - 过孔
- `FILLED_VIA` - 填充过孔
- `HOLE_PLATED` - 金属化孔
- `HOLE_NON_PLATED` - 非金属化孔
- `HOLE_PLATED_MILLED` - 金属化铣削孔
- `HOLE_NONPLATED_MILLED` - 非金属化铣削孔

### 约束区域
- `KEEPOUT_AREA_COMPONENT` - 组件禁止区
- `KEEPOUT_AREA_ROUTE` - 布线禁止区
- `KEEPOUT_AREA_VIA` - 过孔禁止区
- `KEEPIN_AREA_COMPONENT` - 组件保留区
- `KEEPIN_AREA_ROUTE` - 布线保留区

### 层类型
- `LAYER_SILKSCREEN` - 丝印层
- `LAYER_SOLDERMASK` - 阻焊层
- `LAYER_SOLDERPASTE` - 锡膏层
- `LAYER_OTHERSIGNAL` - 信号层
- `LAYER_POWERORGROUND` - 电源/地层
- `LAYER_DIELECTRIC` - 介电层

## API文档

### IDXBuilder

主要的构建器类，提供流式API用于构建IDX文档。

```typescript
class IDXBuilder {
  createHeader(options: HeaderOptions): IDXBuilder;
  addLayer(layer: LayerDefinition): IDXBuilder;
  addBoardOutline(outline: BoardOutlineDefinition): IDXBuilder;
  addComponent(component: ComponentDefinition): IDXBuilder;
  addVia(via: ViaDefinition): IDXBuilder;
  addKeepoutArea(keepout: KeepoutAreaDefinition): IDXBuilder;
  export(): Promise<string>;
}
```

### GeometryFactory

几何元素工厂类，用于创建各种几何形状。

```typescript
class GeometryFactory {
  createPoint(x: number, y: number): CartesianPoint;
  createPolyLine(points: CartesianPoint[], thickness?: number): PolyLine;
  createCircleCenter(center: CartesianPoint, diameter: number): CircleCenter;
  createArc(start: CartesianPoint, end: CartesianPoint, radius: number, ccw: boolean): Arc;
  createCurveSet2d(geometry: GeometryElement, lowerBound: number, upperBound: number): CurveSet2d;
}
```

## 开发

### 环境要求

- Node.js >= 16.0.0
- TypeScript >= 5.0.0

### 开发脚本

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 运行测试
npm test

# 运行测试（监视模式）
npm run test:watch

# 生成测试覆盖率报告
npm run test:coverage

# 代码检查
npm run lint

# 代码格式化
npm run format

# 类型检查
npm run type-check
```

### 项目结构

```
idx-porter/
├── src/                    # 源代码
│   ├── core/              # 核心模块
│   ├── interfaces/        # 接口定义
│   ├── types/            # 类型定义
│   ├── models/           # 数据模型
│   ├── utils/            # 工具函数
│   ├── errors/           # 错误处理
│   └── index.ts          # 入口文件
├── tests/                 # 测试文件
├── docs/                 # 文档
└── dist/                 # 构建输出
```

## 贡献

我们欢迎社区贡献！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何参与项目开发。

### 开发流程

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 相关资源

- [IDX V4.5 规范文档](https://www.prostep.org/en/projects/ecad-mcad-collaboration/)
- [ECAD/MCAD协作最佳实践](https://www.prostep.org/en/projects/ecad-mcad-collaboration/)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)

## 支持

如果您遇到问题或有疑问，请：

1. 查看 [FAQ](docs/FAQ.md)
2. 搜索 [Issues](https://github.com/your-org/idx-porter/issues)
3. 创建新的 [Issue](https://github.com/your-org/idx-porter/issues/new)

---

Made with ❤️ by the IDXPorter Team