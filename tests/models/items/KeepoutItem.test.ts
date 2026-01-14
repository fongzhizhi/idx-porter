/**
 * 禁止区域和保留区域Item测试
 */

import {
  createKeepoutAreaItem,
  createComponentKeepout,
  createRouteKeepout,
  createViaKeepout,
  createTestpointKeepout,
  createThermalKeepout,
  createOtherKeepout,
  createComponentKeepin,
  createRouteKeepin,
  createViaKeepin,
  createTestpointKeepin,
  createOtherKeepin,
  getZAxisBounds
} from '../../../src/models/items/KeepoutItem';
import { GeometryType, ItemType } from '../../../src/types/enums';
import { Identifier } from '../../../src/types/items';

describe('KeepoutItem', () => {
  // 测试用的标识符
  const testIdentifier: Identifier = {
    systemScope: 'TEST',
    number: 'KEEPOUT001',
    version: '1',
    revision: '1',
    sequence: 1
  };

  describe('createKeepoutAreaItem', () => {
    it('should create a basic keepout area', () => {
      const keepout = createKeepoutAreaItem({
        identifier: testIdentifier,
        geometryType: GeometryType.KEEPOUT_AREA_COMPONENT
      });

      expect(keepout.identifier).toEqual(testIdentifier);
      expect(keepout.itemType).toBe(ItemType.SINGLE);
      expect(keepout.geometryType).toBe(GeometryType.KEEPOUT_AREA_COMPONENT);
      expect(keepout.id).toBe('KEEPOUT_KEEPOUT001');
      expect(keepout.name).toBe('Keepout KEEPOUT001');
    });

    it('should create keepout with Z-axis bounds', () => {
      const keepout = createKeepoutAreaItem({
        identifier: testIdentifier,
        geometryType: GeometryType.KEEPOUT_AREA_ROUTE,
        lowerBound: 0,
        upperBound: 1.6
      });

      expect(keepout.userProperties).toHaveLength(2);
      
      const lowerProp = keepout.userProperties!.find(
        p => p.key.objectName === 'LOWER_BOUND'
      );
      const upperProp = keepout.userProperties!.find(
        p => p.key.objectName === 'UPPER_BOUND'
      );

      expect(lowerProp).toBeDefined();
      expect(lowerProp!.value).toBe('0');
      expect(upperProp).toBeDefined();
      expect(upperProp!.value).toBe('1.6');
    });

    it('should create keepout with assembleToName', () => {
      const keepout = createKeepoutAreaItem({
        identifier: testIdentifier,
        geometryType: GeometryType.KEEPOUT_AREA_VIA,
        assembleToName: 'TOP'
      });

      expect(keepout.assembleToName).toBe('TOP');
    });

    it('should create keepout with referenceName', () => {
      const keepout = createKeepoutAreaItem({
        identifier: testIdentifier,
        geometryType: GeometryType.KEEPOUT_AREA_COMPONENT,
        referenceName: 'COMP_KEEPOUT_1'
      });

      expect(keepout.referenceName).toBe('COMP_KEEPOUT_1');
    });

    it('should create keepout with baseline flag', () => {
      const keepout = createKeepoutAreaItem({
        identifier: testIdentifier,
        geometryType: GeometryType.KEEPOUT_AREA_OTHER,
        baseline: true
      });

      expect(keepout.baseline).toBe(true);
    });

    it('should create keepout with custom id and name', () => {
      const keepout = createKeepoutAreaItem({
        identifier: testIdentifier,
        geometryType: GeometryType.KEEPOUT_AREA_THERMAL,
        id: 'CUSTOM_KEEPOUT',
        name: 'Custom Keepout Area'
      });

      expect(keepout.id).toBe('CUSTOM_KEEPOUT');
      expect(keepout.name).toBe('Custom Keepout Area');
    });

    it('should throw error for invalid geometry type', () => {
      expect(() => {
        createKeepoutAreaItem({
          identifier: testIdentifier,
          geometryType: GeometryType.COMPONENT as any
        });
      }).toThrow('Invalid keepout/keepin area geometry type');
    });

    it('should throw error when lowerBound >= upperBound', () => {
      expect(() => {
        createKeepoutAreaItem({
          identifier: testIdentifier,
          geometryType: GeometryType.KEEPOUT_AREA_ROUTE,
          lowerBound: 2.0,
          upperBound: 1.0
        });
      }).toThrow('LowerBound (2) must be less than UpperBound (1)');
    });

    it('should throw error when lowerBound equals upperBound', () => {
      expect(() => {
        createKeepoutAreaItem({
          identifier: testIdentifier,
          geometryType: GeometryType.KEEPOUT_AREA_ROUTE,
          lowerBound: 1.5,
          upperBound: 1.5
        });
      }).toThrow('LowerBound (1.5) must be less than UpperBound (1.5)');
    });
  });

  // ============ 禁止区域测试 ============

  describe('createComponentKeepout', () => {
    it('should create component keepout area', () => {
      const keepout = createComponentKeepout(testIdentifier);

      expect(keepout.geometryType).toBe(GeometryType.KEEPOUT_AREA_COMPONENT);
      expect(keepout.itemType).toBe(ItemType.SINGLE);
    });

    it('should create component keepout with Z-axis bounds', () => {
      const keepout = createComponentKeepout(testIdentifier, {
        lowerBound: 0,
        upperBound: 5.0
      });

      const bounds = getZAxisBounds(keepout);
      expect(bounds).toBeDefined();
      expect(bounds!.lowerBound).toBe(0);
      expect(bounds!.upperBound).toBe(5.0);
    });

    it('should create component keepout with assembleToName', () => {
      const keepout = createComponentKeepout(testIdentifier, {
        assembleToName: 'TOP'
      });

      expect(keepout.assembleToName).toBe('TOP');
    });
  });

  describe('createRouteKeepout', () => {
    it('should create route keepout area', () => {
      const keepout = createRouteKeepout(testIdentifier);

      expect(keepout.geometryType).toBe(GeometryType.KEEPOUT_AREA_ROUTE);
      expect(keepout.itemType).toBe(ItemType.SINGLE);
    });

    it('should create route keepout with Z-axis bounds', () => {
      const keepout = createRouteKeepout(testIdentifier, {
        lowerBound: 0.5,
        upperBound: 1.5
      });

      const bounds = getZAxisBounds(keepout);
      expect(bounds).toBeDefined();
      expect(bounds!.lowerBound).toBe(0.5);
      expect(bounds!.upperBound).toBe(1.5);
    });
  });

  describe('createViaKeepout', () => {
    it('should create via keepout area', () => {
      const keepout = createViaKeepout(testIdentifier);

      expect(keepout.geometryType).toBe(GeometryType.KEEPOUT_AREA_VIA);
      expect(keepout.itemType).toBe(ItemType.SINGLE);
    });

    it('should create via keepout with assembleToName', () => {
      const keepout = createViaKeepout(testIdentifier, {
        assembleToName: 'LAYER_1'
      });

      expect(keepout.assembleToName).toBe('LAYER_1');
    });
  });

  describe('createTestpointKeepout', () => {
    it('should create testpoint keepout area', () => {
      const keepout = createTestpointKeepout(testIdentifier);

      expect(keepout.geometryType).toBe(GeometryType.KEEPOUT_AREA_TESTPOINT);
      expect(keepout.itemType).toBe(ItemType.SINGLE);
    });
  });

  describe('createThermalKeepout', () => {
    it('should create thermal keepout area', () => {
      const keepout = createThermalKeepout(testIdentifier);

      expect(keepout.geometryType).toBe(GeometryType.KEEPOUT_AREA_THERMAL);
      expect(keepout.itemType).toBe(ItemType.SINGLE);
    });

    it('should create thermal keepout with Z-axis bounds', () => {
      const keepout = createThermalKeepout(testIdentifier, {
        lowerBound: 0,
        upperBound: 10.0
      });

      const bounds = getZAxisBounds(keepout);
      expect(bounds).toBeDefined();
      expect(bounds!.lowerBound).toBe(0);
      expect(bounds!.upperBound).toBe(10.0);
    });
  });

  describe('createOtherKeepout', () => {
    it('should create other keepout area', () => {
      const keepout = createOtherKeepout(testIdentifier);

      expect(keepout.geometryType).toBe(GeometryType.KEEPOUT_AREA_OTHER);
      expect(keepout.itemType).toBe(ItemType.SINGLE);
    });
  });

  // ============ 保留区域测试 ============

  describe('createComponentKeepin', () => {
    it('should create component keepin area', () => {
      const keepin = createComponentKeepin(testIdentifier);

      expect(keepin.geometryType).toBe(GeometryType.KEEPIN_AREA_COMPONENT);
      expect(keepin.itemType).toBe(ItemType.SINGLE);
    });

    it('should create component keepin with Z-axis bounds', () => {
      const keepin = createComponentKeepin(testIdentifier, {
        lowerBound: 0,
        upperBound: 3.0
      });

      const bounds = getZAxisBounds(keepin);
      expect(bounds).toBeDefined();
      expect(bounds!.lowerBound).toBe(0);
      expect(bounds!.upperBound).toBe(3.0);
    });
  });

  describe('createRouteKeepin', () => {
    it('should create route keepin area', () => {
      const keepin = createRouteKeepin(testIdentifier);

      expect(keepin.geometryType).toBe(GeometryType.KEEPIN_AREA_ROUTE);
      expect(keepin.itemType).toBe(ItemType.SINGLE);
    });

    it('should create route keepin with assembleToName', () => {
      const keepin = createRouteKeepin(testIdentifier, {
        assembleToName: 'SIGNAL_LAYER'
      });

      expect(keepin.assembleToName).toBe('SIGNAL_LAYER');
    });
  });

  describe('createViaKeepin', () => {
    it('should create via keepin area', () => {
      const keepin = createViaKeepin(testIdentifier);

      expect(keepin.geometryType).toBe(GeometryType.KEEPIN_AREA_VIA);
      expect(keepin.itemType).toBe(ItemType.SINGLE);
    });
  });

  describe('createTestpointKeepin', () => {
    it('should create testpoint keepin area', () => {
      const keepin = createTestpointKeepin(testIdentifier);

      expect(keepin.geometryType).toBe(GeometryType.KEEPIN_AREA_TESTPOINT);
      expect(keepin.itemType).toBe(ItemType.SINGLE);
    });
  });

  describe('createOtherKeepin', () => {
    it('should create other keepin area', () => {
      const keepin = createOtherKeepin(testIdentifier);

      expect(keepin.geometryType).toBe(GeometryType.KEEPIN_AREA_OTHER);
      expect(keepin.itemType).toBe(ItemType.SINGLE);
    });
  });

  // ============ 工具函数测试 ============

  describe('getZAxisBounds', () => {
    it('should extract Z-axis bounds from keepout', () => {
      const keepout = createRouteKeepout(testIdentifier, {
        lowerBound: 0.5,
        upperBound: 2.5
      });

      const bounds = getZAxisBounds(keepout);
      expect(bounds).toBeDefined();
      expect(bounds!.lowerBound).toBe(0.5);
      expect(bounds!.upperBound).toBe(2.5);
    });

    it('should return undefined for keepout without Z-axis bounds', () => {
      const keepout = createComponentKeepout(testIdentifier);

      const bounds = getZAxisBounds(keepout);
      expect(bounds).toBeUndefined();
    });

    it('should return undefined for item without userProperties', () => {
      const item = {
        id: 'TEST',
        name: 'Test',
        identifier: testIdentifier,
        itemType: ItemType.SINGLE,
        geometryType: GeometryType.KEEPOUT_AREA_COMPONENT
      };

      const bounds = getZAxisBounds(item);
      expect(bounds).toBeUndefined();
    });

    it('should return undefined when only lowerBound is present', () => {
      const keepout = createKeepoutAreaItem({
        identifier: testIdentifier,
        geometryType: GeometryType.KEEPOUT_AREA_ROUTE,
        lowerBound: 0
      });

      // Manually remove upperBound for testing
      const modifiedKeepout = {
        ...keepout,
        userProperties: keepout.userProperties!.filter(
          p => p.key.objectName !== 'UPPER_BOUND'
        )
      };

      const bounds = getZAxisBounds(modifiedKeepout);
      expect(bounds).toBeUndefined();
    });

    it('should return undefined when bounds are invalid numbers', () => {
      const item = {
        id: 'TEST',
        name: 'Test',
        identifier: testIdentifier,
        itemType: ItemType.SINGLE,
        geometryType: GeometryType.KEEPOUT_AREA_ROUTE,
        userProperties: [
          { key: { systemScope: 'IDX', objectName: 'LOWER_BOUND' }, value: 'invalid' },
          { key: { systemScope: 'IDX', objectName: 'UPPER_BOUND' }, value: 'invalid' }
        ]
      };

      const bounds = getZAxisBounds(item);
      expect(bounds).toBeUndefined();
    });
  });

  // ============ 集成测试 ============

  describe('PCB keepout/keepin areas integration', () => {
    it('should create a complete set of keepout and keepin areas', () => {
      const areas = [];

      // Component keepout on top layer
      areas.push(createComponentKeepout(
        { ...testIdentifier, number: 'KO_COMP_1' },
        {
          lowerBound: 0,
          upperBound: 5.0,
          assembleToName: 'TOP',
          referenceName: 'COMP_KEEPOUT_TOP'
        }
      ));

      // Route keepout for signal layer
      areas.push(createRouteKeepout(
        { ...testIdentifier, number: 'KO_ROUTE_1' },
        {
          lowerBound: 0.5,
          upperBound: 1.5,
          assembleToName: 'SIGNAL_LAYER_1'
        }
      ));

      // Via keepout area
      areas.push(createViaKeepout(
        { ...testIdentifier, number: 'KO_VIA_1' },
        {
          lowerBound: 0,
          upperBound: 1.6
        }
      ));

      // Thermal keepout area
      areas.push(createThermalKeepout(
        { ...testIdentifier, number: 'KO_THERMAL_1' },
        {
          lowerBound: 0,
          upperBound: 10.0,
          referenceName: 'THERMAL_ZONE_1'
        }
      ));

      // Component keepin on bottom layer
      areas.push(createComponentKeepin(
        { ...testIdentifier, number: 'KI_COMP_1' },
        {
          lowerBound: 0,
          upperBound: 3.0,
          assembleToName: 'BOTTOM'
        }
      ));

      // Route keepin area
      areas.push(createRouteKeepin(
        { ...testIdentifier, number: 'KI_ROUTE_1' },
        {
          assembleToName: 'SIGNAL_LAYER_2'
        }
      ));

      expect(areas).toHaveLength(6);

      // Verify geometry types
      expect(areas[0]!.geometryType).toBe(GeometryType.KEEPOUT_AREA_COMPONENT);
      expect(areas[1]!.geometryType).toBe(GeometryType.KEEPOUT_AREA_ROUTE);
      expect(areas[2]!.geometryType).toBe(GeometryType.KEEPOUT_AREA_VIA);
      expect(areas[3]!.geometryType).toBe(GeometryType.KEEPOUT_AREA_THERMAL);
      expect(areas[4]!.geometryType).toBe(GeometryType.KEEPIN_AREA_COMPONENT);
      expect(areas[5]!.geometryType).toBe(GeometryType.KEEPIN_AREA_ROUTE);

      // Verify Z-axis bounds
      const bounds0 = getZAxisBounds(areas[0]!);
      expect(bounds0).toBeDefined();
      expect(bounds0!.lowerBound).toBe(0);
      expect(bounds0!.upperBound).toBe(5.0);

      const bounds1 = getZAxisBounds(areas[1]!);
      expect(bounds1).toBeDefined();
      expect(bounds1!.lowerBound).toBe(0.5);
      expect(bounds1!.upperBound).toBe(1.5);

      // Verify assembleToName
      expect(areas[0]!.assembleToName).toBe('TOP');
      expect(areas[4]!.assembleToName).toBe('BOTTOM');
      expect(areas[5]!.assembleToName).toBe('SIGNAL_LAYER_2');

      // Verify reference names
      expect(areas[0]!.referenceName).toBe('COMP_KEEPOUT_TOP');
      expect(areas[3]!.referenceName).toBe('THERMAL_ZONE_1');
    });

    it('should handle mixed keepout and keepin areas with various configurations', () => {
      const areas = [];

      // Keepout without Z-axis bounds
      areas.push(createComponentKeepout(
        { ...testIdentifier, number: 'KO_1' }
      ));

      // Keepin with only assembleToName
      areas.push(createRouteKeepin(
        { ...testIdentifier, number: 'KI_1' },
        { assembleToName: 'LAYER_1' }
      ));

      // Keepout with all options
      areas.push(createViaKeepout(
        { ...testIdentifier, number: 'KO_2' },
        {
          lowerBound: 0,
          upperBound: 1.6,
          assembleToName: 'ALL_LAYERS',
          referenceName: 'VIA_KEEPOUT_MAIN',
          baseline: true,
          id: 'CUSTOM_VIA_KO',
          name: 'Custom Via Keepout'
        }
      ));

      expect(areas).toHaveLength(3);
      expect(getZAxisBounds(areas[0]!)).toBeUndefined();
      expect(getZAxisBounds(areas[1]!)).toBeUndefined();
      expect(getZAxisBounds(areas[2]!)).toBeDefined();
      expect(areas[2]!.baseline).toBe(true);
      expect(areas[2]!.id).toBe('CUSTOM_VIA_KO');
      expect(areas[2]!.name).toBe('Custom Via Keepout');
    });
  });
});
