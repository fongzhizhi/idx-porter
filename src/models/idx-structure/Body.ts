/**
 * Body类实现
 * 
 * @description
 * 实现IDX文档主体，作为所有设计元素的容器。
 */

import { Body as IBody } from '../../types/idx-structure';
import { Item } from '../../types/items';
import { ShapeElement, GeometryElement } from '../../types/geometry';

/**
 * IDX文档主体实现类
 * 
 * @description
 * 提供IDX文档主体的创建和管理功能，包含所有设计元素。
 */
export class Body implements IBody {
  readonly items: Item[];
  readonly shapeElements: ShapeElement[];
  readonly geometryElements: GeometryElement[];

  /**
   * 创建Body实例
   * 
   * @param options - 可选的主体配置
   */
  constructor(options?: {
    items?: Item[];
    shapeElements?: ShapeElement[];
    geometryElements?: GeometryElement[];
  }) {
    this.items = options?.items || [];
    this.shapeElements = options?.shapeElements || [];
    this.geometryElements = options?.geometryElements || [];
  }

  /**
   * 添加Item
   * 
   * @param item - 要添加的Item
   */
  addItem(item: Item): void {
    (this.items as Item[]).push(item);
  }

  /**
   * 添加多个Item
   * 
   * @param items - 要添加的Item数组
   */
  addItems(items: Item[]): void {
    (this.items as Item[]).push(...items);
  }

  /**
   * 添加形状元素
   * 
   * @param shapeElement - 要添加的形状元素
   */
  addShapeElement(shapeElement: ShapeElement): void {
    (this.shapeElements as ShapeElement[]).push(shapeElement);
  }

  /**
   * 添加几何元素
   * 
   * @param geometryElement - 要添加的几何元素
   */
  addGeometryElement(geometryElement: GeometryElement): void {
    (this.geometryElements as GeometryElement[]).push(geometryElement);
  }

  /**
   * 获取Item数量
   */
  getItemCount(): number {
    return this.items.length;
  }

  /**
   * 获取形状元素数量
   */
  getShapeElementCount(): number {
    return this.shapeElements.length;
  }

  /**
   * 获取几何元素数量
   */
  getGeometryElementCount(): number {
    return this.geometryElements.length;
  }

  /**
   * 根据ID查找Item
   * 
   * @param id - Item的ID
   * @returns 找到的Item，如果不存在则返回undefined
   */
  findItemById(id: string): Item | undefined {
    return this.items.find(item => item.id === id);
  }

  /**
   * 转换为JSON对象
   */
  toJSON(): IBody {
    return {
      items: this.items,
      shapeElements: this.shapeElements,
      geometryElements: this.geometryElements
    };
  }

  /**
   * 从JSON对象创建Body实例
   */
  static fromJSON(json: IBody): Body {
    return new Body({
      items: json.items,
      shapeElements: json.shapeElements,
      geometryElements: json.geometryElements
    });
  }
}
