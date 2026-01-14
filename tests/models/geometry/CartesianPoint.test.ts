/**
 * CartesianPoint类测试
 * 
 * @description
 * 测试CartesianPoint类的创建、验证和几何计算功能。
 */

import { CartesianPoint } from '../../../src/models/geometry/CartesianPoint';

describe('CartesianPoint', () => {
  describe('Constructor', () => {
    test('should create valid CartesianPoint', () => {
      const point = new CartesianPoint('p1', 10.5, 20.3);
      
      expect(point.id).toBe('p1');
      expect(point.x).toBe(10.5);
      expect(point.y).toBe(20.3);
    });

    test('should throw error for empty ID', () => {
      expect(() => new CartesianPoint('', 0, 0)).toThrow('Point ID cannot be empty');
      expect(() => new CartesianPoint('   ', 0, 0)).toThrow('Point ID cannot be empty');
    });

    test('should throw error for invalid X coordinate', () => {
      expect(() => new CartesianPoint('p1', NaN, 0)).toThrow('Invalid X coordinate');
      expect(() => new CartesianPoint('p1', Infinity, 0)).toThrow('Invalid X coordinate');
    });

    test('should throw error for invalid Y coordinate', () => {
      expect(() => new CartesianPoint('p1', 0, NaN)).toThrow('Invalid Y coordinate');
      expect(() => new CartesianPoint('p1', 0, -Infinity)).toThrow('Invalid Y coordinate');
    });

    test('should accept negative coordinates', () => {
      const point = new CartesianPoint('p1', -10, -20);
      expect(point.x).toBe(-10);
      expect(point.y).toBe(-20);
    });

    test('should accept zero coordinates', () => {
      const point = new CartesianPoint('p1', 0, 0);
      expect(point.x).toBe(0);
      expect(point.y).toBe(0);
    });
  });

  describe('distanceTo', () => {
    test('should calculate distance between two points', () => {
      const p1 = new CartesianPoint('p1', 0, 0);
      const p2 = new CartesianPoint('p2', 3, 4);
      
      expect(p1.distanceTo(p2)).toBe(5);
    });

    test('should return 0 for same point', () => {
      const p1 = new CartesianPoint('p1', 5, 5);
      const p2 = new CartesianPoint('p2', 5, 5);
      
      expect(p1.distanceTo(p2)).toBe(0);
    });

    test('should calculate distance with negative coordinates', () => {
      const p1 = new CartesianPoint('p1', -3, -4);
      const p2 = new CartesianPoint('p2', 0, 0);
      
      expect(p1.distanceTo(p2)).toBe(5);
    });
  });

  describe('equals', () => {
    test('should return true for equal points', () => {
      const p1 = new CartesianPoint('p1', 10, 20);
      const p2 = new CartesianPoint('p2', 10, 20);
      
      expect(p1.equals(p2)).toBe(true);
    });

    test('should return false for different points', () => {
      const p1 = new CartesianPoint('p1', 10, 20);
      const p2 = new CartesianPoint('p2', 10, 21);
      
      expect(p1.equals(p2)).toBe(false);
    });

    test('should use tolerance for comparison', () => {
      const p1 = new CartesianPoint('p1', 10.0000001, 20.0000001);
      const p2 = new CartesianPoint('p2', 10, 20);
      
      expect(p1.equals(p2, 1e-6)).toBe(true);
      expect(p1.equals(p2, 1e-8)).toBe(false);
    });
  });

  describe('toString', () => {
    test('should return string representation', () => {
      const point = new CartesianPoint('p1', 10.5, 20.3);
      const str = point.toString();
      
      expect(str).toContain('CartesianPoint');
      expect(str).toContain('p1');
      expect(str).toContain('10.5');
      expect(str).toContain('20.3');
    });
  });

  describe('toJSON', () => {
    test('should return JSON representation', () => {
      const point = new CartesianPoint('p1', 10.5, 20.3);
      const json = point.toJSON();
      
      expect(json).toEqual({
        id: 'p1',
        x: 10.5,
        y: 20.3
      });
    });
  });
});
