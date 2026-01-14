/**
 * 形状元素实现
 * 
 * @description
 * 包含几何元素和布尔运算属性的形状元素。
 * Inverted属性用于控制材料的添加（false）或切除（true）。
 */

import { ShapeElement as IShapeElement, CurveSet2d } from '../../types/geometry';

/**
 * 形状元素类
 * 
 * @description
 * 实现ShapeElement接口，提供几何元素和布尔运算控制功能。
 * 
 * @example
 * ```typescript
 * const curveSet = new CurveSet2d('cs1', geometry, 0, 1.6);
 * const shape = new ShapeElement('shape1', curveSet, false);
 * console.log(shape.isAdditive()); // true (添加材料)
 * ```
 */
export class ShapeElement implements IShapeElement {
  /**
   * 创建形状元素
   * 
   * @param id - 形状元素的唯一标识符
   * @param geometry - 关联的2.5D几何体
   * @param inverted - 是否反转（true表示切除材料，false表示添加材料）
   */
  constructor(
    public readonly id: string,
    public readonly geometry: CurveSet2d,
    public readonly inverted: boolean
  ) {
    if (!id || id.trim().length === 0) {
      throw new Error('ShapeElement ID cannot be empty');
    }
    
    if (!geometry) {
      throw new Error('Geometry is required');
    }
  }

  /**
   * 判断是否为添加材料操作
   * 
   * @returns 如果是添加材料返回true
   */
  isAdditive(): boolean {
    return !this.inverted;
  }

  /**
   * 判断是否为切除材料操作
   * 
   * @returns 如果是切除材料返回true
   */
  isSubtractive(): boolean {
    return this.inverted;
  }

  /**
   * 转换为字符串表示
   * 
   * @returns 形状元素的字符串表示
   */
  toString(): string {
    const operation = this.inverted ? 'subtractive' : 'additive';
    return `ShapeElement(id=${this.id}, operation=${operation}, geometry=${this.geometry.id})`;
  }

  /**
   * 转换为JSON对象
   * 
   * @returns 形状元素的JSON表示
   */
  toJSON(): IShapeElement {
    return {
      id: this.id,
      geometry: this.geometry,
      inverted: this.inverted
    };
  }
}
