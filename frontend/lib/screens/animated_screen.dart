import 'package:flutter/material.dart';
import '../widgets/background_particles.dart';
import '../widgets/robot_glow.dart';
import '../widgets/animated_robot.dart';
import '../widgets/enhanced_icons.dart';
import '../widgets/enhanced_text.dart';
import 'login_screen.dart';

class AnimatedScreen extends StatefulWidget {
  const AnimatedScreen({super.key});

  @override
  State<AnimatedScreen> createState() => _AnimatedScreenState();
}

class _AnimatedScreenState extends State<AnimatedScreen>
    with TickerProviderStateMixin {
  late AnimationController robotController;
  late AnimationController iconsController;
  late AnimationController textController;
  late AnimationController backgroundController;
  late AnimationController pulseController;

  bool showText = false;

  @override
  void initState() {
    super.initState();

    backgroundController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 20),
    )..repeat();

    robotController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2500),
    );

    pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat(reverse: true);

    iconsController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 5),
    );

    textController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
    );

    _startAnimationSequence();
  }

  void _startAnimationSequence() async {
    await robotController.forward();
    await Future.delayed(const Duration(milliseconds: 500));

    iconsController.forward();

    iconsController.addListener(() {
      if (iconsController.value >= 0.8 && !showText) {
        setState(() => showText = true);
        textController.forward();
      }
    });

    textController.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        Future.delayed(const Duration(milliseconds: 1500), () {
          Navigator.pushReplacement(
            context,
            PageRouteBuilder(
              pageBuilder: (_, __, ___) => const LoginScreen(),
              transitionsBuilder: (_, animation, __, child) =>
                  FadeTransition(opacity: animation, child: child),
              transitionDuration: const Duration(milliseconds: 800),
            ),
          );
        });
      }
    });
  }

  @override
  void dispose() {
    robotController.dispose();
    iconsController.dispose();
    textController.dispose();
    backgroundController.dispose();
    pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    final robotCenter = Offset(screenSize.width / 2, screenSize.height / 2);

    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Color.fromARGB(255, 5, 59, 79), // Sky Blue
              Color.fromARGB(255, 53, 19, 59), // Purple
              Color.fromARGB(255, 0, 0, 0),
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Stack(
          alignment: Alignment.center,
          children: [
            BackgroundParticles(controller: backgroundController),
            RobotGlow(controller: pulseController, center: robotCenter),
            AnimatedRobot(
              robotController: robotController,
              pulseController: pulseController,
            ),
            EnhancedIcons(
              controller: iconsController,
              robotCenter: robotCenter,
              screenSize: screenSize,
            ),
            if (showText)
              EnhancedText(controller: textController, screenSize: screenSize),
          ],
        ),
      ),
    );
  }
}
