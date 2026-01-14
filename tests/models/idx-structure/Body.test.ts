/**
 * Body类测试套件
 * 
 * @description
 * 测试Body类的创建和功能。
 */

import { Body } from '../../../src/models/idx-structure/Body';
import { ItemType, GeometryType } from '../../../src/types/enums';
import { Item } from '../../../src/types/items';

describe('Body', () => {
  describe('Constructor', () => {
    it('should create empty Body', () => {
      const body = new Body();

      expect(body.items).toEqual([]);
      expect(body.shapeElements).toEqual([]);
      expect(body.geometryElements).toEqual([]);
    });

    it('should create Body with initial items', () => {
      const items: Item[] = [
        {
          id: 'item1',
          name: 'Test Item',
          itemType: ItemType.SINGLE,
          identifier: {
            systemScope: 'EDA',
            number: '001',
            version: '1.0',
            revision: 'A',
            sequence: 1
          }
        }
      ];

      const body = new Body({ items });

      expect(body.items).toHaveLength(1);
      const firstItem = body.items[0];
      expect(firstItem).toBeDefined();
      expect(firstItem!.id).toBe('item1');
    });
  });

  describe('addItem', () => {
    it('should add single item', () => {
      const body = new Body();
      const item: Item = {
        id: 'item1',
        name: 'Test Item',
        itemType: ItemType.SINGLE,
        identifier: {
          systemScope: 'EDA',
          number: '001',
          version: '1.0',
          revision: 'A',
          sequence: 1
        }
      };

      body.addItem(item);

      expect(body.items).toHaveLength(1);
      const firstItem = body.items[0];
      expect(firstItem).toBeDefined();
      expect(firstItem!.id).toBe('item1');
    });
  });

  describe('addItems', () => {
    it('should add multiple items', () => {
      const body = new Body();
      const items: Item[] = [
        {
          id: 'item1',
          name: 'Item 1',
          itemType: ItemType.SINGLE,
          identifier: {
            systemScope: 'EDA',
            number: '001',
            version: '1.0',
            revision: 'A',
            sequence: 1
          }
        },
        {
          id: 'item2',
          name: 'Item 2',
          itemType: ItemType.SINGLE,
          identifier: {
            systemScope: 'EDA',
            number: '002',
            version: '1.0',
            revision: 'A',
            sequence: 2
          }
        }
      ];

      body.addItems(items);

      expect(body.items).toHaveLength(2);
      expect(body.items[0]!.id).toBe('item1');
      expect(body.items[1]!.id).toBe('item2');
    });
  });

  describe('getItemCount', () => {
    it('should return correct item count', () => {
      const body = new Body();

      expect(body.getItemCount()).toBe(0);

      body.addItem({
        id: 'item1',
        name: 'Item 1',
        itemType: ItemType.SINGLE,
        identifier: {
          systemScope: 'EDA',
          number: '001',
          version: '1.0',
          revision: 'A',
          sequence: 1
        }
      });

      expect(body.getItemCount()).toBe(1);
    });
  });

  describe('findItemById', () => {
    it('should find item by id', () => {
      const body = new Body();
      const item: Item = {
        id: 'item1',
        name: 'Test Item',
        itemType: ItemType.SINGLE,
        identifier: {
          systemScope: 'EDA',
          number: '001',
          version: '1.0',
          revision: 'A',
          sequence: 1
        }
      };

      body.addItem(item);

      const found = body.findItemById('item1');
      expect(found).toBeDefined();
      expect(found!.id).toBe('item1');
    });

    it('should return undefined for non-existent id', () => {
      const body = new Body();

      const found = body.findItemById('non-existent');
      expect(found).toBeUndefined();
    });
  });

  describe('toJSON', () => {
    it('should convert to JSON object', () => {
      const body = new Body();
      body.addItem({
        id: 'item1',
        name: 'Test Item',
        itemType: ItemType.SINGLE,
        identifier: {
          systemScope: 'EDA',
          number: '001',
          version: '1.0',
          revision: 'A',
          sequence: 1
        }
      });

      const json = body.toJSON();

      expect(json.items).toHaveLength(1);
      expect(json.items[0]!.id).toBe('item1');
    });
  });

  describe('fromJSON', () => {
    it('should create Body from JSON object', () => {
      const json = {
        items: [
          {
            id: 'item1',
            name: 'Test Item',
            itemType: ItemType.SINGLE,
            identifier: {
              systemScope: 'EDA',
              number: '001',
              version: '1.0',
              revision: 'A',
              sequence: 1
            }
          }
        ],
        shapeElements: [],
        geometryElements: []
      };

      const body = Body.fromJSON(json);

      expect(body.items).toHaveLength(1);
      expect(body.items[0]!.id).toBe('item1');
    });
  });

  describe('Complex scenarios', () => {
    it('should handle multiple items with different geometry types', () => {
      const body = new Body();

      body.addItem({
        id: 'board1',
        name: 'Board Outline',
        itemType: ItemType.SINGLE,
        geometryType: GeometryType.BOARD_OUTLINE,
        identifier: {
          systemScope: 'EDA',
          number: 'BOARD-001',
          version: '1.0',
          revision: 'A',
          sequence: 1
        }
      });

      body.addItem({
        id: 'comp1',
        name: 'Component 1',
        itemType: ItemType.SINGLE,
        geometryType: GeometryType.COMPONENT,
        identifier: {
          systemScope: 'EDA',
          number: 'COMP-001',
          version: '1.0',
          revision: 'A',
          sequence: 2
        }
      });

      expect(body.getItemCount()).toBe(2);
      expect(body.items[0]!.geometryType).toBe(GeometryType.BOARD_OUTLINE);
      expect(body.items[1]!.geometryType).toBe(GeometryType.COMPONENT);
    });
  });
});
