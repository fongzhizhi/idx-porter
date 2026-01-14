/**
 * 禁止区域和保留区域Item模型
 * 
 * @description
 * 提供创建各种禁止区域和保留区域Item的辅助函数，用于描述设计约束和限制区域。
 */

import { GeometryType, ItemType } from '../../types/enums';
import { Item, Identifier, UserProperty } from '../../types/items';

/**
 * 禁止/保留区域定义选项
 */
export interface KeepoutAreaOptions {
  /** 区域标识符 */
  identifier: Identifier;
  /** 区域类型 */
  geometryType: GeometryType;
  /** Z轴下界（毫米，可选） */
  lowerBound?: number;
  /** Z轴上界（毫米，可选） */
  upperBound?: number;
  /** 安装到的层或表面名称（可选） */
  assembleToName?: string;
  /** 引用名称（可选） */
  referenceName?: string;
  /** 是否为基线 */
  baseline?: boolean;
  /** Item ID */
  id?: string;
  /** Item名称 */
  name?: string;
  /** 用户属性列表 */
  userProperties?: UserProperty[];
}

/**
 * 禁止/保留区域通用选项（用于便捷函数）
 */
export interface KeepoutAreaCommonOptions {
  /** Z轴下界（毫米，可选） */
  lowerBound?: number;
  /** Z轴上界（毫米，可选） */
  upperBound?: number;
  /** 安装到的层或表面名称（可选） */
  assembleToName?: string;
  /** 引用名称（可选） */
  referenceName?: string;
  /** 是否为基线 */
  baseline?: boolean;
  /** Item ID */
  id?: string;
  /** Item名称 */
  name?: string;
  /** 用户属性列表 */
  userProperties?: UserProperty[];
}

/**
 * 创建禁止/保留区域Item的通用函数
 * 
 * @param options - 区域定义选项
 * @returns 区域Item对象
 */
export function createKeepoutAreaItem(options: KeepoutAreaOptions): Item {
  const {
    identifier,
    geometryType,
    lowerBound,
    upperBound,
    assembleToName,
    referenceName,
    baseline = false,
    id = `KEEPOUT_${identifier.number}`,
    name = `Keepout ${identifier.number}`,
    userProperties = []
  } = options;

  // 验证区域类型
  const validKeepoutTypes = [
    GeometryType.KEEPOUT_AREA_COMPONENT,
    GeometryType.KEEPOUT_AREA_ROUTE,
    GeometryType.KEEPOUT_AREA_VIA,
    GeometryType.KEEPOUT_AREA_TESTPOINT,
    GeometryType.KEEPOUT_AREA_THERMAL,
    GeometryType.KEEPOUT_AREA_OTHER,
    GeometryType.KEEPIN_AREA_COMPONENT,
    GeometryType.KEEPIN_AREA_ROUTE,
    GeometryType.KEEPIN_AREA_VIA,
    GeometryType.KEEPIN_AREA_TESTPOINT,
    GeometryType.KEEPIN_AREA_OTHER
  ];

  if (!validKeepoutTypes.includes(geometryType)) {
    throw new Error(`Invalid keepout/keepin area geometry type: ${geometryType}`);
  }

  // 验证Z轴范围
  if (lowerBound !== undefined && upperBound !== undefined) {
    if (lowerBound >= upperBound) {
      throw new Error(`LowerBound (${lowerBound}) must be less than UpperBound (${upperBound})`);
    }
  }

  // 添加Z轴范围到用户属性
  let finalUserProperties = [...userProperties];
  if (lowerBound !== undefined) {
    finalUserProperties.push({
      key: { systemScope: 'IDX', objectName: 'LOWER_BOUND' },
      value: lowerBound.toString()
    });
  }
  if (upperBound !== undefined) {
    finalUserProperties.push({
      key: { systemScope: 'IDX', objectName: 'UPPER_BOUND' },
      value: upperBound.toString()
    });
  }

  return {
    id,
    name,
    identifier,
    itemType: ItemType.SINGLE,
    geometryType,
    assembleToName,
    referenceName,
    baseline,
    userProperties: finalUserProperties.length > 0 ? finalUserProperties : undefined
  };
}

// ============ 禁止区域创建函数 ============

/**
 * 创建组件禁止区Item
 */
