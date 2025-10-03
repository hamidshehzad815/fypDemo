import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'dart:math' as math;

class AnimatedRobot extends StatelessWidget {
  final AnimationController robotController;
  final AnimationController pulseController;

  const AnimatedRobot({
    super.key,
    required this.robotController,
    required this.pulseController,
  });

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: Listenable.merge([robotController, pulseController]),
      builder: (_, __) {
        double scale = Tween<double>(begin: 0.0, end: 1.0)
            .animate(
              CurvedAnimation(
                parent: robotController,
                curve: const Interval(0.0, 0.7, curve: Curves.elasticOut),
              ),
            )
            .value;

        double rotation = Tween<double>(begin: -0.5, end: 0.0)
            .animate(
              CurvedAnimation(
                parent: robotController,
                curve: const Interval(0.0, 0.8, curve: Curves.easeOutBack),
              ),
            )
            .value;

        double bob = 8 * math.sin(pulseController.value * 2 * math.pi);
        double breathScale = 1.0 + (pulseController.value * 0.05);

        return Transform.translate(
          offset: Offset(0, bob),
          child: Transform.rotate(
            angle: rotation,
            child: Transform.scale(
              scale: scale * breathScale,
              child: Container(
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.blue.withOpacity(0.3),
                      blurRadius: 30,
                      spreadRadius: 5,
                    ),
                  ],
                ),
                child: Lottie.asset(
                  'assets/lottie/robot.json',
                  width: 380,
                  height: 380,
                  fit: BoxFit.contain,
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
