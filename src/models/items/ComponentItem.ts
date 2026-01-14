/**
 * 组件Item模型
 * 
 * @description
 * 提供创建电子组件Item的辅助函数，包括组件的位置、属性和几何信息。
 */

import { GeometryType, ItemType } from '../../types/enums';
import { Item, Identifier, UserProperty, Transformation } from '../../types';

/**
 * 组件定义选项
 */
export interface ComponentOptions {
  /** 组件标识符 */
  identifier: Identifier;
  /** 参考标识符（REFDES），如 "U1", "R1" 等 */
  refdes?: string;
  /** 器件编号（PARTNUM） */
  partNumber?: string;
  /** 2D变换矩阵（位置和旋转） */
  transformation?: Transformation;
  /** 安装到的层名称（如 "TOP", "BOTTOM"） */
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
 * 创建组件Item
 * 
 * @param options - 组件定义选项
 * @returns 组件Item对象
 */
export function createComponent(options: ComponentOptions): Item {
  const {
    identifier,
    refdes,
    partNumber,
    transformation,
    assembleToName,
    referenceName,
    baseline = false,
    id = `COMP_${identifier.number}`,
    name = `Component ${identifier.number}`,
    userProperties = []
  } = options;

  // 构建用户属性列表
  let finalUserProperties = [...userProperties];

  // 添加REFDES用户属性
  if (refdes) {
    finalUserProperties.push({
      key: { systemScope: 'IDX', objectName: 'REFDES' },
      value: refdes
    });
  }

  // 添加PARTNUM用户属性
  if (partNumber) {
    finalUserProperties.push({
      key: { systemScope: 'IDX', objectName: 'PARTNUM' },
      value: partNumber
    });
  }

  // 创建ItemInstance如果有变换或assembleToName
  let itemInstance;
  if (transformation || assembleToName) {
    itemInstance = {
      instanceName: {
        systemScope: identifier.systemScope,
        objectName: `${identifier.number}_INST`
      },
      transformation,
      userProperties: finalUserProperties.length > 0 ? finalUserProperties : undefined
    };
    // 如果有ItemInstance，清空Item级别的userProperties
    finalUserProperties = [];
  }

  return {
    id,
    name,
    identifier,
    itemType: ItemType.SINGLE,
    geometryType: GeometryType.COMPONENT,
    referenceName,
    baseline,
    assembleToName,
    userProperties: finalUserProperties.length > 0 ? finalUserProperties : undefined,
    itemInstance
  };
}

/**
 * 从Item中提取REFDES
 * 
 * @param item - Item对象
 * @returns REFDES值，如果未找到则返回undefined
 */
export function getRefdes(item: Item): string | undefined {
  // 首先检查ItemInstance的用户属性
  if (item.itemInstance?.userProperties) {
    const refdesProp = item.itemInstance.userProperties.find(
      prop => prop.key.objectName === 'REFDES'
    );
    if (refdesProp) {
      return refdesProp.value;
    }
  }

  // 然后检查Item的用户属性
  if (item.userProperties) {
    const refdesProp = item.userProperties.find(
      prop => prop.key.objectName === 'REFDES'
    );
    if (refdesProp) {
      return refdesProp.value;
    }
  }

  return undefined;
}

/**
 * 从Item中提取器件编号
 * 
 * @param item - Item对象
 * @returns 器件编号，如果未找到则返回undefined
 */
export function getPartNumber(item: Item): string | undefined {
  // 首先检查ItemInstance的用户属性
  if (item.itemInstance?.userProperties) {
    const partNumProp = item.itemInstance.userProperties.find(
      prop => prop.key.objectName === 'PARTNUM'
    );
    if (partNumProp) {
      return partNumProp.value;
    }
  }

  // 然后检查Item的用户属性
  if (item.userProperties) {
    const partNumProp = item.userProperties.find(
      prop => prop.key.objectName === 'PARTNUM'
    );
    if (partNumProp) {
      return partNumProp.value;
    }
  }

  return undefined;
}

/**
 * 从Item中提取变换矩阵
 * 
 * @param item - Item对象
 * @returns 变换矩阵，如果未找到则返回undefined
 */
export function getTransformation(item: Item): Transformation | undefined {
  return item.itemInstance?.transformation;
}

/**
 * 创建简单的平移变换
 * 
 * @param x - X方向平移（毫米）
 * @param y - Y方向平移（毫米）
 * @returns 变换矩阵
 */
export function createTranslation(x: number, y: number): Transformation {
  return {
    transformationType: 'd2' as any,
    xx: 1,
    xy: 0,
    yx: 0,
    yy: 1,
    tx: x,
    ty: y
  };
}

/**
 * 创建旋转变换（绕原点）
 * 
 * @param angleDegrees - 旋转角度（度）
 * @returns 变换矩阵
 */
export function createRotation(angleDegrees: number): Transformation {
  const angleRadians = (angleDegrees * Math.PI) / 180;
  const cos = Math.cos(angleRadians);
  const sin = Math.sin(angleRadians);

  return {
    transformationType: 'd2' as any,
    xx: cos,
    xy: -sin,
    yx: sin,
    yy: cos,
    tx: 0,
    ty: 0
  };
}

/**
 * 创建旋转加平移变换
 * 
 * @param x - X方向平移（毫米）
 * @param y - Y方向平移（毫米）
 * @param angleDegrees - 旋转角度（度）
 * @returns 变换矩阵
 */
export function createRotationAndTranslation(
  x: number,
  y: number,
  angleDegrees: number
): Transformation {
  const angleRadians = (angleDegrees * Math.PI) / 180;
  const cos = Math.cos(angleRadians);
  const sin = Math.sin(angleRadians);

  return {
    transformationType: 'd2' as any,
    xx: cos,
    xy: -sin,
    yx: sin,
    yy: cos,
    tx: x,
    ty: y
  };
}
