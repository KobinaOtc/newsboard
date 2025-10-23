import { loadTemplate, renderWithTemplate } from './utils.js';
import { views } from './views.js'
import { initializeForms } from './formHandler.js';
import { initializeNewsPage, renderForexChart } from './renderAPIElements.js';

const routes = {
    '/': {
        title: 'Home',
        templatePath: views.home,
        callback: () => {
            initializeNewsPage();
            renderForexChart();
            initializeForms();
        }
    },
    '/about': {
        title: 'About',
        templatePath: views.about,
        callback: initializeNewsPage
    },
    '/news': {
        title: 'News',
        templatePath: views.news,
        callback: () => {
            initializeNewsPage();
        }
    },
}

async function handleRouting() {
    const path = window.location.pathname;
    const currentRoute = routes[path] || routes['/'];

    document.title = currentRoute.title;

    const mainElement = document.getElementById('app-root');
    
    const pageContent = await loadTemplate(currentRoute.templatePath);
    renderWithTemplate(pageContent, mainElement, currentRoute.callback);
}

window.addEventListener('popstate', handleRouting);

document.addEventListener('click', e => {
    if (e.target.matches('[data-nav]')) {
        e.preventDefault();
        history.pushState({}, '', e.target.href);
        handleRouting();
    }
})

handleRouting();