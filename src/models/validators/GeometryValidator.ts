/**
 * 几何验证器
 */

import { IValidator } from './IValidator';
import { ValidationResult, ValidationError, createValidResult, createInvalidResult } from './ValidationResult';
import { GeometryElement } from '../../types/geometry';

export class GeometryValidator implements IValidator<GeometryElement> {
  validate(geometry: GeometryElement): ValidationResult {
    const errors: ValidationError[] = [];
    
    if (!geometry) {
      errors.push({
        code: 'GEOMETRY_NULL',
        message: 'Geometry element cannot be null or undefined'
      });
    }
    
    return errors.length > 0 ? createInvalidResult(errors) : createValidResult();
  }
}
