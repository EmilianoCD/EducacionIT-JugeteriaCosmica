import { upload } from '../middlewares/multer.js';
import express from 'express';
// const {getProducts, getProduct, postProduct, putProduct, deleteProduct} = require('../controllers/products');
import controller from '../controllers/products.js';


const router = express.Router();

////////////////////////////////////////////////////////////////////////////////
//                                 GET Routes                                 //
////////////////////////////////////////////////////////////////////////////////

// router.get('/', getProducts);
router.get('/', controller.getProducts);

router.get('/:id', controller.getProduct);


///////////////////////////////////////////////////////////////////////////////
//                                POST Routes                                //
///////////////////////////////////////////////////////////////////////////////

router.post('/', upload.single('productImage'), controller.postProduct);


//////////////////////////////////////////////////////////////////////////////
//                                PUT Routes                                //
//////////////////////////////////////////////////////////////////////////////

router.put('/:id', controller.putProduct);
router.post('/:id', upload.single('productImage'), controller.putProduct);

///////////////////////////////////////////////////////////////////////////////
//                               DELETE Routes                               //
///////////////////////////////////////////////////////////////////////////////
router.delete('/:id', controller.deleteProduct);

// Método con CommonJS
// module.exports = router;

// Método con ES Modules
export default router;
