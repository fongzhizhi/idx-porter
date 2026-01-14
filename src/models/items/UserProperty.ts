/**
 * 用户属性实现
 * 
 * @description
 * 用于存储自定义的键值对属性。
 */

import { UserProperty as IUserProperty, PropertyKey } from '../../types/items';

/**
 * 用户属性类
 * 
 * @description
 * 实现UserProperty接口，提供键值对属性存储。
 * 
 * @example
 * ```typescript
 * const key = { systemScope: 'EDA', objectName: 'THICKNESS' };
 * const property = new UserProperty(key, '1.6');
 * ```
 */
export class UserProperty implements IUserProperty {
  /**
   * 创建用户属性
   * 
   * @param key - 属性键
   * @param value - 属性值
   */
  constructor(
    public readonly key: PropertyKey,
    public readonly value: string
  ) {
    if (!key) {
      throw new Error('Property key is required');
    }
    
    if (!key.systemScope || key.systemScope.trim().length === 0) {
      throw new Error('Property key system scope cannot be empty');
    }
    
    if (!key.objectName || key.objectName.trim().length === 0) {
      throw new Error('Property key object name cannot be empty');
    }
    
    if (value === null || value === undefined) {
      throw new Error('Property value cannot be null or undefined');
    }
  }

  /**
   * 转换为字符串表示
   * 
   * @returns 用户属性的字符串表示
   */
  toString(): string {
    return `${this.key.systemScope}:${this.key.objectName}=${this.value}`;
  }

  /**
   * 转换为JSON对象
   * 
   * @returns 用户属性的JSON表示
   */
  toJSON(): IUserProperty {
    return {
      key: this.key,
      value: this.value
    };
  }
}
