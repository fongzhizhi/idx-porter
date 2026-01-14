/**
 * IDXDocument类实现
 * 
 * @description
 * 实现完整的IDX文档，协调Header、Body、ProcessInstruction的组装。
 */

import { IDXDocument as IIDXDocument } from '../../types/idx-structure';
import { Header } from './Header';
import { Body } from './Body';
import { ProcessInstruction } from './ProcessInstruction';

/**
 * IDX文档实现类
 * 
 * @description
 * 表示一个完整的IDX V4.5文档，包含Header、Body和ProcessInstruction三个部分。
 */
export class IDXDocument implements IIDXDocument {
  readonly header: Header;
  readonly body: Body;
  readonly processInstruction: ProcessInstruction;

  /**
   * 创建IDXDocument实例
   * 
   * @param header - 文档头部
   * @param body - 文档主体
   * @param processInstruction - 处理指令
   */
  constructor(
    header: Header,
    body: Body,
    processInstruction: ProcessInstruction
  ) {
    this.header = header;
    this.body = body;
    this.processInstruction = processInstruction;
  }

  /**
   * 验证文档的完整性
   * 
   * @returns 验证结果
   */
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 验证Header
    if (!this.header) {
      errors.push('Header is required');
    } else {
      if (!this.header.globalUnitLength) {
        errors.push('Header.globalUnitLength is required');
      }
    }

    // 验证Body
    if (!this.body) {
      errors.push('Body is required');
    }

    // 验证ProcessInstruction
    if (!this.processInstruction) {
      errors.push('ProcessInstruction is required');
    } else {
      if (!this.processInstruction.type) {
        errors.push('ProcessInstruction.type is required');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * 获取文档统计信息
   */
  getStatistics(): {
    itemCount: number;
    shapeElementCount: number;
    geometryElementCount: number;
  } {
    return {
      itemCount: this.body.getItemCount(),
      shapeElementCount: this.body.getShapeElementCount(),
      geometryElementCount: this.body.getGeometryElementCount()
    };
  }

  /**
   * 转换为JSON对象
   */
  toJSON(): IIDXDocument {
    return {
      header: this.header.toJSON(),
      body: this.body.toJSON(),
      processInstruction: this.processInstruction.toJSON()
    };
  }

  /**
   * 从JSON对象创建IDXDocument实例
   */
  static fromJSON(json: IIDXDocument): IDXDocument {
    return new IDXDocument(
      Header.fromJSON(json.header),
      Body.fromJSON(json.body),
      ProcessInstruction.fromJSON(json.processInstruction)
    );
  }
}
