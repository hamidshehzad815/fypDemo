class UserModel {
  String firstName;
  String lastName;
  String dateOfBirth;
  String email;
  String phone;
  String address;
  String password;

  UserModel({
    required this.firstName,
    required this.lastName,
    required this.dateOfBirth,
    required this.email,
    required this.phone,
    required this.address,
    required this.password,
  });

  Map<String, dynamic> toJson() => {
    "firstName": firstName,
    "lastName": lastName,
    "dateOfBirth": dateOfBirth,
    "email": email,
    "phone": phone,
    "address": address,
    "password": password,
  };
}
