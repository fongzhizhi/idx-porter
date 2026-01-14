/**
 * Item相关类型定义
 * 
 * @description
 * 定义IDX中的Item结构，包括Item、ItemInstance、Identifier等核心类型。
 */

import { ItemType, GeometryType, TransformationType } from './enums';

/**
 * 标识符
 * 
 * @description
 * 用于唯一标识Item的完整标识符结构。
 */
export interface Identifier {
  /** 系统范围 */
  readonly systemScope: string;
  /** 编号 */
  readonly number: string;
  /** 版本 */
  readonly version: string;
  /** 修订版本 */
  readonly revision: string;
  /** 序列号 */
  readonly sequence: number;
}

/**
 * 实例名称
 * 
 * @description
 * 用于标识ItemInstance的名称结构。
 */
export interface InstanceName {
  /** 系统范围 */
  readonly systemScope: string;
  /** 对象名称 */
  readonly objectName: string;
}

/**
 * 属性键
 * 
 * @description
 * 用于标识用户属性的键结构。
 */
export interface PropertyKey {
  /** 系统范围 */
  readonly systemScope: string;
  /** 对象名称 */
  readonly objectName: string;
}

/**
 * 用户属性
 * 
 * @description
 * 用于存储自定义的键值对属性。
 */
export interface UserProperty {
  /** 属性键 */
  readonly key: PropertyKey;
  /** 属性值 */
  readonly value: string;
}

/**
 * 2D变换矩阵
 * 
 * @description
 * 表示2D平面上的仿射变换，包括旋转、缩放和平移。
 * 变换矩阵格式：
 * | xx  xy  tx |
 * | yx  yy  ty |
 * | 0   0   1  |
 */
export interface Transformation {
  /** 变换类型 */
  readonly transformationType: TransformationType;
  /** 矩阵元素 xx（第1行第1列） */
  readonly xx: number;
  /** 矩阵元素 xy（第1行第2列） */
  readonly xy: number;
  /** 矩阵元素 yx（第2行第1列） */
  readonly yx: number;
  /** 矩阵元素 yy（第2行第2列） */
  readonly yy: number;
  /** X方向平移 */
  readonly tx: number;
  /** Y方向平移 */
  readonly ty: number;
}

/**
 * Item实例
 * 
 * @description
 * 表示Item的一个实例，包含实例名称、变换和引用的Item。
 */
export interface ItemInstance {
  /** 实例名称 */
  readonly instanceName: InstanceName;
  /** 可选的变换矩阵 */
  readonly transformation?: Transformation | undefined;
  /** 引用的Item ID */
  readonly item?: string | undefined;
  /** 用户属性列表 */
  readonly userProperties?: UserProperty[] | undefined;
}

/**
 * IDX Item基础接口
 * 
 * @description
 * 表示IDX中的基本Item结构，是所有设计元素的基础。
 */
export interface Item {
  /** Item的唯一标识符 */
  readonly id: string;
  /** Item名称 */
  readonly name: string;
  /** 可选的描述信息 */
  readonly description?: string | undefined;
  /** Item类型（single或assembly） */
  readonly itemType: ItemType;
  /** 可选的几何类型 */
  readonly geometryType?: GeometryType | undefined;
  /** 标识符 */
  readonly identifier: Identifier;
  /** 可选的引用名称 */
  readonly referenceName?: string | undefined;
  /** 是否为基线项目 */
  readonly baseline?: boolean | undefined;
  /** 用户属性列表 */
  readonly userProperties?: UserProperty[] | undefined;
  /** 可选的Item实例 */
  readonly itemInstance?: ItemInstance | undefined;
  /** 装配到的目标名称（如层名称） */
  readonly assembleToName?: string | undefined;
  /** 关联的形状元素ID */
  readonly shape?: string | undefined;
}
