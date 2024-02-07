const router = require('express').Router();


router.get('/', (req, res) => {
    res.send('Bienvenidos a INMUEBLES SRL');
});

module.exports = router