/**
 * IDX构建器实现
 */

import { IIDXBuilder } from '../interfaces/IIDXBuilder';
import { Header } from '../models/idx-structure/Header';
import { Body } from '../models/idx-structure/Body';
import { ProcessInstruction } from '../models/idx-structure/ProcessInstruction';
import { IDXDocument } from '../models/idx-structure/IDXDocument';
import { IDXXMLGenerator } from '../utils/idx-xml-generator';
import { UnitLength } from '../types/enums';
import { Item } from '../types/items';

export class IDXBuilder implements IIDXBuilder {
  private header?: Header;
  private body: Body;
  private processInstruction: ProcessInstruction;

  constructor() {
    this.body = new Body();
    this.processInstruction = ProcessInstruction.createSendInformation();
  }

  createHeader(options: {
    globalUnitLength: UnitLength;
    creatorCompany?: string;
    creatorSystem?: string;
  }): IIDXBuilder {
    const headerOptions: {
      creatorCompany?: string;
      creatorSystem?: string;
    } = {};
    if (options.creatorCompany) {
      headerOptions.creatorCompany = options.creatorCompany;
    }
    if (options.creatorSystem) {
      headerOptions.creatorSystem = options.creatorSystem;
    }
    this.header = new Header(options.globalUnitLength, headerOptions);
    return this;
  }

  addItem(item: Item): IIDXBuilder {
    this.body.addItem(item);
    return this;
  }

  build(): IDXDocument {
    if (!this.header) {
      throw new Error('Header is required. Call createHeader() first.');
    }
    return new IDXDocument(this.header, this.body, this.processInstruction);
  }

  toXML(): string {
    const document = this.build();
    const generator = new IDXXMLGenerator();
    return generator.generateIDXDocument(document);
  }
}
