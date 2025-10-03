import 'package:flutter/material.dart';

class RobotGlow extends StatelessWidget {
  final AnimationController controller;
  final Offset center;

  const RobotGlow({super.key, required this.controller, required this.center});

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: controller,
      builder: (_, __) {
        double glowRadius = 120 + (controller.value * 40);
        double opacity = 0.3 + (controller.value * 0.2);

        return Positioned(
          left: center.dx - glowRadius,
          top: center.dy - glowRadius,
          child: Container(
            width: glowRadius * 2,
            height: glowRadius * 2,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: RadialGradient(
                colors: [
                  Colors.blue.withOpacity(opacity),
                  Colors.purple.withOpacity(opacity * 0.5),
                  Colors.transparent,
                ],
                stops: const [0.0, 0.7, 1.0],
              ),
            ),
          ),
        );
      },
    );
  }
}
