/**
 * IDX构建器接口
 */

import { UnitLength } from '../types/enums';
import { Item } from '../types/items';

export interface IIDXBuilder {
  createHeader(options: {
    globalUnitLength: UnitLength;
    creatorCompany?: string;
    creatorSystem?: string;
  }): IIDXBuilder;
  
  addItem(item: Item): IIDXBuilder;
  
  build(): any;
  
  toXML(): string;
}