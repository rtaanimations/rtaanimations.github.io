
(function(){
  const cfg = window.SITE_CONFIG || {};
  const root = document.documentElement;
  if (cfg.ACCENT) root.style.setProperty('--accent', cfg.ACCENT);

  document.addEventListener("DOMContentLoaded", () => {
    for (const el of document.querySelectorAll('[data-site-name]')) el.textContent = cfg.SITE_NAME || 'My Site';
    for (const el of document.querySelectorAll('[data-tagline]')) el.textContent = cfg.TAGLINE || '';
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && cfg.CANONICAL_BASE) {
      canonical.setAttribute('href', cfg.CANONICAL_BASE + location.pathname);
    }
    const tag = (cfg.TAG || "").trim();
    for (const a of document.querySelectorAll('a[data-affiliate="true"]')) {
      a.setAttribute("rel", "sponsored nofollow noopener");
      a.setAttribute("target", "_blank");
      if (tag) {
        try {
          const u = new URL(a.getAttribute('href'));
          u.searchParams.delete('tag');
          a.setAttribute('href', u.toString() + (u.search ? '&' : '?') + 'tag=' + encodeURIComponent(tag));
        } catch(e){}
      }
      const badge = document.createElement('span');
      badge.className = 'small';
      badge.style.marginLeft = '6px';
      badge.textContent = '(paid link)';
      a.insertAdjacentElement('afterend', badge);
    }
    for (const el of document.querySelectorAll('[data-assoc]')) {
      el.textContent = "As an Amazon Associate I earn from qualifying purchases.";
    }
  });
})();
