(function () {
  'use strict';
  if (localStorage.getItem('ck_cookie_consent')) return;

  var lang = document.documentElement.lang || 'tr';
  var isTR = lang.startsWith('tr');

  var banner = document.createElement('div');
  banner.id = 'cookieConsent';
  banner.setAttribute('role', 'alert');
  banner.setAttribute('aria-live', 'polite');

  var inner = document.createElement('div');
  inner.className = 'cc-inner';

  var p = document.createElement('p');
  p.textContent = isTR
    ? 'Bu site yalnızca güvenlik amaçlı teknik çerezler (Cloudflare) kullanmaktadır. Analiz veya izleme çerezi kullanılmamaktadır. '
    : 'This site only uses technical cookies (Cloudflare) for security purposes. No analytics or tracking cookies are used. ';

  var link = document.createElement('a');
  link.href = isTR ? '/privacy-policy.html' : '/en/privacy-policy.html';
  link.textContent = isTR ? 'Gizlilik Politikası' : 'Privacy Policy';
  p.appendChild(link);

  var btn = document.createElement('button');
  btn.id = 'ccAccept';
  btn.type = 'button';
  btn.textContent = isTR ? 'Anladım' : 'Got it';

  inner.appendChild(p);
  inner.appendChild(btn);
  banner.appendChild(inner);
  document.body.appendChild(banner);

  btn.addEventListener('click', function () {
    localStorage.setItem('ck_cookie_consent', '1');
    banner.classList.add('cc-hidden');
    setTimeout(function () { banner.remove(); }, 400);
  });
})();
