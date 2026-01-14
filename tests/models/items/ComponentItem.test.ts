/**
 * 组件Item测试
 */

import {
  createComponent,
  getRefdes,
  getPartNumber,
  getTransformation,
  createTranslation,
  createRotation,
  createRotationAndTranslation
} from '../../../src/models/items/ComponentItem';
import { GeometryType, ItemType } from '../../../src/types/enums';
import { Identifier } from '../../../src/types';

describe('ComponentItem', () => {
  // 测试用的标识符
  const testIdentifier: Identifier = {
    systemScope: 'TEST',
    number: 'COMP001',
    version: '1',
    revision: '1',
    sequence: 1
  };

  describe('createComponent', () => {
    it('should create a basic component', () => {
      const component = createComponent({
        identifier: testIdentifier
      });

      expect(component.identifier).toEqual(testIdentifier);
      expect(component.itemType).toBe(ItemType.SINGLE);
      expect(component.geometryType).toBe(GeometryType.COMPONENT);
      expect(component.id).toBe('COMP_COMP001');
      expect(component.name).toBe('Component COMP001');
    });

    it('should create component with REFDES', () => {
      const component = createComponent({
        identifier: testIdentifier,
        refdes: 'U1'
      });

      expect(component.userProperties).toHaveLength(1);
      
      const refdesProp = component.userProperties!.find(
        p => p.key.objectName === 'REFDES'
      );
      expect(refdesProp).toBeDefined();
      expect(refdesProp!.value).toBe('U1');
    });

    it('should create component with part number', () => {
      const component = createComponent({
        identifier: testIdentifier,
        partNumber: 'STM32F407VGT6'
      });

      expect(component.userProperties).toHaveLength(1);
      
      const partNumProp = component.userProperties!.find(
        p => p.key.objectName === 'PARTNUM'
      );
      expect(partNumProp).toBeDefined();
      expect(partNumProp!.value).toBe('STM32F407VGT6');
    });

    it('should create component with REFDES and part number', () => {
      const component = createComponent({
        identifier: testIdentifier,
        refdes: 'U1',
        partNumber: 'STM32F407VGT6'
      });

      expect(component.userProperties).toHaveLength(2);
    });

    it('should create component with transformation', () => {
      const transformation = createTranslation(10, 20);
      const component = createComponent({
        identifier: testIdentifier,
        refdes: 'R1',
        transformation
      });

      expect(component.itemInstance).toBeDefined();
      expect(component.itemInstance!.transformation).toEqual(transformation);
      expect(component.userProperties).toBeUndefined();
      expect(component.itemInstance!.userProperties).toHaveLength(1);
    });

    it('should create component with assembleToName', () => {
      const component = createComponent({
        identifier: testIdentifier,
        refdes: 'C1',
        assembleToName: 'TOP'
      });

      expect(component.assembleToName).toBe('TOP');
      expect(component.itemInstance).toBeDefined();
    });

    it('should create component with transformation and assembleToName', () => {
      const transformation = createRotationAndTranslation(50, 60, 90);
      const component = createComponent({
        identifier: testIdentifier,
        refdes: 'U2',
        partNumber: 'LM358',
        transformation,
        assembleToName: 'BOTTOM'
      });

      expect(component.assembleToName).toBe('BOTTOM');
      expect(component.itemInstance).toBeDefined();
      expect(component.itemInstance!.transformation).toEqual(transformation);
      expect(component.itemInstance!.userProperties).toHaveLength(2);
    });

    it('should create component with referenceName', () => {
      const component = createComponent({
        identifier: testIdentifier,
        referenceName: 'MCU_1'
      });

      expect(component.referenceName).toBe('MCU_1');
    });

    it('should create component with baseline flag', () => {
      const component = createComponent({
        identifier: testIdentifier,
        baseline: true
      });

      expect(component.baseline).toBe(true);
    });

    it('should create component with custom id and name', () => {
      const component = createComponent({
        identifier: testIdentifier,
        id: 'CUSTOM_ID',
        name: 'Custom Name'
      });

      expect(component.id).toBe('CUSTOM_ID');
      expect(component.name).toBe('Custom Name');
    });
  });

  describe('getRefdes', () => {
    it('should extract REFDES from component', () => {
      const component = createComponent({
        identifier: testIdentifier,
        refdes: 'R5'
      });
      const refdes = getRefdes(component);

      expect(refdes).toBe('R5');
    });

    it('should extract REFDES from component with transformation', () => {
      const component = createComponent({
        identifier: testIdentifier,
        refdes: 'C10',
        transformation: createTranslation(5, 10)
      });
      const refdes = getRefdes(component);

      expect(refdes).toBe('C10');
    });

    it('should return undefined for component without REFDES', () => {
      const component = createComponent({
        identifier: testIdentifier
      });
      const refdes = getRefdes(component);

      expect(refdes).toBeUndefined();
    });
  });

  describe('getPartNumber', () => {
    it('should extract part number from component', () => {
      const component = createComponent({
        identifier: testIdentifier,
        partNumber: 'NE555'
      });
      const partNumber = getPartNumber(component);

      expect(partNumber).toBe('NE555');
    });

    it('should extract part number from component with transformation', () => {
      const component = createComponent({
        identifier: testIdentifier,
        partNumber: 'LM7805',
        transformation: createTranslation(15, 25)
      });
      const partNumber = getPartNumber(component);

      expect(partNumber).toBe('LM7805');
    });

    it('should return undefined for component without part number', () => {
      const component = createComponent({
        identifier: testIdentifier
      });
      const partNumber = getPartNumber(component);

      expect(partNumber).toBeUndefined();
    });
  });

  describe('getTransformation', () => {
    it('should extract transformation from component', () => {
      const transformation = createTranslation(30, 40);
      const component = createComponent({
        identifier: testIdentifier,
        transformation
      });
      const extracted = getTransformation(component);

      expect(extracted).toEqual(transformation);
    });

    it('should return undefined for component without transformation', () => {
      const component = createComponent({
        identifier: testIdentifier
      });
      const transformation = getTransformation(component);

      expect(transformation).toBeUndefined();
    });
  });

  describe('createTranslation', () => {
    it('should create translation transformation', () => {
      const transformation = createTranslation(10, 20);

      expect(transformation.xx).toBe(1);
      expect(transformation.xy).toBe(0);
      expect(transformation.yx).toBe(0);
      expect(transformation.yy).toBe(1);
      expect(transformation.tx).toBe(10);
      expect(transformation.ty).toBe(20);
    });
  });

  describe('createRotation', () => {
    it('should create 90 degree rotation', () => {
      const transformation = createRotation(90);

      expect(transformation.xx).toBeCloseTo(0, 10);
      expect(transformation.xy).toBeCloseTo(-1, 10);
      expect(transformation.yx).toBeCloseTo(1, 10);
      expect(transformation.yy).toBeCloseTo(0, 10);
      expect(transformation.tx).toBe(0);
      expect(transformation.ty).toBe(0);
    });

    it('should create 180 degree rotation', () => {
      const transformation = createRotation(180);

      expect(transformation.xx).toBeCloseTo(-1, 10);
      expect(transformation.xy).toBeCloseTo(0, 10);
      expect(transformation.yx).toBeCloseTo(0, 10);
      expect(transformation.yy).toBeCloseTo(-1, 10);
    });

    it('should create 45 degree rotation', () => {
      const transformation = createRotation(45);
      const sqrt2_2 = Math.sqrt(2) / 2;

      expect(transformation.xx).toBeCloseTo(sqrt2_2, 10);
      expect(transformation.xy).toBeCloseTo(-sqrt2_2, 10);
      expect(transformation.yx).toBeCloseTo(sqrt2_2, 10);
      expect(transformation.yy).toBeCloseTo(sqrt2_2, 10);
    });
  });

  describe('createRotationAndTranslation', () => {
    it('should create rotation and translation transformation', () => {
      const transformation = createRotationAndTranslation(10, 20, 90);

      expect(transformation.xx).toBeCloseTo(0, 10);
      expect(transformation.xy).toBeCloseTo(-1, 10);
      expect(transformation.yx).toBeCloseTo(1, 10);
      expect(transformation.yy).toBeCloseTo(0, 10);
      expect(transformation.tx).toBe(10);
      expect(transformation.ty).toBe(20);
    });

    it('should create identity transformation with 0 rotation', () => {
      const transformation = createRotationAndTranslation(5, 15, 0);

      expect(transformation.xx).toBeCloseTo(1, 10);
      expect(transformation.xy).toBeCloseTo(0, 10);
      expect(transformation.yx).toBeCloseTo(0, 10);
      expect(transformation.yy).toBeCloseTo(1, 10);
      expect(transformation.tx).toBe(5);
      expect(transformation.ty).toBe(15);
    });
  });

  describe('PCB components integration', () => {
    it('should create a complete set of PCB components', () => {
      const components = [];

      // MCU on top layer
      components.push(createComponent({
        identifier: { ...testIdentifier, number: 'U1' },
        refdes: 'U1',
        partNumber: 'STM32F407VGT6',
        transformation: createRotationAndTranslation(50, 50, 0),
        assembleToName: 'TOP',
        referenceName: 'MCU'
      }));

      // Resistor on top layer with rotation
      components.push(createComponent({
        identifier: { ...testIdentifier, number: 'R1' },
        refdes: 'R1',
        partNumber: '10K_0603',
        transformation: createRotationAndTranslation(20, 30, 90),
        assembleToName: 'TOP'
      }));

      // Capacitor on bottom layer
      components.push(createComponent({
        identifier: { ...testIdentifier, number: 'C1' },
        refdes: 'C1',
        partNumber: '100nF_0603',
        transformation: createRotationAndTranslation(15, 25, 180),
        assembleToName: 'BOTTOM'
      }));

      // LED without transformation (just properties)
      components.push(createComponent({
        identifier: { ...testIdentifier, number: 'D1' },
        refdes: 'D1',
        partNumber: 'LED_RED_0805'
      }));

      expect(components).toHaveLength(4);
      expect(components[0]?.geometryType).toBe(GeometryType.COMPONENT);
      expect(components[0]?.assembleToName).toBe('TOP');
      expect(components[2]?.assembleToName).toBe('BOTTOM');

      // Verify REFDES and part numbers
      expect(getRefdes(components[0]!)).toBe('U1');
      expect(getPartNumber(components[0]!)).toBe('STM32F407VGT6');
      expect(getRefdes(components[3]!)).toBe('D1');

      // Verify transformations
      expect(getTransformation(components[0]!)).toBeDefined();
      expect(getTransformation(components[3]!)).toBeUndefined();
    });
  });
});
