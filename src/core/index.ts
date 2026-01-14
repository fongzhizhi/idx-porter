/**
 * 核心模块
 * 
 * @description
 * 包含IDXPorter的核心功能实现，包括构建器、工厂类和导出引擎等。
 * 这些类协调整个IDX文档的构建和导出过程。
 */

// ============= 主要构建器 =============
export * from './IDXBuilder';

// ============= 工厂类 =============
export * from './GeometryFactory';
export * from './ItemFactory';

// ============= 导出引擎 =============
export * from './IDXExporter';

// ============= XML生成器 =============
export * from './XMLGenerator';