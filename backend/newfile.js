const bcrypt = require("bcryptjs");

const hashPassword = async () => {
  const plainPassword = "Maktum12345#"; // Change this to your preferred password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log("Hashed Password:", hashedPassword);
};

hashPassword();
