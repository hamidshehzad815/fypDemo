import 'package:flutter/material.dart';
import '../painters/particles_painter.dart';

class BackgroundParticles extends StatelessWidget {
  final AnimationController controller;
  final Size? size;

  const BackgroundParticles({super.key, required this.controller, this.size});

  @override
  Widget build(BuildContext context) {
    final screenSize = size ?? MediaQuery.of(context).size;
    return AnimatedBuilder(
      animation: controller,
      builder: (_, __) => CustomPaint(
        painter: ParticlesPainter(controller.value),
        size: screenSize,
      ),
    );
  }
}
