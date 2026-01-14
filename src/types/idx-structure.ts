/**
 * IDX结构类型定义
 * 
 * @description
 * 定义IDX文档的整体结构，包括Header、Body和ProcessInstruction。
 */

import { UnitLength, ProcessInstructionType } from './enums';
import { UserProperty, Item } from './items';
import { ShapeElement, GeometryElement } from './geometry';

/**
 * IDX文档头部
 * 
 * @description
 * 包含IDX文档的元数据信息，如创建者、时间戳、单位等。
 */
export interface Header {
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
  readonly globalUnitLength: UnitLength;
  /** 创建日期时间（ISO 8601格式） */
  readonly creationDateTime?: string;
  /** 用户属性列表 */
  readonly userProperties?: UserProperty[];
}

/**
 * IDX文档主体
 * 
 * @description
 * 包含所有设计元素的容器，包括Item、形状元素和几何元素。
 */
export interface Body {
  /** Item列表 */
  readonly items: Item[];
  /** 形状元素列表 */
  readonly shapeElements: ShapeElement[];
  /** 几何元素列表 */
  readonly geometryElements: GeometryElement[];
}

/**
 * 处理指令
 * 
 * @description
 * 定义IDX文档的处理方式。
 */
export interface ProcessInstruction {
  /** 处理指令类型 */
  readonly type: ProcessInstructionType;
}

/**
 * 完整的IDX文档
 * 
 * @description
 * 表示一个完整的IDX V4.5文档，包含Header、Body和ProcessInstruction三个部分。
 */
export interface IDXDocument {
  /** 文档头部 */
  readonly header: Header;
  /** 文档主体 */
  readonly body: Body;
  /** 处理指令 */
  readonly processInstruction: ProcessInstruction;
}
