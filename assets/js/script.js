/* =========================================================
   PORTFÓLIO PROFISSIONAL | script.js (JavaScript puro, ES6+)
   ========================================================= */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menu hambúrguer ---------- */
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');

  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  // Se a tela crescer até o desktop com o menu aberto, fecha o painel.
  window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* ---------- Cabeçalho com fundo ao rolar ---------- */
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Efeito de digitação no hero ---------- */
  const typingEl = document.getElementById('typing');
  if (typingEl) {
    const words = (typingEl.dataset.words || '').split('|').filter(Boolean);
    if (reduceMotion || words.length === 0) {
      typingEl.textContent = words[0] || '';
    } else {
      let w = 0, i = 0, deleting = false;
      const tick = () => {
        const word = words[w];
        i += deleting ? -1 : 1;
        typingEl.textContent = word.slice(0, i);

        let delay = deleting ? 45 : 85;
        if (!deleting && i === word.length) { deleting = true; delay = 1600; }
        else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
        setTimeout(tick, delay);
      };
      tick();
    }
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, idx) => {
      el.style.transitionDelay = `${(idx % 4) * 70}ms`; // pequeno escalonamento
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Link ativo conforme a seção visível ---------- */
  const links = document.querySelectorAll('.nav__link');
  const sections = [...links].map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Ano atual no rodapé ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Formulário: abre o app de e-mail (sem back-end) ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const MEU_EMAIL = 'juniorbritok2020@gmail.com'; // e-mail que recebe as mensagens do formulário

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = form.nome, email = form.email, msg = form.mensagem;
      let valido = true;

      [nome, email, msg].forEach((f) => {
        const ok = f.value.trim() !== '' && f.checkValidity();
        f.classList.toggle('is-invalid', !ok);
        if (!ok) valido = false;
      });

      status.classList.toggle('is-error', !valido);
      if (!valido) { status.textContent = 'Preencha todos os campos corretamente.'; return; }

      const assunto = encodeURIComponent(`Contato pelo portfólio: ${nome.value.trim()}`);
      const corpo = encodeURIComponent(`${msg.value.trim()}\n\nDe: ${nome.value.trim()} (${email.value.trim()})`);
      window.location.href = `mailto:${MEU_EMAIL}?subject=${assunto}&body=${corpo}`;

      status.textContent = 'Abrindo seu aplicativo de e-mail…';
      form.reset();
    });
  }
})();
