/**
 * PolyLine类测试
 * 
 * @description
 * 测试PolyLine类的创建、验证和几何计算功能。
 */

import { PolyLine } from '../../../src/models/geometry/PolyLine';
import { CartesianPoint } from '../../../src/models/geometry/CartesianPoint';

describe('PolyLine', () => {
  let points: CartesianPoint[];

  beforeEach(() => {
    points = [
      new CartesianPoint('p1', 0, 0),
      new CartesianPoint('p2', 10, 0),
      new CartesianPoint('p3', 10, 10),
      new CartesianPoint('p4', 0, 10)
    ];
  });

  describe('Constructor', () => {
    test('should create valid open PolyLine', () => {
      const polyLine = new PolyLine('line1', points, false);
      
      expect(polyLine.id).toBe('line1');
      expect(polyLine.points).toHaveLength(4);
      expect(polyLine.closed).toBe(false);
      expect(polyLine.thickness).toBeUndefined();
    });

    test('should create valid closed PolyLine', () => {
      const polyLine = new PolyLine('line1', points, true);
      
      expect(polyLine.closed).toBe(true);
    });

    test('should create PolyLine with thickness', () => {
      const polyLine = new PolyLine('line1', points, false, 2.5);
      
      expect(polyLine.thickness).toBe(2.5);
    });

    test('should throw error for empty ID', () => {
      expect(() => new PolyLine('', points, false)).toThrow('PolyLine ID cannot be empty');
    });

    test('should throw error for insufficient points', () => {
      const singlePoint = [new CartesianPoint('p1', 0, 0)];
      expect(() => new PolyLine('line1', singlePoint, false)).toThrow('must have at least 2 points');
    });

    test('should throw error for invalid thickness', () => {
      expect(() => new PolyLine('line1', points, false, 0)).toThrow('Invalid thickness');
      expect(() => new PolyLine('line1', points, false, -1)).toThrow('Invalid thickness');
      expect(() => new PolyLine('line1', points, false, NaN)).toThrow('Invalid thickness');
    });
  });

  describe('pointCount', () => {
    test('should return correct point count', () => {
      const polyLine = new PolyLine('line1', points, false);
      expect(polyLine.pointCount).toBe(4);
    });
  });

  describe('isClosed', () => {
    test('should return false for open polyline', () => {
      const polyLine = new PolyLine('line1', points, false);
      expect(polyLine.isClosed()).toBe(false);
    });

    test('should return true for closed polyline', () => {
      const polyLine = new PolyLine('line1', points, true);
      expect(polyLine.isClosed()).toBe(true);
    });
  });

  describe('getPoint', () => {
    test('should return point at valid index', () => {
      const polyLine = new PolyLine('line1', points, false);
      const point = polyLine.getPoint(1);
      
      expect(point.x).toBe(10);
      expect(point.y).toBe(0);
    });

    test('should throw error for invalid index', () => {
      const polyLine = new PolyLine('line1', points, false);
      
      expect(() => polyLine.getPoint(-1)).toThrow('index out of bounds');
      expect(() => polyLine.getPoint(4)).toThrow('index out of bounds');
    });
  });

  describe('calculateLength', () => {
    test('should calculate length of open polyline', () => {
      const polyLine = new PolyLine('line1', points, false);
      const length = polyLine.calculateLength();
      
      // 10 + 10 + 10 = 30
      expect(length).toBe(30);
    });

    test('should calculate length of closed polyline', () => {
      const polyLine = new PolyLine('line1', points, true);
      const length = polyLine.calculateLength();
      
      // 10 + 10 + 10 + 10 = 40 (includes closing segment)
      expect(length).toBe(40);
    });

    test('should calculate length for simple line', () => {
      const simplePoints = [
        new CartesianPoint('p1', 0, 0),
        new CartesianPoint('p2', 3, 4)
      ];
      const polyLine = new PolyLine('line1', simplePoints, false);
      
      expect(polyLine.calculateLength()).toBe(5);
    });
  });

  describe('getBoundingBox', () => {
    test('should calculate correct bounding box', () => {
      const polyLine = new PolyLine('line1', points, false);
      const bbox = polyLine.getBoundingBox();
      
      expect(bbox.minX).toBe(0);
      expect(bbox.minY).toBe(0);
      expect(bbox.maxX).toBe(10);
      expect(bbox.maxY).toBe(10);
    });

    test('should handle negative coordinates', () => {
      const negPoints = [
        new CartesianPoint('p1', -5, -5),
        new CartesianPoint('p2', 5, 5)
      ];
      const polyLine = new PolyLine('line1', negPoints, false);
      const bbox = polyLine.getBoundingBox();
      
      expect(bbox.minX).toBe(-5);
      expect(bbox.minY).toBe(-5);
      expect(bbox.maxX).toBe(5);
      expect(bbox.maxY).toBe(5);
    });
  });

  describe('toString', () => {
    test('should return string representation', () => {
      const polyLine = new PolyLine('line1', points, false, 2.5);
      const str = polyLine.toString();
      
      expect(str).toContain('PolyLine');
      expect(str).toContain('line1');
      expect(str).toContain('4');
      expect(str).toContain('false');
      expect(str).toContain('2.5');
    });
  });

  describe('toJSON', () => {
    test('should return JSON representation', () => {
      const polyLine = new PolyLine('line1', points, false, 2.5);
      const json = polyLine.toJSON();
      
      expect(json.id).toBe('line1');
      expect(json.points).toHaveLength(4);
      expect(json.closed).toBe(false);
      expect(json.thickness).toBe(2.5);
    });
  });
});
