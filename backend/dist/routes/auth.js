"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const router = (0, express_1.Router)();
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
router.post('/google', async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({ error: 'Invalid token' });
        }
        const { email, sub: googleId, name } = payload;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        // Find or create user
        let user = await index_1.prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { googleId }
                ]
            }
        });
        if (!user) {
            user = await index_1.prisma.user.create({
                data: {
                    email,
                    googleId,
                    name: name || undefined
                }
            });
        }
        else if (!user.googleId) {
            // Update existing user with Google ID
            user = await index_1.prisma.user.update({
                where: { id: user.id },
                data: { googleId }
            });
        }
        // Generate JWT token
        const jwtToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({
            token: jwtToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    }
    catch (error) {
        console.error('Google auth error:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
});
exports.default = router;
