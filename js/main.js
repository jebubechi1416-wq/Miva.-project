// main.js — shared behaviour across all pages: nav toggle, active link, terminal boot sequence

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Highlight current page in nav
  var current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Footer year + live clock (dynamic content)
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Terminal boot sequence on homepage hero
  var terminalBody = document.getElementById('terminal-body');
  if (terminalBody) {
    var lines = [
      { text: 'whoami', type: 'cmd' },
      { text: 'Ekeh Joshua Ebubechi', type: 'out' },
      { text: 'cat roles.txt', type: 'cmd' },
      { text: 'Cybersecurity Student · Cloud Security (aspiring)', type: 'out' },
      { text: 'Django Developer · Music Instructor', type: 'out' },
      { text: 'status --check', type: 'cmd' },
      { text: 'session verified. welcome.', type: 'out' }
    ];

    var i = 0;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function renderStatic() {
      terminalBody.innerHTML = lines.map(function (l) {
        return l.type === 'cmd'
          ? '<div class="terminal-line"><span class="prompt">joshua@portfolio:~$</span> ' + l.text + '</div>'
          : '<div class="terminal-line out">' + l.text + '</div>';
      }).join('');
    }

    if (reduceMotion) {
      renderStatic();
    } else {
      function typeNext() {
        if (i >= lines.length) {
          var caret = document.createElement('span');
          caret.className = 'caret';
          terminalBody.appendChild(caret);
          return;
        }
        var line = lines[i];
        var row = document.createElement('div');
        row.className = 'terminal-line' + (line.type === 'out' ? ' out' : '');
        if (line.type === 'cmd') {
          row.innerHTML = '<span class="prompt">joshua@portfolio:~$</span> ';
        }
        terminalBody.appendChild(row);

        var charIndex = 0;
        var textNode = document.createTextNode('');
        row.appendChild(textNode);

        var typer = setInterval(function () {
          textNode.textContent += line.text.charAt(charIndex);
          charIndex++;
          if (charIndex >= line.text.length) {
            clearInterval(typer);
            i++;
            setTimeout(typeNext, line.type === 'cmd' ? 220 : 380);
          }
        }, 22);
      }
      typeNext();
    }
  }
});
