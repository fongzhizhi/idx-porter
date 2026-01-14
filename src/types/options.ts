/**
 * 配置和选项类型定义
 * 
 * @description
 * 定义IDXPorter的配置选项和各种功能的选项参数。
 */

import { UnitLength } from './enums';

/**
 * XML格式化选项
 * 
 * @description
 * 控制XML输出的格式化行为。
 */
export interface XMLFormattingOptions {
  /** 是否启用缩进 */
  readonly indent: boolean;
  /** 缩进大小（空格数） */
  readonly indentSize: number;
  /** 换行符类型 */
  readonly newline?: '\n' | '\r\n';
}

/**
 * 验证选项
 * 
 * @description
 * 控制数据验证的行为。
 */
export interface ValidationOptions {
  /** 是否启用严格模式 */
  readonly strict: boolean;
  /** 是否对缺失引用发出警告 */
  readonly warnOnMissingReferences: boolean;
}

/**
 * 性能选项
 * 
 * @description
 * 控制性能优化相关的行为。
 */
export interface PerformanceOptions {
  /** 是否使用对象池 */
  readonly useObjectPool: boolean;
  /** 是否使用流式输出 */
  readonly streamingOutput: boolean;
}

/**
 * IDXPorter配置接口
 * 
 * @description
 * IDXPorter的完整配置选项。
 */
export interface IDXPorterConfig {
  /** 默认单位 */
  readonly defaultUnit: UnitLength;
  /** 精度设置（小数位数） */
  readonly precision: number;
  /** XML格式化选项 */
  readonly xmlFormatting: XMLFormattingOptions;
  /** 验证选项 */
  readonly validation: ValidationOptions;
  /** 性能选项 */
  readonly performance: PerformanceOptions;
}

/**
 * Header创建选项
 * 
 * @description
 * 用于创建IDX文档头部的选项参数。
 */
export interface HeaderOptions {
  /** 创建者名称 */
  readonly creatorName?: string;
  /** 文档描述 */
  readonly description?: string;
  /** 创建者公司 */
  readonly creatorCompany?: string;
  /** 创建者系统 */
  readonly creatorSystem?: string;
  /** 创建者 */
  readonly creator?: string;
  /** 全局长度单位 */
  readonly globalUnitLength?: UnitLength;
  /** 创建日期时间（如果不提供，将使用当前时间） */
  readonly creationDateTime?: string;
}

/**
 * 导出选项
 * 
 * @description
 * 控制IDX文件导出的行为。
 */
export interface ExportOptions {
  /** 输出文件路径 */
  readonly outputPath?: string;
  /** 是否包含注释 */
  readonly includeComments?: boolean;
  /** 注释详细程度（0-3，0为无注释，3为最详细） */
  readonly commentLevel?: number;
  /** 是否美化输出 */
  readonly prettyPrint?: boolean;
}
