# IDXPorter 需求文档

## 介绍

IDXPorter是一个基于TypeScript开发的IDX导出器工具库，专门用于生成符合IDX V4.5版本标准的协议文件。IDX（ECAD/MCAD Collaboration）是一种基于XML的开放数据交换标准，用于电子设计自动化（ECAD）系统和机械设计自动化（MCAD）系统之间的印刷电路板（PCB）设计数据协作。

该项目作为工具库供各种EDA软件使用，EDA软件通过调用IDXPorter提供的接口，完成IDX的建模和组织，最终导出IDX文件。项目采用模块化设计，文件结构清晰，符合现代TypeScript最佳实践，具有完整的类型定义和规范的代码注释。未来可能扩展IDX解析功能。

## 需求

### 需求 1

**用户故事：** 作为一个EDA软件开发者，我希望能够集成IDXPorter工具库，通过调用其接口将PCB设计数据导出为IDX V4.5格式文件，以便与机械工程师进行设计协作。

#### 验收标准

1. 当EDA软件调用IDXPorter接口时，系统应该能够生成符合IDX V4.5标准的XML文件
2. 当生成IDX文件时，系统应该包含正确的XML命名空间和头部信息（Header）
3. 当导出完成时，系统应该生成.idx扩展名的文件
4. 当使用工具库时，系统应该提供清晰的TypeScript类型定义和接口文档

### 需求 2

**用户故事：** 作为一个EDA软件开发者，我希望能够使用IDXPorter实现IDX基本结构，包括Header、Body和ProcessInstruction三个核心部分。

#### 验收标准

1. 当创建IDX文档时，系统应该提供Header部分的构建接口，包含创建者信息、时间戳和全局单位设置
2. 当组织设计数据时，系统应该提供Body部分的容器，用于存放所有设计元素
3. 当指定处理指令时，系统应该支持ProcessInstruction的定义，如SendInformation类型
4. 当构建完整文档时，系统应该确保三个部分的正确组装和XML输出

### 需求 3

**用户故事：** 作为一个EDA软件开发者，我希望能够使用IDXPorter定义2D几何形状，包括点、线、多边形等基础几何元素，支持完整的2.5D几何建模。

#### 验收标准

1. 当定义点坐标时，系统应该支持CartesianPoint的创建，包含X、Y坐标值和精确的数值类型
2. 当定义线段时，系统应该支持PolyLine的创建，包含点序列、可选的线宽属性和闭合控制
3. 当定义圆形时，系统应该支持CircleCenter（中心点+直径）和Circle3Point（三点定义）两种方式
4. 当定义圆弧时，系统应该支持Arc的创建，包含起点、终点、半径和方向信息（顺时针/逆时针）
5. 当定义复杂形状时，系统应该支持CompositeCurve、BSplineCurve和Ellipse等高级几何元素
6. 当构建2.5D几何时，系统应该支持CurveSet2d的创建，包含LowerBound/UpperBound的Z轴范围定义
7. 当处理几何布尔运算时，系统应该支持ShapeElement的Inverted属性，实现材料添加和切除操作
8. 当定义几何精度时，系统应该支持毫米单位和0.001mm的建议精度


### 需求 4

**用户故事：** 作为一个EDA软件开发者，我希望能够使用IDXPorter定义PCB层叠结构，包括各种类型的物理层和辅助层。

#### 验收标准

1. 当定义丝印层时，系统应该支持`geometryType="LAYER_SILKSCREEN"`的Item创建
2. 当定义层叠结构时，系统应该支持`geometryType="LAYER_STACKUP"`的Item创建
3. 当定义信号层时，系统应该支持`LAYER_OTHERSIGNAL`和`LAYER_POWERORGROUND`类型
4. 当定义辅助层时，系统应该支持`LAYER_SOLDERMASK`、`LAYER_SOLDERPASTE`和`LAYER_DIELECTRIC`类型
5. 当设置层属性时，系统应该包含Z坐标范围（LowerBound/UpperBound）和层类型属性

### 需求 5

**用户故事：** 作为一个EDA软件开发者，我希望能够使用IDXPorter定义PCB板框轮廓和板区域，描述板子的物理边界、形状和不同区域类型。

#### 验收标准

