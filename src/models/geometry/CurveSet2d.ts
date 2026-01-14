/**
 * 2.5D几何体实现
 * 
 * @description
 * 通过2D几何元素和Z轴范围定义的2.5D几何体。
 * LowerBound和UpperBound定义了几何体在Z轴方向的范围。
 */

import { CurveSet2d as ICurveSet2d, GeometryElement } from '../../types/geometry';
import { ShapeDescriptionType } from '../../types/enums';

/**
 * 2.5D几何体类
 * 
 * @description
 * 实现CurveSet2d接口，通过2D几何元素和Z轴范围定义2.5D几何体。
 * 
 * @example
 * ```typescript
 * const polyLine = new PolyLine('line1', points, true);
 * const curveSet = new CurveSet2d('cs1', polyLine, 0, 1.6);
 * console.log(curveSet.getHeight()); // 1.6
 * ```
 */
export class CurveSet2d implements ICurveSet2d {
  /**
   * 创建2.5D几何体
   * 
   * @param id - 2.5D几何体的唯一标识符
   * @param detailedGeometricModelElement - 详细的几何模型元素
   * @param lowerBound - Z轴下界
   * @param upperBound - Z轴上界
   * @param shapeDescriptionType - 形状描述类型，默认为GeometricModel
   */
  constructor(
    public readonly id: string,
    public readonly detailedGeometricModelElement: GeometryElement,
    public readonly lowerBound: number,
    public readonly upperBound: number,
    public readonly shapeDescriptionType: ShapeDescriptionType = ShapeDescriptionType.GEOMETRIC_MODEL
  ) {
    if (!id || id.trim().length === 0) {
      throw new Error('CurveSet2d ID cannot be empty');
    }
    
    if (!detailedGeometricModelElement) {
      throw new Error('Geometry element is required');
    }
    
    if (!Number.isFinite(lowerBound)) {
      throw new Error(`Invalid lower bound: ${lowerBound}`);
    }
    
    if (!Number.isFinite(upperBound)) {
      throw new Error(`Invalid upper bound: ${upperBound}`);
    }
    
    if (upperBound <= lowerBound) {
      throw new Error(`Upper bound (${upperBound}) must be greater than lower bound (${lowerBound})`);
    }
  }

  /**
   * 获取几何体的高度（Z轴方向）
   * 
   * @returns 几何体的高度
   */
  getHeight(): number {
    return this.upperBound - this.lowerBound;
  }

  /**
   * 判断Z坐标是否在几何体范围内
   * 
   * @param z - Z坐标值
   * @param tolerance - 容差值，默认为1e-10
   * @returns 如果Z坐标在范围内返回true
   */
  containsZ(z: number, tolerance: number = 1e-10): boolean {
    return z >= this.lowerBound - tolerance && z <= this.upperBound + tolerance;
  }

  /**
   * 获取几何体的中心Z坐标
   * 
   * @returns 中心Z坐标
   */
  getCenterZ(): number {
    return (this.lowerBound + this.upperBound) / 2;
  }

  /**
   * 转换为字符串表示
   * 
   * @returns 2.5D几何体的字符串表示
   */
  toString(): string {
    return `CurveSet2d(id=${this.id}, lowerBound=${this.lowerBound}, upperBound=${this.upperBound}, height=${this.getHeight()})`;
  }

  /**
   * 转换为JSON对象
   * 
   * @returns 2.5D几何体的JSON表示
   */
  toJSON(): ICurveSet2d {
    return {
      id: this.id,
      shapeDescriptionType: this.shapeDescriptionType,
      lowerBound: this.lowerBound,
      upperBound: this.upperBound,
      detailedGeometricModelElement: this.detailedGeometricModelElement
    };
  }
}
