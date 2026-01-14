/**
 * 基础枚举类型定义
 * 
 * @description
 * 定义IDXPorter中使用的所有枚举类型，包括几何类型、Item类型、单位类型等。
 */

/**
 * IDX几何类型枚举
 * 
 * @description
 * 定义IDX V4.5支持的所有geometryType值，用于标识Item的几何类型。
 */
export enum GeometryType {
  // 板级类型
  BOARD_OUTLINE = 'BOARD_OUTLINE',
  BOARD_AREA_RIGID = 'BOARD_AREA_RIGID',
  BOARD_AREA_FLEXIBLE = 'BOARD_AREA_FLEXIBLE',
  BOARD_AREA_STIFFENER = 'BOARD_AREA_STIFFENER',
  
  // 组件类型
  COMPONENT = 'COMPONENT',
  COMPONENT_MECHANICAL = 'COMPONENT_MECHANICAL',
  
  // 孔类型
  VIA = 'VIA',
  FILLED_VIA = 'FILLED_VIA',
  HOLE_PLATED = 'HOLE_PLATED',
  HOLE_NON_PLATED = 'HOLE_NON_PLATED',
  HOLE_PLATED_MILLED = 'HOLE_PLATED_MILLED',
  HOLE_NONPLATED_MILLED = 'HOLE_NONPLATED_MILLED',
  
  // 禁止区类型
  KEEPOUT_AREA_COMPONENT = 'KEEPOUT_AREA_COMPONENT',
  KEEPOUT_AREA_ROUTE = 'KEEPOUT_AREA_ROUTE',
  KEEPOUT_AREA_VIA = 'KEEPOUT_AREA_VIA',
  KEEPOUT_AREA_TESTPOINT = 'KEEPOUT_AREA_TESTPOINT',
  KEEPOUT_AREA_THERMAL = 'KEEPOUT_AREA_THERMAL',
  KEEPOUT_AREA_OTHER = 'KEEPOUT_AREA_OTHER',
  
  // 保留区类型
  KEEPIN_AREA_COMPONENT = 'KEEPIN_AREA_COMPONENT',
  KEEPIN_AREA_ROUTE = 'KEEPIN_AREA_ROUTE',
  KEEPIN_AREA_VIA = 'KEEPIN_AREA_VIA',
  KEEPIN_AREA_TESTPOINT = 'KEEPIN_AREA_TESTPOINT',
  KEEPIN_AREA_OTHER = 'KEEPIN_AREA_OTHER',
  
  // 层类型
  LAYER_SILKSCREEN = 'LAYER_SILKSCREEN',
  LAYER_SOLDERMASK = 'LAYER_SOLDERMASK',
  LAYER_SOLDERPASTE = 'LAYER_SOLDERPASTE',
  LAYER_OTHERSIGNAL = 'LAYER_OTHERSIGNAL',
  LAYER_POWERORGROUND = 'LAYER_POWERORGROUND',
  LAYER_DIELECTRIC = 'LAYER_DIELECTRIC',
  LAYER_STACKUP = 'LAYER_STACKUP'
}

/**
 * Item类型枚举
 * 
 * @description
 * 定义Item的两种基本类型：single（单一项目）和assembly（装配项目）。
 */
export enum ItemType {
  /** 单一项目，用于定义基础几何形状和组件定义 */
  SINGLE = 'single',
  /** 装配项目，用于定义实例化的组件和复杂结构 */
  ASSEMBLY = 'assembly'
}

/**
 * 单位长度枚举
 * 
 * @description
 * 定义IDX支持的长度单位类型。
 */
export enum UnitLength {
  /** 毫米单位 */
  UNIT_MM = 'UNIT_MM',
  /** 英寸单位 */
  UNIT_INCH = 'UNIT_INCH'
}

/**
 * 处理指令类型枚举
 * 
 * @description
 * 定义IDX文档的处理指令类型。
 */
export enum ProcessInstructionType {
  /** 发送信息 */
  SEND_INFORMATION = 'SendInformation',
  /** 发送变更 */
  SEND_CHANGES = 'SendChanges',
  /** 间隙检查 */
  CLEARANCE = 'Clearance'
}

/**
 * 形状描述类型枚举
 * 
 * @description
 * 定义2.5D几何体的形状描述类型。
 */
export enum ShapeDescriptionType {
  /** 几何模型 */
  GEOMETRIC_MODEL = 'GeometricModel'
}

/**
 * 变换类型枚举
 * 
 * @description
 * 定义变换矩阵的类型。
 */
export enum TransformationType {
  /** 2D变换 */
  D2 = 'd2',
  /** 3D变换 */
  D3 = 'd3'
}