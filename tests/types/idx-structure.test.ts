/**
 * IDX结构类型测试
 * 
 * @description
 * 测试IDX文档结构类型定义。
 */

import {
  Header,
  Body,
  ProcessInstruction,
  IDXDocument
} from '../../src/types/idx-structure';
import { UnitLength, ProcessInstructionType, ItemType, GeometryType } from '../../src/types/enums';
import { Item } from '../../src/types/items';

describe('IDX Structure Types', () => {
  describe('Header', () => {
    test('should create minimal Header', () => {
      const header: Header = {
        globalUnitLength: UnitLength.UNIT_MM
      };

      expect(header.globalUnitLength).toBe(UnitLength.UNIT_MM);
    });

    test('should create complete Header', () => {
      const header: Header = {
        creatorName: 'John Doe',
        description: 'PCB Design Export',
        creatorCompany: 'ACME Corp',
        creatorSystem: 'EDA System v1.0',
        creator: 'john.doe@acme.com',
        globalUnitLength: UnitLength.UNIT_MM,
        creationDateTime: '2024-01-15T10:30:00Z',
        userProperties: [
          {
            key: { systemScope: 'ACME', objectName: 'PROJECT' },
            value: 'PCB-2024-001'
          }
        ]
      };

      expect(header.creatorName).toBe('John Doe');
      expect(header.description).toBe('PCB Design Export');
      expect(header.creatorCompany).toBe('ACME Corp');
      expect(header.creatorSystem).toBe('EDA System v1.0');
      expect(header.creator).toBe('john.doe@acme.com');
      expect(header.creationDateTime).toBe('2024-01-15T10:30:00Z');
      expect(header.userProperties).toHaveLength(1);
    });
  });

  describe('Body', () => {
    test('should create empty Body', () => {
      const body: Body = {
        items: [],
        shapeElements: [],
        geometryElements: []
      };

      expect(body.items).toHaveLength(0);
      expect(body.shapeElements).toHaveLength(0);
      expect(body.geometryElements).toHaveLength(0);
    });

    test('should create Body with items', () => {
      const item: Item = {
        id: 'item1',
        name: 'Board',
        itemType: ItemType.SINGLE,
        geometryType: GeometryType.BOARD_OUTLINE,
        identifier: {
          systemScope: 'EDA',
          number: '001',
          version: '1.0',
          revision: 'A',
          sequence: 1
        }
      };

      const body: Body = {
        items: [item],
        shapeElements: [],
        geometryElements: []
      };

      expect(body.items).toHaveLength(1);
      expect(body.items[0]?.id).toBe('item1');
    });
  });

  describe('ProcessInstruction', () => {
    test('should create SendInformation instruction', () => {
      const instruction: ProcessInstruction = {
        type: ProcessInstructionType.SEND_INFORMATION
      };

      expect(instruction.type).toBe(ProcessInstructionType.SEND_INFORMATION);
    });

    test('should create SendChanges instruction', () => {
      const instruction: ProcessInstruction = {
        type: ProcessInstructionType.SEND_CHANGES
      };

      expect(instruction.type).toBe(ProcessInstructionType.SEND_CHANGES);
    });

    test('should create Clearance instruction', () => {
      const instruction: ProcessInstruction = {
        type: ProcessInstructionType.CLEARANCE
      };

      expect(instruction.type).toBe(ProcessInstructionType.CLEARANCE);
    });
  });

  describe('IDXDocument', () => {
    test('should create complete IDXDocument', () => {
      const document: IDXDocument = {
        header: {
          creatorName: 'Test User',
          globalUnitLength: UnitLength.UNIT_MM,
          creationDateTime: '2024-01-15T10:30:00Z'
        },
        body: {
          items: [],
          shapeElements: [],
          geometryElements: []
        },
        processInstruction: {
          type: ProcessInstructionType.SEND_INFORMATION
        }
      };

      expect(document.header.creatorName).toBe('Test User');
      expect(document.header.globalUnitLength).toBe(UnitLength.UNIT_MM);
      expect(document.body.items).toHaveLength(0);
      expect(document.processInstruction.type).toBe(ProcessInstructionType.SEND_INFORMATION);
    });

    test('should create IDXDocument with items', () => {
      const item: Item = {
        id: 'board1',
        name: 'Main Board',
        itemType: ItemType.SINGLE,
        geometryType: GeometryType.BOARD_OUTLINE,
        identifier: {
          systemScope: 'EDA',
          number: 'BOARD-001',
          version: '1.0',
          revision: 'A',
          sequence: 1
        }
      };

      const document: IDXDocument = {
        header: {
          globalUnitLength: UnitLength.UNIT_MM
        },
        body: {
          items: [item],
          shapeElements: [],
          geometryElements: []
        },
        processInstruction: {
          type: ProcessInstructionType.SEND_INFORMATION
        }
      };

      expect(document.body.items).toHaveLength(1);
      expect(document.body.items[0]?.name).toBe('Main Board');
    });
  });
});
