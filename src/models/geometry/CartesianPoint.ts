/**
 * 笛卡尔坐标点实现
 * 
 * @description
 * 表示2D平面上的一个点，包含X、Y坐标值。
 * 所有坐标值应使用全局单位（通常为毫米）。
 * 
 * 基于 @flatten-js/core 的 Point 类实现。
 */

import * as Flatten from '@flatten-js/core';
import { CartesianPoint as ICartesianPoint } from '../../types/geometry';

/**
 * 笛卡尔坐标点类
 * 
 * @description
 * 实现CartesianPoint接口，提供2D坐标点的创建和管理功能。
 * 使用 @flatten-js/core 提供高性能的几何计算。
 * 
 * @example
 * ```typescript
 * const point = new CartesianPoint('p1', 10.5, 20.3);
 * console.log(point.x); // 10.5
 * console.log(point.y); // 20.3
 * console.log(point.distanceTo(otherPoint)); // 使用 flatten-js 计算距离
 * ```
 */
export class CartesianPoint implements ICartesianPoint {
  public readonly flattenPoint: Flatten.Point;

  /**
   * 创建笛卡尔坐标点
   * 
   * @param id - 点的唯一标识符
   * @param x - X坐标值
   * @param y - Y坐标值
   */
  constructor(
    public readonly id: string,
    public readonly x: number,
    public readonly y: number
  ) {
    if (!id || id.trim().length === 0) {
      throw new Error('Point ID cannot be empty');
    }
    
    if (!Number.isFinite(x)) {
      throw new Error(`Invalid X coordinate: ${x}`);
    }
    
    if (!Number.isFinite(y)) {
      throw new Error(`Invalid Y coordinate: ${y}`);
    }

    // 创建底层的 Flatten.Point 对象
    this.flattenPoint = new Flatten.Point(x, y);
  }

  /**
   * 计算到另一个点的距离
   * 
   * @param other - 另一个点
   * @returns 两点之间的欧几里得距离
   */
  distanceTo(other: ICartesianPoint): number {
    return this.flattenPoint.distanceTo(other.flattenPoint)[0];
  }

  /**
   * 判断是否与另一个点相等
   * 
   * @param other - 另一个点
   * @param tolerance - 容差值，默认为1e-10
   * @returns 如果两点坐标在容差范围内相等，返回true
   */
  equals(other: ICartesianPoint, tolerance: number = 1e-10): boolean {
    return (
      Math.abs(this.x - other.x) < tolerance &&
      Math.abs(this.y - other.y) < tolerance
    );
  }

  /**
   * 转换为字符串表示
   * 
   * @returns 点的字符串表示
   */
  toString(): string {
    return `CartesianPoint(id=${this.id}, x=${this.x}, y=${this.y})`;
  }

  /**
   * 转换为JSON对象
   * 
   * @returns 点的JSON表示
   */
  toJSON(): Omit<ICartesianPoint, 'flattenPoint'> {
    return {
      id: this.id,
      x: this.x,
      y: this.y
    };
  }
}
