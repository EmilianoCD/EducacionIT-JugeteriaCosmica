import productController from './controllers/product.js';

const validateFns = {
    _inputProduct: validateInputProduct,
    _inputPrice: validateInputPrice,
    _inputStock: validateInputStock,
    _inputBrand: validateInputBrand,
    _inputCategory: validateInputCategory,
    _inputShortD: validateInputShortD,
    _inputLongD: validateInputLongD,

    _inputAgeFrom: validateInputAgeFrom,
    _inputAgeTo: validateInputAgeTo,

    _inputPhoto: validateInputPhoto,
}


export default class Alta {
    static async init() {
        Alta.state = 'post';
        Alta._registrationForm = document.getElementsByClassName('registration-form')[0];
        Alta.fields = Alta._registrationForm.querySelectorAll('[name]');
        Alta.btnCreate = document.querySelector('[data-create]');
        Alta.btnUpdate = document.querySelector('[data-update]');
        Alta.btnCancel = document.querySelector('[data-reset]');
        Alta.valid = true;
        // console.log('Alta.inputs: Antes de la carga', Alta.inputs)
        Alta.inputs = {
            _inputProduct : document.getElementsByClassName('registration-form__name__input')[0],
            _inputPrice : document.getElementsByClassName('registration-form__price__input')[0],
            _inputStock : document.getElementsByClassName('registration-form__stock__input')[0],
            _inputBrand : document.getElementsByClassName('registration-form__brand__input')[0],
            _inputCategory : document.getElementsByClassName('registration-form__category__input')[0],
            _inputShortD : document.getElementsByClassName('registration-form__shDescription__input')[0],
            _inputLongD : document.getElementsByClassName('registration-form__lgDescription__input')[0],
            _inputFreeShipping : document.getElementsByClassName('registration-form__freeShipping__input')[0],
            _inputAgeFrom : document.getElementsByClassName('registration-form__ageFrom__input')[0],
            _inputAgeTo : document.getElementsByClassName('registration-form__ageTo__input')[0],
            _inputPhoto : document.getElementsByClassName('registration-form__photo__input')[0],
        }
        
        Alta._errorDetailGroup = document.querySelectorAll('.error-detail');
        Alta.inputs._inputPhoto.setAttribute("accept", "image/*");

        let i = 0;
        for (const currentInputName in Alta.inputs) {
            const input = Alta.inputs[currentInputName]
            if (input.type == 'checkbox') {
                continue;
            }
            const errorDetail = Alta._errorDetailGroup[i]
            input.setCustomMessage = message => {
                errorDetail.classList.toggle('error', message);
                errorDetail.innerHTML = message;
            }
            const validateFn = validateFns[currentInputName]
            input.addEventListener('blur', e => {
                console.log(input);
                validateFn(input.value);
                
            });
            i++;
        }

        Alta._registrationForm.addEventListener('submit', async e => {
            e.preventDefault();
            Alta.valid = true;
            for (const key in validateFns) {
                const validateFn = validateFns[key];
                validateFn(Alta.inputs[key].value)
                console.log(key, Alta.valid)
            }
            if (!Alta.valid) {
                return 
            }

            let data = new FormData(Alta._registrationForm);
            printDataInfo(data);
            if (Alta.state === 'post') {
                const response = await sendFormData('/api/products/', data);
                console.log('Respuesta: ', response);
            } else {
                const id = Alta.id;
                const response = await sendFormData('/api/products/'+id, data);
                console.log('Respuesta: ', response);
                
            }
            
            Alta.emptyForm();
            Alta.prepareFormForCreating();
            Alta.loadTable();
        });
        
        Alta.btnCancel.addEventListener('click', e => {
            console.error('btn-cancel');

            Alta.emptyForm();
            Alta.prepareFormForCreating();
        });

        await Alta.prepareTable()
    }
    
    static async deleteProduct(e) {
        if (!confirm('¿Estás seguro de querer eliminar el producto?')) {
            return false;
        }
        const id = e.target.dataset.delete;
        const deletedProduct = await productController.deleteProduct(id);
        Alta.loadTable();
        return deletedProduct;
    }
    
    static async prepareTable() {
        Alta.productsTableContainer = document.querySelector('.products-table-container');
        await Alta.loadTable();
        Alta.addTableEvents();
    }
    
