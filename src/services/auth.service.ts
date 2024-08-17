import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import randomizer from '../utils/randomizer';
import { user, auth } from "../models"
import userRepository from "../repository/user.repository"
import authRepository from '../repository/auth.repository';

export const authService = {
    login: async (raw: user.TLoginRequest) => {
        // Get user data on database by email
        // If user not exist, throw error
        const currentUser = await userRepository.findByEmail(raw.email);

        if (!currentUser) {
            throw new Error("Invalid Credential!");
        }

        // Compare request password to current password
        const isValidPassword = await bcrypt.compare(raw.password, currentUser.password as string);
        if (!isValidPassword) {
            throw new Error("Invalid Credential!");
        }

        // Generate payload for accessToken
        const payload = {
            name: currentUser.name,
        }

        const refreshPayload = {
            code: randomizer(16)
        }

        const token = jwt.sign(payload, process.env.APP_KEY as string, {
            algorithm: 'HS256',
            expiresIn: '30s',
            subject: currentUser.id,
        })

        const refreshToken = jwt.sign(refreshPayload, process.env.APP_REFRESH_KEY as string, {
            algorithm: "HS256",
            expiresIn: "1d",
            subject: currentUser.id
        })

        // Store refresh token to DB
        await auth.Auth.create({
            user: currentUser.id,
            refreshToken
        })

        return {
            token,
            refreshToken
        }
    },

    refresh: async (refreshToken: string) => {
        // Get refresh token from parameter
        // Check refresh token from database
        // Parse refresh token - check expiration
        // If stil valid, issue new token
        jwt.verify(refreshToken, process.env.APP_REFRESH_KEY as string);

        // Check from database
        const currentToken = await authRepository.checkRefreshToken(refreshToken);

        if (!currentToken) {
            throw new Error("Unauthorized, please re-login.");
        }

        const refreshTokenData = jwt.decode(refreshToken) as jwt.JwtPayload;

        const currentUser = await userRepository.findById(refreshTokenData.sub as string);

        if (!currentUser) {
            throw new Error("Cannot authenticate user.");
        }

        // Reassign access token
        const payload = {
            name: currentUser.name,
        }

        const token = jwt.sign(payload, process.env.APP_KEY as string, {
            algorithm: 'HS256',
            expiresIn: '30s',
            subject: currentUser.id,
        })

        return token;
    }
}