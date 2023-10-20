import bcrypt from "bcrypt";
import TokenService from "../services/TokenService.js";
import UserModel from "../model/UserModel.js";

export class ObjUsr {
    constructor({ email, _id, fullName }) {
        this.email = email;
        this._id = _id;
        this.fullName = fullName;
    }
}

const deleteUser = async (e) => {
    const user = await UserModel.findById(e._id);
    if (user) {
        await UserModel.findByIdAndDelete(e._id);
    } else {
        throw new Error("User you are going to delete does not exist!");
    }
};

class UserController {
    async registration(req, res) {
        try {
            const { fullName, email, password, position } = req.body;
            const exists = await UserModel.findOne({ email });

            if (exists)
                return res.status(409).json({
                    message: "User already exists",
                });

            const salt = await bcrypt.genSalt(10);
            console.log(password);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await UserModel.create({
                fullName: fullName,
                email: email,
                password: hashedPassword,
                position: position,
            });

            const { accessToken, refreshToken } = TokenService.generateTokens({
                ...new ObjUsr(user),
            });

            res.cookie("refreshToken", refreshToken, {
                expires: new Date(Date.now() + 15 * 86400 * 1000),
                httpOnly: true,
            });
            res.cookie("accessToken", accessToken, {
                expires: new Date(Date.now() + 1800 * 1000),
                httpOnly: true,
            });

            return res.status(201).json({ access: true, user });
        } catch (e) {
            return res.status(403).send({ message: e.message });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });

            if (!user)
                return res.status(404).send({ message: "User not found" });
            if (user.isBlocked)
                return res
                    .status(403)
                    .send({ message: "User is blocked on the server" });
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword)
                return res.status(401).send({ message: "Invalid password" });

            const { refreshToken, accessToken } = TokenService.generateTokens({
                ...new ObjUsr(user),
            });
            res.cookie("accessToken", accessToken, {
                expires: new Date(Date.now() + 1800 * 1000),
                httpOnly: true,
            });
            res.cookie("refreshToken", refreshToken, {
                expires: new Date(Date.now() + 15 * 86400 * 1000),
                httpOnly: true,
            });

            res.status(200).json({
                access: true,
                user,
            });
        } catch (e) {
            console.log(e);
        }
    }
    logout(req, res) {
        try {
            res.clearCookie("refreshToken");
            res.clearCookie("accessToken");
            res.status(200).json({ message: "Logged out" });
        } catch (e) {
            console.log(e);
        }
    }
    async refresh(req, res) {
        try {
            const token = req.cookies.refreshToken;
            const refreshTokenValidation =
                TokenService.verifyRefreshToken(token);
            const user = await UserModel.findById(refreshTokenValidation._id);
            if (!user)
                return res.status(401).send({ message: "User not found" });
            const { refreshToken, accessToken } = TokenService.generateTokens({
                ...new ObjUsr(user),
            });

            res.cookie("refreshToken", refreshToken, {
                expires: new Date(Date.now() + 15 * 86400 * 1000),
                httpOnly: true,
            });
            res.cookie("accessToken", accessToken, {
                expires: new Date(Date.now() + 1800 * 1000),
                httpOnly: true,
            });
            return res.status(200).json({ access: true, user });
        } catch (e) {
            console.log(e);
        }
    }
    async users(req, res) {
        try {
            const users = await UserModel.find();

            return res.status(200).json({
                users,
            });
        } catch (error) {}
    }
    async delete(req, res) {
        const users = req.body.users;
        if (!users)
            res.status(400).send({
                message: "Unexpected error, try loggin in again",
            });
        users.forEach(async (element) => {
            if (element.checked) {
                try {
                    const exists = await UserModel.findById(element._id);
                    if (!exists)
                        throw new Error(
                            "User you are going to delete does not exist!"
                        );
                    await UserModel.findByIdAndDelete(element._id);
                    const newUsersList = await UserModel.find();
                    return res.status(200).json({
                        users: newUsersList,
                    });
                } catch (e) {
                    return res.status(401).send({ message: e.message });
                }
            }
        });
    }
    async block(req, res) {
        const users = req.body;
        let self = false;
        const user = req.user;

        try {
            users.forEach(async (e) => {
                if (e.checked == true) {
                    if (e._id == user._id) self = true;
                    await UserModel.findByIdAndUpdate(e._id, {
                        isBlocked: true,
                    });
                }
            });

            if (self) {
                res.clearCookie("refreshToken");
                res.clearCookie("accessToken");
                return res.status(200).json({
                    message: "Users state toggled successfully",
                });
            }

            const newUsers = await UserModel.find();

            return res.status(200).json({
                users: newUsers,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async unblock(req, res) {
        const users = req.body;

        try {
            users.forEach(async (e) => {
                if (e.checked == true) {
                    await UserModel.findByIdAndUpdate(
                        e._id,
                        { isBlocked: false } // Incorrect syntax
                    );
                }
            });
            const newUsers = await UserModel.find();

            return res.status(200).json({
                users: newUsers,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new UserController();
