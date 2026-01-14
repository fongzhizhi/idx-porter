/**
 * IDX文档验证器
 */

import { IValidator } from './IValidator';
import { ValidationResult, ValidationError, createValidResult, createInvalidResult } from './ValidationResult';
import { IDXDocument } from '../../types/idx-structure';

export class IDXDocumentValidator implements IValidator<IDXDocument> {
  validate(document: IDXDocument): ValidationResult {
    const errors: ValidationError[] = [];
    
    if (!document.header) {
      errors.push({
        code: 'HEADER_REQUIRED',
        message: 'Header is required',
        field: 'header'
      });
    }
    
    if (!document.body) {
      errors.push({
        code: 'BODY_REQUIRED',
        message: 'Body is required',
        field: 'body'
      });
    }
    
    if (!document.processInstruction) {
      errors.push({
        code: 'PROCESS_INSTRUCTION_REQUIRED',
        message: 'ProcessInstruction is required',
        field: 'processInstruction'
      });
    }
    
    return errors.length > 0 ? createInvalidResult(errors) : createValidResult();
  }
}
