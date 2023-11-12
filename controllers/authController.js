// register
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

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

            if (
                !validator.validateEmail(email) ||
                !validator.validatePhoneNumber(phone)
            ) {
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
};

// login

module.exports = controller;
