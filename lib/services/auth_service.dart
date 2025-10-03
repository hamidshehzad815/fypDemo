import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user_model.dart';

class AuthService {
  /// Login API
  static Future<Map<String, dynamic>> loginUser(
    String email,
    String password,
  ) async {
    final url = Uri.parse("http://192.168.100.11:3400/users/login");
    try {
      final response = await http.post(
        url,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({"email": email, "password": password}),
      );

      return jsonDecode(response.body);
    } catch (e) {
      return {"success": false, "message": "Something went wrong"};
    }
  }

  /// Signup API
  static Future<Map<String, dynamic>> signupUser(UserModel user) async {
    final url = Uri.parse("http://192.168.100.11:3400/users/signup");
    try {
      final response = await http.post(
        url,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(user.toJson()),
      );

      return jsonDecode(response.body);
    } catch (e) {
      return {"success": false, "message": "Something went wrong"};
    }
  }
}
