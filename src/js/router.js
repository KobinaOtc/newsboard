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

function highlightActiveLink(currentPath) {
    const navLinksContainer = document.getElementById('nav-links');
    if (!navLinksContainer) return;

    // The list of all links on desktop navigation
    const links = navLinksContainer.querySelectorAll('a[data-nav]'); 

    links.forEach(link => {
        const linkPath = link.getAttribute('data-nav');
        
        // Define the classes for active and inactive states
        const activeClasses = 'bg-gray-900 text-white dark:bg-gray-950/50';
        const inactiveClasses = 'text-gray-300 hover:bg-white/5 hover:text-white';

        // Check if the link's path matches the current path
        if (linkPath === currentPath) {
            link.classList.add(...activeClasses.split(' '));
            link.classList.remove(...inactiveClasses.split(' '));
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove(...activeClasses.split(' '));
            link.classList.add(...inactiveClasses.split(' '));
            link.removeAttribute('aria-current');
        }
    });
}

async function handleRouting() {
    const path = window.location.pathname;
    if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1); 
    }

    const currentRoute = routes[path] || routes['/'];

    document.title = currentRoute.title;

    const mainElement = document.getElementById('app-root');
    
    const pageContent = await loadTemplate(currentRoute.templatePath);
    renderWithTemplate(pageContent, mainElement, currentRoute.callback);

    highlightActiveLink(path);
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