const express = require('express');
const { userById, showListUser, detailUser, addUser, updateUser, removeUser } = require('../controllers/userController')
const router = express.Router();


router.get('/secret/:userId', (req, res) => {
    res.json({
        user: req.profile
    })
});
router.param('idUser', userById);
router.get('/listUser', showListUser);
router.get('/detailUser/:idUser', detailUser);
router.post('/addUser', addUser);
router.put('/updateUser/:idUser', updateUser);
router.delete('/deleteUser/:idUser', removeUser)

module.exports = router;