export function createComponentKeepout(
  identifier: Identifier,
  options?: KeepoutAreaCommonOptions
): Item {
  return createKeepoutAreaItem({
    identifier,
    geometryType: GeometryType.KEEPOUT_AREA_COMPONENT,
    ...options
  });
}

/**
 * 创建布线禁止区Item
 */
export function createRouteKeepout(
  identifier: Identifier,
  options?: KeepoutAreaCommonOptions
): Item {
  return createKeepoutAreaItem({
    identifier,
    geometryType: GeometryType.KEEPOUT_AREA_ROUTE,
    ...options
  });
}

/**
 * 创建过孔禁止区Item
 */
export function createViaKeepout(
  identifier: Identifier,
  options?: KeepoutAreaCommonOptions
): Item {
  return createKeepoutAreaItem({
    identifier,
    geometryType: GeometryType.KEEPOUT_AREA_VIA,
    ...options
  });
}

/**
 * 创建测试点禁止区Item
 */
export function createTestpointKeepout(
  identifier: Identifier,
  options?: KeepoutAreaCommonOptions
): Item {
  return createKeepoutAreaItem({
    identifier,
    geometryType: GeometryType.KEEPOUT_AREA_TESTPOINT,
    ...options
  });
}

/**
 * 创建热禁止区Item
 */
export function createThermalKeepout(
  identifier: Identifier,
  options?: KeepoutAreaCommonOptions
): Item {
  return createKeepoutAreaItem({
    identifier,
    geometryType: GeometryType.KEEPOUT_AREA_THERMAL,
    ...options
  });
}

/**
 * 创建其他禁止区Item
 */
export function createOtherKeepout(
  identifier: Identifier,
  options?: KeepoutAreaCommonOptions
): Item {
  return createKeepoutAreaItem({
    identifier,
    geometryType: GeometryType.KEEPOUT_AREA_OTHER,
    ...options
  });
}

// ============ 保留区域创建函数 ============

/**
 * 创建组件保留区Item
 */
export function createComponentKeepin(
  identifier: Identifier,
  options?: KeepoutAreaCommonOptions
): Item {
  return createKeepoutAreaItem({
    identifier,
    geometryType: GeometryType.KEEPIN_AREA_COMPONENT,
    ...options
  });
}

/**
 * 创建布线保留区Item
 */
export function createRouteKeepin(
  identifier: Identifier,
  options?: KeepoutAreaCommonOptions
): Item {
  return createKeepoutAreaItem({
    identifier,
    geometryType: GeometryType.KEEPIN_AREA_ROUTE,
    ...options
  });
}

/**
 * 创建过孔保留区Item
 */
export function createViaKeepin(
  identifier: Identifier,
  options?: KeepoutAreaCommonOptions
): Item {
  return createKeepoutAreaItem({
    identifier,
    geometryType: GeometryType.KEEPIN_AREA_VIA,
    ...options
  });
}

/**
 * 创建测试点保留区Item
 */
export function createTestpointKeepin(
  identifier: Identifier,
  options?: KeepoutAreaCommonOptions
): Item {
  return createKeepoutAreaItem({
    identifier,
    geometryType: GeometryType.KEEPIN_AREA_TESTPOINT,
    ...options
  });
}

/**
 * 创建其他保留区Item
 */
export function createOtherKeepin(
  identifier: Identifier,
  options?: KeepoutAreaCommonOptions
): Item {
  return createKeepoutAreaItem({
    identifier,
    geometryType: GeometryType.KEEPIN_AREA_OTHER,
    ...options
  });
}

/**
 * 从Item中提取Z轴范围
 * 
 * @param item - Item对象
 * @returns Z轴范围，如果未找到则返回undefined
 */
export function getZAxisBounds(item: Item): { lowerBound: number; upperBound: number } | undefined {
  if (!item.userProperties) {
    return undefined;
  }

  const lowerProp = item.userProperties.find(
    prop => prop.key.objectName === 'LOWER_BOUND'
  );
  const upperProp = item.userProperties.find(
    prop => prop.key.objectName === 'UPPER_BOUND'
  );

  if (!lowerProp || !upperProp) {
    return undefined;
  }

  const lowerBound = parseFloat(lowerProp.value);
  const upperBound = parseFloat(upperProp.value);

  if (isNaN(lowerBound) || isNaN(upperBound)) {
    return undefined;
  }

  return { lowerBound, upperBound };
}
