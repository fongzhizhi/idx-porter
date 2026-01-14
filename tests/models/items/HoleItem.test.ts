/**
 * 过孔和孔类型Item测试
 */

import {
  createHoleItem,
  createVia,
  createFilledVia,
  createPlatedHole,
  createNonPlatedHole,
  createPlatedMilledHole,
  createNonPlatedMilledHole,
  addHolePosition,
  addHoleSize,
  getHolePosition,
  getHoleSize
} from '../../../src/models/items/HoleItem';
import { GeometryType, ItemType } from '../../../src/types/enums';
import { Identifier } from '../../../src/types';

describe('HoleItem', () => {
  // 测试用的标识符
  const testIdentifier: Identifier = {
    systemScope: 'TEST',
    number: 'HOLE001',
    version: '1',
    revision: '1',
    sequence: 1
  };

  describe('createHoleItem', () => {
    it('should create a basic hole item', () => {
      const hole = createHoleItem({
        identifier: testIdentifier,
        geometryType: GeometryType.VIA
      });

      expect(hole.identifier).toEqual(testIdentifier);
      expect(hole.itemType).toBe(ItemType.SINGLE);
      expect(hole.geometryType).toBe(GeometryType.VIA);
      expect(hole.id).toBe('HOLE_HOLE001');
      expect(hole.name).toBe('Hole HOLE001');
    });

    it('should throw error for invalid hole type', () => {
      expect(() => {
        createHoleItem({
          identifier: testIdentifier,
          geometryType: GeometryType.COMPONENT as any
        });
      }).toThrow('Invalid hole geometry type');
    });

    it('should create hole with referenceName', () => {
      const hole = createHoleItem({
        identifier: testIdentifier,
        geometryType: GeometryType.VIA,
        referenceName: 'VIA_1'
      });

      expect(hole.referenceName).toBe('VIA_1');
    });

    it('should create hole with baseline flag', () => {
      const hole = createHoleItem({
        identifier: testIdentifier,
        geometryType: GeometryType.VIA,
        baseline: true
      });

      expect(hole.baseline).toBe(true);
    });

    it('should create hole with custom id and name', () => {
      const hole = createHoleItem({
        identifier: testIdentifier,
        geometryType: GeometryType.VIA,
        id: 'CUSTOM_ID',
        name: 'Custom Name'
      });

      expect(hole.id).toBe('CUSTOM_ID');
      expect(hole.name).toBe('Custom Name');
    });
  });

  describe('createVia', () => {
    it('should create via', () => {
      const via = createVia(testIdentifier);

      expect(via.geometryType).toBe(GeometryType.VIA);
      expect(via.itemType).toBe(ItemType.SINGLE);
    });

    it('should create via with referenceName', () => {
      const via = createVia(testIdentifier, {
        referenceName: 'VIA_SIGNAL'
      });

      expect(via.referenceName).toBe('VIA_SIGNAL');
    });
  });

  describe('createFilledVia', () => {
    it('should create filled via', () => {
      const via = createFilledVia(testIdentifier);

      expect(via.geometryType).toBe(GeometryType.FILLED_VIA);
      expect(via.itemType).toBe(ItemType.SINGLE);
    });

    it('should create filled via with referenceName', () => {
      const via = createFilledVia(testIdentifier, {
        referenceName: 'FILLED_VIA_1'
      });

      expect(via.referenceName).toBe('FILLED_VIA_1');
    });
  });

  describe('createPlatedHole', () => {
    it('should create plated hole', () => {
      const hole = createPlatedHole(testIdentifier);

      expect(hole.geometryType).toBe(GeometryType.HOLE_PLATED);
      expect(hole.itemType).toBe(ItemType.SINGLE);
    });

    it('should create plated hole with referenceName', () => {
      const hole = createPlatedHole(testIdentifier, {
        referenceName: 'MOUNTING_HOLE_1'
      });

      expect(hole.referenceName).toBe('MOUNTING_HOLE_1');
    });
  });

  describe('createNonPlatedHole', () => {
    it('should create non-plated hole', () => {
      const hole = createNonPlatedHole(testIdentifier);

      expect(hole.geometryType).toBe(GeometryType.HOLE_NON_PLATED);
      expect(hole.itemType).toBe(ItemType.SINGLE);
    });

    it('should create non-plated hole with referenceName', () => {
      const hole = createNonPlatedHole(testIdentifier, {
        referenceName: 'TOOLING_HOLE_1'
      });

      expect(hole.referenceName).toBe('TOOLING_HOLE_1');
    });
  });

  describe('createPlatedMilledHole', () => {
    it('should create plated milled hole', () => {
      const hole = createPlatedMilledHole(testIdentifier);

      expect(hole.geometryType).toBe(GeometryType.HOLE_PLATED_MILLED);
      expect(hole.itemType).toBe(ItemType.SINGLE);
    });

    it('should create plated milled hole with referenceName', () => {
      const hole = createPlatedMilledHole(testIdentifier, {
        referenceName: 'SLOT_1'
      });

      expect(hole.referenceName).toBe('SLOT_1');
    });
  });

  describe('createNonPlatedMilledHole', () => {
    it('should create non-plated milled hole', () => {
      const hole = createNonPlatedMilledHole(testIdentifier);

      expect(hole.geometryType).toBe(GeometryType.HOLE_NONPLATED_MILLED);
      expect(hole.itemType).toBe(ItemType.SINGLE);
    });

    it('should create non-plated milled hole with referenceName', () => {
      const hole = createNonPlatedMilledHole(testIdentifier, {
        referenceName: 'CUTOUT_1'
      });

      expect(hole.referenceName).toBe('CUTOUT_1');
    });
  });

  describe('addHolePosition', () => {
    it('should add position to hole', () => {
      const hole = createVia(testIdentifier);
      const holeWithPosition = addHolePosition(hole, { x: 10.5, y: 20.3 });

      expect(holeWithPosition.userProperties).toHaveLength(2);
      
      const xProp = holeWithPosition.userProperties!.find(
        p => p.key.objectName === 'POSITION_X'
      );
      const yProp = holeWithPosition.userProperties!.find(
        p => p.key.objectName === 'POSITION_Y'
      );

      expect(xProp).toBeDefined();
      expect(yProp).toBeDefined();
      expect(xProp!.value).toBe('10.5');
      expect(yProp!.value).toBe('20.3');
    });

    it('should preserve existing user properties', () => {
      const hole = createVia(testIdentifier, {
        userProperties: [
          {
            key: { systemScope: 'TEST', objectName: 'CUSTOM' },
            value: 'VALUE'
          }
        ]
      });
      const holeWithPosition = addHolePosition(hole, { x: 5, y: 10 });

      expect(holeWithPosition.userProperties).toHaveLength(3);
    });
  });

  describe('addHoleSize', () => {
    it('should add diameter to hole', () => {
      const hole = createVia(testIdentifier);
      const holeWithSize = addHoleSize(hole, { diameter: 0.3 });

      expect(holeWithSize.userProperties).toHaveLength(1);
      
      const diameterProp = holeWithSize.userProperties!.find(
        p => p.key.objectName === 'DIAMETER'
      );

      expect(diameterProp).toBeDefined();
      expect(diameterProp!.value).toBe('0.3');
    });

    it('should add width and height for slot', () => {
      const hole = createPlatedMilledHole(testIdentifier);
      const holeWithSize = addHoleSize(hole, { width: 2.0, height: 5.0 });

      expect(holeWithSize.userProperties).toHaveLength(2);
      
      const widthProp = holeWithSize.userProperties!.find(
        p => p.key.objectName === 'WIDTH'
      );
      const heightProp = holeWithSize.userProperties!.find(
        p => p.key.objectName === 'HEIGHT'
      );

      expect(widthProp).toBeDefined();
      expect(heightProp).toBeDefined();
      expect(parseFloat(widthProp!.value)).toBe(2.0);
      expect(parseFloat(heightProp!.value)).toBe(5.0);
    });

    it('should throw error for negative diameter', () => {
      const hole = createVia(testIdentifier);
      
      expect(() => {
        addHoleSize(hole, { diameter: -0.3 });
      }).toThrow('Diameter must be positive');
    });

    it('should throw error for zero width', () => {
      const hole = createPlatedMilledHole(testIdentifier);
      
      expect(() => {
        addHoleSize(hole, { width: 0 });
      }).toThrow('Width must be positive');
    });

    it('should preserve existing user properties', () => {
      const hole = createVia(testIdentifier, {
        userProperties: [
          {
            key: { systemScope: 'TEST', objectName: 'CUSTOM' },
            value: 'VALUE'
          }
        ]
      });
      const holeWithSize = addHoleSize(hole, { diameter: 0.3 });

      expect(holeWithSize.userProperties).toHaveLength(2);
    });
  });

  describe('getHolePosition', () => {
    it('should extract position from hole', () => {
      const hole = createVia(testIdentifier);
      const holeWithPosition = addHolePosition(hole, { x: 15.5, y: 25.3 });
      const position = getHolePosition(holeWithPosition);

      expect(position).toBeDefined();
      expect(position!.x).toBe(15.5);
      expect(position!.y).toBe(25.3);
    });

    it('should return undefined for hole without position', () => {
      const hole = createVia(testIdentifier);
      const position = getHolePosition(hole);

      expect(position).toBeUndefined();
    });

    it('should return undefined for invalid position values', () => {
      const hole = {
        ...createVia(testIdentifier),
        userProperties: [
          {
            key: { systemScope: 'IDX', objectName: 'POSITION_X' },
            value: 'invalid'
          },
          {
            key: { systemScope: 'IDX', objectName: 'POSITION_Y' },
            value: '10'
          }
        ]
      };
      const position = getHolePosition(hole);

      expect(position).toBeUndefined();
    });
  });

  describe('getHoleSize', () => {
    it('should extract diameter from hole', () => {
      const hole = createVia(testIdentifier);
      const holeWithSize = addHoleSize(hole, { diameter: 0.4 });
      const size = getHoleSize(holeWithSize);

      expect(size).toBeDefined();
      expect(size!.diameter).toBe(0.4);
    });

    it('should extract width and height from slot', () => {
      const hole = createPlatedMilledHole(testIdentifier);
      const holeWithSize = addHoleSize(hole, { width: 3.0, height: 6.0 });
      const size = getHoleSize(holeWithSize);

      expect(size).toBeDefined();
      expect(size!.width).toBe(3.0);
      expect(size!.height).toBe(6.0);
    });

    it('should return undefined for hole without size', () => {
      const hole = createVia(testIdentifier);
      const size = getHoleSize(hole);

      expect(size).toBeUndefined();
    });

    it('should handle partial size information', () => {
      const hole = {
        ...createVia(testIdentifier),
        userProperties: [
          {
            key: { systemScope: 'IDX', objectName: 'DIAMETER' },
            value: 'invalid'
          }
        ]
      };
      const size = getHoleSize(hole);

      expect(size).toBeUndefined();
    });
  });

  describe('PCB holes integration', () => {
    it('should create a complete set of PCB holes', () => {
      const holes = [];

      // 信号过孔
      let via = createVia(
        { ...testIdentifier, number: 'VIA001' },
        { referenceName: 'SIGNAL_VIA' }
      );
      via = addHolePosition(via, { x: 10, y: 20 });
      via = addHoleSize(via, { diameter: 0.3 });
      holes.push(via);

      // 填充过孔
      let filledVia = createFilledVia(
        { ...testIdentifier, number: 'VIA002' },
        { referenceName: 'THERMAL_VIA' }
      );
      filledVia = addHolePosition(filledVia, { x: 15, y: 25 });
      filledVia = addHoleSize(filledVia, { diameter: 0.2 });
      holes.push(filledVia);

      // 金属化安装孔
      let mountingHole = createPlatedHole(
        { ...testIdentifier, number: 'MTH001' },
        { referenceName: 'MOUNTING_HOLE' }
      );
      mountingHole = addHolePosition(mountingHole, { x: 5, y: 5 });
      mountingHole = addHoleSize(mountingHole, { diameter: 3.2 });
      holes.push(mountingHole);

      // 非金属化定位孔
      let toolingHole = createNonPlatedHole(
        { ...testIdentifier, number: 'TH001' },
        { referenceName: 'TOOLING_HOLE' }
      );
      toolingHole = addHolePosition(toolingHole, { x: 0, y: 0 });
      toolingHole = addHoleSize(toolingHole, { diameter: 2.0 });
      holes.push(toolingHole);

      // 金属化槽孔
      let slot = createPlatedMilledHole(
        { ...testIdentifier, number: 'SLOT001' },
        { referenceName: 'CONNECTOR_SLOT' }
      );
      slot = addHolePosition(slot, { x: 30, y: 40 });
      slot = addHoleSize(slot, { width: 2.0, height: 10.0 });
      holes.push(slot);

      expect(holes).toHaveLength(5);
      expect(holes[0]?.geometryType).toBe(GeometryType.VIA);
      expect(holes[1]?.geometryType).toBe(GeometryType.FILLED_VIA);
      expect(holes[2]?.geometryType).toBe(GeometryType.HOLE_PLATED);
      expect(holes[3]?.geometryType).toBe(GeometryType.HOLE_NON_PLATED);
      expect(holes[4]?.geometryType).toBe(GeometryType.HOLE_PLATED_MILLED);

      // 验证位置和尺寸
      expect(getHolePosition(holes[0]!)).toEqual({ x: 10, y: 20 });
      expect(getHoleSize(holes[0]!)?.diameter).toBe(0.3);
      expect(getHoleSize(holes[4]!)?.width).toBe(2.0);
      expect(getHoleSize(holes[4]!)?.height).toBe(10.0);
    });
  });
});
