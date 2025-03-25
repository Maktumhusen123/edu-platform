const jwt = require("jsonwebtoken");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTE4ODFhYmY5N2Q5YmVjOWYzYWZhMyIsImlhdCI6MTc0MjgzNDI3NiwiZXhwIjoxNzQzNDM5MDc2fQ.MuBi_jyQXZpNed7xdCfKOGzAS_m8o_N8AOOKsQEvZ28"; // Your token
const decoded = jwt.decode(token);
console.log(decoded);