    static prepareFormForCreating() {
        Alta.state = 'post';
        Alta._registrationForm.querySelector('[name=productImage]').required = true;
        Alta.btnCreate.disabled = false;
        Alta.btnUpdate.disabled = true;
        Alta.btnCancel.disabled = true;
    }

    static async loadTable() {
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos.`);
        Alta.renderTemplateTable(products);
    }

    static async renderTemplateTable(products) {
        const hbsFile = await fetch('templates/products-table.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        Alta.productsTableContainer.innerHTML = html;
    }


    static async addTableEvents() {
        Alta.productsTableContainer.addEventListener('click', async e => {
            if (e.target.classList.contains('btn-delete')) {
                const deletedProduct = await Alta.deleteProduct(e);
                console.log('deletedProduct:', deletedProduct);
                if (Alta.objectIsEmpty(deletedProduct)) {
                    console.error('No se pudo eliminar el producto');
                }

                return;
            }
            if (e.target.classList.contains('btn-edit')) {
                Alta.prepareFormForEditing();
                Alta.completeForm(e);
                return;
            }
        });
    
        
    }

    static objectIsEmpty(object) {
        return Object.entries(object).length === 0;
    }

    static prepareFormForEditing() {
        Alta.state = 'put';
        Alta._registrationForm.querySelector('[name]:not([name="id"])').focus();
        Alta._registrationForm.querySelector('[name=productImage]').required = false;
        Alta.btnCreate.disabled = true;
        Alta.btnUpdate.disabled = false;
        Alta.btnCancel.disabled = false;
    }
    
    static async completeForm(e) {
        const id = e.target.dataset.update;
        const productToEdit = await productController.getProduct(id);
        Alta.id = id;
        Alta.fields.forEach(field => {
            if (field.type == 'checkbox') {
                field.checked = productToEdit[field.name];
            } else if (field.type !== 'file') {
                field.value = productToEdit[field.name];
            } 
        });

    }

    static emptyForm() {
        Alta.fields.forEach(field => field.value = '');
    }

}


async function sendFormData(url, data) {
    try {
        return await fetch(url, {
            method: 'post',
            body: data,
            // headers: { 'content-type': 'application/json' }
        }).then(r => r.json());
    } catch (error) {
        console.error('ERROR POST', error);
    }
}


const styleArg1 = 'color: teal; font-weight: bold; font-size: 1.1em;';
const styleArg2 = 'color: pink; background-color: #111; padding: 3px;';

function printDataInfo (data) {
    //console.log(data)

    let keys = data.keys();
    let values = data.values();
    // console.log(keys);
    // console.log(values);
    
    //    let key = keys.next();
    //    let value = values.next();
    //
    //    key = keys.next();
    //    value = values.next();
    //    // console.log('key:', key);
    //    // console.log('value:', value);
    //    console.log(`${key.value}: ${value.value}`);
    //    
    //    key = keys.next();
    //    value = values.next();
    //    // console.log('key:', key);
    //    // console.log('value:', value);
    //    console.log(`${key.value}: ${value.value}`);


    do {
        let key = keys.next();
        let value = values.next();
        // console.log('key:', key);
        // console.log('value:', value);

        if (key.done || value.done) {
            // console.error('No hay más contenido');
            break;
        }

        // console.log(`${key.value}: ${value.value}`);
        console.log(`%c${key.value}: %c${value.value}`, styleArg1, styleArg2);
    } while (true);

}


function validateInputProduct (value) {
    value = value.trim();
    let valueLength = value.length;
    let maxLength = 30;
    let message = '';

    if (valueLength === 0) {
    message = `FALTA NOMBRE DEL PRODUCRO☝️`;
    Alta.valid = false;
} else if (valueLength > maxLength ) {
    message = `El nombre del producto no debe superar los ${maxLength} caracteres incluyendo espacios`;
    Alta.valid = false;
} else {
    const regExpText = `^[a-zA-Z0-9ÁÉÍÓÚáéíóúñÑ\.\,\'\"\ \/\-]{${1},${maxLength}}$`;
    let textValidator = new RegExp(regExpText); 
    if (!textValidator.test(value)) {
        message = `¡Caracteres inválidos! ✋ 
        Los caracteres permitidos para el nombre del producto son: letras del alfabeto español con y sin tildes; números; puntos; comas; comillas dobles y simples; espacio; barra; guiún bajo y medio.
        `;
        Alta.valid = false;
    }
    
    }
    Alta.inputs._inputProduct.setCustomMessage(message);

    if (message) {
        return null;           
    }

    return encodeURIComponent(value);            

};


function validateInputPrice (value) {
    value = value.trim();
    let valueLength = value.length;
    let minLength = 0; 
    let message = '';
    if ((valueLength <= minLength) || (value <= 0)) {
        message = `NO SE PUEDEN DAR DE ALTA PRODUCTOS SIN PRECIO. EL PRECIO DEBE SER UN NUMERO MAYOR A 0`;
        Alta.valid = false;
    } else {
        const regExpText = `^^[1-9][0-9]+\.{1}([0-9][0-9])$|^[1-9][0-9]+$|^[1-9]$|^[0-9]{1}\.[0-9]{2}$$`;
        let textValidator = new RegExp(regExpText); 
        if (!textValidator.test(value)) {
            message = `UTILIZAR "." PARA SEPARAR DECIMALES. SOLO SE PERMITEN DOS DECIMALES O NINGUNO
            `;
            Alta.valid = false;
        }
        
    } 
    
    Alta.inputs._inputPrice.setCustomMessage(message);
    
    if (message) {
        return null;           
    }
    
    return encodeURIComponent(value);            
    
};

function validateInputStock (value){
    value = value.trim();
    let valueLength = value.length;
    let minLength = 0; 
    let message = '';
    if (valueLength === minLength) {
        message = `PARA DAR DE ALTA UN PRODUCTO SE REQUIERE UN STOCK INICIAL. PUEDE SER ${minLength}`;
        Alta.valid = false;
    } else {
        const regExpText = `^[0-9]+$`;
        let textValidator = new RegExp(regExpText); 
        if (!textValidator.test(value)) {
            message = `EL STOCK DEBE SER UN NÚMERO ENTERO ó ${minLength}`;
            Alta.valid = false;
        }
        
    } 
    
    Alta.inputs._inputStock.setCustomMessage(message);
    
    if (message) {
        return null;           
    }
    
    return encodeURIComponent(value);            
    
};

function validateInputBrand (value) {
    value = value.trim();
    let valueLength = value.length;
    let maxLength = 40;
    let message = '';
    
    if (valueLength === 0) {
        message = `FALTA INDICAR MARCA☝️`;
        Alta.valid = false;
    } else if (valueLength > maxLength ) {
        message = `El nombre del producto no debe superar los ${maxLength} caracteres incluyendo espacios`;
        Alta.valid = false;
    } else {
        const regExpText = `^[a-zA-Z0-9ÁÉÍÓÚáéíóúñÑ\.\,\'\"\ \/\-]{${1},${maxLength}}$`;
        let textValidator = new RegExp(regExpText); 
        if (!textValidator.test(value)) {
            message = `¡Caracteres inválidos! ✋ 
                Los caracteres permitidos para la marca del producto son: letras del alfabeto español con y sin tildes; números; puntos; comas; comillas dobles y simples; espacio; barra; guiún bajo y medio.
                `;
                Alta.valid = false;
            }
            
        }
        
        Alta.inputs._inputBrand.setCustomMessage(message);
        
        if (message) {
            return null;           
        }
        
        return encodeURIComponent(value);            
        
    };

function validateInputCategory (value) {
    value = value.trim();
    let valueLength = value.length;
    let maxLength = 50;
    let message = '';
    
    if (valueLength === 0) {
        message = `INDICáA QUÉ CATEGORÍA PERTENECE ESTE PRODUCTO ☝️`;
        Alta.valid = false;
    } else if (valueLength > maxLength ) {
        message = `La categoría del producto no debe superar los ${maxLength} caracteres incluyendo espacios`;
        Alta.valid = false;
    } else {
        const regExpText = `^[a-zA-Z0-9ÁÉÍÓÚáéíóúñÑ\.\,\'\"\ \/\-]{${1},${maxLength}}$`;
        let textValidator = new RegExp(regExpText); 
        if (!textValidator.test(value)) {
            message = `¡Caracteres inválidos! ✋ 
            Los caracteres permitidos para la categoría del producto son: letras del alfabeto español con y sin tildes; números; puntos; comas; comillas dobles y simples; espacio; barra; guión bajo y medio.
            `;
            Alta.valid = false;
        }
        
    }
    Alta.inputs._inputCategory.setCustomMessage(message);
    
    if (message) {
        return null;           
    }
    
    return encodeURIComponent(value);            
    
};
    
function validateInputShortD (value) {
    value = value.trim();
    let valueLength = value.length;
    let maxLength = 80;
    let message = '';
    
    if (valueLength === 0) {
        message = `FALTA LA DESCRIPCIÓN CORTA☝️`;
        Alta.valid = false;
    } else if (valueLength > maxLength ) {
        message = `la descripción corta no debe superar los ${maxLength} caracteres`;
        Alta.valid = false;
    }
    Alta.inputs._inputShortD.setCustomMessage(message);
    
    if (message) {
        return null;           
    }
    
    return encodeURIComponent(value);            
    
};

function validateInputLongD (value) {
    value = value.trim();
    let valueLength = value.length;
    let maxLength = 2000;
    let message = '';
    
    if (valueLength === 0) {
        message = `FALTA LA DESCRIPCIÓN LARGA☝️`;
        Alta.valid = false;
    } else if (valueLength > maxLength ) {
        message = `la descripción larga no debe superar los ${maxLength} caracteres`;
        Alta.valid = false;
    }
    Alta.inputs._inputLongD.setCustomMessage(message);
    
    if (message) {
        return null;           
    }
    
    return encodeURIComponent(value);            
    
};

function validateInputAgeFrom (value){
    const ageType = Alta._registrationForm.querySelector('[name=ageType]').value;
    console.warn(ageType)
    value = value.trim();
    let valueLength = value.length;
    let minLength = 1; 
    let message = '';
    if (valueLength < minLength) {
        message = `INDICAR EDAD INICIAL. (mínimo ${minLength})`;
        Alta.valid = false;
    } else {
        let regExpText
        if (ageType == 'years') {
            regExpText = `^[1-9]+$`;
        } else {
            regExpText = `^\\d{1}$|^[1]{1}\\d{1}$|^[2]{1}[0-4]{1}$`;
        } 
        let textValidator = new RegExp(regExpText); 
        if (!textValidator.test(value)) {
            message = `la edad en meses puede ser entre 0 y 24`;
            Alta.valid = false;
        }
    }
    
    Alta.inputs._inputAgeFrom.setCustomMessage(message);
    
    
    if (message) {
        return null;           
    }
    
    return encodeURIComponent(value);            
    
};

function validateInputAgeTo (value){
    const ageType = Alta._registrationForm.querySelector('[name=ageType]').value;
    console.warn(ageType)
    value = value.trim();
    let valueLength = value.length;
    let minLength = 1; 
    let message = '';
    if (valueLength < minLength) {
        message = `INDICAR EDAD MAXIMA.`;
        Alta.valid = false;
    } else {
        let regExpText
        if (ageType == 'years') {
            regExpText = `^[1-9]+$`;
        } else {
            regExpText = `^\\d{1}$|^[1]{1}\\d{1}$|^[2]{1}[0-4]{1}$`;
        }
        let textValidator = new RegExp(regExpText); 
        if (!textValidator.test(value)) {
            message = `LA EDAD EN MESES PUEDE SER HASTA 24`;
            Alta.valid = false;
        }
        
    } 

    Alta.inputs._inputAgeTo.setCustomMessage(message);


    if (message) {
        return null;           
    }

    return encodeURIComponent(value);            

};

function validateInputPhoto (value) {
    
    if (!Alta.inputs._inputPhoto.required) {
        return
    }

    value = value.trim();
    let valueLength = value.length;
    let message = '';
    
    if (valueLength === 0) {
        message = `DEBES CARGAR AL MENOS UNA IMAGEN DEL PRODUCTO☝️`;
        Alta.valid = false;
    }
    
    Alta.inputs._inputPhoto.setCustomMessage(message);
    
    if (message) {
        return null;           
    }
    
    return encodeURIComponent(value);            
    
};
