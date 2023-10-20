import jwt from "jsonwebtoken";
// import TokenModel from "../model/TokenModel.js";

class TokenService {
    generateTokens(user) {
        const accessToken = jwt.sign(
            { ...user },
            process.env.ACCESS_KEY_SECRET,
            {
                expiresIn: "30m",
            }
        );
        const refreshToken = jwt.sign(
            { ...user },
            process.env.REFRESH_KEY_SECRET,
            {
                expiresIn: "15d",
            }
        );
        return { accessToken, refreshToken };
    }

    verifyAccessToken(token) {
        try {
            const verification = jwt.verify(
                token,
                process.env.ACCESS_KEY_SECRET
            );
            return verification;
        } catch (e) {
            return false;
        }
    }

    verifyRefreshToken(token) {
        try {
            const verification = jwt.verify(
                token,
                process.env.REFRESH_KEY_SECRET
            );
            return verification;
        } catch (e) {
            return false;
        }
    }
    decrypt(token) {
        return jwt.decode(token);
    }
}

export default new TokenService();
