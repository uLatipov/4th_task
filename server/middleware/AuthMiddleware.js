import UserModel from "../model/UserModel.js";
import TokenService from "../services/TokenService.js";

async function AuthMiddleware(req, res, next) {
    try {
        const token = req.cookies.refreshToken;

        if (!token)
            return res.status(401).send({ message: "Unauthorized access" });

        const refreshTokenValidation = TokenService.verifyRefreshToken(token);
        const user = await UserModel.findById(refreshTokenValidation._id);

        if (!user)
            return res.status(401).send({ message: "Unauthorized access" });

        if (user.isBlocked) {
            return res
                .status(403)
                .send({ message: "Access denied. User is blocked." });
        }

        req.user = user;
        next();
    } catch (e) {
        return res.status(401).send({ message: "Unauthorized access" });
    }
}

export default AuthMiddleware;
