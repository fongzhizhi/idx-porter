/**
 * 验证器接口
 * 
 * @description
 * 定义通用的验证器接口，用于验证各种数据类型。
 */

import { ValidationResult } from './ValidationResult';

/**
 * 验证器接口
 * 
 * @template T - 要验证的数据类型
 */
export interface IValidator<T> {
  /**
   * 验证数据
   * 
   * @param data - 要验证的数据
   * @returns 验证结果
   */
  validate(data: T): ValidationResult;
}
