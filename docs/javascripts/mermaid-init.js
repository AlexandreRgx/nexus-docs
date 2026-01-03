// Initialize Mermaid diagrams
function initMermaid() {
  const codeBlocks = document.querySelectorAll('pre > code');
  const mermaidKeywords = ['graph ', 'flowchart ', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 'erDiagram', 'gantt', 'pie', 'gitGraph', 'C4Context', 'C4Container', 'C4Component', 'C4Dynamic', 'C4Deployment'];

  codeBlocks.forEach((code) => {
    const text = code.textContent.trim();
    const isMermaid = mermaidKeywords.some(keyword => text.startsWith(keyword));

    if (isMermaid) {
      const pre = code.parentElement;
      const div = document.createElement('div');
      div.className = 'mermaid';
      div.textContent = text;
      pre.replaceWith(div);
    }
  });

  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({ startOnLoad: false, theme: 'default' });
    mermaid.run();
  }
}

// Run on initial page load
document.addEventListener('DOMContentLoaded', initMermaid);

// Handle instant navigation
document.addEventListener('DOMContentSwitch', function() {
  setTimeout(initMermaid, 50);
});

// Observe for new content (for instant navigation)
let lastUrl = location.href;
setInterval(function() {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    setTimeout(initMermaid, 100);
  }
}, 100);
