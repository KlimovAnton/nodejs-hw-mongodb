import { registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body);

    res.json({
        status: 201,
        meessage: "Successfully registered a user!",
        data: user,
    });
};