/**
 * Arc类测试
 * 
 * @description
 * 测试Arc类的创建、验证和几何计算功能。
 */

import { Arc } from '../../../src/models/geometry/Arc';
import { CartesianPoint } from '../../../src/models/geometry/CartesianPoint';

describe('Arc', () => {
  let startPoint: CartesianPoint;
  let endPoint: CartesianPoint;

  beforeEach(() => {
    startPoint = new CartesianPoint('s1', 0, 0);
    endPoint = new CartesianPoint('e1', 10, 0);
  });

  describe('Constructor', () => {
    test('should create valid Arc', () => {
      const arc = new Arc('arc1', startPoint, endPoint, 5, false);
      
      expect(arc.id).toBe('arc1');
      expect(arc.startPoint).toBe(startPoint);
      expect(arc.endPoint).toBe(endPoint);
      expect(arc.radius).toBe(5);
      expect(arc.isCCW).toBe(false);
    });

    test('should create CCW arc', () => {
      const arc = new Arc('arc1', startPoint, endPoint, 5, true);
      expect(arc.isCCW).toBe(true);
    });

    test('should throw error for empty ID', () => {
      expect(() => new Arc('', startPoint, endPoint, 5, false)).toThrow('Arc ID cannot be empty');
    });

    test('should throw error for missing start point', () => {
      expect(() => new Arc('arc1', null as any, endPoint, 5, false)).toThrow('Start point is required');
    });

    test('should throw error for missing end point', () => {
      expect(() => new Arc('arc1', startPoint, null as any, 5, false)).toThrow('End point is required');
    });

    test('should throw error for invalid radius', () => {
      expect(() => new Arc('arc1', startPoint, endPoint, 0, false)).toThrow('Invalid radius');
      expect(() => new Arc('arc1', startPoint, endPoint, -5, false)).toThrow('Invalid radius');
      expect(() => new Arc('arc1', startPoint, endPoint, NaN, false)).toThrow('Invalid radius');
    });

    test('should throw error when chord length exceeds diameter', () => {
      // Distance between points is 10, diameter would be 2*3 = 6
      expect(() => new Arc('arc1', startPoint, endPoint, 3, false)).toThrow('Chord length');
    });

    test('should accept radius equal to half chord length (semicircle)', () => {
      // Distance is 10, radius is 5 (semicircle)
      expect(() => new Arc('arc1', startPoint, endPoint, 5, false)).not.toThrow();
    });
  });

  describe('calculateCenter', () => {
    test('should calculate center for CW arc', () => {
      const arc = new Arc('arc1', startPoint, endPoint, 5, false);
      const center = arc.calculateCenter();
      
      expect(center.x).toBeCloseTo(5, 10);
      expect(center.y).toBeCloseTo(0, 10);
    });

    test('should calculate center for CCW arc', () => {
      const arc = new Arc('arc1', startPoint, endPoint, 5, true);
      const center = arc.calculateCenter();
      
      expect(center.x).toBeCloseTo(5, 10);
      expect(center.y).toBeCloseTo(0, 10);
    });

    test('should calculate center for arc with larger radius', () => {
      const arc = new Arc('arc1', startPoint, endPoint, 10, false);
      const center = arc.calculateCenter();
      
      expect(center.x).toBeCloseTo(5, 10);
      // For radius 10 and chord 10, h = sqrt(100 - 25) = sqrt(75) ≈ 8.66
      expect(Math.abs(center.y)).toBeCloseTo(8.66, 2);
    });
  });

  describe('calculateAngle', () => {
    test('should calculate angle for semicircle', () => {
      const arc = new Arc('arc1', startPoint, endPoint, 5, false);
      const angle = arc.calculateAngle();
      
      expect(angle).toBeCloseTo(Math.PI, 10);
    });

    test('should calculate angle for quarter circle', () => {
      const start = new CartesianPoint('s1', 5, 0);
      const end = new CartesianPoint('e1', 0, 5);
      const arc = new Arc('arc1', start, end, 5, true);
      const angle = arc.calculateAngle();
      
      expect(angle).toBeCloseTo(Math.PI / 2, 10);
    });
  });

  describe('calculateLength', () => {
    test('should calculate length for semicircle', () => {
      const arc = new Arc('arc1', startPoint, endPoint, 5, false);
      const length = arc.calculateLength();
      
      // Length = radius * angle = 5 * π
      expect(length).toBeCloseTo(5 * Math.PI, 10);
    });

    test('should calculate length for quarter circle', () => {
      const start = new CartesianPoint('s1', 5, 0);
      const end = new CartesianPoint('e1', 0, 5);
      const arc = new Arc('arc1', start, end, 5, true);
      const length = arc.calculateLength();
      
      // Length = radius * angle = 5 * π/2
      expect(length).toBeCloseTo(5 * Math.PI / 2, 10);
    });
  });

  describe('getPointAt', () => {
    test('should return start point at t=0', () => {
      const arc = new Arc('arc1', startPoint, endPoint, 5, false);
      const point = arc.getPointAt(0);
      
      expect(point.x).toBeCloseTo(startPoint.x, 10);
      expect(point.y).toBeCloseTo(startPoint.y, 10);
    });

    test('should return end point at t=1', () => {
      const arc = new Arc('arc1', startPoint, endPoint, 5, false);
      const point = arc.getPointAt(1);
      
      expect(point.x).toBeCloseTo(endPoint.x, 10);
      expect(point.y).toBeCloseTo(endPoint.y, 10);
    });

    test('should return midpoint at t=0.5', () => {
      const arc = new Arc('arc1', startPoint, endPoint, 5, false);
      const point = arc.getPointAt(0.5);
      
      // For semicircle, midpoint should be at (5, -5) for CW
      expect(point.x).toBeCloseTo(5, 10);
      expect(Math.abs(point.y)).toBeCloseTo(5, 10);
    });

    test('should throw error for t out of range', () => {
      const arc = new Arc('arc1', startPoint, endPoint, 5, false);
      
      expect(() => arc.getPointAt(-0.1)).toThrow('Parameter t must be in range');
      expect(() => arc.getPointAt(1.1)).toThrow('Parameter t must be in range');
    });
  });

  describe('getBoundingBox', () => {
    test('should calculate bounding box for semicircle', () => {
      const arc = new Arc('arc1', startPoint, endPoint, 5, false);
      const bbox = arc.getBoundingBox();
      
      expect(bbox.minX).toBeCloseTo(0, 10);
      expect(bbox.maxX).toBeCloseTo(10, 10);
      // Should include the bottom of the arc
      expect(bbox.minY).toBeLessThanOrEqual(0);
    });

    test('should calculate bounding box for quarter circle', () => {
      const start = new CartesianPoint('s1', 5, 0);
      const end = new CartesianPoint('e1', 0, 5);
      const arc = new Arc('arc1', start, end, 5, true);
      const bbox = arc.getBoundingBox();
      
      expect(bbox.minX).toBeCloseTo(0, 10);
      expect(bbox.minY).toBeCloseTo(0, 10);
      expect(bbox.maxX).toBeCloseTo(5, 10);
      expect(bbox.maxY).toBeCloseTo(5, 10);
    });
  });

  describe('toString', () => {
    test('should return string representation', () => {
      const arc = new Arc('arc1', startPoint, endPoint, 5, false);
      const str = arc.toString();
      
      expect(str).toContain('Arc');
      expect(str).toContain('arc1');
      expect(str).toContain('5');
      expect(str).toContain('false');
    });
  });

  describe('toJSON', () => {
    test('should return JSON representation', () => {
      const arc = new Arc('arc1', startPoint, endPoint, 5, false);
      const json = arc.toJSON();
      
      expect(json.id).toBe('arc1');
      expect(json.startPoint).toBe(startPoint);
      expect(json.endPoint).toBe(endPoint);
      expect(json.radius).toBe(5);
      expect(json.isCCW).toBe(false);
    });
  });
});
