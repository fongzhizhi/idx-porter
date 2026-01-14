/**
 * 板框轮廓Item测试
 */

import {
  createBoardItem,
  createBoardOutline,
  createRigidBoardArea,
  createFlexibleBoardArea,
  createStiffenerArea,
  getThicknessFromItem
} from '../../../src/models/items/BoardItem';
import { GeometryType, ItemType } from '../../../src/types/enums';
import { Identifier } from '../../../src/types';

describe('BoardItem', () => {
  // 测试用的标识符
  const testIdentifier: Identifier = {
    systemScope: 'TEST',
    number: 'BOARD001',
    version: '1',
    revision: '1',
    sequence: 1
  };

  describe('createBoardItem', () => {
    it('should create a basic board item', () => {
      const board = createBoardItem({
        identifier: testIdentifier,
        geometryType: GeometryType.BOARD_OUTLINE,
        thickness: 1.6
      });

      expect(board.identifier).toEqual(testIdentifier);
      expect(board.itemType).toBe(ItemType.SINGLE);
      expect(board.geometryType).toBe(GeometryType.BOARD_OUTLINE);
      expect(board.id).toBe('BOARD_BOARD001');
      expect(board.name).toBe('Board BOARD001');
    });

    it('should add thickness as user property', () => {
      const board = createBoardItem({
        identifier: testIdentifier,
        geometryType: GeometryType.BOARD_OUTLINE,
        thickness: 1.6
      });

      expect(board.userProperties).toBeDefined();
      expect(board.userProperties).toHaveLength(1);
      
      const thicknessProp = board.userProperties![0];
      expect(thicknessProp).toBeDefined();
      expect(thicknessProp!.key.objectName).toBe('THICKNESS');
      expect(thicknessProp!.value).toBe('1.6');
    });

    it('should throw error for invalid board type', () => {
      expect(() => {
        createBoardItem({
          identifier: testIdentifier,
          geometryType: GeometryType.COMPONENT as any
        });
      }).toThrow('Invalid board geometry type');
    });

    it('should throw error for negative thickness', () => {
      expect(() => {
        createBoardItem({
          identifier: testIdentifier,
          geometryType: GeometryType.BOARD_OUTLINE,
          thickness: -1.6
        });
      }).toThrow('Thickness must be positive');
    });

    it('should throw error for zero thickness', () => {
      expect(() => {
        createBoardItem({
          identifier: testIdentifier,
          geometryType: GeometryType.BOARD_OUTLINE,
          thickness: 0
        });
      }).toThrow('Thickness must be positive');
    });

    it('should create board with referenceName', () => {
      const board = createBoardItem({
        identifier: testIdentifier,
        geometryType: GeometryType.BOARD_OUTLINE,
        thickness: 1.6,
        referenceName: 'MAIN_BOARD'
      });

      expect(board.referenceName).toBe('MAIN_BOARD');
    });

    it('should create board with baseline flag', () => {
      const board = createBoardItem({
        identifier: testIdentifier,
        geometryType: GeometryType.BOARD_OUTLINE,
        thickness: 1.6,
        baseline: true
      });

      expect(board.baseline).toBe(true);
    });

    it('should create board with custom id and name', () => {
      const board = createBoardItem({
        identifier: testIdentifier,
        geometryType: GeometryType.BOARD_OUTLINE,
        thickness: 1.6,
        id: 'CUSTOM_ID',
        name: 'Custom Name'
      });

      expect(board.id).toBe('CUSTOM_ID');
      expect(board.name).toBe('Custom Name');
    });

    it('should merge additional user properties with thickness', () => {
      const board = createBoardItem({
        identifier: testIdentifier,
        geometryType: GeometryType.BOARD_OUTLINE,
        thickness: 1.6,
        userProperties: [
          {
            key: { systemScope: 'TEST', objectName: 'MATERIAL' },
            value: 'FR4'
          }
        ]
      });

      expect(board.userProperties).toHaveLength(2);
      
      const materialProp = board.userProperties![0];
      const thicknessProp = board.userProperties![1];
      expect(materialProp).toBeDefined();
      expect(thicknessProp).toBeDefined();
      expect(materialProp!.key.objectName).toBe('MATERIAL');
      expect(thicknessProp!.key.objectName).toBe('THICKNESS');
    });

    it('should create board without thickness', () => {
      const board = createBoardItem({
        identifier: testIdentifier,
        geometryType: GeometryType.BOARD_OUTLINE
      });

      expect(board.userProperties).toBeUndefined();
    });
  });

  describe('createBoardOutline', () => {
    it('should create board outline', () => {
      const board = createBoardOutline(testIdentifier, 1.6);

      expect(board.geometryType).toBe(GeometryType.BOARD_OUTLINE);
      expect(board.itemType).toBe(ItemType.SINGLE);
      expect(board.userProperties).toHaveLength(1);
      
      const thicknessProp = board.userProperties![0];
      expect(thicknessProp).toBeDefined();
      expect(thicknessProp!.value).toBe('1.6');
    });

    it('should create board outline with referenceName', () => {
      const board = createBoardOutline(testIdentifier, 1.6, {
        referenceName: 'PCB_OUTLINE'
      });

      expect(board.referenceName).toBe('PCB_OUTLINE');
    });

    it('should create board outline with custom properties', () => {
      const board = createBoardOutline(testIdentifier, 1.6, {
        userProperties: [
          {
            key: { systemScope: 'TEST', objectName: 'COLOR' },
            value: 'GREEN'
          }
        ]
      });

      expect(board.userProperties).toHaveLength(2);
    });
  });

  describe('createRigidBoardArea', () => {
    it('should create rigid board area', () => {
      const board = createRigidBoardArea(testIdentifier, 1.6);

      expect(board.geometryType).toBe(GeometryType.BOARD_AREA_RIGID);
      expect(board.itemType).toBe(ItemType.SINGLE);
      
      const thicknessProp = board.userProperties![0];
      expect(thicknessProp).toBeDefined();
      expect(thicknessProp!.value).toBe('1.6');
    });

    it('should create rigid board area with referenceName', () => {
      const board = createRigidBoardArea(testIdentifier, 1.6, {
        referenceName: 'RIGID_AREA_1'
      });

      expect(board.referenceName).toBe('RIGID_AREA_1');
    });
  });

  describe('createFlexibleBoardArea', () => {
    it('should create flexible board area', () => {
      const board = createFlexibleBoardArea(testIdentifier, 0.2);

      expect(board.geometryType).toBe(GeometryType.BOARD_AREA_FLEXIBLE);
      expect(board.itemType).toBe(ItemType.SINGLE);
      
      const thicknessProp = board.userProperties![0];
      expect(thicknessProp).toBeDefined();
      expect(thicknessProp!.value).toBe('0.2');
    });

    it('should create flexible board area with referenceName', () => {
      const board = createFlexibleBoardArea(testIdentifier, 0.2, {
        referenceName: 'FLEX_AREA_1'
      });

      expect(board.referenceName).toBe('FLEX_AREA_1');
    });
  });

  describe('createStiffenerArea', () => {
    it('should create stiffener area', () => {
      const board = createStiffenerArea(testIdentifier, 0.5);

      expect(board.geometryType).toBe(GeometryType.BOARD_AREA_STIFFENER);
      expect(board.itemType).toBe(ItemType.SINGLE);
      
      const thicknessProp = board.userProperties![0];
      expect(thicknessProp).toBeDefined();
      expect(thicknessProp!.value).toBe('0.5');
    });

    it('should create stiffener area with referenceName', () => {
      const board = createStiffenerArea(testIdentifier, 0.5, {
        referenceName: 'STIFFENER_1'
      });

      expect(board.referenceName).toBe('STIFFENER_1');
    });
  });

  describe('getThicknessFromItem', () => {
    it('should extract thickness from board item', () => {
      const board = createBoardOutline(testIdentifier, 1.6);
      const thickness = getThicknessFromItem(board);

      expect(thickness).toBe(1.6);
    });

    it('should return undefined for item without thickness', () => {
      const board = createBoardItem({
        identifier: testIdentifier,
        geometryType: GeometryType.BOARD_OUTLINE
      });
      const thickness = getThicknessFromItem(board);

      expect(thickness).toBeUndefined();
    });

    it('should return undefined for item without user properties', () => {
      const item = {
        id: 'TEST',
        name: 'Test',
        identifier: testIdentifier,
        itemType: ItemType.SINGLE,
        geometryType: GeometryType.BOARD_OUTLINE
      };
      const thickness = getThicknessFromItem(item);

      expect(thickness).toBeUndefined();
    });

    it('should handle decimal thickness values', () => {
      const board = createBoardOutline(testIdentifier, 1.234);
      const thickness = getThicknessFromItem(board);

      expect(thickness).toBe(1.234);
    });

    it('should return undefined for invalid thickness value', () => {
      const item = {
        id: 'TEST',
        name: 'Test',
        identifier: testIdentifier,
        itemType: ItemType.SINGLE,
        geometryType: GeometryType.BOARD_OUTLINE,
        userProperties: [
          {
            key: { systemScope: 'IDX', objectName: 'THICKNESS' },
            value: 'invalid'
          }
        ]
      };
      const thickness = getThicknessFromItem(item);

      expect(thickness).toBeUndefined();
    });
  });

  describe('Rigid-Flex PCB integration', () => {
    it('should create a rigid-flex PCB structure', () => {
      const boards = [];

      // 主板轮廓
      boards.push(createBoardOutline(
        { ...testIdentifier, number: 'OUTLINE' },
        1.6,
        { referenceName: 'MAIN_OUTLINE' }
      ));

      // 刚性区域1
      boards.push(createRigidBoardArea(
        { ...testIdentifier, number: 'RIGID1' },
        1.6,
        { referenceName: 'RIGID_AREA_1' }
      ));

      // 柔性区域
      boards.push(createFlexibleBoardArea(
        { ...testIdentifier, number: 'FLEX1' },
        0.2,
        { referenceName: 'FLEX_AREA_1' }
      ));

      // 刚性区域2
      boards.push(createRigidBoardArea(
        { ...testIdentifier, number: 'RIGID2' },
        1.6,
        { referenceName: 'RIGID_AREA_2' }
      ));

      // 加强区域
      boards.push(createStiffenerArea(
        { ...testIdentifier, number: 'STIFF1' },
        0.5,
        { referenceName: 'STIFFENER_1' }
      ));

      expect(boards).toHaveLength(5);
      expect(boards[0]?.geometryType).toBe(GeometryType.BOARD_OUTLINE);
      expect(boards[2]?.geometryType).toBe(GeometryType.BOARD_AREA_FLEXIBLE);
      expect(boards[4]?.geometryType).toBe(GeometryType.BOARD_AREA_STIFFENER);

      // 验证厚度
      expect(getThicknessFromItem(boards[0]!)).toBe(1.6);
      expect(getThicknessFromItem(boards[2]!)).toBe(0.2);
      expect(getThicknessFromItem(boards[4]!)).toBe(0.5);
    });
  });
});
