/**
 * 枚举类型测试
 * 
 * @description
 * 测试所有枚举类型的定义和值。
 */

import {
  GeometryType,
  ItemType,
  UnitLength,
  ProcessInstructionType,
  ShapeDescriptionType,
  TransformationType
} from '../../src/types/enums';

describe('Enums', () => {
  describe('GeometryType', () => {
    test('should have board level types', () => {
      expect(GeometryType.BOARD_OUTLINE).toBe('BOARD_OUTLINE');
      expect(GeometryType.BOARD_AREA_RIGID).toBe('BOARD_AREA_RIGID');
      expect(GeometryType.BOARD_AREA_FLEXIBLE).toBe('BOARD_AREA_FLEXIBLE');
      expect(GeometryType.BOARD_AREA_STIFFENER).toBe('BOARD_AREA_STIFFENER');
    });

    test('should have component types', () => {
      expect(GeometryType.COMPONENT).toBe('COMPONENT');
      expect(GeometryType.COMPONENT_MECHANICAL).toBe('COMPONENT_MECHANICAL');
    });

    test('should have hole types', () => {
      expect(GeometryType.VIA).toBe('VIA');
      expect(GeometryType.FILLED_VIA).toBe('FILLED_VIA');
      expect(GeometryType.HOLE_PLATED).toBe('HOLE_PLATED');
      expect(GeometryType.HOLE_NON_PLATED).toBe('HOLE_NON_PLATED');
      expect(GeometryType.HOLE_PLATED_MILLED).toBe('HOLE_PLATED_MILLED');
      expect(GeometryType.HOLE_NONPLATED_MILLED).toBe('HOLE_NONPLATED_MILLED');
    });

    test('should have keepout area types', () => {
      expect(GeometryType.KEEPOUT_AREA_COMPONENT).toBe('KEEPOUT_AREA_COMPONENT');
      expect(GeometryType.KEEPOUT_AREA_ROUTE).toBe('KEEPOUT_AREA_ROUTE');
      expect(GeometryType.KEEPOUT_AREA_VIA).toBe('KEEPOUT_AREA_VIA');
      expect(GeometryType.KEEPOUT_AREA_TESTPOINT).toBe('KEEPOUT_AREA_TESTPOINT');
      expect(GeometryType.KEEPOUT_AREA_THERMAL).toBe('KEEPOUT_AREA_THERMAL');
      expect(GeometryType.KEEPOUT_AREA_OTHER).toBe('KEEPOUT_AREA_OTHER');
    });

    test('should have keepin area types', () => {
      expect(GeometryType.KEEPIN_AREA_COMPONENT).toBe('KEEPIN_AREA_COMPONENT');
      expect(GeometryType.KEEPIN_AREA_ROUTE).toBe('KEEPIN_AREA_ROUTE');
      expect(GeometryType.KEEPIN_AREA_VIA).toBe('KEEPIN_AREA_VIA');
      expect(GeometryType.KEEPIN_AREA_TESTPOINT).toBe('KEEPIN_AREA_TESTPOINT');
      expect(GeometryType.KEEPIN_AREA_OTHER).toBe('KEEPIN_AREA_OTHER');
    });

    test('should have layer types', () => {
      expect(GeometryType.LAYER_SILKSCREEN).toBe('LAYER_SILKSCREEN');
      expect(GeometryType.LAYER_SOLDERMASK).toBe('LAYER_SOLDERMASK');
      expect(GeometryType.LAYER_SOLDERPASTE).toBe('LAYER_SOLDERPASTE');
      expect(GeometryType.LAYER_OTHERSIGNAL).toBe('LAYER_OTHERSIGNAL');
      expect(GeometryType.LAYER_POWERORGROUND).toBe('LAYER_POWERORGROUND');
      expect(GeometryType.LAYER_DIELECTRIC).toBe('LAYER_DIELECTRIC');
      expect(GeometryType.LAYER_STACKUP).toBe('LAYER_STACKUP');
    });
  });

  describe('ItemType', () => {
    test('should have single and assembly types', () => {
      expect(ItemType.SINGLE).toBe('single');
      expect(ItemType.ASSEMBLY).toBe('assembly');
    });
  });

  describe('UnitLength', () => {
    test('should have mm and inch units', () => {
      expect(UnitLength.UNIT_MM).toBe('UNIT_MM');
      expect(UnitLength.UNIT_INCH).toBe('UNIT_INCH');
    });
  });

  describe('ProcessInstructionType', () => {
    test('should have process instruction types', () => {
      expect(ProcessInstructionType.SEND_INFORMATION).toBe('SendInformation');
      expect(ProcessInstructionType.SEND_CHANGES).toBe('SendChanges');
      expect(ProcessInstructionType.CLEARANCE).toBe('Clearance');
    });
  });

  describe('ShapeDescriptionType', () => {
    test('should have geometric model type', () => {
      expect(ShapeDescriptionType.GEOMETRIC_MODEL).toBe('GeometricModel');
    });
  });

  describe('TransformationType', () => {
    test('should have 2D and 3D transformation types', () => {
      expect(TransformationType.D2).toBe('d2');
      expect(TransformationType.D3).toBe('d3');
    });
  });
});
