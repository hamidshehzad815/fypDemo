import 'package:flutter/material.dart';
import 'dart:math' as math;

class ParticlesPainter extends CustomPainter {
  final double animationValue;
  ParticlesPainter(this.animationValue);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..strokeWidth = 1;

    for (int i = 0; i < 50; i++) {
      double x = (size.width * (i / 50) + animationValue * 100) % size.width;
      double y =
          (size.height * ((i * 7) % 13 / 13) +
              math.sin(animationValue * 2 + i) * 50) %
          size.height;

      double opacity = 0.3 + 0.4 * math.sin(animationValue * 3 + i);
      paint.color = Colors.white.withOpacity(opacity * 0.15);

      canvas.drawCircle(Offset(x, y), 1 + math.sin(animationValue + i), paint);
    }
  }

  @override
  bool shouldRepaint(covariant ParticlesPainter oldDelegate) => true;
}
