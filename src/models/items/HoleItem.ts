/**
 * 过孔和孔类型Item模型
 * 
 * @description
 * 提供创建各种过孔和孔类型Item的辅助函数，包括过孔、填充过孔、金属化孔、非金属化孔、铣削孔等。
 */

import { GeometryType, ItemType } from '../../types/enums';
import { Item, Identifier, UserProperty } from '../../types';

/**
 * 孔定义选项
 */
export interface HoleOptions {
    /** 孔标识符 */
    identifier: Identifier;
    /** 孔类型 */
    geometryType: GeometryType;
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
 * 创建孔Item的通用函数
 * 
 * @param options - 孔定义选项
 * @returns 孔Item对象
 */
export function createHoleItem(options: HoleOptions): Item {
    const {
        identifier,
        geometryType,
        referenceName,
        baseline = false,
        id = `HOLE_${identifier.number}`,
        name = `Hole ${identifier.number}`,
        userProperties
    } = options;

    // 验证孔类型
    const validHoleTypes = [
        GeometryType.VIA,
        GeometryType.FILLED_VIA,
        GeometryType.HOLE_PLATED,
        GeometryType.HOLE_NON_PLATED,
        GeometryType.HOLE_PLATED_MILLED,
        GeometryType.HOLE_NONPLATED_MILLED
    ];

    if (!validHoleTypes.includes(geometryType)) {
        throw new Error(`Invalid hole geometry type: ${geometryType}`);
    }

    return {
        id,
        name,
        identifier,
        itemType: ItemType.SINGLE,
        geometryType,
        referenceName,
        baseline,
        userProperties
    };
}

/**
 * 创建过孔Item
 * 
 * @param identifier - 孔标识符
 * @param options - 可选参数
 * @returns 过孔Item
 */
export function createVia(
    identifier: Identifier,
    options?: {
        referenceName?: string;
        id?: string;
        name?: string;
        userProperties?: UserProperty[];
    }
): Item {
    return createHoleItem({
        identifier,
        geometryType: GeometryType.VIA,
        ...options
    });
}

/**
 * 创建填充过孔Item
 * 
 * @param identifier - 孔标识符
 * @param options - 可选参数
 * @returns 填充过孔Item
 */
export function createFilledVia(
    identifier: Identifier,
    options?: {
        referenceName?: string;
        id?: string;
        name?: string;
        userProperties?: UserProperty[];
    }
): Item {
    return createHoleItem({
        identifier,
        geometryType: GeometryType.FILLED_VIA,
        ...options
    });
}

/**
 * 创建金属化孔Item
 * 
 * @param identifier - 孔标识符
 * @param options - 可选参数
 * @returns 金属化孔Item
 */
export function createPlatedHole(
    identifier: Identifier,
    options?: {
        referenceName?: string;
        id?: string;
        name?: string;
        userProperties?: UserProperty[];
    }
): Item {
    return createHoleItem({
        identifier,
        geometryType: GeometryType.HOLE_PLATED,
        ...options
    });
}

/**
 * 创建非金属化孔Item
 * 
 * @param identifier - 孔标识符
 * @param options - 可选参数
 * @returns 非金属化孔Item
 */
export function createNonPlatedHole(
    identifier: Identifier,
    options?: {
        referenceName?: string;
        id?: string;
        name?: string;
        userProperties?: UserProperty[];
    }
): Item {
    return createHoleItem({
        identifier,
        geometryType: GeometryType.HOLE_NON_PLATED,
        ...options
    });
}

/**
 * 创建金属化铣削孔Item
 * 
 * @param identifier - 孔标识符
 * @param options - 可选参数
 * @returns 金属化铣削孔Item
 */
export function createPlatedMilledHole(
    identifier: Identifier,
    options?: {
        referenceName?: string;
        id?: string;
        name?: string;
        userProperties?: UserProperty[];
    }
): Item {
    return createHoleItem({
        identifier,
        geometryType: GeometryType.HOLE_PLATED_MILLED,
        ...options
    });
}

/**
 * 创建非金属化铣削孔Item
 * 
 * @param identifier - 孔标识符
 * @param options - 可选参数
 * @returns 非金属化铣削孔Item
 */
export function createNonPlatedMilledHole(
    identifier: Identifier,
    options?: {
        referenceName?: string;
        id?: string;
        name?: string;
        userProperties?: UserProperty[];
    }
): Item {
    return createHoleItem({
        identifier,
        geometryType: GeometryType.HOLE_NONPLATED_MILLED,
        ...options
    });
}

/**
 * 孔位置信息
 */
export interface HolePosition {
    /** X坐标（毫米） */
    x: number;
    /** Y坐标（毫米） */
    y: number;
}

/**
 * 孔尺寸信息
 */
export interface HoleSize {
    /** 直径（毫米），用于圆形孔 */
    diameter?: number;
    /** 宽度（毫米），用于槽孔 */
    width?: number;
    /** 高度（毫米），用于槽孔 */
    height?: number;
}

/**
 * 添加孔位置用户属性
 * 
 * @param item - Item对象
 * @param position - 孔位置
 * @returns 更新后的Item对象
 */
export function addHolePosition(item: Item, position: HolePosition): Item {
    const positionProperties: UserProperty[] = [
        {
            key: { systemScope: 'IDX', objectName: 'POSITION_X' },
            value: position.x.toString()
        },
        {
            key: { systemScope: 'IDX', objectName: 'POSITION_Y' },
            value: position.y.toString()
        }
    ];

    return {
        ...item,
        userProperties: [
            ...(item.userProperties || []),
            ...positionProperties
        ]
    };
}

/**
 * 添加孔尺寸用户属性
 * 
 * @param item - Item对象
 * @param size - 孔尺寸
 * @returns 更新后的Item对象
 */
export function addHoleSize(item: Item, size: HoleSize): Item {
    const sizeProperties: UserProperty[] = [];

    if (size.diameter !== undefined) {
        if (size.diameter <= 0) {
            throw new Error(`Diameter must be positive, got: ${size.diameter}`);
        }
        sizeProperties.push({
            key: { systemScope: 'IDX', objectName: 'DIAMETER' },
            value: size.diameter.toString()
        });
    }

    if (size.width !== undefined) {
        if (size.width <= 0) {
            throw new Error(`Width must be positive, got: ${size.width}`);
        }
        sizeProperties.push({
            key: { systemScope: 'IDX', objectName: 'WIDTH' },
            value: size.width.toString()
        });
    }

    if (size.height !== undefined) {
        if (size.height <= 0) {
            throw new Error(`Height must be positive, got: ${size.height}`);
        }
        sizeProperties.push({
            key: { systemScope: 'IDX', objectName: 'HEIGHT' },
            value: size.height.toString()
        });
    }

    return {
        ...item,
        userProperties: [
            ...(item.userProperties || []),
            ...sizeProperties
        ]
    };
}

/**
 * 从Item中提取孔位置
 * 
 * @param item - Item对象
 * @returns 孔位置，如果未找到则返回undefined
 */
export function getHolePosition(item: Item): HolePosition | undefined {
    if (!item.userProperties) {
        return undefined;
    }

    const xProp = item.userProperties.find(
        prop => prop.key.objectName === 'POSITION_X'
    );
    const yProp = item.userProperties.find(
        prop => prop.key.objectName === 'POSITION_Y'
    );

    if (!xProp || !yProp) {
        return undefined;
    }

    const x = parseFloat(xProp.value);
    const y = parseFloat(yProp.value);

    if (isNaN(x) || isNaN(y)) {
        return undefined;
    }

    return { x, y };
}

/**
 * 从Item中提取孔尺寸
 * 
 * @param item - Item对象
 * @returns 孔尺寸，如果未找到则返回undefined
 */
export function getHoleSize(item: Item): HoleSize | undefined {
    if (!item.userProperties) {
        return undefined;
    }

    const diameterProp = item.userProperties.find(
        prop => prop.key.objectName === 'DIAMETER'
    );
    const widthProp = item.userProperties.find(
        prop => prop.key.objectName === 'WIDTH'
    );
    const heightProp = item.userProperties.find(
        prop => prop.key.objectName === 'HEIGHT'
    );

    const size: HoleSize = {};

    if (diameterProp) {
        const diameter = parseFloat(diameterProp.value);
        if (!isNaN(diameter)) {
            size.diameter = diameter;
        }
    }

    if (widthProp) {
        const width = parseFloat(widthProp.value);
        if (!isNaN(width)) {
            size.width = width;
        }
    }

    if (heightProp) {
        const height = parseFloat(heightProp.value);
        if (!isNaN(height)) {
            size.height = height;
        }
    }

    return Object.keys(size).length > 0 ? size : undefined;
}
