/**
 * ItemFactory禁止区域和保留区域测试套件
 * 
 * @description
 * 测试ItemFactory创建各种禁止区域（KEEPOUT_AREA）和保留区域（KEEPIN_AREA）的功能。
 */

import { ItemFactory } from '../../src/core/ItemFactory';
import { ItemType, GeometryType } from '../../src/types/enums';

describe('ItemFactory - Keepout and Keepin Areas', () => {
  let factory: ItemFactory;

  beforeEach(() => {
    factory = new ItemFactory();
  });

  describe('Keepout Areas', () => {
    it('should create KEEPOUT_AREA_COMPONENT item', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPOUT-001', '1.0', 'A', 1);
      const item = factory.createItem(
        'keepout1',
        'Component Keepout',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPOUT_AREA_COMPONENT
      );

      expect(item.id).toBe('keepout1');
      expect(item.name).toBe('Component Keepout');
      expect(item.geometryType).toBe(GeometryType.KEEPOUT_AREA_COMPONENT);
    });

    it('should create KEEPOUT_AREA_ROUTE item', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPOUT-002', '1.0', 'A', 2);
      const item = factory.createItem(
        'keepout2',
        'Route Keepout',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPOUT_AREA_ROUTE
      );

      expect(item.geometryType).toBe(GeometryType.KEEPOUT_AREA_ROUTE);
    });

    it('should create KEEPOUT_AREA_VIA item', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPOUT-003', '1.0', 'A', 3);
      const item = factory.createItem(
        'keepout3',
        'Via Keepout',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPOUT_AREA_VIA
      );

      expect(item.geometryType).toBe(GeometryType.KEEPOUT_AREA_VIA);
    });

    it('should create KEEPOUT_AREA_TESTPOINT item', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPOUT-004', '1.0', 'A', 4);
      const item = factory.createItem(
        'keepout4',
        'Testpoint Keepout',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPOUT_AREA_TESTPOINT
      );

      expect(item.geometryType).toBe(GeometryType.KEEPOUT_AREA_TESTPOINT);
    });

    it('should create KEEPOUT_AREA_THERMAL item', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPOUT-005', '1.0', 'A', 5);
      const item = factory.createItem(
        'keepout5',
        'Thermal Keepout',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPOUT_AREA_THERMAL
      );

      expect(item.geometryType).toBe(GeometryType.KEEPOUT_AREA_THERMAL);
    });

    it('should create KEEPOUT_AREA_OTHER item', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPOUT-006', '1.0', 'A', 6);
      const item = factory.createItem(
        'keepout6',
        'Other Keepout',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPOUT_AREA_OTHER
      );

      expect(item.geometryType).toBe(GeometryType.KEEPOUT_AREA_OTHER);
    });
  });

  describe('Keepin Areas', () => {
    it('should create KEEPIN_AREA_COMPONENT item', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPIN-001', '1.0', 'A', 1);
      const item = factory.createItem(
        'keepin1',
        'Component Keepin',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPIN_AREA_COMPONENT
      );

      expect(item.id).toBe('keepin1');
      expect(item.name).toBe('Component Keepin');
      expect(item.geometryType).toBe(GeometryType.KEEPIN_AREA_COMPONENT);
    });

    it('should create KEEPIN_AREA_ROUTE item', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPIN-002', '1.0', 'A', 2);
      const item = factory.createItem(
        'keepin2',
        'Route Keepin',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPIN_AREA_ROUTE
      );

      expect(item.geometryType).toBe(GeometryType.KEEPIN_AREA_ROUTE);
    });

    it('should create KEEPIN_AREA_VIA item', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPIN-003', '1.0', 'A', 3);
      const item = factory.createItem(
        'keepin3',
        'Via Keepin',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPIN_AREA_VIA
      );

      expect(item.geometryType).toBe(GeometryType.KEEPIN_AREA_VIA);
    });

    it('should create KEEPIN_AREA_TESTPOINT item', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPIN-004', '1.0', 'A', 4);
      const item = factory.createItem(
        'keepin4',
        'Testpoint Keepin',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPIN_AREA_TESTPOINT
      );

      expect(item.geometryType).toBe(GeometryType.KEEPIN_AREA_TESTPOINT);
    });

    it('should create KEEPIN_AREA_OTHER item', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPIN-005', '1.0', 'A', 5);
      const item = factory.createItem(
        'keepin5',
        'Other Keepin',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPIN_AREA_OTHER
      );

      expect(item.geometryType).toBe(GeometryType.KEEPIN_AREA_OTHER);
    });
  });

  describe('Keepout/Keepin with Z-axis height range', () => {
    it('should create keepout area with height range using user properties', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPOUT-007', '1.0', 'A', 7);
      
      const lowerBoundKey = factory.createPropertyKey('EDA', 'LOWER_BOUND');
      const upperBoundKey = factory.createPropertyKey('EDA', 'UPPER_BOUND');
      const lowerBoundProp = factory.createUserProperty(lowerBoundKey, '0.0');
      const upperBoundProp = factory.createUserProperty(upperBoundKey, '5.0');

      const item = factory.createItem(
        'keepout7',
        'Height Limited Keepout',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPOUT_AREA_COMPONENT,
        {
          userProperties: [lowerBoundProp, upperBoundProp]
        }
      );

      expect(item.userProperties).toHaveLength(2);
      expect(item.userProperties).toBeDefined();
      
      const props = item.userProperties!;
      const prop0 = props[0];
      const prop1 = props[1];
      
      expect(prop0).toBeDefined();
      expect(prop0!.key.objectName).toBe('LOWER_BOUND');
      expect(prop0!.value).toBe('0.0');
      
      expect(prop1).toBeDefined();
      expect(prop1!.key.objectName).toBe('UPPER_BOUND');
      expect(prop1!.value).toBe('5.0');
    });

    it('should create keepin area with constraint type information', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPIN-006', '1.0', 'A', 6);
      
      const constraintTypeKey = factory.createPropertyKey('EDA', 'CONSTRAINT_TYPE');
      const constraintTypeProp = factory.createUserProperty(constraintTypeKey, 'MANDATORY');

      const item = factory.createItem(
        'keepin6',
        'Mandatory Keepin',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPIN_AREA_COMPONENT,
        {
          userProperties: [constraintTypeProp]
        }
      );

      expect(item.userProperties).toHaveLength(1);
      expect(item.userProperties).toBeDefined();
      
      const props = item.userProperties!;
      const prop0 = props[0];
      
      expect(prop0).toBeDefined();
      expect(prop0!.key.objectName).toBe('CONSTRAINT_TYPE');
      expect(prop0!.value).toBe('MANDATORY');
    });
  });

  describe('Keepout/Keepin with AssembleToName', () => {
    it('should create keepout area associated with TOP layer', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPOUT-008', '1.0', 'A', 8);
      const item = factory.createItem(
        'keepout8',
        'Top Layer Keepout',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPOUT_AREA_COMPONENT,
        {
          assembleToName: 'TOP'
        }
      );

      expect(item.assembleToName).toBe('TOP');
    });

    it('should create keepout area associated with BOTTOM layer', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPOUT-009', '1.0', 'A', 9);
      const item = factory.createItem(
        'keepout9',
        'Bottom Layer Keepout',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPOUT_AREA_ROUTE,
        {
          assembleToName: 'BOTTOM'
        }
      );

      expect(item.assembleToName).toBe('BOTTOM');
    });

    it('should create keepin area associated with specific layer', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPIN-007', '1.0', 'A', 7);
      const item = factory.createItem(
        'keepin7',
        'Layer Specific Keepin',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPIN_AREA_ROUTE,
        {
          assembleToName: 'SIGNAL_L1'
        }
      );

      expect(item.assembleToName).toBe('SIGNAL_L1');
    });
  });

  describe('Complex keepout/keepin scenarios', () => {
    it('should create keepout area with shape reference', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPOUT-010', '1.0', 'A', 10);
      const item = factory.createItem(
        'keepout10',
        'Shaped Keepout',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPOUT_AREA_COMPONENT,
        {
          shape: 'shape_rect_001',
          assembleToName: 'TOP'
        }
      );

      expect(item.shape).toBe('shape_rect_001');
      expect(item.assembleToName).toBe('TOP');
    });

    it('should create keepout area with description and reference name', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPOUT-011', '1.0', 'A', 11);
      const item = factory.createItem(
        'keepout11',
        'Critical Keepout',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPOUT_AREA_THERMAL,
        {
          description: 'High temperature area - no components allowed',
          referenceName: 'THERMAL_ZONE_1'
        }
      );

      expect(item.description).toBe('High temperature area - no components allowed');
      expect(item.referenceName).toBe('THERMAL_ZONE_1');
    });

    it('should create multiple keepout areas of different types', () => {
      const types = [
        GeometryType.KEEPOUT_AREA_COMPONENT,
        GeometryType.KEEPOUT_AREA_ROUTE,
        GeometryType.KEEPOUT_AREA_VIA,
        GeometryType.KEEPOUT_AREA_TESTPOINT,
        GeometryType.KEEPOUT_AREA_THERMAL,
        GeometryType.KEEPOUT_AREA_OTHER
      ];

      types.forEach((type, index) => {
        const identifier = factory.createIdentifier('EDA', `KEEPOUT-${100 + index}`, '1.0', 'A', 100 + index);
        const item = factory.createItem(
          `keepout_${100 + index}`,
          `Keepout ${index}`,
          ItemType.SINGLE,
          identifier,
          type
        );

        expect(item.geometryType).toBe(type);
      });

      expect(factory.getItemCount()).toBe(6);
    });

    it('should create multiple keepin areas of different types', () => {
      const types = [
        GeometryType.KEEPIN_AREA_COMPONENT,
        GeometryType.KEEPIN_AREA_ROUTE,
        GeometryType.KEEPIN_AREA_VIA,
        GeometryType.KEEPIN_AREA_TESTPOINT,
        GeometryType.KEEPIN_AREA_OTHER
      ];

      types.forEach((type, index) => {
        const identifier = factory.createIdentifier('EDA', `KEEPIN-${100 + index}`, '1.0', 'A', 100 + index);
        const item = factory.createItem(
          `keepin_${100 + index}`,
          `Keepin ${index}`,
          ItemType.SINGLE,
          identifier,
          type
        );

        expect(item.geometryType).toBe(type);
      });

      expect(factory.getItemCount()).toBe(5);
    });
  });

  describe('Keepout/Keepin validation', () => {
    it('should allow keepout area without geometry type', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPOUT-012', '1.0', 'A', 12);
      const item = factory.createItem(
        'keepout12',
        'Generic Keepout',
        ItemType.SINGLE,
        identifier
      );

      expect(item.geometryType).toBeUndefined();
    });

    it('should create keepout with all properties', () => {
      const identifier = factory.createIdentifier('EDA', 'KEEPOUT-013', '1.0', 'A', 13);
      
      const heightKey = factory.createPropertyKey('EDA', 'HEIGHT');
      const heightProp = factory.createUserProperty(heightKey, '3.5');

      const item = factory.createItem(
        'keepout13',
        'Complete Keepout',
        ItemType.SINGLE,
        identifier,
        GeometryType.KEEPOUT_AREA_COMPONENT,
        {
          description: 'Complete keepout with all properties',
          referenceName: 'KEEPOUT_COMPLETE',
          baseline: false,
          userProperties: [heightProp],
          assembleToName: 'TOP',
          shape: 'shape_polygon_001'
        }
      );

      expect(item.id).toBe('keepout13');
      expect(item.name).toBe('Complete Keepout');
      expect(item.geometryType).toBe(GeometryType.KEEPOUT_AREA_COMPONENT);
      expect(item.description).toBe('Complete keepout with all properties');
      expect(item.referenceName).toBe('KEEPOUT_COMPLETE');
      expect(item.baseline).toBe(false);
      expect(item.userProperties).toHaveLength(1);
      expect(item.assembleToName).toBe('TOP');
      expect(item.shape).toBe('shape_polygon_001');
    });
  });
});
