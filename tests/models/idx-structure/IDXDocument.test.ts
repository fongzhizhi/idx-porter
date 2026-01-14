/**
 * IDXDocument类测试套件
 * 
 * @description
 * 测试IDXDocument类的创建和功能，验证Header、Body、ProcessInstruction的正确组装。
 */

import { IDXDocument } from '../../../src/models/idx-structure/IDXDocument';
import { Header } from '../../../src/models/idx-structure/Header';
import { Body } from '../../../src/models/idx-structure/Body';
import { ProcessInstruction } from '../../../src/models/idx-structure/ProcessInstruction';
import { UnitLength, ItemType, GeometryType, ProcessInstructionType } from '../../../src/types/enums';

describe('IDXDocument', () => {
  describe('Constructor', () => {
    it('should create IDXDocument with all three parts', () => {
      const header = new Header(UnitLength.UNIT_MM, {
        creatorCompany: 'ACME Corp'
      });
      const body = new Body();
      const processInstruction = ProcessInstruction.createSendInformation();

      const doc = new IDXDocument(header, body, processInstruction);

      expect(doc.header).toBe(header);
      expect(doc.body).toBe(body);
      expect(doc.processInstruction).toBe(processInstruction);
    });

    it('should create complete IDXDocument with items', () => {
      const header = new Header(UnitLength.UNIT_MM, {
        creatorName: 'John Doe',
        creatorCompany: 'ACME Corp',
        description: 'Test PCB Design'
      });

      const body = new Body();
      body.addItem({
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
      });

      const processInstruction = ProcessInstruction.createSendInformation();

      const doc = new IDXDocument(header, body, processInstruction);

      expect(doc.header.creatorCompany).toBe('ACME Corp');
      expect(doc.body.getItemCount()).toBe(1);
      expect(doc.processInstruction.type).toBe(ProcessInstructionType.SEND_INFORMATION);
    });
  });

  describe('validate', () => {
    it('should validate complete document', () => {
      const header = new Header(UnitLength.UNIT_MM);
      const body = new Body();
      const processInstruction = ProcessInstruction.createSendInformation();

      const doc = new IDXDocument(header, body, processInstruction);

      const result = doc.validate();

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing header', () => {
      const body = new Body();
      const processInstruction = ProcessInstruction.createSendInformation();

      const doc = new IDXDocument(null as any, body, processInstruction);

      const result = doc.validate();

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Header is required');
    });

    it('should detect missing body', () => {
      const header = new Header(UnitLength.UNIT_MM);
      const processInstruction = ProcessInstruction.createSendInformation();

      const doc = new IDXDocument(header, null as any, processInstruction);

      const result = doc.validate();

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Body is required');
    });

    it('should detect missing processInstruction', () => {
      const header = new Header(UnitLength.UNIT_MM);
      const body = new Body();

      const doc = new IDXDocument(header, body, null as any);

      const result = doc.validate();

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('ProcessInstruction is required');
    });
  });

  describe('getStatistics', () => {
    it('should return correct statistics', () => {
      const header = new Header(UnitLength.UNIT_MM);
      const body = new Body();
      
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

      body.addItem({
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
      });

      const processInstruction = ProcessInstruction.createSendInformation();
      const doc = new IDXDocument(header, body, processInstruction);

      const stats = doc.getStatistics();

      expect(stats.itemCount).toBe(2);
      expect(stats.shapeElementCount).toBe(0);
      expect(stats.geometryElementCount).toBe(0);
    });
  });

  describe('toJSON', () => {
    it('should convert to JSON object', () => {
      const header = new Header(UnitLength.UNIT_MM, {
        creatorCompany: 'ACME Corp'
      });
      const body = new Body();
      const processInstruction = ProcessInstruction.createSendInformation();

      const doc = new IDXDocument(header, body, processInstruction);

      const json = doc.toJSON();

      expect(json.header.globalUnitLength).toBe(UnitLength.UNIT_MM);
      expect(json.header.creatorCompany).toBe('ACME Corp');
      expect(json.body.items).toEqual([]);
      expect(json.processInstruction.type).toBe(ProcessInstructionType.SEND_INFORMATION);
    });
  });

  describe('fromJSON', () => {
    it('should create IDXDocument from JSON object', () => {
      const json = {
        header: {
          globalUnitLength: UnitLength.UNIT_MM,
          creatorCompany: 'ACME Corp',
          creationDateTime: '2024-01-01T00:00:00.000Z'
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

      const doc = IDXDocument.fromJSON(json);

      expect(doc.header.globalUnitLength).toBe(UnitLength.UNIT_MM);
      expect(doc.header.creatorCompany).toBe('ACME Corp');
      expect(doc.body.getItemCount()).toBe(0);
      expect(doc.processInstruction.type).toBe(ProcessInstructionType.SEND_INFORMATION);
    });
  });

  describe('Integration scenarios', () => {
    it('should create complete PCB design document', () => {
      // Create header
      const header = new Header(UnitLength.UNIT_MM, {
        creatorName: 'John Doe',
        creatorCompany: 'ACME Electronics',
        creatorSystem: 'EDA Pro v2.0',
        description: 'Main PCB for Product X'
      });

      // Create body with multiple items
      const body = new Body();

      // Add board outline
      body.addItem({
        id: 'board_outline_1',
        name: 'Main Board Outline',
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

      // Add component
      body.addItem({
        id: 'component_1',
        name: 'U1',
        itemType: ItemType.SINGLE,
        geometryType: GeometryType.COMPONENT,
        identifier: {
          systemScope: 'EDA',
          number: 'COMP-001',
          version: '1.0',
          revision: 'A',
          sequence: 2
        },
        assembleToName: 'TOP'
      });

      // Add keepout area
      body.addItem({
        id: 'keepout_1',
        name: 'Component Keepout',
        itemType: ItemType.SINGLE,
        geometryType: GeometryType.KEEPOUT_AREA_COMPONENT,
        identifier: {
          systemScope: 'EDA',
          number: 'KEEPOUT-001',
          version: '1.0',
          revision: 'A',
          sequence: 3
        },
        assembleToName: 'TOP'
      });

      // Create process instruction
      const processInstruction = ProcessInstruction.createSendInformation();

      // Create document
      const doc = new IDXDocument(header, body, processInstruction);

      // Validate
      const validation = doc.validate();
      expect(validation.isValid).toBe(true);

      // Check statistics
      const stats = doc.getStatistics();
      expect(stats.itemCount).toBe(3);

      // Check content
      expect(doc.header.creatorCompany).toBe('ACME Electronics');
      expect(doc.body.findItemById('component_1')).toBeDefined();
      expect(doc.processInstruction.type).toBe(ProcessInstructionType.SEND_INFORMATION);
    });

    it('should support round-trip JSON conversion', () => {
      const header = new Header(UnitLength.UNIT_MM, {
        creatorCompany: 'Test Corp'
      });
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
      const processInstruction = ProcessInstruction.createSendInformation();

      const doc1 = new IDXDocument(header, body, processInstruction);
      const json = doc1.toJSON();
      const doc2 = IDXDocument.fromJSON(json);

      expect(doc2.header.creatorCompany).toBe('Test Corp');
      expect(doc2.body.getItemCount()).toBe(1);
      expect(doc2.body.items[0]!.id).toBe('item1');
      expect(doc2.processInstruction.type).toBe(ProcessInstructionType.SEND_INFORMATION);
    });
  });
});
