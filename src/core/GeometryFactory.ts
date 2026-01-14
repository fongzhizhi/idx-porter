/**
 * 几何工厂类
 * 
 * @description
 * 提供统一的几何元素创建API，包括ID管理和验证逻辑。
 */

import { CartesianPoint } from '../models/geometry/CartesianPoint';
import { PolyLine } from '../models/geometry/PolyLine';
import { CircleCenter } from '../models/geometry/CircleCenter';
import { Arc } from '../models/geometry/Arc';
import { CurveSet2d } from '../models/geometry/CurveSet2d';
import { ShapeElement } from '../models/geometry/ShapeElement';
import { GeometryElement } from '../types/geometry';
import { ShapeDescriptionType } from '../types/enums';

/**
 * 几何工厂类
 * 
 * @description
 * 实现IGeometryFactory接口，提供统一的几何元素创建API。
 * 
 * @example
 * ```typescript
 * const factory = new GeometryFactory();
 * const point = factory.createPoint(10, 20);
 * const circle = factory.createCircleCenter(point, 5);
 * ```
 */
export class GeometryFactory {
  private idCounter: number = 0;
  private readonly idPrefix: string;

  /**
   * 创建几何工厂
   * 
   * @param idPrefix - ID前缀，默认为'geom'
   */
  constructor(idPrefix: string = 'geom') {
    this.idPrefix = idPrefix;
  }

  /**
   * 生成唯一ID
   * 
   * @param type - 几何类型
   * @returns 唯一ID
   */
  private generateId(type: string): string {
    return `${this.idPrefix}_${type}_${++this.idCounter}`;
  }

  /**
   * 创建笛卡尔坐标点
   * 
   * @param x - X坐标
   * @param y - Y坐标
   * @param id - 可选的自定义ID
   * @returns CartesianPoint实例
   */
  createPoint(x: number, y: number, id?: string): CartesianPoint {
    const pointId = id || this.generateId('point');
    return new CartesianPoint(pointId, x, y);
  }

  /**
   * 创建多段线
   * 
   * @param points - 点序列
   * @param closed - 是否闭合
   * @param thickness - 可选的线宽
   * @param id - 可选的自定义ID
   * @returns PolyLine实例
   */
  createPolyLine(
    points: CartesianPoint[],
    closed: boolean,
    thickness?: number,
    id?: string
  ): PolyLine {
    const lineId = id || this.generateId('polyline');
    return new PolyLine(lineId, points, closed, thickness);
  }

  /**
   * 创建圆形（中心点+直径）
   * 
   * @param centerPoint - 圆心
   * @param diameter - 直径
   * @param id - 可选的自定义ID
   * @returns CircleCenter实例
   */
  createCircleCenter(
    centerPoint: CartesianPoint,
    diameter: number,
    id?: string
  ): CircleCenter {
    const circleId = id || this.generateId('circle');
    return new CircleCenter(circleId, centerPoint, diameter);
  }

  /**
   * 创建圆弧
   * 
   * @param startPoint - 起点
   * @param endPoint - 终点
   * @param radius - 半径
   * @param isCCW - 是否逆时针
   * @param id - 可选的自定义ID
   * @returns Arc实例
   */
  createArc(
    startPoint: CartesianPoint,
    endPoint: CartesianPoint,
    radius: number,
    isCCW: boolean,
    id?: string
  ): Arc {
    const arcId = id || this.generateId('arc');
    return new Arc(arcId, startPoint, endPoint, radius, isCCW);
  }

  /**
   * 创建2.5D几何体
   * 
   * @param geometry - 2D几何元素
   * @param lowerBound - Z轴下界
   * @param upperBound - Z轴上界
   * @param id - 可选的自定义ID
   * @returns CurveSet2d实例
   */
  createCurveSet2d(
    geometry: GeometryElement,
    lowerBound: number,
    upperBound: number,
    id?: string
  ): CurveSet2d {
    const curveSetId = id || this.generateId('curveset');
    return new CurveSet2d(
      curveSetId,
      geometry,
      lowerBound,
      upperBound,
      ShapeDescriptionType.GEOMETRIC_MODEL
    );
  }

  /**
   * 创建形状元素
   * 
   * @param geometry - 2.5D几何体
   * @param inverted - 是否反转（切除材料）
   * @param id - 可选的自定义ID
   * @returns ShapeElement实例
   */
  createShapeElement(
    geometry: CurveSet2d,
    inverted: boolean = false,
    id?: string
  ): ShapeElement {
    const shapeId = id || this.generateId('shape');
    return new ShapeElement(shapeId, geometry, inverted);
  }

  /**
   * 重置ID计数器
   */
  resetIdCounter(): void {
    this.idCounter = 0;
  }

  /**
   * 获取当前ID计数
   * 
   * @returns 当前ID计数
   */
  getIdCount(): number {
    return this.idCounter;
  }
}
