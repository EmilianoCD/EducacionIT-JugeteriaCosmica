import productController from "./controllers/product.js";
import BuyCart from "./modules/BuyCart.js";


export default class Inicio {
    static async init() {
        const textToCompile = await fetch("/templates/products.hbs").then(
            (response) => response.text()
        );
        const template = Handlebars.compile(textToCompile);
        Inicio.productController = productController;
        const products = await Inicio.productController.getProducts();
        const resultText = template({products});
        const cardsContainer = document.querySelector(".cards-container");
        cardsContainer.innerHTML = resultText;
        cardsContainer.addEventListener('click', e => {
            if (e.target.dataset.id) {
                e.preventDefault();
                const id = e.target.dataset.id;
                BuyCart.addProduct(id, 1)
            }
        })
    }
}
