/**
 * Item工厂接口
 * 
 * @description
 * 定义Item工厂的接口，提供统一的Item创建API。
 */

import { Item, ItemInstance, UserProperty, Identifier, InstanceName, PropertyKey, Transformation } from '../types/items';
import { ItemType, GeometryType } from '../types/enums';

/**
 * Item工厂接口
 * 
 * @description
 * 提供统一的Item创建API，包括ID管理和引用完整性检查。
 * 
 * @example
 * ```typescript
 * const factory = new ItemFactory();
 * const identifier = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 1);
 * const item = factory.createItem('item1', 'Board', ItemType.SINGLE, identifier);
 * ```
 */
export interface IItemFactory {
  /**
   * 创建Item
   * 
   * @param id - Item的唯一标识符
   * @param name - Item名称
   * @param itemType - Item类型（single或assembly）
   * @param identifier - 标识符
   * @param geometryType - 可选的几何类型
   * @param options - 可选的其他属性
   * @returns Item实例
   */
  createItem(
    id: string,
    name: string,
    itemType: ItemType,
    identifier: Identifier,
    geometryType?: GeometryType,
    options?: {
      description?: string;
      referenceName?: string;
      baseline?: boolean;
      userProperties?: UserProperty[];
      itemInstance?: ItemInstance;
      assembleToName?: string;
      shape?: string;
    }
  ): Item;

  /**
   * 创建标识符
   * 
   * @param systemScope - 系统范围
   * @param number - 编号
   * @param version - 版本
   * @param revision - 修订版本
   * @param sequence - 序列号
   * @returns Identifier实例
   */
  createIdentifier(
    systemScope: string,
    number: string,
    version: string,
    revision: string,
    sequence: number
  ): Identifier;

  /**
   * 创建Item实例
   * 
   * @param instanceName - 实例名称
   * @param transformation - 可选的变换矩阵
   * @param item - 引用的Item ID
   * @param userProperties - 用户属性列表
   * @returns ItemInstance实例
   */
  createItemInstance(
    instanceName: InstanceName,
    transformation?: Transformation,
    item?: string,
    userProperties?: UserProperty[]
  ): ItemInstance;

  /**
   * 创建用户属性
   * 
   * @param key - 属性键
   * @param value - 属性值
   * @returns UserProperty实例
   */
  createUserProperty(key: PropertyKey, value: string): UserProperty;

  /**
   * 创建实例名称
   * 
   * @param systemScope - 系统范围
   * @param objectName - 对象名称
   * @returns InstanceName对象
   */
  createInstanceName(systemScope: string, objectName: string): InstanceName;

  /**
   * 创建属性键
   * 
   * @param systemScope - 系统范围
   * @param objectName - 对象名称
   * @returns PropertyKey对象
   */
  createPropertyKey(systemScope: string, objectName: string): PropertyKey;

  /**
   * 重置ID计数器
   */
  resetIdCounter(): void;

  /**
   * 获取当前ID计数
   * 
   * @returns 当前ID计数
   */
  getIdCount(): number;
}
