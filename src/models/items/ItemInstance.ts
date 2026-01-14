/**
 * Item实例实现
 * 
 * @description
 * 表示Item的一个实例，包含实例名称、变换和引用的Item。
 */

import { ItemInstance as IItemInstance, InstanceName, Transformation, UserProperty } from '../../types/items';

/**
 * Item实例类
 * 
 * @description
 * 实现ItemInstance接口，提供Item实例化功能。
 * 
 * @example
 * ```typescript
 * const instanceName = { systemScope: 'EDA', objectName: 'U1' };
 * const instance = new ItemInstance(instanceName);
 * ```
 */
export class ItemInstance implements IItemInstance {
  /**
   * 创建Item实例
   * 
   * @param instanceName - 实例名称
   * @param transformation - 可选的变换矩阵
   * @param item - 引用的Item ID
   * @param userProperties - 用户属性列表
   */
  constructor(
    public readonly instanceName: InstanceName,
    public readonly transformation?: Transformation,
    public readonly item?: string,
    public readonly userProperties?: UserProperty[]
  ) {
    if (!instanceName) {
      throw new Error('Instance name is required');
    }
    
    if (!instanceName.systemScope || instanceName.systemScope.trim().length === 0) {
      throw new Error('Instance name system scope cannot be empty');
    }
    
    if (!instanceName.objectName || instanceName.objectName.trim().length === 0) {
      throw new Error('Instance name object name cannot be empty');
    }
  }

  /**
   * 转换为字符串表示
   * 
   * @returns Item实例的字符串表示
   */
  toString(): string {
    return `ItemInstance(${this.instanceName.systemScope}:${this.instanceName.objectName})`;
  }

  /**
   * 转换为JSON对象
   * 
   * @returns Item实例的JSON表示
   */
  toJSON(): any {
    return {
      instanceName: this.instanceName,
      transformation: this.transformation,
      item: this.item,
      userProperties: this.userProperties
    };
  }
}
