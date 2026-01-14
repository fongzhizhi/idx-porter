/**
 * 标识符实现
 * 
 * @description
 * 用于唯一标识Item的完整标识符结构。
 */

import { Identifier as IIdentifier } from '../../types/items';

/**
 * 标识符类
 * 
 * @description
 * 实现Identifier接口，提供Item的唯一标识。
 * 
 * @example
 * ```typescript
 * const identifier = new Identifier('EDA_SYSTEM', 'PCB-001', '1.0', 'A', 1);
 * ```
 */
export class Identifier implements IIdentifier {
  /**
   * 创建标识符
   * 
   * @param systemScope - 系统范围
   * @param number - 编号
   * @param version - 版本
   * @param revision - 修订版本
   * @param sequence - 序列号
   */
  constructor(
    public readonly systemScope: string,
    public readonly number: string,
    public readonly version: string,
    public readonly revision: string,
    public readonly sequence: number
  ) {
    if (!systemScope || systemScope.trim().length === 0) {
      throw new Error('System scope cannot be empty');
    }
    
    if (!number || number.trim().length === 0) {
      throw new Error('Number cannot be empty');
    }
    
    if (!version || version.trim().length === 0) {
      throw new Error('Version cannot be empty');
    }
    
    if (!revision || revision.trim().length === 0) {
      throw new Error('Revision cannot be empty');
    }
    
    if (!Number.isInteger(sequence) || sequence < 0) {
      throw new Error(`Invalid sequence: ${sequence}`);
    }
  }

  /**
   * 转换为字符串表示
   * 
   * @returns 标识符的字符串表示
   */
  toString(): string {
    return `${this.systemScope}:${this.number}:${this.version}:${this.revision}:${this.sequence}`;
  }

  /**
   * 转换为JSON对象
   * 
   * @returns 标识符的JSON表示
   */
  toJSON(): IIdentifier {
    return {
      systemScope: this.systemScope,
      number: this.number,
      version: this.version,
      revision: this.revision,
      sequence: this.sequence
    };
  }
}
