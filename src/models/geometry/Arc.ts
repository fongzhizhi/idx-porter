/**
 * 圆弧实现
 * 
 * @description
 * 由起点、终点、半径和方向定义的圆弧。
 * 
 * 基于 @flatten-js/core 的 Arc 类实现。
 */

import * as Flatten from '@flatten-js/core';
import { Arc as IArc, CartesianPoint } from '../../types/geometry';

/**
 * 圆弧类
 * 
 * @description
 * 实现Arc接口，提供圆弧的创建和几何计算功能。
 * 使用 @flatten-js/core 提供高性能的几何计算。
 * 
 * @example
 * ```typescript
 * const start = new CartesianPoint('s1', 0, 0);
 * const end = new CartesianPoint('e1', 10, 0);
 * const arc = new Arc('arc1', start, end, 5, false);
 * console.log(arc.calculateLength()); // 圆弧长度
 * ```
 */
export class Arc implements IArc {
  public readonly flattenArc: Flatten.Arc;

  /**
   * 创建圆弧
   * 
   * @param id - 圆弧的唯一标识符
   * @param startPoint - 起点坐标
   * @param endPoint - 终点坐标
   * @param radius - 圆弧半径
   * @param isCCW - 是否逆时针方向（true为逆时针，false为顺时针）
   */
  constructor(
    public readonly id: string,
    public readonly startPoint: CartesianPoint,
    public readonly endPoint: CartesianPoint,
    public readonly radius: number,
    public readonly isCCW: boolean
  ) {
    if (!id || id.trim().length === 0) {
      throw new Error('Arc ID cannot be empty');
    }
    
    if (!startPoint) {
      throw new Error('Start point is required');
    }
    
    if (!endPoint) {
      throw new Error('End point is required');
    }
    
    if (radius <= 0 || !Number.isFinite(radius)) {
      throw new Error(`Invalid radius: ${radius}`);
    }
    
    // 验证起点和终点之间的距离不能大于直径
    const chordLength = startPoint.flattenPoint.distanceTo(endPoint.flattenPoint)[0];
    
    if (chordLength > 2 * radius + 1e-10) {
      throw new Error(`Chord length (${chordLength}) exceeds diameter (${2 * radius})`);
    }

    // 计算圆心
    const center = this.calculateCenterPoint(startPoint, endPoint, radius, isCCW);
    
    // 创建底层的 Flatten.Arc 对象
    this.flattenArc = new Flatten.Arc(
      center,
      radius,
      this.calculateStartAngle(center, startPoint),
      this.calculateEndAngle(center, endPoint),
      isCCW
    );
  }

  /**
   * 计算圆心（辅助方法）
   */
  private calculateCenterPoint(
    start: CartesianPoint,
    end: CartesianPoint,
    radius: number,
    ccw: boolean
  ): Flatten.Point {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const chordLength = Math.sqrt(dx * dx + dy * dy);
    
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    
    const h = Math.sqrt(radius * radius - (chordLength / 2) ** 2);
    
    const perpX = -dy / chordLength;
    const perpY = dx / chordLength;
    
    const sign = ccw ? 1 : -1;
    
    return new Flatten.Point(
      midX + sign * h * perpX,
      midY + sign * h * perpY
    );
  }

  /**
   * 计算起始角度（辅助方法）
   */
  private calculateStartAngle(center: Flatten.Point, start: CartesianPoint): number {
    return Math.atan2(start.y - center.y, start.x - center.x);
  }

  /**
   * 计算结束角度（辅助方法）
   */
  private calculateEndAngle(center: Flatten.Point, end: CartesianPoint): number {
    return Math.atan2(end.y - center.y, end.x - center.x);
  }

  /**
   * 计算圆弧的圆心
   * 
   * @returns 圆心坐标
   */
  calculateCenter(): { x: number; y: number } {
    return {
      x: this.flattenArc.center.x,
      y: this.flattenArc.center.y
    };
  }

  /**
   * 计算圆弧的角度（弧度）
   * 
   * @returns 圆弧的角度（弧度）
   */
  calculateAngle(): number {
    return this.flattenArc.sweep;
  }

  /**
   * 计算圆弧的长度
   * 
   * @returns 圆弧的长度
   */
  calculateLength(): number {
    return this.flattenArc.length;
  }

  /**
   * 计算圆弧上指定参数位置的点
   * 
   * @param t - 参数值，范围[0, 1]，0表示起点，1表示终点
   * @returns 圆弧上的点坐标
   */
  getPointAt(t: number): { x: number; y: number } {
    if (t < 0 || t > 1) {
      throw new Error(`Parameter t must be in range [0, 1], got ${t}`);
    }
    
    const angle = this.flattenArc.startAngle + this.flattenArc.sweep * t;
    const center = this.flattenArc.center;
    const radius = this.flattenArc.r;
    
    return {
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle)
    };
  }

  /**
   * 计算圆弧的边界框
   * 
   * @returns 边界框 {minX, minY, maxX, maxY}
   */
  getBoundingBox(): { minX: number; minY: number; maxX: number; maxY: number } {
    const box = this.flattenArc.box;
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
   * @returns 圆弧的字符串表示
   */
  toString(): string {
    return `Arc(id=${this.id}, start=(${this.startPoint.x}, ${this.startPoint.y}), end=(${this.endPoint.x}, ${this.endPoint.y}), radius=${this.radius}, ccw=${this.isCCW})`;
  }

  /**
   * 转换为JSON对象
   * 
   * @returns 圆弧的JSON表示
   */
  toJSON(): Omit<IArc, 'flattenArc'> {
    return {
      id: this.id,
      startPoint: this.startPoint,
      endPoint: this.endPoint,
      radius: this.radius,
      isCCW: this.isCCW
    };
  }
}
