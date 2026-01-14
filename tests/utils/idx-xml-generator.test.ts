/**
 * IDX XML生成器测试套件
 */

import { IDXXMLGenerator } from '../../src/utils/idx-xml-generator';
import { UnitLength, ProcessInstructionType } from '../../src/types/enums';

describe('IDXXMLGenerator', () => {
  let generator: IDXXMLGenerator;

  beforeEach(() => {
    generator = new IDXXMLGenerator();
  });

  describe('Basic functionality', () => {
    it('should create generator instance', () => {
      expect(generator).toBeDefined();
    });

    it('should add comments', () => {
      const xml = generator
        .addComment('Test comment')
        .toString();

      expect(xml).toContain('<!--Test comment-->');
    });

    it('should start document with namespaces', () => {
      const xml = generator
        .startDocument()
        .toString();

      expect(xml).toContain('foundation:EDMDDataSet');
      expect(xml).toContain('xmlns:foundation');
      expect(xml).toContain('http://www.prostep.org/ecad-mcad/edmd/4.0/foundation');
    });
  });

  describe('IDX Document generation', () => {
    it('should generate complete IDX document', () => {
      const document = {
        header: {
          globalUnitLength: UnitLength.UNIT_MM,
          creatorCompany: 'Test Corp',
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

      const xml = generator.generateIDXDocument(document);

      expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(xml).toContain('foundation:EDMDDataSet');
      expect(xml).toContain('foundation:Header');
      expect(xml).toContain('foundation:Body');
      expect(xml).toContain('foundation:ProcessInstruction');
      expect(xml).toContain('Test Corp');
      expect(xml).toContain('UNIT_MM');
    });

    it('should include comments in generated XML', () => {
      const document = {
        header: {
          globalUnitLength: UnitLength.UNIT_MM
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

      const xml = generator.generateIDXDocument(document);

      expect(xml).toContain('<!--IDX V4.5 Document');
      expect(xml).toContain('<!--Document Header-->');
      expect(xml).toContain('<!--Document Body');
    });
  });

  describe('Formatting', () => {
    it('should format XML with pretty print by default', () => {
      const xml = generator
        .startDocument()
        .toString();

      expect(xml).toContain('\n');
      expect(xml).toContain('foundation:EDMDDataSet');
    });

    it('should support custom formatting options', () => {
      const customGenerator = new IDXXMLGenerator({
        prettyPrint: false
      });

      const xml = customGenerator
        .startDocument()
        .toString();

      expect(xml).toBeDefined();
    });
  });

  describe('Reset functionality', () => {
    it('should reset generator state', () => {
      generator.addComment('First comment').startDocument();
      generator.reset();
      
      const xml = generator.addComment('Second comment').toString();
      
      expect(xml).toContain('Second comment');
      expect(xml).not.toContain('First comment');
    });
  });
});
