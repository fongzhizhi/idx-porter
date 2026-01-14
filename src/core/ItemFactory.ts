/**
 * Item工厂类
 * 
 * @description
 * 提供统一的Item创建API，包括ID管理和引用完整性检查。
 */

import { IItemFactory } from '../interfaces/IItemFactory';
import { Item as ItemClass } from '../models/items/Item';
import { Identifier as IdentifierClass } from '../models/items/Identifier';
import { ItemInstance as ItemInstanceClass } from '../models/items/ItemInstance';
import { UserProperty as UserPropertyClass } from '../models/items/UserProperty';
import { Item, ItemInstance, UserProperty, Identifier, InstanceName, PropertyKey, Transformation } from '../types/items';
import { ItemType, GeometryType } from '../types/enums';

/**
 * Item工厂类
 * 
 * @description
 * 实现IItemFactory接口，提供统一的Item创建API。
 * 
 * @example
 * ```typescript
 * const factory = new ItemFactory();
 * const identifier = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 1);
 * const item = factory.createItem('item1', 'Board', ItemType.SINGLE, identifier);
 * ```
 */
export class ItemFactory implements IItemFactory {
  private readonly itemRegistry: Map<string, Item> = new Map();
  private sequenceCounter: number = 0;

  /**
   * 创建Item工厂
   */
  constructor() {
    // 初始化工厂
  }

  /**
   * 生成下一个序列号
   * 
   * @returns 序列号
   */
  private generateSequence(): number {
    return ++this.sequenceCounter;
  }

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
  ): Item {
    // 检查ID是否已存在
    if (this.itemRegistry.has(id)) {
      throw new Error(`Item with ID '${id}' already exists`);
    }

    // 验证引用完整性
    if (options?.itemInstance?.item) {
      const referencedItemId = options.itemInstance.item;
      if (!this.itemRegistry.has(referencedItemId)) {
        throw new Error(`Referenced Item '${referencedItemId}' does not exist`);
      }
    }

    const item = new ItemClass(
      id,
      name,
      itemType,
      identifier,
      geometryType,
      options?.description,
      options?.referenceName,
      options?.baseline,
      options?.userProperties,
      options?.itemInstance,
      options?.assembleToName,
      options?.shape
    );

    // 注册Item
    this.itemRegistry.set(id, item);

    return item;
  }

  /**
   * 创建标识符
   * 
   * @param systemScope - 系统范围
   * @param number - 编号
   * @param version - 版本
   * @param revision - 修订版本
   * @param sequence - 序列号（如果为0或负数，自动生成）
   * @returns Identifier实例
   */
  createIdentifier(
    systemScope: string,
    number: string,
    version: string,
    revision: string,
    sequence: number
  ): Identifier {
    // 如果sequence为0或负数，自动生成
    const actualSequence = sequence > 0 ? sequence : this.generateSequence();
    
    return new IdentifierClass(
      systemScope,
      number,
      version,
      revision,
      actualSequence
    );
  }

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
  ): ItemInstance {
    // 验证引用的Item是否存在
    if (item && !this.itemRegistry.has(item)) {
      throw new Error(`Referenced Item '${item}' does not exist`);
    }

    return new ItemInstanceClass(
      instanceName,
      transformation,
      item,
      userProperties
    );
  }

  /**
   * 创建用户属性
   * 
   * @param key - 属性键
   * @param value - 属性值
   * @returns UserProperty实例
   */
  createUserProperty(key: PropertyKey, value: string): UserProperty {
    return new UserPropertyClass(key, value);
  }

  /**
   * 创建实例名称
   * 
   * @param systemScope - 系统范围
   * @param objectName - 对象名称
   * @returns InstanceName对象
   */
  createInstanceName(systemScope: string, objectName: string): InstanceName {
    if (!systemScope || systemScope.trim().length === 0) {
      throw new Error('System scope cannot be empty');
    }
    
    if (!objectName || objectName.trim().length === 0) {
      throw new Error('Object name cannot be empty');
    }

    return {
      systemScope,
      objectName
    };
  }

  /**
   * 创建属性键
   * 
   * @param systemScope - 系统范围
   * @param objectName - 对象名称
   * @returns PropertyKey对象
   */
  createPropertyKey(systemScope: string, objectName: string): PropertyKey {
    if (!systemScope || systemScope.trim().length === 0) {
      throw new Error('System scope cannot be empty');
    }
    
    if (!objectName || objectName.trim().length === 0) {
      throw new Error('Object name cannot be empty');
    }

    return {
      systemScope,
      objectName
    };
  }

  /**
   * 检查Item是否存在
   * 
   * @param id - Item ID
   * @returns 如果存在返回true
   */
  hasItem(id: string): boolean {
    return this.itemRegistry.has(id);
  }

  /**
   * 获取Item
   * 
   * @param id - Item ID
   * @returns Item实例，如果不存在返回undefined
   */
  getItem(id: string): Item | undefined {
    return this.itemRegistry.get(id);
  }

  /**
   * 获取所有Item
   * 
   * @returns 所有Item的数组
   */
  getAllItems(): Item[] {
    return Array.from(this.itemRegistry.values());
  }

  /**
   * 清除所有Item
   */
  clearItems(): void {
    this.itemRegistry.clear();
  }

  /**
   * 重置ID计数器
   */
  resetIdCounter(): void {
    this.sequenceCounter = 0;
  }

  /**
   * 获取当前ID计数
   * 
   * @returns 当前ID计数
   */
  getIdCount(): number {
    return 0; // 不再使用ID计数器
  }

  /**
   * 获取当前序列号计数
   * 
   * @returns 当前序列号计数
   */
  getSequenceCount(): number {
    return this.sequenceCounter;
  }

  /**
   * 获取注册的Item数量
   * 
   * @returns Item数量
   */
  getItemCount(): number {
    return this.itemRegistry.size;
  }
}
