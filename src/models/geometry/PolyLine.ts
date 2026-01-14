/**
 * 多段线实现
 * 
 * @description
 * 由一系列连续的点组成的折线，可以是开放的或闭合的。
 * 可选的thickness属性用于定义线宽（如铣削路径的刀径）。
 * 
 * 基于 @flatten-js/core 的 Polygon 和 Segment 类实现。
 */

import * as Flatten from '@flatten-js/core';
import { CartesianPoint, PolyLine as IPolyLine } from '../../types/geometry';

/**
 * 多段线类
 * 
 * @description
 * 实现PolyLine接口，提供多段线的创建、点序列管理和闭合控制功能。
 * 使用 @flatten-js/core 提供高性能的几何计算。
 * 
 * @example
 * ```typescript
 * const points = [
 *   new CartesianPoint('p1', 0, 0),
 *   new CartesianPoint('p2', 10, 0),
 *   new CartesianPoint('p3', 10, 10)
 * ];
 * const polyLine = new PolyLine('line1', points, false);
 * console.log(polyLine.isClosed()); // false
 * ```
 */
export class PolyLine implements IPolyLine {
  public readonly flattenShape: Flatten.Polygon | Flatten.Segment[];

  /**
   * 创建多段线
   * 
   * @param id - 多段线的唯一标识符
   * @param points - 构成多段线的点序列
   * @param closed - 是否闭合
   * @param thickness - 可选的线宽，用于铣削路径等场景
   */
  constructor(
    public readonly id: string,
    public readonly points: CartesianPoint[],
    public readonly closed: boolean,
    public readonly thickness?: number
  ) {
    if (!id || id.trim().length === 0) {
      throw new Error('PolyLine ID cannot be empty');
    }

    if (!points || points.length < 2) {
      throw new Error('PolyLine must have at least 2 points');
    }

    if (thickness !== undefined && (thickness <= 0 || !Number.isFinite(thickness))) {
      throw new Error(`Invalid thickness: ${thickness}`);
    }

    // 创建底层的 Flatten 对象
    if (closed) {
      // 闭合多段线使用 Polygon
      const flattenPoints = points.map(p => p.flattenPoint);
      this.flattenShape = new Flatten.Polygon(flattenPoints);
    } else {
      // 开放多段线使用 Segment 数组
      this.flattenShape = [];
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        if (p1 && p2) {
          this.flattenShape.push(new Flatten.Segment(p1.flattenPoint, p2.flattenPoint));
        }
      }
    }
  }

  /**
   * 获取点的数量
   * 
   * @returns 点的数量
   */
  get pointCount(): number {
    return this.points.length;
  }

  /**
   * 判断多段线是否闭合
   * 
   * @returns 如果闭合返回true
   */
  isClosed(): boolean {
    return this.closed;
  }

  /**
   * 获取指定索引的点
   * 
   * @param index - 点的索引
   * @returns 指定索引的点
   */
  getPoint(index: number): CartesianPoint {
    if (index < 0 || index >= this.points.length) {
      throw new Error(`Point index out of bounds: ${index}`);
    }
    const point = this.points[index];
    if (!point) {
      throw new Error(`Point at index ${index} is undefined`);
    }
    return point;
  }

  /**
   * 计算多段线的总长度
   * 
   * @returns 多段线的总长度
   */
  calculateLength(): number {
    if (this.closed && this.flattenShape instanceof Flatten.Polygon) {
      // 闭合多段线：计算周长
      let length = 0;
      for (const edge of this.flattenShape.edges) {
        length += edge.length;
      }
      return length;
    } else if (Array.isArray(this.flattenShape)) {
      // 开放多段线：累加所有线段长度
      return this.flattenShape.reduce((sum, segment) => sum + segment.length, 0);
    }
    return 0;
  }

  /**
   * 计算多段线的边界框
   * 
   * @returns 边界框 {minX, minY, maxX, maxY}
   */
  getBoundingBox(): { minX: number; minY: number; maxX: number; maxY: number } {
    const firstPoint = this.points[0];
    if (!firstPoint) {
      throw new Error('Cannot calculate bounding box for empty polyline');
    }

    let minX = firstPoint.x;
    let minY = firstPoint.y;
    let maxX = firstPoint.x;
    let maxY = firstPoint.y;

    for (const point of this.points) {
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
    }

    return { minX, minY, maxX, maxY };
  }

  /**
   * 转换为字符串表示
   * 
   * @returns 多段线的字符串表示
   */
  toString(): string {
    return `PolyLine(id=${this.id}, points=${this.points.length}, closed=${this.closed}, thickness=${this.thickness})`;
  }

  /**
   * 转换为JSON对象
   * 
   * @returns 多段线的JSON表示
   */
  toJSON(): Omit<IPolyLine, 'flattenShape'> {
    return {
      id: this.id,
      points: this.points,
      closed: this.closed,
      thickness: this.thickness
    };
  }
}
