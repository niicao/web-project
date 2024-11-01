// Load header
fetch('../html/header.html')
    .then(response => response.text())
    .then(html => {
        document.querySelector('header').innerHTML = html;
    });