1. 当定义简单板框时，系统应该支持`geometryType="BOARD_OUTLINE"`的Item创建
2. 当定义刚性板区域时，系统应该支持`geometryType="BOARD_AREA_RIGID"`的Item创建
3. 当定义柔性板区域时，系统应该支持`geometryType="BOARD_AREA_FLEXIBLE"`的Item创建
4. 当定义加强区域时，系统应该支持`geometryType="BOARD_AREA_STIFFENER"`的Item创建
5. 当设置板属性时，系统应该包含板厚度属性（THICKNESS）的用户属性定义
6. 当定义板形状时，系统应该支持复杂轮廓的几何描述，包括直线、圆弧和圆形组合
7. 当设置坐标系时，系统应该使用正确的Z轴定位（底层为Z=0基准）

### 需求 6

**用户故事：** 作为一个EDA软件开发者，我希望能够使用IDXPorter定义过孔和各种孔类型，包括金属化孔、非金属化孔和铣削孔等。

#### 验收标准

1. 当定义过孔时，系统应该支持`geometryType="VIA"`的Item创建
2. 当定义填充过孔时，系统应该支持`geometryType="FILLED_VIA"`的Item创建
3. 当定义金属化孔时，系统应该支持`geometryType="HOLE_PLATED"`的Item创建
4. 当定义非金属化孔时，系统应该支持`geometryType="HOLE_NON_PLATED"`的Item创建
5. 当定义金属化铣削孔时，系统应该支持`geometryType="HOLE_PLATED_MILLED"`的Item创建
6. 当定义非金属化铣削孔时，系统应该支持`geometryType="HOLE_NONPLATED_MILLED"`的Item创建
7. 当设置孔属性时，系统应该包含孔的位置坐标和几何尺寸信息
8. 当处理铣削路径时，系统应该支持PolyLine的Thickness属性定义刀径

### 需求 7

**用户故事：** 作为一个EDA软件开发者，我希望能够使用IDXPorter定义电子组件，包括组件的位置、属性和几何信息。

#### 验收标准

1. 当定义组件时，系统应该支持`geometryType="COMPONENT"`的Item创建
2. 当设置组件属性时，系统应该包含参考标识符（REFDES）和器件编号（PARTNUM）
3. 当定义组件位置时，系统应该使用2D变换矩阵表示位置和旋转
4. 当指定安装层时，系统应该使用`AssembleToName`属性关联到对应层（TOP/BOTTOM）
5. 当定义组件形状时，系统应该支持复杂的几何描述和外部3D模型引用

### 需求 8

**用户故事：** 作为一个EDA软件开发者，我希望能够使用IDXPorter定义各种禁止区域和保留区域，用于描述设计约束和限制区域。

#### 验收标准

1. 当定义组件禁止区时，系统应该支持`geometryType="KEEPOUT_AREA_COMPONENT"`的Item创建
2. 当定义布线禁止区时，系统应该支持`geometryType="KEEPOUT_AREA_ROUTE"`的Item创建
3. 当定义过孔禁止区时，系统应该支持`geometryType="KEEPOUT_AREA_VIA"`的Item创建
4. 当定义测试点禁止区时，系统应该支持`geometryType="KEEPOUT_AREA_TESTPOINT"`的Item创建
5. 当定义热禁止区时，系统应该支持`geometryType="KEEPOUT_AREA_THERMAL"`的Item创建
6. 当定义其他禁止区时，系统应该支持`geometryType="KEEPOUT_AREA_OTHER"`的Item创建
7. 当定义组件保留区时，系统应该支持`geometryType="KEEPIN_AREA_COMPONENT"`的Item创建
8. 当定义布线保留区时，系统应该支持`geometryType="KEEPIN_AREA_ROUTE"`的Item创建
9. 当设置禁止区属性时，系统应该包含Z轴高度范围和约束类型信息
10. 当使用AssembleToName时，系统应该正确关联到对应的层或表面

### 需求 9

**用户故事：** 作为一个EDA软件开发者，我希望IDXPorter支持IDX的基础Item建模概念，包括single和assembly两种ItemType，以便进行灵活的设计建模。

#### 验收标准

