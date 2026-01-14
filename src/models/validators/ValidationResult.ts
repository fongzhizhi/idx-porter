/**
 * 验证结果类型定义
 * 
 * @description
 * 定义验证结果的结构，包含验证状态、错误和警告信息。
 */

/**
 * 验证错误
 */
export interface ValidationError {
  /** 错误代码 */
  readonly code: string;
  /** 错误消息 */
  readonly message: string;
  /** 错误字段路径 */
  readonly field?: string;
  /** 错误的值 */
  readonly value?: any;
}

/**
 * 验证警告
 */
export interface ValidationWarning {
  /** 警告代码 */
  readonly code: string;
  /** 警告消息 */
  readonly message: string;
  /** 警告字段路径 */
  readonly field?: string;
}

/**
 * 验证结果
 */
export interface ValidationResult {
  /** 是否验证通过 */
  readonly isValid: boolean;
  /** 错误列表 */
  readonly errors: ValidationError[];
  /** 警告列表 */
  readonly warnings: ValidationWarning[];
}

/**
 * 创建成功的验证结果
 */
export function createValidResult(warnings: ValidationWarning[] = []): ValidationResult {
  return {
    isValid: true,
    errors: [],
    warnings
  };
}

/**
 * 创建失败的验证结果
 */
export function createInvalidResult(
  errors: ValidationError[],
  warnings: ValidationWarning[] = []
): ValidationResult {
  return {
    isValid: false,
    errors,
    warnings
  };
}

/**
 * 合并多个验证结果
 */
export function mergeValidationResults(...results: ValidationResult[]): ValidationResult {
  const allErrors: ValidationError[] = [];
  const allWarnings: ValidationWarning[] = [];
  
  for (const result of results) {
    allErrors.push(...result.errors);
    allWarnings.push(...result.warnings);
  }
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings
  };
}
