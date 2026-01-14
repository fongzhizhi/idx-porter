/**
 * 几何类型测试
 * 
 * @description
 * 测试几何类型定义的结构和类型安全性。
 * 使用实际的模型类进行测试，因为类型包含了 @flatten-js/core 的对象。
 */

import { CartesianPoint } from '../../src/models/geometry/CartesianPoint';
import { PolyLine } from '../../src/models/geometry/PolyLine';
import { CircleCenter } from '../../src/models/geometry/CircleCenter';
import { Arc } from '../../src/models/geometry/Arc';
import { CurveSet2d } from '../../src/models/geometry/CurveSet2d';
import { ShapeElement } from '../../src/models/geometry/ShapeElement';
import { ShapeDescriptionType } from '../../src/types/enums';

describe('Geometry Types', () => {
  describe('CartesianPoint', () => {
    test('should create valid CartesianPoint', () => {
      const point = new CartesianPoint('point1', 10.5, 20.3);

      expect(point.id).toBe('point1');
      expect(point.x).toBe(10.5);
      expect(point.y).toBe(20.3);
      expect(point.flattenPoint).toBeDefined();
    });
  });

  describe('PolyLine', () => {
    test('should create valid PolyLine', () => {
      const points = [
        new CartesianPoint('p1', 0, 0),
        new CartesianPoint('p2', 10, 0),
        new CartesianPoint('p3', 10, 10)
      ];

      const polyLine = new PolyLine('polyline1', points, false);

      expect(polyLine.id).toBe('polyline1');
      expect(polyLine.points).toHaveLength(3);
      expect(polyLine.closed).toBe(false);
      expect(polyLine.thickness).toBeUndefined();
      expect(polyLine.flattenShape).toBeDefined();
    });

    test('should create PolyLine with thickness', () => {
      const points = [new CartesianPoint('p1', 0, 0), new CartesianPoint('p2', 10, 0)];
      const polyLine = new PolyLine('polyline2', points, true, 2.5);

      expect(polyLine.thickness).toBe(2.5);
      expect(polyLine.closed).toBe(true);
    });
  });

  describe('CircleCenter', () => {
    test('should create valid CircleCenter', () => {
      const centerPoint = new CartesianPoint('center', 5, 5);
      const circle = new CircleCenter('circle1', centerPoint, 10);

      expect(circle.id).toBe('circle1');
      expect(circle.centerPoint.x).toBe(5);
      expect(circle.diameter).toBe(10);
      expect(circle.flattenCircle).toBeDefined();
    });
  });

  describe('Arc', () => {
    test('should create valid Arc', () => {
      const startPoint = new CartesianPoint('start', 0, 0);
      const endPoint = new CartesianPoint('end', 10, 0);
      const arc = new Arc('arc1', startPoint, endPoint, 5, true);

      expect(arc.id).toBe('arc1');
      expect(arc.radius).toBe(5);
      expect(arc.isCCW).toBe(true);
      expect(arc.flattenArc).toBeDefined();
    });
  });

  describe('CurveSet2d', () => {
    test('should create valid CurveSet2d', () => {
      const points = [
        new CartesianPoint('p1', 0, 0),
        new CartesianPoint('p2', 10, 0),
        new CartesianPoint('p3', 10, 10)
      ];
      const geometry = new PolyLine('poly1', points, true);

      const curveSet = new CurveSet2d(
        'curveset1',
        geometry,
        0,
        1.6,
        ShapeDescriptionType.GEOMETRIC_MODEL
      );

      expect(curveSet.id).toBe('curveset1');
      expect(curveSet.lowerBound).toBe(0);
      expect(curveSet.upperBound).toBe(1.6);
      expect(curveSet.shapeDescriptionType).toBe(ShapeDescriptionType.GEOMETRIC_MODEL);
    });
  });

  describe('ShapeElement', () => {
    test('should create valid ShapeElement', () => {
      const points = [
        new CartesianPoint('p1', 0, 0),
        new CartesianPoint('p2', 10, 0),
        new CartesianPoint('p3', 10, 10)
      ];
      const polyLine = new PolyLine('poly1', points, true);
      const geometry = new CurveSet2d(
        'curveset1',
        polyLine,
        0,
        1.6,
        ShapeDescriptionType.GEOMETRIC_MODEL
      );

      const shape = new ShapeElement('shape1', geometry, false);

      expect(shape.id).toBe('shape1');
      expect(shape.inverted).toBe(false);
      expect(shape.geometry.lowerBound).toBe(0);
    });

    test('should create inverted ShapeElement', () => {
      const centerPoint = new CartesianPoint('c', 0, 0);
      const circle = new CircleCenter('circle1', centerPoint, 5);
      const geometry = new CurveSet2d(
        'curveset2',
        circle,
        0,
        1.6,
        ShapeDescriptionType.GEOMETRIC_MODEL
      );

      const shape = new ShapeElement('shape2', geometry, true);

      expect(shape.inverted).toBe(true);
    });
  });
});
