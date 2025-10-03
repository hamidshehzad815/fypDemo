import 'package:flutter/material.dart';
import 'dart:math' as Math;

class EnhancedTrailPainter extends CustomPainter {
  final List<Color> colors;
  final double progress;
  final double time;

  EnhancedTrailPainter(this.colors, this.progress, this.time);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    for (int i = 0; i < 3; i++) {
      final trailOpacity = (0.4 - i * 0.1) * progress;
      paint.color = colors[0].withOpacity(trailOpacity);
      paint.strokeWidth = 3.0 - i;

      final path = Path();
      final centerX = size.width / 2;
      final centerY = size.height / 2;

      path.moveTo(centerX, centerY);
      for (int j = 1; j <= 5; j++) {
        double trailX = centerX + (j * 8 * Math.cos(time + i * 0.5));
        double trailY = centerY + (j * 8 * Math.sin(time + i * 0.5));
        path.lineTo(trailX, trailY);
      }

      canvas.drawPath(path, paint);
    }
  }

  @override
  bool shouldRepaint(covariant EnhancedTrailPainter oldDelegate) => true;
}
