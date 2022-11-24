import productController from "../controllers/product.js";

const body = document.querySelector("body");

export default class BuyCart {
    static init() {
        BuyCart.products = {};
        BuyCart.checkbox = document.querySelector(".cart-button-toggle");
        BuyCart.modal = document.querySelector(".modal-container--cart");
        BuyCart.container = document.querySelector(".buy-cart");
        BuyCart.productsContainer = BuyCart.container.querySelector(
            ".buy-cart__products-container"
        );
        BuyCart.buyBtn = document.querySelector(".buy-cart__confirm");
        console.log(BuyCart.buyBtn)
        BuyCart.modal.addEventListener("click", async (e) => {
            if (e.target.classList.contains("modal-container--cart")|| e.target.classList.contains('buy-cart__exit')) {
                BuyCart.checkbox.checked = false;
                body.classList.toggle("modal-opened");
                return;
            }
            
            if (e.target.dataset.plus) {
                console.log("plus");
                const id = e.target.dataset.plus;
                BuyCart.addQuantityToProduct(id, 1);
                return;
            }
            if (e.target.dataset.minus) {
                console.log("minus");
                const id = e.target.dataset.minus;
                BuyCart.addQuantityToProduct(id, -1);
                return;
            }
            if (e.target.dataset.delete) {
                console.log("delete");
                const id = e.target.dataset.delete;
                BuyCart.removeProduct(id);
                return;
            }
            console.log(BuyCart.products);
        });
        BuyCart.checkbox.addEventListener("change", (e) => {
            body.classList.toggle("modal-opened");
        });
        
        document.addEventListener('keydown', e => {
            if (e.key == 'Escape' ) {
                BuyCart.checkbox.checked = false;
                body.classList.toggle("modal-opened");
        }
    });
    
    }

    static async addProduct(id, quantity = 1) {
        if (BuyCart.products[id]) {
            BuyCart.addQuantityToProduct(id, quantity);
            return;
        }
        const product = await productController.getProduct(id);
        product.quantity = quantity;
        BuyCart.products[id] = product;
        await BuyCart.appendNewProduct(product);
    }

    static async addQuantityToProduct(id, quantity) {
        const product = BuyCart.products[id];
        product.quantity += quantity;
        BuyCart.updateCart();
    }

    static async updateCart() {
        const productsHTML =
            BuyCart.container.querySelectorAll(".buy-cart__product");
        console.log(productsHTML);
        let total = 0;
        productsHTML.forEach((productHTML) => {
            const subtotal = BuyCart.updateProduct(productHTML);
            total += subtotal;
        });
        BuyCart.container.querySelector("[data-total]").innerHTML = total;
        BuyCart.buyBtn.disabled = total == 0;
    }

    static updateProduct(productHTML) {
        const id = productHTML.dataset.id;
        const product = BuyCart.products[id];
        if (!product) {
            console.log("Algo malo pasó acá");
            return;
        }
        const subtotal = product.quantity * product.price;
        productHTML.querySelector("[data-quantity]").innerHTML =
            product.quantity;
        productHTML.querySelector("[data-subtotal").innerHTML = subtotal;
        const minus = productHTML.querySelector("[data-minus]");
        minus.disabled = product.quantity == 0;
        return subtotal;
    }

    static async appendNewProduct(product) {
        const textToCompile = await fetch(
            "/templates/buy-cart__product.hbs"
        ).then((response) => response.text());
        const template = Handlebars.compile(textToCompile);
        const resultText = template({ ...product });
        const div = document.createElement("div");
        BuyCart.productsContainer.append(div);
        div.outerHTML = resultText;
        BuyCart.buyBtn.disabled = false;
        BuyCart.updateCart();
    }

    static removeProduct(id) {
        const productHTML = BuyCart.productsContainer.querySelector(
            `[data-id="${id}"]`
        );
        productHTML.remove();
        delete BuyCart.products[id];
        BuyCart.updateCart();
    }
    
}
