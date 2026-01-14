/**
 * 工具类型定义
 * 
 * @description
 * 定义各种辅助工具类型，用于类型推导和类型安全。
 */

/**
 * 只读深度类型
 * 
 * @description
 * 递归地将对象的所有属性设置为只读。
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * 部分深度类型
 * 
 * @description
 * 递归地将对象的所有属性设置为可选。
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 必需属性类型
 * 
 * @description
 * 将指定的可选属性变为必需属性。
 */
export type RequiredProperties<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * 可选属性类型
 * 
 * @description
 * 将指定的必需属性变为可选属性。
 */
export type OptionalProperties<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * 提取函数返回类型
 * 
 * @description
 * 提取Promise的解析类型。
 */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

/**
 * 构造函数类型
 * 
 * @description
 * 表示一个类的构造函数类型。
 */
export type Constructor<T = any> = new (...args: any[]) => T;

/**
 * 抽象构造函数类型
 * 
 * @description
 * 表示一个抽象类的构造函数类型。
 */
export type AbstractConstructor<T = any> = abstract new (...args: any[]) => T;

/**
 * 值类型
 * 
 * @description
 * 提取对象值的类型。
 */
export type ValueOf<T> = T[keyof T];

/**
 * 可为空类型
 * 
 * @description
 * 表示一个值可以是指定类型或null/undefined。
 */
export type Nullable<T> = T | null | undefined;

/**
 * 非空类型
 * 
 * @description
 * 从类型中排除null和undefined。
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * 数组元素类型
 * 
 * @description
 * 提取数组的元素类型。
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

/**
 * 函数参数类型
 * 
 * @description
 * 提取函数的参数类型元组。
 */
export type FunctionParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;

/**
 * 函数返回类型
 * 
 * @description
 * 提取函数的返回类型。
 */
export type FunctionReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never;
