// register
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/userModel");
const validator = require("../utils/validator");

const controller = {
    register: async (req, res) => {
        try {
            const { name, email, phone, password } = req.body;

            if (!name || !email || !phone || !password) {
                return res.json({
                    message: "all fields are required",
                });
            }

            if (!validator.Email(email) || !validator.PhoneNumber(phone)) {
                return res.json({
                    message: "phone or email is not valid",
                });
            }

            const existingUser = await UserModel.findOne({
                email,
                phone,
            });
            console.log(existingUser);

            if (existingUser) {
                return res.status(401).json({
                    success: false,
                    message: "user already exists, pls login",
                });
            }

            const hashPassword = await bcrypt.hash(password, 10);
            // console.log("hashPassword===========", hashPassword);

            const userObj = { name, email, phone, password: hashPassword };

            const user = await UserModel.create(userObj);
            return res.status(200).json({
                success: true,
                message: "user created successfully",
                user,
            });
        } catch (error) {
            console.log(error);
            res.status(401).json({
                success: false,
                message: "something went wrong",
            });
        }
    },

    login: async (req, res) => {
        try {
            const { phone, password } = req.body;

            if (!phone || !password) {
                return res.json({
                    message: "all fields are required",
                });
            }

            const user = await UserModel.findOne({ phone }).select("password");
            console.log(user);

            if (!user) {
                return res.status(401).json({
                    message: "user doesn't exists, pls signup",
                });
            }

            const matchPassword = await bcrypt.compare(password, user.password);

            if (!matchPassword) {
                return res.status(401).json({
                    message: "wrong password",
                });
            }

            const accessToken = await generateJWTToken(user, "access");
            const refreshToken = await generateJWTToken(user, "refresh");

            res.status(200).json({
                accessToken,
                refreshToken,
                message: "Login successfully",
            });
        } catch (error) {
            console.log(error);
            res.status(401).json({
                success: false,
                message: "something went wrong",
            });
        }
    },

    getUsers: async (req, res) => {
        try {
            const { phone } = req.body;

            const authUser = req.test;
            console.log("==authUser===", authUser);

            const user = await UserModel.findOne({ phone });
            res.status(200).json({
                message: "Login successfully",
                user,
            });
        } catch (error) {
            console.log(error);
            res.status(401).json({
                success: false,
                message: "something went wrong",
            });
        }
    },
};

function generateJWTToken(user, token_type) {
    let token;

    if (token_type === "access") {
        token = jwt.sign(process.env.ACCESS_TOKEN, {
            expiresIn: "30m",
        });
    } else {
        token = jwt.sign({ phone: user.phone }, process.env.REFRESH_TOKEN);
    }
    return token;
}

module.exports = controller;
