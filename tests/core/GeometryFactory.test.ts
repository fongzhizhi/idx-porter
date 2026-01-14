/**
 * GeometryFactory测试
 * 
 * @description
 * 测试GeometryFactory工厂类的功能。
 */

import { GeometryFactory } from '../../src/core/GeometryFactory';
import { CartesianPoint } from '../../src/models/geometry/CartesianPoint';

describe('GeometryFactory', () => {
  let factory: GeometryFactory;

  beforeEach(() => {
    factory = new GeometryFactory();
  });

  describe('createPoint', () => {
    test('should create point with auto-generated ID', () => {
      const point = factory.createPoint(10, 20);
      
      expect(point).toBeInstanceOf(CartesianPoint);
      expect(point.x).toBe(10);
      expect(point.y).toBe(20);
      expect(point.id).toContain('geom_point');
    });

    test('should create point with custom ID', () => {
      const point = factory.createPoint(10, 20, 'custom_point');
      
      expect(point.id).toBe('custom_point');
    });

    test('should generate unique IDs', () => {
      const p1 = factory.createPoint(0, 0);
      const p2 = factory.createPoint(1, 1);
      
      expect(p1.id).not.toBe(p2.id);
    });
  });

  describe('createPolyLine', () => {
    test('should create polyline with auto-generated ID', () => {
      const points = [
        factory.createPoint(0, 0),
        factory.createPoint(10, 0)
      ];
      const polyLine = factory.createPolyLine(points, false);
      
      expect(polyLine.id).toContain('geom_polyline');
      expect(polyLine.points).toHaveLength(2);
      expect(polyLine.closed).toBe(false);
    });

    test('should create closed polyline', () => {
      const points = [
        factory.createPoint(0, 0),
        factory.createPoint(10, 0),
        factory.createPoint(10, 10)
      ];
      const polyLine = factory.createPolyLine(points, true);
      
      expect(polyLine.closed).toBe(true);
    });

    test('should create polyline with thickness', () => {
      const points = [
        factory.createPoint(0, 0),
        factory.createPoint(10, 0)
      ];
      const polyLine = factory.createPolyLine(points, false, 2.5);
      
      expect(polyLine.thickness).toBe(2.5);
    });
  });

  describe('createCircleCenter', () => {
    test('should create circle with auto-generated ID', () => {
      const center = factory.createPoint(5, 5);
      const circle = factory.createCircleCenter(center, 10);
      
      expect(circle.id).toContain('geom_circle');
      expect(circle.centerPoint).toBe(center);
      expect(circle.diameter).toBe(10);
    });

    test('should create circle with custom ID', () => {
      const center = factory.createPoint(5, 5);
      const circle = factory.createCircleCenter(center, 10, 'my_circle');
      
      expect(circle.id).toBe('my_circle');
    });
  });

  describe('createArc', () => {
    test('should create arc with auto-generated ID', () => {
      const start = factory.createPoint(0, 0);
      const end = factory.createPoint(10, 0);
      const arc = factory.createArc(start, end, 5, false);
      
      expect(arc.id).toContain('geom_arc');
      expect(arc.startPoint).toBe(start);
      expect(arc.endPoint).toBe(end);
      expect(arc.radius).toBe(5);
      expect(arc.isCCW).toBe(false);
    });

    test('should create CCW arc', () => {
      const start = factory.createPoint(0, 0);
      const end = factory.createPoint(10, 0);
      const arc = factory.createArc(start, end, 5, true);
      
      expect(arc.isCCW).toBe(true);
    });
  });

  describe('createCurveSet2d', () => {
    test('should create curve set with auto-generated ID', () => {
      const points = [
        factory.createPoint(0, 0),
        factory.createPoint(10, 0)
      ];
      const polyLine = factory.createPolyLine(points, true);
      const curveSet = factory.createCurveSet2d(polyLine, 0, 1.6);
      
      expect(curveSet.id).toContain('geom_curveset');
      expect(curveSet.lowerBound).toBe(0);
      expect(curveSet.upperBound).toBe(1.6);
      expect(curveSet.detailedGeometricModelElement).toBe(polyLine);
    });
  });

  describe('createShapeElement', () => {
    test('should create additive shape element', () => {
      const points = [factory.createPoint(0, 0), factory.createPoint(10, 0)];
      const polyLine = factory.createPolyLine(points, true);
      const curveSet = factory.createCurveSet2d(polyLine, 0, 1.6);
      const shape = factory.createShapeElement(curveSet, false);
      
      expect(shape.id).toContain('geom_shape');
      expect(shape.inverted).toBe(false);
      expect(shape.geometry).toBe(curveSet);
    });

    test('should create subtractive shape element', () => {
      const points = [factory.createPoint(0, 0), factory.createPoint(10, 0)];
      const polyLine = factory.createPolyLine(points, true);
      const curveSet = factory.createCurveSet2d(polyLine, 0, 1.6);
      const shape = factory.createShapeElement(curveSet, true);
      
      expect(shape.inverted).toBe(true);
    });
  });

  describe('ID management', () => {
    test('should increment ID counter', () => {
      expect(factory.getIdCount()).toBe(0);
      
      factory.createPoint(0, 0);
      expect(factory.getIdCount()).toBe(1);
      
      factory.createPoint(1, 1);
      expect(factory.getIdCount()).toBe(2);
    });

    test('should reset ID counter', () => {
      factory.createPoint(0, 0);
      factory.createPoint(1, 1);
      expect(factory.getIdCount()).toBe(2);
      
      factory.resetIdCounter();
      expect(factory.getIdCount()).toBe(0);
    });

    test('should use custom prefix', () => {
      const customFactory = new GeometryFactory('custom');
      const point = customFactory.createPoint(0, 0);
      
      expect(point.id).toContain('custom_point');
    });
  });
});
