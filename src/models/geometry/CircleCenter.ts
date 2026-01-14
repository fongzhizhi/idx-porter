/**
 * 圆形（中心点定义）实现
 * 
 * @description
 * 通过中心点和直径定义的圆形。
 * 
 * 基于 @flatten-js/core 的 Circle 类实现。
 */

import * as Flatten from '@flatten-js/core';
import { CircleCenter as ICircleCenter, CartesianPoint } from '../../types/geometry';

/**
 * 圆形类（中心点定义）
 * 
 * @description
 * 实现CircleCenter接口，提供通过中心点和直径定义圆形的功能。
 * 使用 @flatten-js/core 提供高性能的几何计算。
 * 
 * @example
 * ```typescript
 * const center = new CartesianPoint('c1', 5, 5);
 * const circle = new CircleCenter('circle1', center, 10);
 * console.log(circle.getRadius()); // 5
 * console.log(circle.getArea()); // 78.54...
 * ```
 */
export class CircleCenter implements ICircleCenter {
  public readonly flattenCircle: Flatten.Circle;

  /**
   * 创建圆形
   * 
   * @param id - 圆形的唯一标识符
   * @param centerPoint - 圆心坐标
   * @param diameter - 圆的直径
   */
  constructor(
    public readonly id: string,
    public readonly centerPoint: CartesianPoint,
    public readonly diameter: number
  ) {
    if (!id || id.trim().length === 0) {
      throw new Error('Circle ID cannot be empty');
    }
    
    if (!centerPoint) {
      throw new Error('Center point is required');
    }
    
    if (diameter <= 0 || !Number.isFinite(diameter)) {
      throw new Error(`Invalid diameter: ${diameter}`);
    }

    // 创建底层的 Flatten.Circle 对象（使用半径）
    this.flattenCircle = new Flatten.Circle(centerPoint.flattenPoint, diameter / 2);
  }

  /**
   * 获取圆的半径
   * 
   * @returns 圆的半径
   */
  getRadius(): number {
    return this.diameter / 2;
  }

  /**
   * 计算圆的面积
   * 
   * @returns 圆的面积
   */
  getArea(): number {
    const radius = this.getRadius();
    return Math.PI * radius * radius;
  }

  /**
   * 计算圆的周长
   * 
   * @returns 圆的周长
   */
  getCircumference(): number {
    return Math.PI * this.diameter;
  }

  /**
   * 判断点是否在圆内
   * 
   * @param point - 要判断的点
   * @param tolerance - 容差值，默认为1e-10
   * @returns 如果点在圆内或圆上返回true
   */
  containsPoint(point: CartesianPoint, tolerance: number = 1e-10): boolean {
    const distance = this.centerPoint.flattenPoint.distanceTo(point.flattenPoint)[0];
    const radius = this.getRadius();
    return distance <= radius + tolerance;
  }

  /**
   * 计算圆的边界框
   * 
   * @returns 边界框 {minX, minY, maxX, maxY}
   */
  getBoundingBox(): { minX: number; minY: number; maxX: number; maxY: number } {
    const box = this.flattenCircle.box;
    return {
      minX: box.xmin,
      minY: box.ymin,
      maxX: box.xmax,
      maxY: box.ymax
    };
  }

  /**
   * 转换为字符串表示
   * 
   * @returns 圆形的字符串表示
   */
  toString(): string {
    return `CircleCenter(id=${this.id}, center=(${this.centerPoint.x}, ${this.centerPoint.y}), diameter=${this.diameter})`;
  }

  /**
   * 转换为JSON对象
   * 
   * @returns 圆形的JSON表示
   */
  toJSON(): Omit<ICircleCenter, 'flattenCircle'> {
    return {
      id: this.id,
      centerPoint: this.centerPoint,
      diameter: this.diameter
    };
  }
}
