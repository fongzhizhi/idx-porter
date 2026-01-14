/**
 * ProcessInstruction类测试套件
 * 
 * @description
 * 测试ProcessInstruction类的创建和功能。
 */

import { ProcessInstruction } from '../../../src/models/idx-structure/ProcessInstruction';
import { ProcessInstructionType } from '../../../src/types/enums';

describe('ProcessInstruction', () => {
  describe('Constructor', () => {
    it('should create ProcessInstruction with SendInformation type', () => {
      const pi = new ProcessInstruction(ProcessInstructionType.SEND_INFORMATION);

      expect(pi.type).toBe(ProcessInstructionType.SEND_INFORMATION);
    });

    it('should create ProcessInstruction with SendChanges type', () => {
      const pi = new ProcessInstruction(ProcessInstructionType.SEND_CHANGES);

      expect(pi.type).toBe(ProcessInstructionType.SEND_CHANGES);
    });

    it('should create ProcessInstruction with Clearance type', () => {
      const pi = new ProcessInstruction(ProcessInstructionType.CLEARANCE);

      expect(pi.type).toBe(ProcessInstructionType.CLEARANCE);
    });
  });

  describe('Static factory methods', () => {
    it('should create SendInformation using factory method', () => {
      const pi = ProcessInstruction.createSendInformation();

      expect(pi.type).toBe(ProcessInstructionType.SEND_INFORMATION);
    });

    it('should create SendChanges using factory method', () => {
      const pi = ProcessInstruction.createSendChanges();

      expect(pi.type).toBe(ProcessInstructionType.SEND_CHANGES);
    });

    it('should create Clearance using factory method', () => {
      const pi = ProcessInstruction.createClearance();

      expect(pi.type).toBe(ProcessInstructionType.CLEARANCE);
    });
  });

  describe('toJSON', () => {
    it('should convert to JSON object', () => {
      const pi = new ProcessInstruction(ProcessInstructionType.SEND_INFORMATION);

      const json = pi.toJSON();

      expect(json.type).toBe(ProcessInstructionType.SEND_INFORMATION);
    });
  });

  describe('fromJSON', () => {
    it('should create ProcessInstruction from JSON object', () => {
      const json = {
        type: ProcessInstructionType.SEND_INFORMATION
      };

      const pi = ProcessInstruction.fromJSON(json);

      expect(pi.type).toBe(ProcessInstructionType.SEND_INFORMATION);
    });
  });
});
