import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';

const router = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes are working' });
});

router.post('/google', async (req, res) => {
  console.log('Received Google auth request:', req.body);
  try {
    const { token } = req.body;
    console.log('Verifying token with Google...');
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
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { googleId }
        ]
      }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          googleId,
          name: name || undefined
        }
      });
    } else if (!user.googleId) {
      // Update existing user with Google ID
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId }
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

export default router; 