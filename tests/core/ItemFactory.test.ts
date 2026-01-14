/**
 * ItemFactory测试套件
 * 
 * @description
 * 测试ItemFactory的所有功能，包括Item创建、ID管理和引用完整性检查。
 */

import { ItemFactory } from '../../src/core/ItemFactory';
import { ItemType, GeometryType } from '../../src/types/enums';
import { Transformation } from '../../src/models/items/Transformation';
import { Item as ItemClass } from '../../src/models/items/Item';

describe('ItemFactory', () => {
  let factory: ItemFactory;

  beforeEach(() => {
    factory = new ItemFactory();
  });

  describe('createIdentifier', () => {
    it('should create a valid identifier', () => {
      const identifier = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 1);

      expect(identifier.systemScope).toBe('EDA');
      expect(identifier.number).toBe('BOARD-001');
      expect(identifier.version).toBe('1.0');
      expect(identifier.revision).toBe('A');
      expect(identifier.sequence).toBe(1);
    });

    it('should auto-generate sequence when sequence is 0', () => {
      const identifier1 = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 0);
      const identifier2 = factory.createIdentifier('EDA', 'BOARD-002', '1.0', 'A', 0);

      expect(identifier1.sequence).toBe(1);
      expect(identifier2.sequence).toBe(2);
    });

    it('should auto-generate sequence when sequence is negative', () => {
      const identifier = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', -1);

      expect(identifier.sequence).toBeGreaterThan(0);
    });

    it('should throw error for empty system scope', () => {
      expect(() => {
        factory.createIdentifier('', 'BOARD-001', '1.0', 'A', 1);
      }).toThrow('System scope cannot be empty');
    });

    it('should throw error for empty number', () => {
      expect(() => {
        factory.createIdentifier('EDA', '', '1.0', 'A', 1);
      }).toThrow('Number cannot be empty');
    });
  });

  describe('createPropertyKey', () => {
    it('should create a valid property key', () => {
      const key = factory.createPropertyKey('EDA', 'THICKNESS');

      expect(key.systemScope).toBe('EDA');
      expect(key.objectName).toBe('THICKNESS');
    });

    it('should throw error for empty system scope', () => {
      expect(() => {
        factory.createPropertyKey('', 'THICKNESS');
      }).toThrow('System scope cannot be empty');
    });

    it('should throw error for empty object name', () => {
      expect(() => {
        factory.createPropertyKey('EDA', '');
      }).toThrow('Object name cannot be empty');
    });
  });

  describe('createUserProperty', () => {
    it('should create a valid user property', () => {
      const key = factory.createPropertyKey('EDA', 'THICKNESS');
      const property = factory.createUserProperty(key, '1.6');

      expect(property.key).toEqual(key);
      expect(property.value).toBe('1.6');
    });

    it('should throw error for null key', () => {
      expect(() => {
        factory.createUserProperty(null as any, '1.6');
      }).toThrow('Property key is required');
    });
  });

  describe('createInstanceName', () => {
    it('should create a valid instance name', () => {
      const instanceName = factory.createInstanceName('EDA', 'U1');

      expect(instanceName.systemScope).toBe('EDA');
      expect(instanceName.objectName).toBe('U1');
    });

    it('should throw error for empty system scope', () => {
      expect(() => {
        factory.createInstanceName('', 'U1');
      }).toThrow('System scope cannot be empty');
    });

    it('should throw error for empty object name', () => {
      expect(() => {
        factory.createInstanceName('EDA', '');
      }).toThrow('Object name cannot be empty');
    });
  });

  describe('createItemInstance', () => {
    it('should create a valid item instance without transformation', () => {
      const instanceName = factory.createInstanceName('EDA', 'U1');
      const itemInstance = factory.createItemInstance(instanceName);

      expect(itemInstance.instanceName).toEqual(instanceName);
      expect(itemInstance.transformation).toBeUndefined();
      expect(itemInstance.item).toBeUndefined();
    });

    it('should create a valid item instance with transformation', () => {
      const instanceName = factory.createInstanceName('EDA', 'U1');
      const transformation = Transformation.createTranslation(10, 20);
      const itemInstance = factory.createItemInstance(instanceName, transformation);

      expect(itemInstance.instanceName).toEqual(instanceName);
      expect(itemInstance.transformation).toEqual(transformation);
    });

    it('should create item instance with item reference', () => {
      // 先创建一个Item
      const identifier = factory.createIdentifier('EDA', 'COMP-001', '1.0', 'A', 1);
      factory.createItem('item1', 'Component', ItemType.SINGLE, identifier);

      // 创建引用该Item的实例
      const instanceName = factory.createInstanceName('EDA', 'U1');
      const itemInstance = factory.createItemInstance(instanceName, undefined, 'item1');

      expect(itemInstance.item).toBe('item1');
    });

    it('should throw error when referencing non-existent item', () => {
      const instanceName = factory.createInstanceName('EDA', 'U1');

      expect(() => {
        factory.createItemInstance(instanceName, undefined, 'non-existent');
      }).toThrow("Referenced Item 'non-existent' does not exist");
    });
  });

  describe('createItem', () => {
    it('should create a single type item', () => {
      const identifier = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 1);
      const item = factory.createItem('item1', 'Board', ItemType.SINGLE, identifier) as ItemClass;

      expect(item.id).toBe('item1');
      expect(item.name).toBe('Board');
      expect(item.itemType).toBe(ItemType.SINGLE);
      expect(item.identifier).toEqual(identifier);
      expect(item.isSingle()).toBe(true);
      expect(item.isAssembly()).toBe(false);
    });

    it('should create an assembly type item', () => {
      const identifier = factory.createIdentifier('EDA', 'PCB-001', '1.0', 'A', 1);
      const item = factory.createItem('item1', 'PCB', ItemType.ASSEMBLY, identifier) as ItemClass;

      expect(item.itemType).toBe(ItemType.ASSEMBLY);
      expect(item.isSingle()).toBe(false);
      expect(item.isAssembly()).toBe(true);
    });

    it('should create item with geometry type', () => {
      const identifier = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 1);
      const item = factory.createItem(
        'item1',
        'Board',
        ItemType.SINGLE,
        identifier,
        GeometryType.BOARD_OUTLINE
      );

      expect(item.geometryType).toBe(GeometryType.BOARD_OUTLINE);
    });

    it('should create item with all optional properties', () => {
      const identifier = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 1);
      const key = factory.createPropertyKey('EDA', 'THICKNESS');
      const userProperty = factory.createUserProperty(key, '1.6');

      const item = factory.createItem(
        'item1',
        'Board',
        ItemType.SINGLE,
        identifier,
        GeometryType.BOARD_OUTLINE,
        {
          description: 'Main board',
          referenceName: 'MAIN_BOARD',
          baseline: true,
          userProperties: [userProperty],
          assembleToName: 'TOP',
          shape: 'shape1'
        }
      );

      expect(item.description).toBe('Main board');
      expect(item.referenceName).toBe('MAIN_BOARD');
      expect(item.baseline).toBe(true);
      expect(item.userProperties).toHaveLength(1);
      expect(item.assembleToName).toBe('TOP');
      expect(item.shape).toBe('shape1');
    });

    it('should throw error for duplicate item ID', () => {
      const identifier1 = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 1);
      const identifier2 = factory.createIdentifier('EDA', 'BOARD-002', '1.0', 'A', 2);

      factory.createItem('item1', 'Board1', ItemType.SINGLE, identifier1);

      expect(() => {
        factory.createItem('item1', 'Board2', ItemType.SINGLE, identifier2);
      }).toThrow("Item with ID 'item1' already exists");
    });

    it('should throw error when item instance references non-existent item', () => {
      const identifier = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 1);
      const instanceName = factory.createInstanceName('EDA', 'U1');
      const itemInstance = { 
        instanceName, 
        item: 'non-existent' 
      } as any;

      expect(() => {
        factory.createItem('item1', 'Board', ItemType.SINGLE, identifier, undefined, {
          itemInstance
        });
      }).toThrow("Referenced Item 'non-existent' does not exist");
    });

    it('should register created items', () => {
      const identifier = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 1);
      factory.createItem('item1', 'Board', ItemType.SINGLE, identifier);

      expect(factory.hasItem('item1')).toBe(true);
      expect(factory.getItemCount()).toBe(1);
    });
  });

  describe('Item registry management', () => {
    it('should check if item exists', () => {
      const identifier = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 1);
      factory.createItem('item1', 'Board', ItemType.SINGLE, identifier);

      expect(factory.hasItem('item1')).toBe(true);
      expect(factory.hasItem('item2')).toBe(false);
    });

    it('should get item by ID', () => {
      const identifier = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 1);
      const item = factory.createItem('item1', 'Board', ItemType.SINGLE, identifier);

      const retrieved = factory.getItem('item1');
      expect(retrieved).toEqual(item);
    });

    it('should return undefined for non-existent item', () => {
      const retrieved = factory.getItem('non-existent');
      expect(retrieved).toBeUndefined();
    });

    it('should get all items', () => {
      const identifier1 = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 1);
      const identifier2 = factory.createIdentifier('EDA', 'BOARD-002', '1.0', 'A', 2);

      factory.createItem('item1', 'Board1', ItemType.SINGLE, identifier1);
      factory.createItem('item2', 'Board2', ItemType.SINGLE, identifier2);

      const allItems = factory.getAllItems();
      expect(allItems).toHaveLength(2);
    });

    it('should clear all items', () => {
      const identifier = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 1);
      factory.createItem('item1', 'Board', ItemType.SINGLE, identifier);

      factory.clearItems();

      expect(factory.getItemCount()).toBe(0);
      expect(factory.hasItem('item1')).toBe(false);
    });

    it('should get item count', () => {
      expect(factory.getItemCount()).toBe(0);

      const identifier1 = factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 1);
      factory.createItem('item1', 'Board1', ItemType.SINGLE, identifier1);
      expect(factory.getItemCount()).toBe(1);

      const identifier2 = factory.createIdentifier('EDA', 'BOARD-002', '1.0', 'A', 2);
      factory.createItem('item2', 'Board2', ItemType.SINGLE, identifier2);
      expect(factory.getItemCount()).toBe(2);
    });
  });

  describe('ID and sequence management', () => {
    it('should reset ID counter', () => {
      factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 0);
      expect(factory.getIdCount()).toBe(0);
      expect(factory.getSequenceCount()).toBe(1);

      factory.resetIdCounter();

      expect(factory.getIdCount()).toBe(0);
      expect(factory.getSequenceCount()).toBe(0);

      const identifier2 = factory.createIdentifier('EDA', 'BOARD-002', '1.0', 'A', 0);
      expect(identifier2.sequence).toBe(1);
    });

    it('should get sequence count', () => {
      expect(factory.getSequenceCount()).toBe(0);

      factory.createIdentifier('EDA', 'BOARD-001', '1.0', 'A', 0);
      expect(factory.getSequenceCount()).toBe(1);

      factory.createIdentifier('EDA', 'BOARD-002', '1.0', 'A', 0);
      expect(factory.getSequenceCount()).toBe(2);
    });
  });

  describe('Reference integrity', () => {
    it('should allow creating item instance that references existing item', () => {
      // 创建基础Item
      const identifier = factory.createIdentifier('EDA', 'COMP-001', '1.0', 'A', 1);
      factory.createItem('comp1', 'Component', ItemType.SINGLE, identifier);

      // 创建引用该Item的实例
      const instanceName = factory.createInstanceName('EDA', 'U1');
      const itemInstance = factory.createItemInstance(instanceName, undefined, 'comp1');

      expect(itemInstance.item).toBe('comp1');
    });

    it('should allow creating assembly item with item instance', () => {
      // 创建基础组件
      const compIdentifier = factory.createIdentifier('EDA', 'COMP-001', '1.0', 'A', 1);
      factory.createItem('comp1', 'Component', ItemType.SINGLE, compIdentifier);

      // 创建装配Item，包含对基础组件的实例引用
      const assemblyIdentifier = factory.createIdentifier('EDA', 'ASSEMBLY-001', '1.0', 'A', 2);
      const instanceName = factory.createInstanceName('EDA', 'U1');
      const itemInstance = factory.createItemInstance(instanceName, undefined, 'comp1');

      const assembly = factory.createItem(
        'assembly1',
        'PCB Assembly',
        ItemType.ASSEMBLY,
        assemblyIdentifier,
        undefined,
        { itemInstance }
      );

      expect(assembly.itemInstance).toEqual(itemInstance);
      expect(assembly.itemInstance?.item).toBe('comp1');
    });
  });
});
