/**
 * CircleCenter类测试
 * 
 * @description
 * 测试CircleCenter类的创建、验证和几何计算功能。
 */

import { CircleCenter } from '../../../src/models/geometry/CircleCenter';
import { CartesianPoint } from '../../../src/models/geometry/CartesianPoint';

describe('CircleCenter', () => {
  let center: CartesianPoint;

  beforeEach(() => {
    center = new CartesianPoint('c1', 5, 5);
  });

  describe('Constructor', () => {
    test('should create valid CircleCenter', () => {
      const circle = new CircleCenter('circle1', center, 10);
      
      expect(circle.id).toBe('circle1');
      expect(circle.centerPoint).toBe(center);
      expect(circle.diameter).toBe(10);
    });

    test('should throw error for empty ID', () => {
      expect(() => new CircleCenter('', center, 10)).toThrow('Circle ID cannot be empty');
    });

    test('should throw error for missing center point', () => {
      expect(() => new CircleCenter('circle1', null as any, 10)).toThrow('Center point is required');
    });

    test('should throw error for invalid diameter', () => {
      expect(() => new CircleCenter('circle1', center, 0)).toThrow('Invalid diameter');
      expect(() => new CircleCenter('circle1', center, -5)).toThrow('Invalid diameter');
      expect(() => new CircleCenter('circle1', center, NaN)).toThrow('Invalid diameter');
    });
  });

  describe('getRadius', () => {
    test('should return correct radius', () => {
      const circle = new CircleCenter('circle1', center, 10);
      expect(circle.getRadius()).toBe(5);
    });

    test('should handle decimal diameter', () => {
      const circle = new CircleCenter('circle1', center, 7.5);
      expect(circle.getRadius()).toBe(3.75);
    });
  });

  describe('getArea', () => {
    test('should calculate correct area', () => {
      const circle = new CircleCenter('circle1', center, 10);
      const area = circle.getArea();
      
      // Area = π * r^2 = π * 5^2 = 25π
      expect(area).toBeCloseTo(Math.PI * 25, 10);
    });

    test('should calculate area for unit circle', () => {
      const circle = new CircleCenter('circle1', center, 2);
      const area = circle.getArea();
      
      expect(area).toBeCloseTo(Math.PI, 10);
    });
  });

  describe('getCircumference', () => {
    test('should calculate correct circumference', () => {
      const circle = new CircleCenter('circle1', center, 10);
      const circumference = circle.getCircumference();
      
      // Circumference = π * d = π * 10
      expect(circumference).toBeCloseTo(Math.PI * 10, 10);
    });
  });

  describe('containsPoint', () => {
    test('should return true for point at center', () => {
      const circle = new CircleCenter('circle1', center, 10);
      expect(circle.containsPoint(center)).toBe(true);
    });

    test('should return true for point on circle', () => {
      const circle = new CircleCenter('circle1', center, 10);
      const pointOnCircle = new CartesianPoint('p1', 10, 5); // 5 units from center
      
      expect(circle.containsPoint(pointOnCircle)).toBe(true);
    });

    test('should return true for point inside circle', () => {
      const circle = new CircleCenter('circle1', center, 10);
      const pointInside = new CartesianPoint('p1', 7, 5);
      
      expect(circle.containsPoint(pointInside)).toBe(true);
    });

    test('should return false for point outside circle', () => {
      const circle = new CircleCenter('circle1', center, 10);
      const pointOutside = new CartesianPoint('p1', 15, 5);
      
      expect(circle.containsPoint(pointOutside)).toBe(false);
    });

    test('should use tolerance for boundary check', () => {
      const circle = new CircleCenter('circle1', center, 10);
      const pointNearBoundary = new CartesianPoint('p1', 10.0000001, 5);
      
      expect(circle.containsPoint(pointNearBoundary, 1e-6)).toBe(true);
      expect(circle.containsPoint(pointNearBoundary, 1e-8)).toBe(false);
    });
  });

  describe('getBoundingBox', () => {
    test('should calculate correct bounding box', () => {
      const circle = new CircleCenter('circle1', center, 10);
      const bbox = circle.getBoundingBox();
      
      expect(bbox.minX).toBe(0);
      expect(bbox.minY).toBe(0);
      expect(bbox.maxX).toBe(10);
      expect(bbox.maxY).toBe(10);
    });

    test('should handle circle at origin', () => {
      const originCenter = new CartesianPoint('c1', 0, 0);
      const circle = new CircleCenter('circle1', originCenter, 6);
      const bbox = circle.getBoundingBox();
      
      expect(bbox.minX).toBe(-3);
      expect(bbox.minY).toBe(-3);
      expect(bbox.maxX).toBe(3);
      expect(bbox.maxY).toBe(3);
    });
  });

  describe('toString', () => {
    test('should return string representation', () => {
      const circle = new CircleCenter('circle1', center, 10);
      const str = circle.toString();
      
      expect(str).toContain('CircleCenter');
      expect(str).toContain('circle1');
      expect(str).toContain('5');
      expect(str).toContain('10');
    });
  });

  describe('toJSON', () => {
    test('should return JSON representation', () => {
      const circle = new CircleCenter('circle1', center, 10);
      const json = circle.toJSON();
      
      expect(json.id).toBe('circle1');
      expect(json.centerPoint).toBe(center);
      expect(json.diameter).toBe(10);
    });
  });
});
