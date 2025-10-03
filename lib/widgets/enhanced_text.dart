// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'dart:ui';

class EnhancedText extends StatelessWidget {
  final AnimationController controller;
  final Size screenSize;

  const EnhancedText({
    super.key,
    required this.controller,
    required this.screenSize,
  });

  @override
  Widget build(BuildContext context) {
    return Positioned.fill(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 2, sigmaY: 2),
        child: Container(
          alignment: Alignment.center,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Colors.black.withOpacity(0.1),
                Colors.black.withOpacity(0.3),
                Colors.black.withOpacity(0.1),
              ],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
          ),
          child: AnimatedBuilder(
            animation: controller,
            builder: (_, __) {
              double slideY = Tween<double>(begin: 50.0, end: 0.0)
                  .animate(
                    CurvedAnimation(
                      parent: controller,
                      curve: const Interval(
                        0.0,
                        0.7,
                        curve: Curves.easeOutBack,
                      ),
                    ),
                  )
                  .value;

              double scale = Tween<double>(begin: 0.8, end: 1.0)
                  .animate(
                    CurvedAnimation(
                      parent: controller,
                      curve: const Interval(0.0, 0.8, curve: Curves.elasticOut),
                    ),
                  )
                  .value;

              double opacity = Tween<double>(begin: 0.0, end: 1.0)
                  .animate(
                    CurvedAnimation(
                      parent: controller,
                      curve: const Interval(0.0, 0.6, curve: Curves.easeIn),
                    ),
                  )
                  .value;

              return Transform.translate(
                offset: Offset(0, slideY),
                child: Opacity(
                  opacity: opacity,
                  child: Transform.scale(
                    scale: scale,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 20,
                            vertical: 10,
                          ),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(
                              color: Colors.white.withOpacity(0.2),
                              width: 1,
                            ),
                            color: Colors.white.withOpacity(0.1),
                          ),
                          child: ShaderMask(
                            shaderCallback: (bounds) => const LinearGradient(
                              colors: [
                                Color(0xFF667eea),
                                Color(0xFF764ba2),
                                Color(0xFFf093fb),
                                Color(0xFFf5576c),
                              ],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ).createShader(bounds),
                            child: Text(
                              "Speak N Plan",
                              style: TextStyle(
                                fontSize: screenSize.width * 0.11,
                                fontWeight: FontWeight.w800,
                                color: Colors.white,
                                letterSpacing: 2,
                                shadows: [
                                  Shadow(
                                    color: Colors.black.withOpacity(0.3),
                                    offset: const Offset(0, 4),
                                    blurRadius: 8,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 20),
                        Text(
                          "AI-Powered Planning Assistant",
                          style: TextStyle(
                            fontSize: screenSize.width * 0.04,
                            color: Colors.white.withOpacity(0.8),
                            fontWeight: FontWeight.w300,
                            letterSpacing: 1,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
