const express = require('express');
const router = express.Router();
// const router= require("express").Router();
const productosController = require('../controller/productosController.js');


router.get('/',productosController.list);

router.post('/create',productosController.stock);

router.get('/create',productosController.create);

router.get("/producto/:id", productosController.detail)

router.get('/productos/edit/:id', productosController.edit)
router.patch('/productos/edit/:id', productosController.update);

router.delete('/productos/delete/:id', productosController.destroy)



module.exports = router;