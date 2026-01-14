/**
 * ProcessInstruction类实现
 * 
 * @description
 * 实现IDX处理指令，支持SendInformation等处理指令类型。
 */

import { ProcessInstruction as IProcessInstruction } from '../../types/idx-structure';
import { ProcessInstructionType } from '../../types/enums';

/**
 * IDX处理指令实现类
 * 
 * @description
 * 定义IDX文档的处理方式，如SendInformation、SendChanges等。
 */
export class ProcessInstruction implements IProcessInstruction {
  readonly type: ProcessInstructionType;

  /**
   * 创建ProcessInstruction实例
   * 
   * @param type - 处理指令类型
   */
  constructor(type: ProcessInstructionType) {
    this.type = type;
  }

  /**
   * 转换为JSON对象
   */
  toJSON(): IProcessInstruction {
    return {
      type: this.type
    };
  }

  /**
   * 从JSON对象创建ProcessInstruction实例
   */
  static fromJSON(json: IProcessInstruction): ProcessInstruction {
    return new ProcessInstruction(json.type);
  }

  /**
   * 创建SendInformation类型的处理指令
   */
  static createSendInformation(): ProcessInstruction {
    return new ProcessInstruction(ProcessInstructionType.SEND_INFORMATION);
  }

  /**
   * 创建SendChanges类型的处理指令
   */
  static createSendChanges(): ProcessInstruction {
    return new ProcessInstruction(ProcessInstructionType.SEND_CHANGES);
  }

  /**
   * 创建Clearance类型的处理指令
   */
  static createClearance(): ProcessInstruction {
    return new ProcessInstruction(ProcessInstructionType.CLEARANCE);
  }
}
