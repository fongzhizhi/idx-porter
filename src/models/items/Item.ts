/**
 * Item基类实现
 * 
 * @description
 * 表示IDX中的基本Item结构，是所有设计元素的基础。
 */

import { Item as IItem, Identifier, ItemInstance, UserProperty } from '../../types/items';
import { ItemType, GeometryType } from '../../types/enums';

/**
 * Item类
 * 
 * @description
 * 实现Item接口，提供IDX Item的基础功能。
 * 
 * @example
 * ```typescript
 * const identifier = new Identifier('EDA', 'BOARD-001', '1.0', 'A', 1);
 * const item = new Item('item1', 'Board', ItemType.SINGLE, identifier);
 * ```
 */
export class Item implements IItem {
  /**
   * 创建Item
   * 
   * @param id - Item的唯一标识符
   * @param name - Item名称
   * @param itemType - Item类型（single或assembly）
   * @param identifier - 标识符
   * @param geometryType - 可选的几何类型
   * @param description - 可选的描述信息
   * @param referenceName - 可选的引用名称
   * @param baseline - 是否为基线项目
   * @param userProperties - 用户属性列表
   * @param itemInstance - 可选的Item实例
   * @param assembleToName - 装配到的目标名称
   * @param shape - 关联的形状元素ID
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly itemType: ItemType,
    public readonly identifier: Identifier,
    public readonly geometryType?: GeometryType,
    public readonly description?: string,
    public readonly referenceName?: string,
    public readonly baseline?: boolean,
    public readonly userProperties?: UserProperty[],
    public readonly itemInstance?: ItemInstance,
    public readonly assembleToName?: string,
    public readonly shape?: string
  ) {
    if (!id || id.trim().length === 0) {
      throw new Error('Item ID cannot be empty');
    }
    
    if (!name || name.trim().length === 0) {
      throw new Error('Item name cannot be empty');
    }
    
    if (!identifier) {
      throw new Error('Identifier is required');
    }
  }

  /**
   * 判断是否为single类型
   * 
   * @returns 如果是single类型返回true
   */
  isSingle(): boolean {
    return this.itemType === ItemType.SINGLE;
  }

  /**
   * 判断是否为assembly类型
   * 
   * @returns 如果是assembly类型返回true
   */
  isAssembly(): boolean {
    return this.itemType === ItemType.ASSEMBLY;
  }

  /**
   * 转换为字符串表示
   * 
   * @returns Item的字符串表示
   */
  toString(): string {
    return `Item(id=${this.id}, name=${this.name}, type=${this.itemType}, geometryType=${this.geometryType})`;
  }

  /**
   * 转换为JSON对象
   * 
   * @returns Item的JSON表示
   */
  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      itemType: this.itemType,
      identifier: this.identifier,
      geometryType: this.geometryType,
      description: this.description,
      referenceName: this.referenceName,
      baseline: this.baseline,
      userProperties: this.userProperties,
      itemInstance: this.itemInstance,
      assembleToName: this.assembleToName,
      shape: this.shape
    };
  }
}
