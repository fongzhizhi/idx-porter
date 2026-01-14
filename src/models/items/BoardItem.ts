/**
 * 板框轮廓Item模型
 * 
 * @description
 * 提供创建各种PCB板框和板区域类型Item的辅助函数，包括板框轮廓、刚性区域、柔性区域、加强区域等。
 */

import { GeometryType, ItemType } from '../../types/enums';
import { Item, Identifier, UserProperty } from '../../types';

/**
 * 板定义选项
 */
export interface BoardOptions {
  /** 板标识符 */
  identifier: Identifier;
  /** 板类型 */
  geometryType: GeometryType;
  /** 板厚度（毫米，可选） */
  thickness?: number;
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
 * 创建板Item的通用函数
 * 
 * @param options - 板定义选项
 * @returns 板Item对象
 */
export function createBoardItem(options: BoardOptions): Item {
  const {
    identifier,
    geometryType,
    thickness,
    referenceName,
    baseline = false,
    id = `BOARD_${identifier.number}`,
    name = `Board ${identifier.number}`,
    userProperties = []
  } = options;

  // 验证板类型
  const validBoardTypes = [
    GeometryType.BOARD_OUTLINE,
    GeometryType.BOARD_AREA_RIGID,
    GeometryType.BOARD_AREA_FLEXIBLE,
    GeometryType.BOARD_AREA_STIFFENER
  ];

  if (!validBoardTypes.includes(geometryType)) {
    throw new Error(`Invalid board geometry type: ${geometryType}`);
  }

  // 如果提供了厚度，添加到用户属性
  let finalUserProperties = [...userProperties];
  if (thickness !== undefined) {
    if (thickness <= 0) {
      throw new Error(`Thickness must be positive, got: ${thickness}`);
    }
    
    // 添加THICKNESS用户属性
    const thicknessProperty: UserProperty = {
      key: {
        systemScope: 'IDX',
        objectName: 'THICKNESS'
      },
      value: thickness.toString()
    };
    finalUserProperties.push(thicknessProperty);
  }

  return {
    id,
    name,
    identifier,
    itemType: ItemType.SINGLE,
    geometryType,
    referenceName,
    baseline,
    userProperties: finalUserProperties.length > 0 ? finalUserProperties : undefined
  };
}

/**
 * 创建板框轮廓Item
 * 
 * @param identifier - 板标识符
 * @param thickness - 板厚度（毫米）
 * @param options - 可选参数
 * @returns 板框轮廓Item
 */
export function createBoardOutline(
  identifier: Identifier,
  thickness: number,
  options?: {
    referenceName?: string;
    id?: string;
    name?: string;
    userProperties?: UserProperty[];
  }
): Item {
  return createBoardItem({
    identifier,
    geometryType: GeometryType.BOARD_OUTLINE,
    thickness,
    ...options
  });
}

/**
 * 创建刚性板区域Item
 * 
 * @param identifier - 板标识符
 * @param thickness - 板厚度（毫米）
 * @param options - 可选参数
 * @returns 刚性板区域Item
 */
export function createRigidBoardArea(
  identifier: Identifier,
  thickness: number,
  options?: {
    referenceName?: string;
    id?: string;
    name?: string;
    userProperties?: UserProperty[];
  }
): Item {
  return createBoardItem({
    identifier,
    geometryType: GeometryType.BOARD_AREA_RIGID,
    thickness,
    ...options
  });
}

/**
 * 创建柔性板区域Item
 * 
 * @param identifier - 板标识符
 * @param thickness - 板厚度（毫米）
 * @param options - 可选参数
 * @returns 柔性板区域Item
 */
export function createFlexibleBoardArea(
  identifier: Identifier,
  thickness: number,
  options?: {
    referenceName?: string;
    id?: string;
    name?: string;
    userProperties?: UserProperty[];
  }
): Item {
  return createBoardItem({
    identifier,
    geometryType: GeometryType.BOARD_AREA_FLEXIBLE,
    thickness,
    ...options
  });
}

/**
 * 创建加强区域Item
 * 
 * @param identifier - 板标识符
 * @param thickness - 加强区域厚度（毫米）
 * @param options - 可选参数
 * @returns 加强区域Item
 */
export function createStiffenerArea(
  identifier: Identifier,
  thickness: number,
  options?: {
    referenceName?: string;
    id?: string;
    name?: string;
    userProperties?: UserProperty[];
  }
): Item {
  return createBoardItem({
    identifier,
    geometryType: GeometryType.BOARD_AREA_STIFFENER,
    thickness,
    ...options
  });
}

/**
 * 从Item中提取厚度值
 * 
 * @param item - Item对象
 * @returns 厚度值（毫米），如果未找到则返回undefined
 */
export function getThicknessFromItem(item: Item): number | undefined {
  if (!item.userProperties) {
    return undefined;
  }

  const thicknessProp = item.userProperties.find(
    prop => prop.key.objectName === 'THICKNESS'
  );

  if (!thicknessProp) {
    return undefined;
  }

  const thickness = parseFloat(thicknessProp.value);
  return isNaN(thickness) ? undefined : thickness;
}
