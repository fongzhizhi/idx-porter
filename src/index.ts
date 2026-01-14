/**
 * IDXPorter - TypeScript library for generating IDX V4.5 protocol files
 * 
 * @description
 * IDXPorter是一个专门用于生成符合IDX V4.5版本标准的协议文件的TypeScript工具库。
 * IDX（ECAD/MCAD Collaboration）是一种基于XML的开放数据交换标准，用于电子设计
 * 自动化（ECAD）系统和机械设计自动化（MCAD）系统之间的印刷电路板（PCB）设计数据协作。
 * 
 * @example
 * ```typescript
 * import { IDXBuilder } from 'idx-porter';
 * 
 * // TEST_CASE: Basic IDX document creation
 * // TEST_INPUT: headerOptions, boardDefinition, componentDefinition
 * // TEST_EXPECT: Valid IDX XML string output
 * const builder = new IDXBuilder();
 * const idxContent = await builder
 *   .createHeader({ creatorCompany: 'MyCompany' })
 *   .addBoardOutline(boardDefinition)
 *   .addComponent(componentDefinition)
 *   .export();
 * ```
 * 
 * @version 1.0.0
 * @author IDXPorter Team
 * @license MIT
 */

// ============= 主要导出接口 =============
export * from './interfaces';

// ============= 核心类导出 =============
export * from './core/IDXBuilder';
export * from './core/GeometryFactory';
export * from './core/ItemFactory';

// ============= 数据模型导出 =============
export * from './models';

// ============= 枚举类型导出 =============
export * from './types/enums';

// ============= 工具函数导出 =============
export * from './utils';

// TODO: 错误类型将在任务19中实现
// ============= 错误类型导出 =============
// export * from './errors';

// ============= 版本信息 =============
export const VERSION = '1.0.0';