/**
 * Renders the page from data/portfolio.js.
 * Nothing to edit here to change the text: use data/portfolio.js.
 */
(function () {
  const data = PORTFOLIO_DATA;
  const pad = (n) => String(n).padStart(2, '0');
  const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const $ = (id) => document.getElementById(id);

  // Tiny DOM helper: el('div', { class: 'x', 'data-color': 'blue' }, child, 'text', ...)
  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([key, value]) => {
      if (value === false || value == null) return;
      node.setAttribute(key, value === true ? '' : value);
    });
    children.flat().forEach((child) => {
      if (child == null || child === false) return;
      node.append(child.nodeType ? child : document.createTextNode(child));
    });
    return node;
  }

  // Colored words inside data text: "cut from {red:6 hours} to {green:minutes}"
  const COLORED = /\{(red|orange|yellow|green|blue|purple|cyan|pink):([^}]+)\}/g;
  function rich(text) {
    const nodes = [];
    let last = 0;
    let m;
    COLORED.lastIndex = 0;
    while ((m = COLORED.exec(text))) {
      if (m.index > last) nodes.push(text.slice(last, m.index));
      nodes.push(el('span', { class: 'hl', 'data-color': m[1] }, m[2]));
      last = COLORED.lastIndex;
    }
    if (last < text.length) nodes.push(text.slice(last));
    return nodes;
  }

  // ---------- profile ----------
  const p = data.profile;
  $('brand').textContent = p.name;
  $('headline').append(p.headline + ' ', el('span', { class: 'muted' }, p.headlineMuted));
  if (p.summary) $('hero-summary').append(...rich(p.summary));
  $('footer-name').textContent = p.name + ' — portfolio';
  $('footer-year').textContent = '© ' + new Date().getFullYear();

  function renderFacts(target, facts) {
    facts.forEach((f) => {
      target.append(
        el('div', { 'data-color': f.color },
          el('dt', {}, f.color ? el('span', { class: 'dot' }) : null, f.label),
          el('dd', {}, rich(f.value)),
          f.note ? el('dd', { class: 'note' }, rich(f.note)) : null
        )
      );
    });
  }
  renderFacts($('hero-facts'), p.facts);

  // ---------- top menu, in page order: work experience, the categories, about, contact ----------
  const nav = $('nav');
  const visibleCategories = data.categories.filter((cat) => data.projects.some((pr) => pr.category === cat.id));
  nav.append(el('a', { href: '#experience' }, 'work experience'));
  visibleCategories.forEach((cat) => {
    nav.append(el('a', { href: '#' + cat.id }, cat.label.toLowerCase()));
  });
  ['about', 'contact'].forEach((id) => nav.append(el('a', { href: '#' + id }, id)));

  // ---------- mobile menu (hamburger) ----------
  // On small screens the menu is a dropdown opened by the hamburger button.
  const menuButton = $('menu-toggle');
  const desktop = window.matchMedia('(min-width: 1041px)');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  menuButton.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !e.target.closest('.site-header')) setMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); menuButton.focus(); }
  });
  desktop.addEventListener('change', () => setMenu(false));

  // ---------- categories + projects ----------
  const categoriesRoot = $('categories');
  visibleCategories.forEach((cat) => {
    const projects = data.projects.filter((pr) => pr.category === cat.id);
    const section = el('section', { class: 'category', id: cat.id, 'data-color': cat.color },
      el('div', { class: 'category-head' },
        el('h3', {}, el('span', { class: 'dot' }), cat.label),
        el('span', { class: 'count' }, '(' + pad(projects.length) + ')'),
        cat.blurb ? el('span', { class: 'blurb' }, cat.blurb) : null
      )
    );
    const list = el('div', { class: 'project-list' });
    projects.forEach((pr, i) => list.append(renderProject(pr, i)));
    section.append(list);
    categoriesRoot.append(section);
  });

  function renderProject(pr, index) {
    const details = el('details', { class: 'project', id: slug(pr.title) });
    const summary = el('summary', {},
      el('span', { class: 'p-num' }, pad(index + 1)),
      el('span', { class: 'p-title' }, pr.title, pr.tagline ? el('small', {}, pr.tagline) : null),
      pr.meta ? el('span', { class: 'p-meta' }, pr.meta) : null,
      el('span', { class: 'p-icon', 'aria-hidden': 'true' })
    );

    const text = el('div', { class: 'p-text' },
      pr.description ? el('p', { class: 'p-desc' }, pr.description) : null,
      pr.highlights && pr.highlights.length
        ? el('ul', { class: 'p-highlights' }, pr.highlights.map((h, i) => el('li', { style: '--i:' + i }, h)))
        : null,
      pr.stack && pr.stack.length ? el('ul', { class: 'tags', 'aria-label': 'Stack' }, pr.stack.map((s) => el('li', { class: 'tag' }, s))) : null,
      pr.links && pr.links.length
        ? el('div', { class: 'links' }, pr.links.map((l) => el('a', { href: l.url, target: '_blank', rel: 'noopener' }, l.label, ' ↗')))
        : null
    );

    const inner = el('div', { class: 'project-inner' }, text);
    if (pr.images && pr.images.length) inner.append(renderMedia(pr.images));

    details.append(summary, el('div', { class: 'project-body' }, inner));
    summary.addEventListener('click', (e) => {
      e.preventDefault(); // we open/close it ourselves, with an animation
      toggle(details);
    });
    return details;
  }

  // One main image; with 2+ images a thumbnail strip switches between them.
  // Images use loading="lazy" and sit inside a closed <details>, so they only
  // download once a project is opened.
  function renderMedia(images) {
    const main = el('img', { src: images[0].src, alt: images[0].alt || '', loading: 'lazy', decoding: 'async' });
    const media = el('div', { class: 'p-media' }, el('figure', { class: 'shot' }, main));
    if (images.length > 1) {
      const thumbs = el('div', { class: 'thumbs' });
      images.forEach((img, i) => {
        const btn = el('button', { class: 'thumb', type: 'button', 'aria-label': 'Show image ' + (i + 1), 'aria-current': String(i === 0) },
          el('img', { src: img.src, alt: '', loading: 'lazy', decoding: 'async' }));
        btn.addEventListener('click', () => {
          main.src = img.src;
          main.alt = img.alt || '';
          thumbs.querySelectorAll('.thumb').forEach((t) => t.setAttribute('aria-current', String(t === btn)));
        });
        thumbs.append(btn);
      });
      media.append(thumbs);
    }
    return media;
  }

  // ---------- open / close animation ----------
  // The height of .project-body is animated; the text, bullets and photo then
  // rise in one after another (see css/style.css). Only one project is open at a time.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function animateBody(details, opening) {
    const body = details.querySelector('.project-body');
    if (details._anim) { details._anim.cancel(); details._anim = null; }
    details._closing = !opening;

    if (reduceMotion.matches) { details.open = opening; return; }

    if (opening) {
      details.open = true;
      const end = body.offsetHeight;
      const anim = body.animate(
        [{ height: '0px', opacity: 0 }, { height: end + 'px', opacity: 1 }],
        { duration: 450, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
      details._anim = anim;
      anim.onfinish = () => { details._anim = null; };
    } else {
      const start = body.offsetHeight;
      const anim = body.animate(
        [{ height: start + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
        { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' }
      );
      details._anim = anim;
      anim.onfinish = () => {
        details.open = false;
        anim.cancel();
        details._anim = null;
        details._closing = false;
      };
    }
  }

  function toggle(details) {
    const opening = !details.open || details._closing;
    if (!opening) { animateBody(details, false); return; }

    document.querySelectorAll('.project[open]').forEach((other) => {
      if (other !== details) animateBody(other, false);
    });
    animateBody(details, true);

    // If a project above closed and pushed this one out of view, bring it back.
    setTimeout(() => {
      // (the sticky header on small screens covers the top part of the page)
      const covered = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      if (details.getBoundingClientRect().top < covered) details.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 340);
  }

  // Open a project when the URL points to it, e.g. #rifa-no-pix (no animation).
  function openFromHash() {
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target && target.classList.contains('project')) {
      target.open = true;
      target.scrollIntoView({ block: 'start' });
    }
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  // ---------- experience ----------
  const expRoot = $('experience-list');
  data.experience.forEach((job) => {
    expRoot.append(
      el('article', { class: 'job' },
        el('div', { class: 'job-when' }, job.period),
        el('div', { class: 'job-body' },
          el('div', {},
            el('div', { class: 'job-company' }, job.company),
            el('h3', { class: 'job-role' }, job.role),
            job.path ? el('div', { class: 'job-path' }, job.path) : null
          ),
          job.summary ? el('p', { class: 'job-summary' }, rich(job.summary)) : null,
          el('ul', { class: 'job-bullets' },
            job.bullets.map((b) =>
              el('li', {},
                el('div', {},
                  el('span', {}, rich(b.text)),
                  b.tech && b.tech.length ? el('span', { class: 'b-tech' }, b.tech.join(' · ')) : null
                )
              )
            )
          ),
          job.technologies && job.technologies.length
            ? el('div', { class: 'job-tech' },
                el('div', { class: 'job-tech-label' }, 'key technologies and tools'),
                el('ul', { class: 'tags' }, job.technologies.map((t) => el('li', { class: 'tag' }, t))))
            : null
        )
      )
    );
  });

  // ---------- about ----------
  const about = data.about;
  $('about-text').append(...rich(about.text), ' ', el('span', { class: 'muted' }, about.textMuted));

  if (about.more) $('about-more').append(...rich(about.more));
  else $('about-more').hidden = true;

  const summaryList = $('about-summary');
  (about.summary || []).forEach((item) => {
    summaryList.append(
      el('li', {},
        el('div', {},
          el('span', {}, rich(item.text)),
          item.tech && item.tech.length ? el('span', { class: 'b-tech' }, item.tech.join(' · ')) : null
        )
      )
    );
  });
  if (!about.summary || !about.summary.length) summaryList.closest('.about-summary').hidden = true;

  renderFacts($('stack-facts'), data.stack || []);

  // ---------- contact ----------
  $('contact-heading').textContent = p.contactHeading;
  const mail = $('mail');
  mail.href = 'mailto:' + p.email;
  mail.textContent = p.email;

  // WhatsApp: wa.me wants the number as digits only, with the country code (55 = Brazil)
  if (p.phone) {
    const phone = $('phone');
    phone.href = 'https://wa.me/' + p.phone.replace(/\D/g, '');
    phone.textContent = p.phone;
    phone.setAttribute('aria-label', 'WhatsApp ' + p.phone + ' (opens in a new tab)');
    $('phone-item').hidden = false;
  }
  p.links.forEach((l) => $('contact-links').append(el('a', { href: l.url, target: '_blank', rel: 'noopener' }, l.label.toLowerCase(), ' ↗')));
})();
