(() => {
  "use strict";

  const FRAME_SELECTOR = "iframe.rich-document,iframe.imported-html-frame,iframe.personal-pdf-frame";
  let activeFrame = null;
  let fallbackOverlay = null;
  let innerExit = null;

  const visible = element => {
    if (!element || element.hidden) return false;
    const style = getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden") return false;
    const rect = element.getBoundingClientRect();
    return rect.width > 8 && rect.height > 8;
  };

  function clearLegacyReading() {
    document.documentElement.classList.remove("immersive-reading");
    const oldExit = document.getElementById("readingModeExit");
    if (oldExit) oldExit.hidden = true;
  }

  function findVisibleFrame(explicitFrame = null) {
    if (explicitFrame && explicitFrame.matches?.(FRAME_SELECTOR) && visible(explicitFrame)) return explicitFrame;
    if (document.activeElement?.matches?.(FRAME_SELECTOR) && visible(document.activeElement)) return document.activeElement;

    const panels = [...document.querySelectorAll("#studyBody .workspace-panel:not(.is-collapsed)")].filter(visible);
    const frames = panels.flatMap(panel => [...panel.querySelectorAll(FRAME_SELECTOR)]).filter(visible);
    if (!frames.length) return null;

    return frames.sort((a, b) => {
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      return (rb.width * rb.height) - (ra.width * ra.height);
    })[0];
  }

  function ensureStyle() {
    if (document.getElementById("solved-reading-frame-style")) return;
    const style = document.createElement("style");
    style.id = "solved-reading-frame-style";
    style.textContent = `
      iframe.solved-reading-frame:fullscreen,
      iframe.solved-reading-frame:-webkit-full-screen {
        box-sizing:border-box!important;
        display:block!important;
        width:100vw!important;
        height:100vh!important;
        min-width:100vw!important;
        min-height:100vh!important;
        max-width:none!important;
        max-height:none!important;
        margin:0!important;
        padding:0!important;
        border:0!important;
        border-radius:0!important;
        transform:none!important;
        transform-origin:0 0!important;
        background:#fff!important;
      }
      .solved-reading-fallback {
        position:fixed!important;
        inset:0!important;
        z-index:2147483000!important;
        width:100vw!important;
        height:100vh!important;
        margin:0!important;
        padding:0!important;
        overflow:hidden!important;
        background:#07131f!important;
      }
      .solved-reading-fallback > iframe {
        position:absolute!important;
        inset:0!important;
        display:block!important;
        width:100vw!important;
        height:100vh!important;
        min-width:100vw!important;
        min-height:100vh!important;
        max-width:none!important;
        max-height:none!important;
        margin:0!important;
        padding:0!important;
        border:0!important;
        border-radius:0!important;
        transform:none!important;
        background:#fff!important;
      }
      .solved-reading-fallback-exit {
        position:fixed!important;
        top:max(10px,env(safe-area-inset-top))!important;
        right:max(12px,env(safe-area-inset-right))!important;
        z-index:2147483647!important;
        min-height:42px!important;
        padding:0 15px!important;
        border:1px solid rgba(255,255,255,.45)!important;
        border-radius:999px!important;
        background:#17212b!important;
        color:#fff!important;
        font:800 14px/1 system-ui,sans-serif!important;
        box-shadow:0 8px 28px rgba(0,0,0,.35)!important;
      }
    `;
    document.head.append(style);
  }

  function removeInnerExit() {
    try { innerExit?.remove(); } catch (_) {}
    innerExit = null;
  }

  function installInnerExit(frame) {
    removeInnerExit();
    try {
      const doc = frame.contentDocument;
      if (!doc?.body) return;
      const button = doc.createElement("button");
      button.type = "button";
      button.textContent = "Salir de lectura";
      button.setAttribute("data-solved-reading-exit", "1");
      Object.assign(button.style, {
        position:"fixed", top:"12px", right:"14px", zIndex:"2147483647",
        minHeight:"42px", padding:"0 15px", border:"1px solid rgba(255,255,255,.45)",
        borderRadius:"999px", background:"#17212b", color:"#fff",
        font:"800 14px/1 system-ui,sans-serif", boxShadow:"0 8px 28px rgba(0,0,0,.35)"
      });
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        exitReading();
      });
      doc.body.append(button);
      innerExit = button;
    } catch (_) {
      innerExit = null;
    }
  }

  function cleanup() {
    removeInnerExit();
    if (activeFrame) activeFrame.classList.remove("solved-reading-frame");
    activeFrame = null;
    fallbackOverlay?.remove();
    fallbackOverlay = null;
    clearLegacyReading();
  }

  async function exitReading() {
    try {
      if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
      else if (document.webkitFullscreenElement && document.webkitExitFullscreen) document.webkitExitFullscreen();
    } catch (_) {}
    cleanup();
  }

  function openFallback(frame) {
    const overlay = document.createElement("div");
    overlay.className = "solved-reading-fallback";

    const clone = frame.cloneNode(false);
    clone.removeAttribute("id");
    clone.removeAttribute("style");
    clone.classList.remove("solved-reading-frame");
    clone.setAttribute("allowfullscreen", "");
    if (frame.srcdoc) clone.srcdoc = frame.srcdoc;
    else if (frame.src) clone.src = frame.src;

    const exit = document.createElement("button");
    exit.type = "button";
    exit.className = "solved-reading-fallback-exit";
    exit.textContent = "Salir de lectura";
    exit.addEventListener("click", exitReading);

    overlay.append(clone, exit);
    document.body.append(overlay);
    fallbackOverlay = overlay;
  }

  async function enterFrame(frame) {
    ensureStyle();
    if (!frame || document.fullscreenElement || document.webkitFullscreenElement || fallbackOverlay) return;

    clearLegacyReading();
    activeFrame = frame;
    frame.setAttribute("allowfullscreen", "");
    frame.classList.add("solved-reading-frame");

    const request = frame.requestFullscreen || frame.webkitRequestFullscreen;
    if (request) {
      try {
        let result;
        try {
          result = request.call(frame, {navigationUI:"hide"});
        } catch (_) {
          result = request.call(frame);
        }
        if (result?.then) await result;
        installInnerExit(frame);
        return;
      } catch (error) {
        console.warn("SOLved: no se pudo poner el iframe en fullscreen; se usa el visor alternativo", error);
      }
    }

    frame.classList.remove("solved-reading-frame");
    activeFrame = null;
    openFallback(frame);
  }

  document.addEventListener("click", event => {
    const globalButton = event.target.closest?.("#readingBtn");
    const materialButton = event.target.closest?.('[data-html-action="fullscreen"]');
    if (!globalButton && !materialButton) return;

    let frame = null;
    if (materialButton) {
      const viewer = materialButton.closest(".html-viewer");
      frame = [...(viewer?.querySelectorAll?.(FRAME_SELECTOR) || [])].find(visible) || null;
    } else {
      frame = findVisibleFrame();
    }

    if (!frame) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    enterFrame(frame);
  }, true);

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) cleanup();
  });
  document.addEventListener("webkitfullscreenchange", () => {
    if (!document.webkitFullscreenElement) cleanup();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && fallbackOverlay) exitReading();
  });

  ensureStyle();
})();
