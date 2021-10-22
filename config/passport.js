const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;