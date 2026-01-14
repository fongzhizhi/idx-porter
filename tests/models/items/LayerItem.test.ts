/**
 * 层叠结构Item测试
 */

import {
  createLayerItem,
  createSilkscreenLayer,
  createStackupLayer,
  createSignalLayer,
  createPowerGroundLayer,
  createSoldermaskLayer,
  createSolderpasteLayer,
  createDielectricLayer
} from '../../../src/models/items/LayerItem';
import { GeometryType, ItemType } from '../../../src/types/enums';
import { Identifier } from '../../../src/types';

describe('LayerItem', () => {
  // 测试用的标识符
  const testIdentifier: Identifier = {
    systemScope: 'TEST',
    number: 'LAYER001',
    version: '1',
    revision: '1',
    sequence: 1
  };

  describe('createLayerItem', () => {
    it('should create a basic layer item', () => {
      const layer = createLayerItem({
        identifier: testIdentifier,
        geometryType: GeometryType.LAYER_SILKSCREEN
      });

      expect(layer.identifier).toEqual(testIdentifier);
      expect(layer.itemType).toBe(ItemType.SINGLE);
      expect(layer.geometryType).toBe(GeometryType.LAYER_SILKSCREEN);
      expect(layer.id).toBe('LAYER_LAYER001');
      expect(layer.name).toBe('Layer LAYER001');
    });

    it('should create layer with Z-axis bounds', () => {
      const layer = createLayerItem({
        identifier: testIdentifier,
        geometryType: GeometryType.LAYER_STACKUP,
        lowerBound: 0,
        upperBound: 1.6
      });

      expect(layer.geometryType).toBe(GeometryType.LAYER_STACKUP);
      expect(layer.itemType).toBe(ItemType.SINGLE);
    });

    it('should throw error for invalid layer type', () => {
      expect(() => {
        createLayerItem({
          identifier: testIdentifier,
          geometryType: GeometryType.COMPONENT as any
        });
      }).toThrow('Invalid layer geometry type');
    });

    it('should throw error when lowerBound >= upperBound', () => {
      expect(() => {
        createLayerItem({
          identifier: testIdentifier,
          geometryType: GeometryType.LAYER_STACKUP,
          lowerBound: 1.6,
          upperBound: 0
        });
      }).toThrow('LowerBound (1.6) must be less than UpperBound (0)');
    });

    it('should create layer with referenceName', () => {
      const layer = createLayerItem({
        identifier: testIdentifier,
        geometryType: GeometryType.LAYER_SILKSCREEN,
        referenceName: 'TOP_SILK'
      });

      expect(layer.referenceName).toBe('TOP_SILK');
    });

    it('should create layer with baseline flag', () => {
      const layer = createLayerItem({
        identifier: testIdentifier,
        geometryType: GeometryType.LAYER_SILKSCREEN,
        baseline: true
      });

      expect(layer.baseline).toBe(true);
    });

    it('should create layer with custom id and name', () => {
      const layer = createLayerItem({
        identifier: testIdentifier,
        geometryType: GeometryType.LAYER_SILKSCREEN,
        id: 'CUSTOM_ID',
        name: 'Custom Name'
      });

      expect(layer.id).toBe('CUSTOM_ID');
      expect(layer.name).toBe('Custom Name');
    });
  });

  describe('createSilkscreenLayer', () => {
    it('should create silkscreen layer', () => {
      const layer = createSilkscreenLayer(testIdentifier);

      expect(layer.geometryType).toBe(GeometryType.LAYER_SILKSCREEN);
      expect(layer.itemType).toBe(ItemType.SINGLE);
      expect(layer.id).toBe('LAYER_LAYER001');
    });

    it('should create silkscreen layer with Z-axis bounds', () => {
      const layer = createSilkscreenLayer(testIdentifier, {
        lowerBound: 1.6,
        upperBound: 1.65,
        referenceName: 'TOP_SILK'
      });

      expect(layer.geometryType).toBe(GeometryType.LAYER_SILKSCREEN);
      expect(layer.referenceName).toBe('TOP_SILK');
    });
  });

  describe('createStackupLayer', () => {
    it('should create stackup layer', () => {
      const layer = createStackupLayer(testIdentifier, 0, 1.6);

      expect(layer.geometryType).toBe(GeometryType.LAYER_STACKUP);
      expect(layer.itemType).toBe(ItemType.SINGLE);
    });

    it('should create stackup layer with referenceName', () => {
      const layer = createStackupLayer(testIdentifier, 0, 1.6, {
        referenceName: 'PCB_STACKUP'
      });

      expect(layer.referenceName).toBe('PCB_STACKUP');
    });
  });

  describe('createSignalLayer', () => {
    it('should create signal layer', () => {
      const layer = createSignalLayer(testIdentifier, 0, 0.035);

      expect(layer.geometryType).toBe(GeometryType.LAYER_OTHERSIGNAL);
      expect(layer.itemType).toBe(ItemType.SINGLE);
    });

    it('should create signal layer with referenceName', () => {
      const layer = createSignalLayer(testIdentifier, 0, 0.035, {
        referenceName: 'TOP_LAYER'
      });

      expect(layer.referenceName).toBe('TOP_LAYER');
    });
  });

  describe('createPowerGroundLayer', () => {
    it('should create power/ground layer', () => {
      const layer = createPowerGroundLayer(testIdentifier, 0.5, 0.535);

      expect(layer.geometryType).toBe(GeometryType.LAYER_POWERORGROUND);
      expect(layer.itemType).toBe(ItemType.SINGLE);
    });

    it('should create power/ground layer with referenceName', () => {
      const layer = createPowerGroundLayer(testIdentifier, 0.5, 0.535, {
        referenceName: 'GND_LAYER'
      });

      expect(layer.referenceName).toBe('GND_LAYER');
    });
  });

  describe('createSoldermaskLayer', () => {
    it('should create soldermask layer', () => {
      const layer = createSoldermaskLayer(testIdentifier);

      expect(layer.geometryType).toBe(GeometryType.LAYER_SOLDERMASK);
      expect(layer.itemType).toBe(ItemType.SINGLE);
    });

    it('should create soldermask layer with Z-axis bounds', () => {
      const layer = createSoldermaskLayer(testIdentifier, {
        lowerBound: 1.6,
        upperBound: 1.62,
        referenceName: 'TOP_MASK'
      });

      expect(layer.geometryType).toBe(GeometryType.LAYER_SOLDERMASK);
      expect(layer.referenceName).toBe('TOP_MASK');
    });
  });

  describe('createSolderpasteLayer', () => {
    it('should create solderpaste layer', () => {
      const layer = createSolderpasteLayer(testIdentifier);

      expect(layer.geometryType).toBe(GeometryType.LAYER_SOLDERPASTE);
      expect(layer.itemType).toBe(ItemType.SINGLE);
    });

    it('should create solderpaste layer with Z-axis bounds', () => {
      const layer = createSolderpasteLayer(testIdentifier, {
        lowerBound: 1.62,
        upperBound: 1.72,
        referenceName: 'TOP_PASTE'
      });

      expect(layer.geometryType).toBe(GeometryType.LAYER_SOLDERPASTE);
      expect(layer.referenceName).toBe('TOP_PASTE');
    });
  });

  describe('createDielectricLayer', () => {
    it('should create dielectric layer', () => {
      const layer = createDielectricLayer(testIdentifier, 0.035, 0.5);

      expect(layer.geometryType).toBe(GeometryType.LAYER_DIELECTRIC);
      expect(layer.itemType).toBe(ItemType.SINGLE);
    });

    it('should create dielectric layer with referenceName', () => {
      const layer = createDielectricLayer(testIdentifier, 0.035, 0.5, {
        referenceName: 'CORE_1'
      });

      expect(layer.referenceName).toBe('CORE_1');
    });
  });

  describe('Layer stackup integration', () => {
    it('should create a complete 4-layer PCB stackup', () => {
      const layers = [];

      // 顶层铜箔
      layers.push(createSignalLayer(
        { ...testIdentifier, number: 'L1' },
        1.565,
        1.6,
        { referenceName: 'TOP' }
      ));

      // 介质层1
      layers.push(createDielectricLayer(
        { ...testIdentifier, number: 'D1' },
        0.8,
        1.565,
        { referenceName: 'CORE_1' }
      ));

      // 内层1（电源层）
      layers.push(createPowerGroundLayer(
        { ...testIdentifier, number: 'L2' },
        0.765,
        0.8,
        { referenceName: 'GND' }
      ));

      // 介质层2
      layers.push(createDielectricLayer(
        { ...testIdentifier, number: 'D2' },
        0.035,
        0.765,
        { referenceName: 'CORE_2' }
      ));

      // 底层铜箔
      layers.push(createSignalLayer(
        { ...testIdentifier, number: 'L3' },
        0,
        0.035,
        { referenceName: 'BOTTOM' }
      ));

      expect(layers).toHaveLength(5);
      expect(layers[0]?.referenceName).toBe('TOP');
      expect(layers[2]?.referenceName).toBe('GND');
      expect(layers[4]?.referenceName).toBe('BOTTOM');
    });
  });
});
