/**
 * 层叠结构Item模型
 * 
 * @description
 * 提供创建各种PCB层类型Item的辅助函数，包括丝印层、层叠结构、信号层、辅助层等。
 */

import { GeometryType, ItemType } from '../../types/enums';
import { Item, Identifier } from '../../types';

/**
 * 层定义选项
 */
export interface LayerOptions {
  /** 层标识符 */
  identifier: Identifier;
  /** 层类型 */
  geometryType: GeometryType;
  /** Z轴下界（毫米） */
  lowerBound?: number;
  /** Z轴上界（毫米） */
  upperBound?: number;
  /** 引用名称（可选） */
  referenceName?: string;
  /** 是否为基线 */
  baseline?: boolean;
  /** Item ID */
  id?: string;
  /** Item名称 */
  name?: string;
}

/**
 * 创建层Item的通用函数
 * 
 * @param options - 层定义选项
 * @returns 层Item对象
 */
export function createLayerItem(options: LayerOptions): Item {
  const {
    identifier,
    geometryType,
    lowerBound,
    upperBound,
    referenceName,
    baseline = false,
    id = `LAYER_${identifier.number}`,
    name = `Layer ${identifier.number}`
  } = options;

  // 验证层类型
  const validLayerTypes = [
    GeometryType.LAYER_SILKSCREEN,
    GeometryType.LAYER_SOLDERMASK,
    GeometryType.LAYER_SOLDERPASTE,
    GeometryType.LAYER_OTHERSIGNAL,
    GeometryType.LAYER_POWERORGROUND,
    GeometryType.LAYER_DIELECTRIC,
    GeometryType.LAYER_STACKUP
  ];

  if (!validLayerTypes.includes(geometryType)) {
    throw new Error(`Invalid layer geometry type: ${geometryType}`);
  }

  // 验证Z轴范围
  if (lowerBound !== undefined && upperBound !== undefined) {
    if (lowerBound >= upperBound) {
      throw new Error(`LowerBound (${lowerBound}) must be less than UpperBound (${upperBound})`);
    }
  }

  return {
    id,
    name,
    identifier,
    itemType: ItemType.SINGLE,
    geometryType,
    referenceName,
    baseline
  };
}

/**
 * 创建丝印层Item
 * 
 * @param identifier - 层标识符
 * @param options - 可选参数
 * @returns 丝印层Item
 */
export function createSilkscreenLayer(
  identifier: Identifier,
  options?: {
    lowerBound?: number;
    upperBound?: number;
    referenceName?: string;
    id?: string;
    name?: string;
  }
): Item {
  return createLayerItem({
    identifier,
    geometryType: GeometryType.LAYER_SILKSCREEN,
    ...options
  });
}

/**
 * 创建层叠结构Item
 * 
 * @param identifier - 层标识符
 * @param lowerBound - Z轴下界
 * @param upperBound - Z轴上界
 * @param options - 可选参数
 * @returns 层叠结构Item
 */
export function createStackupLayer(
  identifier: Identifier,
  lowerBound: number,
  upperBound: number,
  options?: {
    referenceName?: string;
    id?: string;
    name?: string;
  }
): Item {
  return createLayerItem({
    identifier,
    geometryType: GeometryType.LAYER_STACKUP,
    lowerBound,
    upperBound,
    ...options
  });
}

/**
 * 创建信号层Item
 * 
 * @param identifier - 层标识符
 * @param lowerBound - Z轴下界
 * @param upperBound - Z轴上界
 * @param options - 可选参数
 * @returns 信号层Item
 */
export function createSignalLayer(
  identifier: Identifier,
  lowerBound: number,
  upperBound: number,
  options?: {
    referenceName?: string;
    id?: string;
    name?: string;
  }
): Item {
  return createLayerItem({
    identifier,
    geometryType: GeometryType.LAYER_OTHERSIGNAL,
    lowerBound,
    upperBound,
    ...options
  });
}

/**
 * 创建电源/地层Item
 * 
 * @param identifier - 层标识符
 * @param lowerBound - Z轴下界
 * @param upperBound - Z轴上界
 * @param options - 可选参数
 * @returns 电源/地层Item
 */
export function createPowerGroundLayer(
  identifier: Identifier,
  lowerBound: number,
  upperBound: number,
  options?: {
    referenceName?: string;
    id?: string;
    name?: string;
  }
): Item {
  return createLayerItem({
    identifier,
    geometryType: GeometryType.LAYER_POWERORGROUND,
    lowerBound,
    upperBound,
    ...options
  });
}

/**
 * 创建阻焊层Item
 * 
 * @param identifier - 层标识符
 * @param options - 可选参数
 * @returns 阻焊层Item
 */
export function createSoldermaskLayer(
  identifier: Identifier,
  options?: {
    lowerBound?: number;
    upperBound?: number;
    referenceName?: string;
    id?: string;
    name?: string;
  }
): Item {
  return createLayerItem({
    identifier,
    geometryType: GeometryType.LAYER_SOLDERMASK,
    ...options
  });
}

/**
 * 创建锡膏层Item
 * 
 * @param identifier - 层标识符
 * @param options - 可选参数
 * @returns 锡膏层Item
 */
export function createSolderpasteLayer(
  identifier: Identifier,
  options?: {
    lowerBound?: number;
    upperBound?: number;
    referenceName?: string;
    id?: string;
    name?: string;
  }
): Item {
  return createLayerItem({
    identifier,
    geometryType: GeometryType.LAYER_SOLDERPASTE,
    ...options
  });
}

/**
 * 创建介质层Item
 * 
 * @param identifier - 层标识符
 * @param lowerBound - Z轴下界
 * @param upperBound - Z轴上界
 * @param options - 可选参数
 * @returns 介质层Item
 */
export function createDielectricLayer(
  identifier: Identifier,
  lowerBound: number,
  upperBound: number,
  options?: {
    referenceName?: string;
    id?: string;
    name?: string;
  }
): Item {
  return createLayerItem({
    identifier,
    geometryType: GeometryType.LAYER_DIELECTRIC,
    lowerBound,
    upperBound,
    ...options
  });
}
