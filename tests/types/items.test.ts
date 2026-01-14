/**
 * Item类型测试
 * 
 * @description
 * 测试Item相关类型定义的结构和类型安全性。
 */

import {
  Identifier,
  InstanceName,
  PropertyKey,
  UserProperty,
  Transformation,
  ItemInstance,
  Item
} from '../../src/types/items';
import { ItemType, GeometryType, TransformationType } from '../../src/types/enums';

describe('Item Types', () => {
  describe('Identifier', () => {
    test('should create valid Identifier', () => {
      const identifier: Identifier = {
        systemScope: 'EDA_SYSTEM',
        number: 'PCB-001',
        version: '1.0',
        revision: 'A',
        sequence: 1
      };

      expect(identifier.systemScope).toBe('EDA_SYSTEM');
      expect(identifier.number).toBe('PCB-001');
      expect(identifier.version).toBe('1.0');
      expect(identifier.revision).toBe('A');
      expect(identifier.sequence).toBe(1);
    });
  });

  describe('InstanceName', () => {
    test('should create valid InstanceName', () => {
      const instanceName: InstanceName = {
        systemScope: 'EDA_SYSTEM',
        objectName: 'U1'
      };

      expect(instanceName.systemScope).toBe('EDA_SYSTEM');
      expect(instanceName.objectName).toBe('U1');
    });
  });

  describe('PropertyKey', () => {
    test('should create valid PropertyKey', () => {
      const key: PropertyKey = {
        systemScope: 'EDA_SYSTEM',
        objectName: 'REFDES'
      };

      expect(key.systemScope).toBe('EDA_SYSTEM');
      expect(key.objectName).toBe('REFDES');
    });
  });

  describe('UserProperty', () => {
    test('should create valid UserProperty', () => {
      const property: UserProperty = {
        key: {
          systemScope: 'EDA_SYSTEM',
          objectName: 'THICKNESS'
        },
        value: '1.6'
      };

      expect(property.key.objectName).toBe('THICKNESS');
      expect(property.value).toBe('1.6');
    });
  });

  describe('Transformation', () => {
    test('should create identity transformation', () => {
      const transform: Transformation = {
        transformationType: TransformationType.D2,
        xx: 1,
        xy: 0,
        yx: 0,
        yy: 1,
        tx: 0,
        ty: 0
      };

      expect(transform.transformationType).toBe(TransformationType.D2);
      expect(transform.xx).toBe(1);
      expect(transform.yy).toBe(1);
      expect(transform.tx).toBe(0);
      expect(transform.ty).toBe(0);
    });

    test('should create translation transformation', () => {
      const transform: Transformation = {
        transformationType: TransformationType.D2,
        xx: 1,
        xy: 0,
        yx: 0,
        yy: 1,
        tx: 10,
        ty: 20
      };

      expect(transform.tx).toBe(10);
      expect(transform.ty).toBe(20);
    });

    test('should create rotation transformation', () => {
      const angle = Math.PI / 4; // 45 degrees
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      const transform: Transformation = {
        transformationType: TransformationType.D2,
        xx: cos,
        xy: -sin,
        yx: sin,
        yy: cos,
        tx: 0,
        ty: 0
      };

      expect(transform.xx).toBeCloseTo(cos);
      expect(transform.xy).toBeCloseTo(-sin);
      expect(transform.yx).toBeCloseTo(sin);
      expect(transform.yy).toBeCloseTo(cos);
    });
  });

  describe('ItemInstance', () => {
    test('should create valid ItemInstance', () => {
      const instance: ItemInstance = {
        instanceName: {
          systemScope: 'EDA_SYSTEM',
          objectName: 'U1'
        },
        transformation: {
          transformationType: TransformationType.D2,
          xx: 1,
          xy: 0,
          yx: 0,
          yy: 1,
          tx: 10,
          ty: 20
        },
        item: 'item_ref_1'
      };

      expect(instance.instanceName.objectName).toBe('U1');
      expect(instance.transformation?.tx).toBe(10);
      expect(instance.item).toBe('item_ref_1');
    });

    test('should create ItemInstance with user properties', () => {
      const instance: ItemInstance = {
        instanceName: {
          systemScope: 'EDA_SYSTEM',
          objectName: 'U2'
        },
        userProperties: [
          {
            key: { systemScope: 'EDA_SYSTEM', objectName: 'REFDES' },
            value: 'U2'
          }
        ]
      };

      expect(instance.userProperties).toHaveLength(1);
      expect(instance.userProperties?.[0]?.value).toBe('U2');
    });
  });

  describe('Item', () => {
    test('should create valid single Item', () => {
      const item: Item = {
        id: 'item1',
        name: 'Board Outline',
        itemType: ItemType.SINGLE,
        geometryType: GeometryType.BOARD_OUTLINE,
        identifier: {
          systemScope: 'EDA_SYSTEM',
          number: 'BOARD-001',
          version: '1.0',
          revision: 'A',
          sequence: 1
        }
      };

      expect(item.id).toBe('item1');
      expect(item.name).toBe('Board Outline');
      expect(item.itemType).toBe(ItemType.SINGLE);
      expect(item.geometryType).toBe(GeometryType.BOARD_OUTLINE);
    });

    test('should create valid assembly Item', () => {
      const item: Item = {
        id: 'item2',
        name: 'Component Assembly',
        itemType: ItemType.ASSEMBLY,
        geometryType: GeometryType.COMPONENT,
        identifier: {
          systemScope: 'EDA_SYSTEM',
          number: 'COMP-001',
          version: '1.0',
          revision: 'A',
          sequence: 1
        },
        referenceName: 'U1',
        baseline: true
      };

      expect(item.itemType).toBe(ItemType.ASSEMBLY);
      expect(item.referenceName).toBe('U1');
      expect(item.baseline).toBe(true);
    });

    test('should create Item with all optional fields', () => {
      const item: Item = {
        id: 'item3',
        name: 'Complex Item',
        description: 'A complex item with all fields',
        itemType: ItemType.SINGLE,
        geometryType: GeometryType.VIA,
        identifier: {
          systemScope: 'EDA_SYSTEM',
          number: 'VIA-001',
          version: '1.0',
          revision: 'A',
          sequence: 1
        },
        referenceName: 'VIA1',
        baseline: false,
        userProperties: [
          {
            key: { systemScope: 'EDA_SYSTEM', objectName: 'DIAMETER' },
            value: '0.3'
          }
        ],
        itemInstance: {
          instanceName: {
            systemScope: 'EDA_SYSTEM',
            objectName: 'VIA1_INST'
          }
        },
        assembleToName: 'TOP',
        shape: 'shape_ref_1'
      };

      expect(item.description).toBe('A complex item with all fields');
      expect(item.userProperties).toHaveLength(1);
      expect(item.itemInstance).toBeDefined();
      expect(item.assembleToName).toBe('TOP');
      expect(item.shape).toBe('shape_ref_1');
    });
  });
});
