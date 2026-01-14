/**
 * 2D变换矩阵实现
 * 
 * @description
 * 表示2D平面上的仿射变换，包括旋转、缩放和平移。
 * 变换矩阵格式：
 * | xx  xy  tx |
 * | yx  yy  ty |
 * | 0   0   1  |
 */

import { Transformation as ITransformation } from '../../types/items';
import { TransformationType } from '../../types/enums';

/**
 * 2D变换类
 * 
 * @description
 * 实现Transformation接口，提供2D仿射变换功能。
 * 
 * @example
 * ```typescript
 * // 创建平移变换
 * const translation = Transformation.createTranslation(10, 20);
 * 
 * // 创建旋转变换
 * const rotation = Transformation.createRotation(Math.PI / 4);
 * 
 * // 组合变换
 * const combined = translation.combine(rotation);
 * ```
 */
export class Transformation implements ITransformation {
  /**
   * 创建2D变换
   * 
   * @param xx - 矩阵元素 xx（第1行第1列）
   * @param xy - 矩阵元素 xy（第1行第2列）
   * @param yx - 矩阵元素 yx（第2行第1列）
   * @param yy - 矩阵元素 yy（第2行第2列）
   * @param tx - X方向平移
   * @param ty - Y方向平移
   * @param transformationType - 变换类型，默认为'd2'
   */
  constructor(
    public readonly xx: number,
    public readonly xy: number,
    public readonly yx: number,
    public readonly yy: number,
    public readonly tx: number,
    public readonly ty: number,
    public readonly transformationType: TransformationType = TransformationType.D2
  ) {
    if (!Number.isFinite(xx) || !Number.isFinite(xy) || 
        !Number.isFinite(yx) || !Number.isFinite(yy) ||
        !Number.isFinite(tx) || !Number.isFinite(ty)) {
      throw new Error('All transformation matrix elements must be finite numbers');
    }
  }

  /**
   * 创建单位变换（恒等变换）
   * 
   * @returns 单位变换矩阵
   */
  static createIdentity(): Transformation {
    return new Transformation(1, 0, 0, 1, 0, 0);
  }

  /**
   * 创建平移变换
   * 
   * @param tx - X方向平移量
   * @param ty - Y方向平移量
   * @returns 平移变换矩阵
   */
  static createTranslation(tx: number, ty: number): Transformation {
    return new Transformation(1, 0, 0, 1, tx, ty);
  }

  /**
   * 创建旋转变换
   * 
   * @param angle - 旋转角度（弧度），逆时针为正
   * @returns 旋转变换矩阵
   */
  static createRotation(angle: number): Transformation {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Transformation(cos, -sin, sin, cos, 0, 0);
  }

  /**
   * 创建缩放变换
   * 
   * @param sx - X方向缩放因子
   * @param sy - Y方向缩放因子（如果不提供，使用sx）
   * @returns 缩放变换矩阵
   */
  static createScale(sx: number, sy?: number): Transformation {
    const scaleY = sy !== undefined ? sy : sx;
    return new Transformation(sx, 0, 0, scaleY, 0, 0);
  }

  /**
   * 创建旋转+平移的组合变换
   * 
   * @param angle - 旋转角度（弧度）
   * @param tx - X方向平移量
   * @param ty - Y方向平移量
   * @returns 组合变换矩阵
   */
  static createRotationTranslation(angle: number, tx: number, ty: number): Transformation {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Transformation(cos, -sin, sin, cos, tx, ty);
  }

  /**
   * 组合两个变换（this * other）
   * 
   * @param other - 另一个变换矩阵
   * @returns 组合后的变换矩阵
   */
  combine(other: Transformation): Transformation {
    return new Transformation(
      this.xx * other.xx + this.xy * other.yx,
      this.xx * other.xy + this.xy * other.yy,
      this.yx * other.xx + this.yy * other.yx,
      this.yx * other.xy + this.yy * other.yy,
      this.xx * other.tx + this.xy * other.ty + this.tx,
      this.yx * other.tx + this.yy * other.ty + this.ty
    );
  }

  /**
   * 计算逆变换
   * 
   * @returns 逆变换矩阵
   * @throws 如果矩阵不可逆（行列式为0）
   */
  inverse(): Transformation {
    const det = this.xx * this.yy - this.xy * this.yx;
    
    if (Math.abs(det) < 1e-10) {
      throw new Error('Transformation matrix is not invertible (determinant is zero)');
    }
    
    const invDet = 1 / det;
    
    return new Transformation(
      this.yy * invDet,
      -this.xy * invDet,
      -this.yx * invDet,
      this.xx * invDet,
      (this.xy * this.ty - this.yy * this.tx) * invDet,
      (this.yx * this.tx - this.xx * this.ty) * invDet
    );
  }

  /**
   * 应用变换到点
   * 
   * @param x - 点的X坐标
   * @param y - 点的Y坐标
   * @returns 变换后的坐标 {x, y}
   */
  transformPoint(x: number, y: number): { x: number; y: number } {
    return {
      x: this.xx * x + this.xy * y + this.tx,
      y: this.yx * x + this.yy * y + this.ty
    };
  }

  /**
   * 计算行列式
   * 
   * @returns 变换矩阵的行列式
   */
  determinant(): number {
    return this.xx * this.yy - this.xy * this.yx;
  }

  /**
   * 判断是否为单位变换
   * 
   * @param tolerance - 容差值，默认为1e-10
   * @returns 如果是单位变换返回true
   */
  isIdentity(tolerance: number = 1e-10): boolean {
    return Math.abs(this.xx - 1) < tolerance &&
           Math.abs(this.xy) < tolerance &&
           Math.abs(this.yx) < tolerance &&
           Math.abs(this.yy - 1) < tolerance &&
           Math.abs(this.tx) < tolerance &&
           Math.abs(this.ty) < tolerance;
  }

  /**
   * 判断是否仅包含平移
   * 
   * @param tolerance - 容差值，默认为1e-10
   * @returns 如果仅包含平移返回true
   */
  isTranslationOnly(tolerance: number = 1e-10): boolean {
    return Math.abs(this.xx - 1) < tolerance &&
           Math.abs(this.xy) < tolerance &&
           Math.abs(this.yx) < tolerance &&
           Math.abs(this.yy - 1) < tolerance;
  }

  /**
   * 转换为字符串表示
   * 
   * @returns 变换矩阵的字符串表示
   */
  toString(): string {
    return `Transformation([${this.xx}, ${this.xy}, ${this.tx}], [${this.yx}, ${this.yy}, ${this.ty}])`;
  }

  /**
   * 转换为JSON对象
   * 
   * @returns 变换矩阵的JSON表示
   */
  toJSON(): ITransformation {
    return {
      transformationType: this.transformationType,
      xx: this.xx,
      xy: this.xy,
      yx: this.yx,
      yy: this.yy,
      tx: this.tx,
      ty: this.ty
    };
  }
}
