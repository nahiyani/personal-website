(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  // Company logos: if an image file is missing, show initials instead
  $$('.logo').forEach(box => {
    const img = $('img', box);
    const fallback = () => { img.remove(); box.textContent = box.dataset.fallback; box.classList.add('ph'); };
    img.addEventListener('error', fallback);
    if (img.complete && img.naturalWidth === 0) fallback();
  });

  // Reveal on enter
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal').forEach(el => reduce ? el.classList.add('in') : io.observe(el));

  // Split the name into letters for the entrance animation
  $$('.ln').forEach((ln, li) => {
    const t = ln.textContent;
    ln.innerHTML = [...t].map((ch, i) => '<span class="ch" aria-hidden="true" style="--d:' + (i * 55 + li * 260) + '">' + ch + '</span>').join('');
  });
  if (!reduce) $('.hero h1').classList.add('anim');

  // Type and erase adjectives in the hero
  const typeWord = $('#typeWord');
  const typeWords = ['software developer', 'full-stack developer', 'backend developer', 'web developer', 'DevOps engineer'];
  if (typeWord) {
    if (reduce) {
      typeWord.textContent = 'software developer';
      const caret = $('.caret');
      if (caret) caret.remove();
    } else {
      let i = 0, n = 0, deleting = false;
      const step = () => {
        const word = typeWords[i];
        if (!deleting) {
          n++;
          typeWord.textContent = word.slice(0, n);
          if (n === word.length) { deleting = true; setTimeout(step, 1300); return; }
          setTimeout(step, 85);
        } else {
          n--;
          typeWord.textContent = word.slice(0, n);
          if (n === 0) { deleting = false; i = (i + 1) % typeWords.length; setTimeout(step, 280); return; }
          setTimeout(step, 42);
        }
      };
      step();
    }
  }

  // Social and email icons
  const svg = (a, body) => '<svg viewBox="0 0 24 24" aria-hidden="true" ' + a + '>' + body + '</svg>';
  const FILL = 'fill="currentColor"', LINE = 'fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
  const ig = (id) => svg('fill="none" stroke="url(#' + id + ')" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"', '<defs><linearGradient id="' + id + '" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#f9ce34"/><stop offset="50%" stop-color="#ee2a7b"/><stop offset="100%" stop-color="#6228d7"/></linearGradient></defs><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="url(#' + id + ')" stroke="none"/>');
  $$('[data-socials]').forEach((box, bi) => {
    const SOCIALS = [
      ['LinkedIn', 's-linkedin', 'https://linkedin.com/in/nahiyan-ishtiaque', svg(FILL, '<path class="li-badge" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/><path class="li-in" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452z"/>')],
      ['GitHub', 's-github', 'https://github.com/nahiyani', svg(FILL, '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.694.825.576C20.565 21.795 24 17.298 24 12.297c0-6.627-5.373-12-12-12"/>')],
      ['Instagram', 's-instagram', 'https://instagram.com/nahiyan_.i', ig('igGrad' + bi)],
      ['Email', 's-email', 'mailto:nahiyan.ishtiaque@gmail.com', svg(LINE, '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6.2L20.5 7"/>')]
    ];
    box.innerHTML = SOCIALS.map(([n, cls, href, icon]) => '<a class="' + cls + '" href="' + href + '" aria-label="' + n + '" title="' + n + '"' + (href.startsWith('http') ? ' target="_blank" rel="noopener"' : '') + '>' + icon + '</a>').join('');
  });

  const githubIcon = svg(FILL, '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.694.825.576C20.565 21.795 24 17.298 24 12.297c0-6.627-5.373-12-12-12"/>');
  $$('a.link').forEach(a => {
    a.classList.add('gh');
    a.setAttribute('aria-label', 'View on GitHub');
    a.title = 'View on GitHub';
    a.innerHTML = githubIcon + '<span>View on GitHub</span>';
  });

  // GitHub language breakdown, fetched live from the GitHub API
  const LC = {TypeScript:'#3178c6',Dart:'#00b4ab',Python:'#3572a5',JavaScript:'#f1e05a',HTML:'#e34c26',CSS:'#563d7c',Java:'#b07219',Kotlin:'#a97bff',Swift:'#f05138','C++':'#f34b7d',C:'#aaaaaa',Shell:'#89e051',Go:'#00add8',Ruby:'#701516','Objective-C':'#438eff',CMake:'#da3434'};
  $$('.langs').forEach(async box => {
    let data = null;
    try {
      const r = await fetch('https://api.github.com/repos/' + box.dataset.repo + '/languages');
      if (r.ok) data = await r.json();
    } catch (e) {}
    const title = '<p class="langs-title">Languages on GitHub</p>';
    const dot = n => LC[n] || '#8b8b8b';
    if (data && Object.keys(data).length) {
      const total = Object.values(data).reduce((a, b) => a + b, 0);
      const rows = Object.entries(data).sort((a, b) => b[1] - a[1]).map(([n, v]) => [n, v / total * 100]);
      box.innerHTML = title + '<div class="langbar">' + rows.map(([n, p]) => '<i style="width:' + p + '%;background:' + dot(n) + '"></i>').join('') + '</div><div class="legend">' + rows.map(([n, p]) => '<span style="--d:' + dot(n) + '">' + n + '</span>').join('') + '</div>';
    } else {
      box.innerHTML = title + '<div class="legend"><span style="--d:' + dot(box.dataset.fallback) + '">' + box.dataset.fallback + '</span></div>';
    }
    new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { box.classList.add('in'); o.disconnect(); } }), { threshold: .3 }).observe(box);
  });

  const glows = $$('.glows i');
  const progress = $('#progress');
  const hero = $('#hero');
  const heroInner = $('#heroInner');
  const heroH1 = $('h1', heroInner);
  const heroFade = [$('.hero-lead'), $('.socials', heroInner)];
  const lns = $$('.ln', heroInner);
  const projects = $$('.project');
  const timeline = $('#timeline');
  const fill = $('#timelineFill');

  let ticking = false;
  function update() {
    ticking = false;
    const y = scrollY, vh = innerHeight;

    // Page progress bar
    const max = document.documentElement.scrollHeight - vh;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    if (reduce) return;

    glows.forEach((g, i) => g.style.transform = 'translate3d(0,' + (-y * (.08 + i * .06)) + 'px,0)');

    // Hero: shrinks, blurs and fades while pinned
    const hp = clamp(y / (hero.offsetHeight - vh));
    const narrow = matchMedia('(max-width:700px)').matches;
    lns.forEach((l, i) => l.style.transform = `translateX(${(i ? 1 : -1) * hp * (narrow ? 8 : 34)}vw)`);
    heroH1.style.opacity = 1 - hp * .82;
    heroFade.forEach(el => el.style.opacity = 1 - clamp(hp * 1.8));

    // Projects: each card scales back as the next one slides over it
    projects.forEach((card, i) => {
      const next = projects[i + 1];
      if (!next || narrow) {
        card.style.transform = '';
        card.style.filter = '';
        return;
      }
      const start = next.getBoundingClientRect().top;
      const t = clamp(1 - (start - 110) / (vh * .7));
      card.style.transform = `scale(${1 - t * .06})`;
      card.style.filter = `brightness(${1 - t * .35})`;
    });

    // Timeline line draws as you scroll through it
    const r = timeline.getBoundingClientRect();
    const tp = clamp((vh * .6 - r.top) / r.height);
    fill.style.transform = `scaleY(${tp})`;
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  update();

  const themeBtn = $('#themeToggle');
  const setTheme = (dark) => {
    if (dark) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    themeBtn.setAttribute('aria-label', dark ? 'Turn off dark mode' : 'Turn on dark mode');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    const leet = $('.leet-card img');
    if (leet) {
      const url = new URL(leet.src);
      url.searchParams.set('theme', dark ? 'dark' : 'light');
      url.searchParams.set('colors', dark ? '353e43,434c51,ffffff,ffffff,529cca,4dab9a,ffa344,ff7369' : 'fbf7f1,e4d8c6,353e43,6f675e,3d6f8f,4dab9a,d4923a,d4655c');
      if (leet.src !== url.toString()) leet.src = url.toString();
    }
  };
  setTheme(document.documentElement.getAttribute('data-theme') === 'dark');
  themeBtn.addEventListener('click', () => setTheme(document.documentElement.getAttribute('data-theme') !== 'dark'));
})();
