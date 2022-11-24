import BuyCart from "./modules/BuyCart.js";
const mainElement = document.querySelector('main');

class Main {

    async ajax(url, method = 'get') {
        return await fetch(url, { method: method }).then(r => r.text());
    }

    getIdFromHash() {
        let id = location.hash.slice(1);
        if (id[0] === '/') {
            id = id.slice(1);
        }
        return id || 'inicio';
    }

    getViewUrlFromId(id) {
        return `partials/${id}.html`;
    }

    getModuleUrlFromId(id) {
        return `/js/${id}.js`;
    }

    setActiveLink(id) {
        const links = document.querySelectorAll('.main-nav__link');
        links.forEach(link => {
            if (link.getAttribute('href') === `#/${id}`) {
                link.classList.add('main-nav__link__active');
                link.ariaCurrent = 'page';
            } else {
                link.classList.remove('main-nav__link__active');
                link.removeAttribute('aria-current');
            }
        });
    }

    async initJS(id) {
        console.log('id:', id)
        const moduleUrl = this.getModuleUrlFromId(id);
        console.log('moduleUrl: ',moduleUrl)
        try {
            const {default: module} = await import(moduleUrl);
            if (typeof module.init !== 'function') {
                console.error(`El módulo ${id} no posee un método init().`);
                return;
            }
            module.init();
        } catch (error) {
            console.error(`No se pudo importar el módulo ${moduleUrl}.`, error);
        }
    }

    async loadTemplate() {
        const id = this.getIdFromHash();

        const viewUrl = this.getViewUrlFromId(id);
        const viewContent = await this.ajax(viewUrl);
        mainElement.innerHTML = viewContent;

        this.setActiveLink(id);

        this.initJS(id);
    }

    async loadTemplates() {
        this.loadTemplate();
        window.addEventListener('hashchange', () => this.loadTemplate());
    }

    async start() {
        await this.loadTemplates();
    }
}

const main = new Main();
main.start();
BuyCart.init();