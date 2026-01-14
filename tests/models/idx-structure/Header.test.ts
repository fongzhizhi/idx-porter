/**
 * Header类测试套件
 * 
 * @description
 * 测试Header类的创建和功能。
 */

import { Header } from '../../../src/models/idx-structure/Header';
import { UnitLength } from '../../../src/types/enums';

describe('Header', () => {
  describe('Constructor', () => {
    it('should create Header with required globalUnitLength', () => {
      const header = new Header(UnitLength.UNIT_MM);

      expect(header.globalUnitLength).toBe(UnitLength.UNIT_MM);
      expect(header.creationDateTime).toBeDefined();
    });

    it('should create Header with all optional fields', () => {
      const header = new Header(UnitLength.UNIT_MM, {
        creatorName: 'John Doe',
        description: 'Test PCB Design',
        creatorCompany: 'ACME Corp',
        creatorSystem: 'EDA System v1.0',
        creator: 'john.doe@acme.com',
        creationDateTime: '2024-01-01T00:00:00.000Z'
      });

      expect(header.creatorName).toBe('John Doe');
      expect(header.description).toBe('Test PCB Design');
      expect(header.creatorCompany).toBe('ACME Corp');
      expect(header.creatorSystem).toBe('EDA System v1.0');
      expect(header.creator).toBe('john.doe@acme.com');
      expect(header.creationDateTime).toBe('2024-01-01T00:00:00.000Z');
    });

    it('should auto-generate creationDateTime if not provided', () => {
      const header = new Header(UnitLength.UNIT_MM);

      expect(header.creationDateTime).toBeDefined();
      expect(typeof header.creationDateTime).toBe('string');
      expect(header.creationDateTime).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    it('should support UNIT_INCH', () => {
      const header = new Header(UnitLength.UNIT_INCH);

      expect(header.globalUnitLength).toBe(UnitLength.UNIT_INCH);
    });
  });

  describe('toJSON', () => {
    it('should convert to JSON object', () => {
      const header = new Header(UnitLength.UNIT_MM, {
        creatorName: 'John Doe',
        creatorCompany: 'ACME Corp'
      });

      const json = header.toJSON();

      expect(json.globalUnitLength).toBe(UnitLength.UNIT_MM);
      expect(json.creatorName).toBe('John Doe');
      expect(json.creatorCompany).toBe('ACME Corp');
    });
  });

  describe('fromJSON', () => {
    it('should create Header from JSON object', () => {
      const json = {
        globalUnitLength: UnitLength.UNIT_MM,
        creatorName: 'John Doe',
        creatorCompany: 'ACME Corp',
        creationDateTime: '2024-01-01T00:00:00.000Z'
      };

      const header = Header.fromJSON(json);

      expect(header.globalUnitLength).toBe(UnitLength.UNIT_MM);
      expect(header.creatorName).toBe('John Doe');
      expect(header.creatorCompany).toBe('ACME Corp');
      expect(header.creationDateTime).toBe('2024-01-01T00:00:00.000Z');
    });
  });

  describe('User Properties', () => {
    it('should support user properties', () => {
      const userProperties = [
        {
          key: { systemScope: 'EDA', objectName: 'VERSION' },
          value: '1.0.0'
        }
      ];

      const header = new Header(UnitLength.UNIT_MM, {
        userProperties
      });

      expect(header.userProperties).toHaveLength(1);
      const prop = header.userProperties![0];
      expect(prop).toBeDefined();
      expect(prop!.key.objectName).toBe('VERSION');
      expect(prop!.value).toBe('1.0.0');
    });
  });
});
