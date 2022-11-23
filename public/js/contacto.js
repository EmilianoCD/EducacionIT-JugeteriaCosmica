const validateFns = {
    _contactName: validateInputContactName,
    _email: validateInputEmail,
    _comments: validateInputComments,
}

export default class Contacto {
    static init() {
        Contacto._contactForm = document.getElementsByClassName('contact-form')[0];

        Contacto.inputs = {
            _contactName : document.getElementsByClassName('contact-form__name')[0],
            _email : document.getElementsByClassName("contact-form__e-mail")[0],
            _comments : document.getElementsByClassName("form__input__comments")[0],
        }
        
        Contacto._errorDetailGroup = document.querySelectorAll('.error-detail');

        let i = 0;
        for (const currentInputName in Contacto.inputs) {
            const input = Contacto.inputs[currentInputName]
            const errorDetail = Contacto._errorDetailGroup[i]
            input.setCustomMessage = message => {
                errorDetail.classList.toggle('error', message);
                errorDetail.innerHTML = message;
            }
            const validateFn = validateFns[currentInputName]
            console.warn(input)
            input.addEventListener('blur', e => {
                validateFn(input.value)
            })
            i++;
        }

        Contacto._contactForm.addEventListener('submit', e => {
            e.preventDefault();
            for (const key in validateFns) {
                const validateFn = validateFns[key];
                validateFn(Contacto.inputs[key].value)
            }
        });
    }
};

function validateInputContactName (value) {
    value = value.trim();
    let valueLength = value.length;
    let minLength = 3;
    let maxLength = 30;
    let message = '';
    
    if (valueLength === 0) {
        message = `Si vas a contactarnos, por favor, dejanos tu nombre`;
        
    } else if ( valueLength < minLength ) {
        message = `En este campo debes scribir al menos ${minLength} caracteres.`;
    } else if (valueLength > maxLength) {
        message = `El campo de Nombre puede contener ${maxLength} caracteres, incluyendo espacios, como máximo.`;
    } else {
        let restOfStringminLength = minLength-1;
        let restOfStringmaxLength = maxLength-1;
        const regExpText = `^[a-zA-ZÀÁÂÃÇÉÊÍÓÔÕÚàáâãçéêíóôõúñÑ\ ]{${restOfStringminLength},${restOfStringmaxLength}}$`;
        let textValidator = new RegExp(regExpText); 
        if (!textValidator.test(value)) {
            message = `El nombre debe contener entre ${minLength} y ${maxLength} caracteres únicamente alfabéticos.`
            }
            
        }
        
        Contacto.inputs._contactName.setCustomMessage(message);
        
        
        if (message) {
        return null;           
    }
    
    return encodeURIComponent(value);            
    
};

function validateInputEmail (value) {
    value = value.trim();
    let valueLength = value.length;
    let minLength = 3;
    let maxLength = 30;
    let message = '';
    
    if (valueLength === 0) {
        message = 'necesitamos una dirección de correo electrónico a la cual contactarte';
    } else if (valueLength < minLength) {
        message = `Este e-mail es demasiado corto! Tiene menos de ${minLength+1} caracteres.😕`;
    } else if (valueLength > maxLength) {
        message = `Este e-mail es demasiado largo! Tiene más de ${maxLength} caracteres.😕`;
    } else {
        const regExpText = `^[[a-zA-Z0-9._-]+@{1}[a-zA-Z0-9._-]+\.{1}[a-zA-Z]{${minLength},${maxLength}}$`;
        let textValidator = new RegExp(regExpText); 
        if (!textValidator.test(value)) {
            message = `Ok, este e-mail está bien en su extensión, pero tiene caracteres inválidos como '()', ''', '"', '<', '/', etc. Recuerda que una direción de correo electrónico solo puede tener letras, números, guiones y '@'. Y no debe contener espacios 😬 `
        }
        
    }
    
    Contacto.inputs._email.setCustomMessage(message);
    
    if (message) {
        return null;           
    }
    
    return encodeURIComponent(value);            
    
};

function validateInputComments (value) {
    value = value.trim();
    let valueLength = value.length;
    let maxLength = 400;
    let message = '';
    
    if (valueLength === 0) {
        message = null;
    } else if (valueLength > maxLength) {
        message = `Ten compasión! 🥺 Recibimos muchas consultas a dierio. Resume la tuya en hasta  ${maxLength} caracteres, por favor. 🙏`;
    
    }
        
    Contacto.inputs._comments.setCustomMessage(message);
    
    if (message) {
        return null;           
    }
    
    return encodeURIComponent(value);            
    
};