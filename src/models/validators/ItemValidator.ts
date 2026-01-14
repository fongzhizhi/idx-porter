/**
 * Item验证器
 */

import { IValidator } from './IValidator';
import { ValidationResult, ValidationError, createValidResult, createInvalidResult } from './ValidationResult';
import { Item } from '../../types/items';

export class ItemValidator implements IValidator<Item> {
  validate(item: Item): ValidationResult {
    const errors: ValidationError[] = [];
    
    if (!item.id) {
      errors.push({
        code: 'ITEM_ID_REQUIRED',
        message: 'Item ID is required',
        field: 'id'
      });
    }
    
    if (!item.name) {
      errors.push({
        code: 'ITEM_NAME_REQUIRED',
        message: 'Item name is required',
        field: 'name'
      });
    }
    
    return errors.length > 0 ? createInvalidResult(errors) : createValidResult();
  }
}
