export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

export function renderWithTemplate(template, parentElement, callback) {
    parentElement.innerHTML = template;
    if (callback) {
        callback();
    }
}

export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate('/partials/header.html');
    const footerTemplate = await loadTemplate('/partials/footer.html');

    const headerElement = document.querySelector('#dynamic-header');
    const footerElement = document.querySelector('#dynamic-footer');

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}