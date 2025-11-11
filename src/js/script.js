import JustValidate from 'just-validate';
import Swiper from 'swiper';
import {Navigation, Pagination, A11y} from 'swiper/modules';

const header = document.querySelector('[data-header]');
const burger = document.querySelector('[data-burger]');
const nav = document.querySelector('[data-nav]');

function setMenu(open) {
    nav.classList.toggle('is-open', open);
    burger.classList.toggle('is-active', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
}

if (burger && nav) {
    burger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (e) => {
        if (e.target.matches('.nav__link')) setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setMenu(false);
    });
}

const onScroll = () => header?.classList.toggle('header--scrolled', window.scrollY > 4);
onScroll();
window.addEventListener('scroll', onScroll, {passive: true});

document.querySelectorAll('.nav__link').forEach((a) => {
    const href = new URL(a.getAttribute('href'), location.origin).pathname;
    if (href === location.pathname) a.setAttribute('aria-current', 'page');
});

const formEl = document.querySelector('#contactForm');
if (formEl) {
    const v = new JustValidate('#contactForm', {
        errorFieldCssClass: 'is-error',
        successFieldCssClass: 'is-success',
        focusInvalidField: true,
        lockForm: true,
    });

    v.addField('#name', [
        {rule: 'required'},
        {rule: 'minLength', value: 1},
        {rule: 'maxLength', value: 50},
    ])
        .addField('#email', [
            {rule: 'required'},
            {rule: 'email'},
        ])
        .addField('#question', [
            {rule: 'required'},
            {rule: 'minLength', value: 10},
        ])
        .addField('#agree', [{rule: 'required'}])
        .onSuccess((e) => {
            e.preventDefault();
        });
}

const worksEl = document.querySelector('.works__slider');
if (worksEl) {
    new Swiper(worksEl, {
        modules: [Navigation, Pagination, A11y],
        rewind: true,
        a11y: { enabled: true },
        navigation: { nextEl: '.works__nav--next', prevEl: '.works__nav--prev' },
        pagination: { el: '.works__pagination', clickable: true },

        slidesPerView: 3,
        spaceBetween: 35,

        breakpoints: {
            1200: { slidesPerView: 3, spaceBetween: 5 },
            768:  { slidesPerView: 1, spaceBetween: 0 },
            360:  { slidesPerView: 1, spaceBetween: 0 }
        },

        watchOverflow: true
    });
}


const newsletter = document.querySelector('#newsletterForm');
if (newsletter) {
    const nv = new JustValidate('#newsletterForm', {
        errorFieldCssClass: 'is-error',
        successFieldCssClass: 'is-success',
        focusInvalidField: true,
        lockForm: true
    });
    nv.addField('#newsletterEmail', [
        {rule: 'required'},
        {rule: 'email'}
    ])
        .addField('#newsletterAgree', [
            {rule: 'required'}
        ])
        .onSuccess((e) => {
            e.preventDefault();
        });
}

