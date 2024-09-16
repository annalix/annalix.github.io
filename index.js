window.addEventListener('load', addMargin);
window.addEventListener('resize', addMargin);

function addMargin() {
    const headerHeight = document.getElementsByTagName('header')[0].offsetHeight;
    const aboutSection = document.getElementsByTagName('main')[0];
    aboutSection.style.marginTop = (headerHeight + 20) + 'px';
}