1. 当创建单一项目时，系统应该支持`ItemType="single"`的Item创建，用于定义基础几何形状和组件定义
2. 当创建装配项目时，系统应该支持`ItemType="assembly"`的Item创建，用于定义实例化的组件和复杂结构
3. 当定义Item标识时，系统应该支持完整的Identifier结构，包含SystemScope、Number、Version、Revision和Sequence
4. 当创建ItemInstance时，系统应该支持InstanceName、Transformation和Item引用的完整结构
5. 当设置用户属性时，系统应该支持UserProperty的创建，包含Key-Value结构和SystemScope定义
6. 当使用Baseline标记时，系统应该支持基线项目的标识，用于变更管理
7. 当引用其他Item时，系统应该支持Item之间的层次化引用关系
8. 当设置ReferenceName时，系统应该支持简化的引用名称定义，便于AssembleToName使用

### 需求 10

**用户故事：** 作为一个EDA软件开发者，我希望IDXPorter具有良好的扩展性和模块化设计，以便未来添加更多geometryType和IDX解析功能。

#### 验收标准

1. 当设计系统架构时，系统应该采用模块化设计，将不同功能模块分离
2. 当实现核心功能时，系统应该提供清晰的TypeScript接口定义和抽象类
3. 当处理IDX数据时，系统应该使用统一的数据模型和类型系统
4. 当扩展新的geometryType时，系统应该支持插件式架构，便于添加新类型
5. 当未来添加解析功能时，系统应该能够复用现有的数据模型和类型定义

### 需求 11

**用户故事：** 作为一个EDA软件开发者，我希望IDXPorter遵循现代TypeScript最佳实践，提供高质量的代码和完善的文档。

#### 验收标准

1. 当编写代码时，系统应该遵循现代TypeScript最佳实践，包括严格的类型检查
2. 当组织文件结构时，系统应该采用清晰的目录结构和模块划分
3. 当编写注释时，系统应该遵循代码注释规范指南，提供清晰的JSDoc文档
4. 当构建和打包时，系统应该使用现代的构建工具和配置
5. 当提供类型定义时，系统应该导出完整的TypeScript类型声明文件

### 需求 12

**用户故事：** 作为一个EDA软件开发者，我希望生成的IDX文件能够被标准的MCAD软件正确读取和解析，并支持灵活的XML注释功能。

#### 验收标准

1. 当生成IDX文件时，系统应该使用正确的XML命名空间声明，符合IDX V4.5规范
2. 当输出XML时，系统应该符合IDX V4.5的XSD模式定义，确保结构正确
3. 当设置文件头时，系统应该包含必要的创建者信息、时间戳和版本信息
4. 当定义几何元素时，系统应该使用正确的单位（默认毫米）和坐标系统
5. 当生成唯一标识符时，系统应该确保所有Item具有正确的Identifier和Sequence
6. 当添加XML注释时，系统应该支持在任意位置灵活添加单行和多行注释
7. 当生成带注释的XML时，系统应该保持良好的格式化和缩进，提高可读性
8. 当处理复杂结构时，系统应该支持结构化注释，便于理解和维护

### 需求 13

**用户故事：** 作为一个EDA软件开发者，我希望IDXPorter能够提供清晰的错误处理和调试支持。

#### 验收标准

1. 当输入数据格式错误时，系统应该提供清晰的TypeScript类型错误和运行时验证
2. 当构建IDX结构时，系统应该验证必要字段的完整性和正确性
3. 当生成XML时，系统应该能够检查输出格式的正确性
4. 当处理复杂几何时，系统应该提供调试信息和中间状态查看功能
5. 当集成到EDA软件时，系统应该提供详细的错误信息和解决建议

### 需求 14

**用户故事：** 作为一个EDA软件开发者，我希望IDXPorter具有完善的单元测试覆盖，确保代码质量和功能稳定性。

#### 验收标准

1. 当实现核心功能时，系统应该为所有公共接口和关键逻辑编写单元测试
2. 当测试几何元素时，系统应该验证各种形状的正确生成和XML输出
3. 当测试IDX结构时，系统应该验证Header、Body、ProcessInstruction的正确组装
4. 当测试不同geometryType时，系统应该确保每种类型的Item都有对应的测试用例
5. 当运行测试时，系统应该达到合理的代码覆盖率（建议≥80%）
6. 当集成测试时，系统应该能够生成完整的IDX文件并验证其符合规范