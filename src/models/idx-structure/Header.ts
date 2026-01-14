/**
 * Header类实现
 * 
 * @description
 * 实现IDX文档头部，包含创建者信息、时间戳和全局单位设置。
 */

import { Header as IHeader } from '../../types/idx-structure';
import { UnitLength } from '../../types/enums';
import { UserProperty } from '../../types/items';

/**
 * IDX文档头部实现类
 * 
 * @description
 * 提供IDX文档头部的创建和管理功能。
 */
export class Header implements IHeader {
  readonly creatorName?: string;
  readonly description?: string;
  readonly creatorCompany?: string;
  readonly creatorSystem?: string;
  readonly creator?: string;
  readonly globalUnitLength: UnitLength;
  readonly creationDateTime?: string;
  readonly userProperties?: UserProperty[];

  /**
   * 创建Header实例
   * 
   * @param globalUnitLength - 全局长度单位
   * @param options - 可选的头部配置
   */
  constructor(
    globalUnitLength: UnitLength,
    options?: {
      creatorName?: string;
      description?: string;
      creatorCompany?: string;
      creatorSystem?: string;
      creator?: string;
      creationDateTime?: string;
      userProperties?: UserProperty[];
    }
  ) {
    this.globalUnitLength = globalUnitLength;
    if (options?.creatorName !== undefined) this.creatorName = options.creatorName;
    if (options?.description !== undefined) this.description = options.description;
    if (options?.creatorCompany !== undefined) this.creatorCompany = options.creatorCompany;
    if (options?.creatorSystem !== undefined) this.creatorSystem = options.creatorSystem;
    if (options?.creator !== undefined) this.creator = options.creator;
    this.creationDateTime = options?.creationDateTime !== undefined ? options.creationDateTime : new Date().toISOString();
    if (options?.userProperties !== undefined) this.userProperties = options.userProperties;
  }

  /**
   * 转换为JSON对象
   */
  toJSON(): IHeader {
    return {
      globalUnitLength: this.globalUnitLength,
      ...(this.creatorName !== undefined && { creatorName: this.creatorName }),
      ...(this.description !== undefined && { description: this.description }),
      ...(this.creatorCompany !== undefined && { creatorCompany: this.creatorCompany }),
      ...(this.creatorSystem !== undefined && { creatorSystem: this.creatorSystem }),
      ...(this.creator !== undefined && { creator: this.creator }),
      ...(this.creationDateTime !== undefined && { creationDateTime: this.creationDateTime }),
      ...(this.userProperties !== undefined && { userProperties: this.userProperties })
    };
  }

  /**
   * 从JSON对象创建Header实例
   */
  static fromJSON(json: IHeader): Header {
    const options: any = {};
    if (json.creatorName !== undefined) options.creatorName = json.creatorName;
    if (json.description !== undefined) options.description = json.description;
    if (json.creatorCompany !== undefined) options.creatorCompany = json.creatorCompany;
    if (json.creatorSystem !== undefined) options.creatorSystem = json.creatorSystem;
    if (json.creator !== undefined) options.creator = json.creator;
    if (json.creationDateTime !== undefined) options.creationDateTime = json.creationDateTime;
    if (json.userProperties !== undefined) options.userProperties = json.userProperties;
    return new Header(json.globalUnitLength, options);
  }
}
