import express from 'express';
import { createUser, getUserData, updateData, deleteData } from '../controller/user.js';


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
router.get('/get-user', getUserData);
router.put('/update-user/:id', updateData);
router.delete('/delete-user/:id', deleteData);

export default router;