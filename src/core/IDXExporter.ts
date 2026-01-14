/**
 * IDX导出引擎
 */

import { IDXDocument } from '../models/idx-structure/IDXDocument';
import { IDXXMLGenerator } from '../utils/idx-xml-generator';
import * as fs from 'fs';
import * as path from 'path';

export interface ExportOptions {
  /** 输出文件路径 */
  outputPath?: string;
  /** 是否包含注释 */
  includeComments?: boolean;
  /** 格式化选项 */
  prettyPrint?: boolean;
}

export class IDXExporter {
  /**
   * 导出IDX文档为XML字符串
   */
  exportToString(document: IDXDocument, options?: ExportOptions): string {
    const generator = new IDXXMLGenerator({
      prettyPrint: options?.prettyPrint ?? true
    });
    
    return generator.generateIDXDocument(document);
  }

  /**
   * 导出IDX文档到文件
   */
  async exportToFile(
    document: IDXDocument,
    filePath: string,
    options?: ExportOptions
  ): Promise<void> {
    const xml = this.exportToString(document, options);
    
    // 确保目录存在
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // 写入文件
    await fs.promises.writeFile(filePath, xml, 'utf-8');
  }

  /**
   * 验证并导出
   */
  exportWithValidation(document: IDXDocument, options?: ExportOptions): string {
    const validation = document.validate();
    
    if (!validation.isValid) {
      throw new Error(`Document validation failed: ${validation.errors.join(', ')}`);
    }
    
    return this.exportToString(document, options);
  }
}
