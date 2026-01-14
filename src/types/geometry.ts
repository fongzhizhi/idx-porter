/**
 * 几何类型定义
 * 
 * @description
 * 定义IDX中使用的所有几何元素类型，包括点、线、圆、圆弧等基础几何元素，
 * 以及2.5D几何体的定义。
 * 
 * 基于 @flatten-js/core 库实现，提供高性能的2D几何计算能力。
 */

import { ShapeDescriptionType } from './enums';
import * as Flatten from '@flatten-js/core';

/**
 * 笛卡尔坐标点
 * 
 * @description
 * 表示2D平面上的一个点，包含X、Y坐标值。
 * 所有坐标值应使用全局单位（通常为毫米）。
 * 
 * 基于 @flatten-js/core 的 Point 类实现。
 */
export interface CartesianPoint {
  /** 点的唯一标识符 */
  readonly id: string;
  /** X坐标值 */
  readonly x: number;
  /** Y坐标值 */
  readonly y: number;
  /** 底层的 Flatten.Point 对象 */
  readonly flattenPoint: Flatten.Point;
}

/**
 * 多段线
 * 
 * @description
 * 由一系列连续的点组成的折线，可以是开放的或闭合的。
 * 可选的thickness属性用于定义线宽（如铣削路径的刀径）。
 * 
 * 基于 @flatten-js/core 的 Polygon 类实现。
 */
export interface PolyLine {
  /** 多段线的唯一标识符 */
  readonly id: string;
  /** 构成多段线的点序列 */
  readonly points: CartesianPoint[];
  /** 可选的线宽，用于铣削路径等场景 */
  readonly thickness?: number | undefined;
  /** 是否闭合 */
  readonly closed: boolean;
  /** 底层的 Flatten.Polygon 或 Flatten.Segment[] 对象 */
  readonly flattenShape: Flatten.Polygon | Flatten.Segment[];
}

/**
 * 圆形（中心点定义）
 * 
 * @description
 * 通过中心点和直径定义的圆形。
 * 
 * 基于 @flatten-js/core 的 Circle 类实现。
 */
export interface CircleCenter {
  /** 圆形的唯一标识符 */
  readonly id: string;
  /** 圆心坐标 */
  readonly centerPoint: CartesianPoint;
  /** 圆的直径 */
  readonly diameter: number;
  /** 底层的 Flatten.Circle 对象 */
  readonly flattenCircle: Flatten.Circle;
}

/**
 * 圆形（三点定义）
 * 
 * @description
 * 通过圆周上的三个点定义的圆形。
 */
export interface Circle3Point {
  /** 圆形的唯一标识符 */
  readonly id: string;
  /** 圆周上的第一个点 */
  readonly point1: CartesianPoint;
  /** 圆周上的第二个点 */
  readonly point2: CartesianPoint;
  /** 圆周上的第三个点 */
  readonly point3: CartesianPoint;
}

/**
 * 圆弧
 * 
 * @description
 * 由起点、终点、半径和方向定义的圆弧。
 * 
 * 基于 @flatten-js/core 的 Arc 类实现。
 */
export interface Arc {
  /** 圆弧的唯一标识符 */
  readonly id: string;
  /** 起点坐标 */
  readonly startPoint: CartesianPoint;
  /** 终点坐标 */
  readonly endPoint: CartesianPoint;
  /** 圆弧半径 */
  readonly radius: number;
  /** 是否逆时针方向（true为逆时针，false为顺时针） */
  readonly isCCW: boolean;
  /** 底层的 Flatten.Arc 对象 */
  readonly flattenArc: Flatten.Arc;
}

/**
 * 复合曲线
 * 
 * @description
 * 由多个几何元素组成的复合曲线，用于描述复杂的轮廓。
 */
export interface CompositeCurve {
  /** 复合曲线的唯一标识符 */
  readonly id: string;
  /** 构成复合曲线的几何元素序列 */
  readonly segments: GeometryElement[];
}

/**
 * B样条曲线
 * 
 * @description
 * 通过控制点和节点向量定义的B样条曲线。
 */
export interface BSplineCurve {
  /** B样条曲线的唯一标识符 */
  readonly id: string;
  /** 曲线的阶数 */
  readonly degree: number;
  /** 控制点序列 */
  readonly controlPoints: CartesianPoint[];
  /** 节点向量 */
  readonly knots: number[];
  /** 权重（用于有理B样条） */
  readonly weights?: number[];
}

/**
 * 椭圆
 * 
 * @description
 * 通过中心点、长轴、短轴和旋转角度定义的椭圆。
 */
export interface Ellipse {
  /** 椭圆的唯一标识符 */
  readonly id: string;
  /** 椭圆中心点 */
  readonly centerPoint: CartesianPoint;
  /** 长半轴长度 */
  readonly majorRadius: number;
  /** 短半轴长度 */
  readonly minorRadius: number;
  /** 旋转角度（弧度） */
  readonly rotation: number;
}

/**
 * 几何元素联合类型
 * 
 * @description
 * 表示所有可能的几何元素类型。
 */
export type GeometryElement = 
  | PolyLine 
  | CircleCenter 
  | Circle3Point
  | Arc 
  | CompositeCurve 
  | BSplineCurve 
  | Ellipse;

/**
 * 2.5D几何体
 * 
 * @description
 * 通过2D几何元素和Z轴范围定义的2.5D几何体。
 * LowerBound和UpperBound定义了几何体在Z轴方向的范围。
 */
export interface CurveSet2d {
  /** 2.5D几何体的唯一标识符 */
  readonly id: string;
  /** 形状描述类型 */
  readonly shapeDescriptionType: ShapeDescriptionType;
  /** Z轴下界 */
  readonly lowerBound: number;
  /** Z轴上界 */
  readonly upperBound: number;
  /** 详细的几何模型元素 */
  readonly detailedGeometricModelElement: GeometryElement;
}

/**
 * 形状元素
 * 
 * @description
 * 包含几何元素和布尔运算属性的形状元素。
 * Inverted属性用于控制材料的添加（false）或切除（true）。
 */
export interface ShapeElement {
  /** 形状元素的唯一标识符 */
  readonly id: string;
  /** 关联的几何元素 */
  readonly geometry: CurveSet2d;
  /** 是否反转（true表示切除材料，false表示添加材料） */
  readonly inverted: boolean;
}
