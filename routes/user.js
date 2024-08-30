import express from 'express';
import { createUser, getUserData, updateData, deleteData, getById } from '../controller/user.js';
import { loginUser, logoutUser, registerUser } from '../controller/auth.js';
import { authentication } from '../middleware/middleware.js';


const router = express.Router();
// GET: Fetch all items
// router.get('/', async (req, res) => {
//     try {
//         const items = await createUser.find();
//         res.json(items);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


router.post('/create-user', createUser);
router.get('/get-user',authentication, getUserData);
router.put('/update-user/:id', updateData);
router.delete('/delete-user/:id', deleteData);
router.get('/getbyid/:id', getById);
router.post('/register/user', registerUser);
router.post('/login/user', loginUser)
router.post('/logout/user', logoutUser)
router.get('/protected', authentication)

export default router;