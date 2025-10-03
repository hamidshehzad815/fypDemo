import 'package:flutter/material.dart';
import 'dart:math' as math;
import '../painters/enhanced_trail_painter.dart';

class EnhancedIcons extends StatelessWidget {
  final AnimationController controller;
  final Offset robotCenter;
  final Size screenSize;

  const EnhancedIcons({
    super.key,
    required this.controller,
    required this.robotCenter,
    required this.screenSize,
  });

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: controller,
      builder: (_, __) {
        final t = controller.value;
        final icons = [
          Icons.favorite,
          Icons.restaurant_menu,
          Icons.person_outline,
          Icons.auto_stories,
          Icons.calendar_today,
          Icons.notifications_active,
        ];

        final gradients = [
          [const Color(0xFFFF6B6B), const Color(0xFFFF8E53)],
          [const Color(0xFF4ECDC4), const Color(0xFF44A08D)],
          [const Color(0xFF45B7D1), const Color(0xFF96C93D)],
          [const Color(0xFF9B59B6), const Color(0xFF8E44AD)],
          [const Color(0xFFE67E22), const Color(0xFFF39C12)],
          [const Color(0xFF1ABC9C), const Color(0xFF16A085)],
        ];

        List<Widget> widgets = [];

        for (int i = 0; i < icons.length; i++) {
          double staggerDelay = i * 0.15;
          double progress = ((t - staggerDelay) * 1.2).clamp(0.0, 1.0);

          if (progress > 0) {
            double baseRadius = 60;
            double maxRadius = 140;
            double currentRadius =
                baseRadius + (progress * (maxRadius - baseRadius));

            double speedMultiplier = 0.8 + (i * 0.1);
            double angle =
                (i / icons.length) * 2 * math.pi +
                (t * math.pi * speedMultiplier);

            double waveAmplitude = 20 + (5 * math.sin(t * 3 + i));
            double waveX = waveAmplitude * math.sin(t * 2 + i * 0.8);
            double waveY = waveAmplitude * math.cos(t * 1.5 + i * 0.6) * 0.7;

            double x = currentRadius * math.cos(angle) + waveX;
            double y = currentRadius * math.sin(angle) + waveY;

            double iconScale = Tween<double>(begin: 0.0, end: 1.0)
                .animate(
                  CurvedAnimation(
                    parent: AlwaysStoppedAnimation(progress),
                    curve: Curves.elasticOut,
                  ),
                )
                .value;

            double rotation = 0.3 * math.sin(t * 2 * math.pi + i);

            widgets.add(
              Positioned(
                left: robotCenter.dx + x - 25,
                top: robotCenter.dy + y - 25,
                child: Transform.scale(
                  scale: iconScale,
                  child: Transform.rotate(
                    angle: rotation,
                    child: Container(
                      width: 50,
                      height: 50,
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: gradients[i % gradients.length],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(16),
                        boxShadow: [
                          BoxShadow(
                            color: gradients[i % gradients.length][0]
                                .withOpacity(0.4),
                            blurRadius: 12,
                            offset: const Offset(0, 6),
                            spreadRadius: 2,
                          ),
                          BoxShadow(
                            color: gradients[i % gradients.length][1]
                                .withOpacity(0.2),
                            blurRadius: 20,
                            offset: const Offset(0, 8),
                          ),
                        ],
                      ),
                      child: Icon(icons[i], color: Colors.white, size: 28),
                    ),
                  ),
                ),
              ),
            );

            widgets.add(
              Positioned(
                left: robotCenter.dx + x - 25,
                top: robotCenter.dy + y - 25,
                child: CustomPaint(
                  painter: EnhancedTrailPainter(
                    gradients[i % gradients.length],
                    progress,
                    t + i,
                  ),
                  size: const Size(50, 50),
                ),
              ),
            );
          }
        }

        return Stack(children: widgets);
      },
    );
  }
}
