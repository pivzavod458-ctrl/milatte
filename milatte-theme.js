(() => {
  document.write('<style id="milatte-critical">html{visibility:hidden!important;background:#414638!important}body{background:#414638!important;overflow-x:hidden!important}</style>');

  const palette = new Map([
    ['rgb(14, 14, 16)', '#414638'],
    ['rgb(15, 15, 17)', '#414638'],
    ['rgb(17, 17, 19)', '#414638'],
    ['rgb(32, 32, 35)', '#535a4b'],
    ['rgb(36, 36, 39)', '#535a4b'],
    ['rgb(38, 38, 40)', '#535a4b'],
    ['rgb(255, 105, 0)', '#c7ba8d'],
    ['rgb(255, 92, 105)', '#b8ad88'],
  ]);

  function removeCookie() {
    document.querySelectorAll('.sc-11ujbtc-0.eCZMsp, .cookie-policy-button, button[aria-label*="куки" i]').forEach((element) => {
      const banner = element.closest('.sc-11ujbtc-0.eCZMsp');
      (banner || element.parentElement)?.remove();
    });
    [...document.querySelectorAll('div, section, aside')]
      .filter((element) => {
        const text = element.textContent || '';
        return text.includes('Пицце нужен соус') && text.length < 900;
      })
      .sort((a, b) => a.textContent.length - b.textContent.length)
      .forEach((element) => element.remove());
  }

  function setBrand() {
    const brand = document.querySelector('a[aria-label*="Логотип"]');
    if (!brand || brand.dataset.milatteBrand) return;
    brand.dataset.milatteBrand = 'true';
    brand.innerHTML = '<img src="./milatte-word.png" alt="Milatte">';
    const isPhone = window.innerWidth <= 520;
    Object.assign(brand.style, {
      display: 'flex',
      alignItems: 'center',
      width: isPhone ? '142px' : '184px',
      height: isPhone ? '42px' : '54px',
      minWidth: isPhone ? '142px' : '184px',
    });
    const image = brand.querySelector('img');
    Object.assign(image.style, { width: '100%', height: 'auto', maxWidth: '184px' });
  }

  function injectStyles() {
    if (document.getElementById('milatte-direct-styles')) return;
    const style = document.createElement('style');
    style.id = 'milatte-direct-styles';
    style.textContent = `
      html, body, #react-app {
        max-width: 100vw !important;
        overflow-x: hidden !important;
        overscroll-behavior-x: none !important;
        background: #414638 !important;
        touch-action: pan-y !important;
      }
      [class*="cookie" i], [id*="cookie" i], [data-testid*="cookie" i],
      .sc-11ujbtc-0.eCZMsp, .cookie-policy-button { display: none !important; }
      button, [role="button"] { border-color: rgb(239 235 220 / 24%) !important; }
      @media (max-width: 520px) {
        html, body { width: 100vw !important; }
        a[aria-label*="Логотип"] { width: 142px !important; min-width: 142px !important; height: 42px !important; }
      }
    `;
    document.head.append(style);
    document.querySelector('meta[name="viewport"]')?.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover');
  }

  function tone() {
    injectStyles();
    removeCookie();
    setBrand();
    const view = window;
    document.querySelectorAll('*').forEach((element) => {
      if (element.dataset.milatteTone || element.matches('img, svg, path, use, video, canvas, picture')) return;
      const styles = view.getComputedStyle(element);
      const rgba = styles.backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      const red = rgba ? Number(rgba[1]) : 255;
      const green = rgba ? Number(rgba[2]) : 255;
      const blue = rgba ? Number(rgba[3]) : 255;
      const alpha = rgba?.[4] === undefined ? 1 : Number(rgba[4]);
      let background = palette.get(styles.backgroundColor);
      if (!background && alpha > .05) {
        if (Math.max(red, green, blue) < 28) background = '#414638';
        else if (Math.max(red, green, blue) < 72) background = '#596150';
        else if (red > 190 && red > green * 1.35 && green > 55) background = '#c7ba8d';
      }
      const color = palette.get(styles.color);
      if (background) element.style.setProperty('background-color', background, 'important');
      if (color) element.style.setProperty('color', color, 'important');
      if (background || color) element.dataset.milatteTone = 'true';
    });

    if (!document.documentElement.dataset.milatteStart) {
      document.documentElement.dataset.milatteStart = 'true';
      document.querySelectorAll('*').forEach((element) => {
        if (element.scrollWidth > element.clientWidth + 4) element.scrollLeft = 0;
      });
      if (window.innerWidth <= 520) {
        [...document.querySelectorAll('button')].filter((button) =>
          /^(Мясная|Паста Мясная)$/.test((button.textContent || '').trim())
        ).forEach((button) => {
          button.style.setProperty('min-width', '132px', 'important');
          button.style.setProperty('min-height', '198px', 'important');
        });
      }
    }
    requestAnimationFrame(() => document.documentElement.style.setProperty('visibility', 'visible', 'important'));
  }

  document.addEventListener('DOMContentLoaded', () => {
    tone();
    new MutationObserver(tone).observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(tone, 450);
  }, { once: true });
  document.addEventListener('gesturestart', (event) => event.preventDefault(), { passive: false });
  document.addEventListener('touchmove', (event) => {
    if (event.touches.length > 1) event.preventDefault();
  }, { passive: false });
})();
