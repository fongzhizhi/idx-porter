/**
 * 接口定义模块
 * 
 * @description
 * 包含IDXPorter的所有核心接口定义，为系统提供清晰的契约和抽象。
 * 这些接口定义了各个组件之间的交互方式，确保系统的模块化和可扩展性。
 */

// ============= 核心构建器接口 =============
export * from './IIDXBuilder';
export * from './IGeometryFactory';
export * from './IItemFactory';
export * from './IIDXExporter';

// ============= 验证器接口 =============
export * from './IValidator';

// ============= 插件接口 =============
export * from './IGeometryTypePlugin';

// ============= 配置接口 =============
export * from './IIDXPorterConfig';