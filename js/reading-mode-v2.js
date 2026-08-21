(() => {
  "use strict";

  let fullscreenHost = null;
  let exitButton = null;
  let fallbackOverlay = null;

  const visible = element => {
    if (!element || element.hidden) return false;
    const style = getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden") return false;
    const rect = element.getBoundingClientRect();
    return rect.width > 8 && rect.height > 8;
  };

  function currentPanel() {
    const panels = [...document.querySelectorAll("#studyBody .workspace-panel:not(.is-collapsed)")].filter(visible);
    if (!panels.length) return null;
    return panels.find(panel => [...panel.querySelectorAll("iframe.rich-document,iframe.imported-html-frame,iframe.personal-pdf-frame")].some(visible)) || panels[0];
  }

  function readingTarget(explicitFrame = null) {
    if (explicitFrame && visible(explicitFrame)) return explicitFrame.closest(".rich-document-card,.html-viewer,.workspace-panel") || explicitFrame.parentElement;
    const panel = currentPanel();
    if (!panel) return null;
    const frame = [...panel.querySelectorAll("iframe.rich-document,iframe.imported-html-frame,iframe.personal-pdf-frame")].find(visible);
    return frame?.closest(".rich-document-card,.html-viewer") || panel;
  }

  function targetFrame(target) {
    return [...(target?.querySelectorAll?.("iframe.rich-document,iframe.imported-html-frame,iframe.personal-pdf-frame") || [])].find(visible) || null;
  }

  function ensureStyle() {
    if (document.getElementById("solved-reading-v2-style")) return;
    const style = document.createElement("style");
    style.id = "solved-reading-v2-style";
    style.textContent = `
      .solved-reading-fullscreen:fullscreen,
      .solved-reading-fullscreen:-webkit-full-screen{
        box-sizing:border-box!important;width:100vw!important;height:100vh!important;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;background:var(--bg,#07131f)!important;overflow:hidden!important;display:block!important
      }
      .solved-reading-fullscreen:fullscreen .workspace-panel-head,
      .solved-reading-fullscreen:fullscreen .rich-document-head,
      .solved-reading-fullscreen:fullscreen .html-viewer-toolbar,
      .solved-reading-fullscreen:-webkit-full-screen .workspace-panel-head,
      .solved-reading-fullscreen:-webkit-full-screen .rich-document-head,
      .solved-reading-fullscreen:-webkit-full-screen .html-viewer-toolbar{display:none!important}
      .solved-reading-fullscreen:fullscreen .workspace-panel-scroll,
      .solved-reading-fullscreen:-webkit-full-screen .workspace-panel-scroll{box-sizing:border-box!important;position:relative!important;inset:auto!important;width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;padding:0!important;overflow:auto!important}
      .solved-reading-fullscreen:fullscreen .official-section,
      .solved-reading-fullscreen:fullscreen .rich-document-card,
      .solved-reading-fullscreen:fullscreen .html-viewer,
      .solved-reading-fullscreen:-webkit-full-screen .official-section,
      .solved-reading-fullscreen:-webkit-full-screen .rich-document-card,
      .solved-reading-fullscreen:-webkit-full-screen .html-viewer{box-sizing:border-box!important;position:relative!important;inset:auto!important;width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;overflow:hidden!important;display:block!important}
      .solved-reading-fullscreen:fullscreen iframe.rich-document,
      .solved-reading-fullscreen:fullscreen iframe.imported-html-frame,
      .solved-reading-fullscreen:fullscreen iframe.personal-pdf-frame,
      .solved-reading-fullscreen:-webkit-full-screen iframe.rich-document,
      .solved-reading-fullscreen:-webkit-full-screen iframe.imported-html-frame,
      .solved-reading-fullscreen:-webkit-full-screen iframe.personal-pdf-frame{box-sizing:border-box!important;position:relative!important;inset:auto!important;display:block!important;width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;transform:none!important;background:#fff!important}
      .solved-reading-fullscreen:fullscreen .material-library,
      .solved-reading-fullscreen:fullscreen .personal-section,
      .solved-reading-fullscreen:-webkit-full-screen .material-library,
      .solved-reading-fullscreen:-webkit-full-screen .personal-section{display:none!important}
      .solved-reading-v2-exit{position:fixed!important;top:max(10px,env(safe-area-inset-top))!important;right:max(12px,env(safe-area-inset-right))!important;z-index:2147483647!important;min-height:42px!important;padding:0 15px!important;border:1px solid rgba(255,255,255,.45)!important;border-radius:999px!important;background:#17212b!important;color:#fff!important;font:800 14px/1 system-ui,sans-serif!important;box-shadow:0 8px 28px rgba(0,0,0,.35)!important}
      .solved-reading-v2-overlay{position:fixed!important;inset:0!important;z-index:2147483000!important;background:#07131f!important}
      .solved-reading-v2-overlay iframe{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;border:0!important;background:#fff!important}
    `;
    document.head.append(style);
  }

  function createExitButton(host, action) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "solved-reading-v2-exit";
    button.textContent = "Salir de lectura";
    button.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      action();
    });
    host.append(button);
    return button;
  }

  function cleanupFullscreen() {
    exitButton?.remove();
    exitButton = null;
    fullscreenHost?.classList.remove("solved-reading-fullscreen");
    fullscreenHost = null;
    document.documentElement.classList.remove("immersive-reading");
    const oldExit = document.getElementById("readingModeExit");
    if (oldExit) oldExit.hidden = true;
  }

  async function leaveReading() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      try {
        if (document.exitFullscreen) await document.exitFullscreen();
        else document.webkitExitFullscreen?.();
      } catch (_) {}
    }
    fallbackOverlay?.remove();
    fallbackOverlay = null;
    cleanupFullscreen();
  }

  function fallbackReading(target) {
    const frame = targetFrame(target);
    if (!frame) return false;
    const overlay = document.createElement("div");
    overlay.className = "solved-reading-v2-overlay";
    const clone = frame.cloneNode(false);
    clone.removeAttribute("id");
    clone.removeAttribute("style");
    if (frame.srcdoc) clone.srcdoc = frame.srcdoc;
    else if (frame.src) clone.src = frame.src;
    overlay.append(clone);
    createExitButton(overlay, leaveReading);
    document.body.append(overlay);
    fallbackOverlay = overlay;
    return true;
  }

  async function enterReading(explicitFrame = null) {
    ensureStyle();
    if (document.fullscreenElement || document.webkitFullscreenElement || fallbackOverlay) return;
    const target = readingTarget(explicitFrame);
    if (!target) return;

    document.documentElement.classList.remove("immersive-reading");
    const oldExit = document.getElementById("readingModeExit");
    if (oldExit) oldExit.hidden = true;

    const request = target.requestFullscreen || target.webkitRequestFullscreen;
    if (request) {
      fullscreenHost = target;
      target.classList.add("solved-reading-fullscreen");
      exitButton = createExitButton(target, leaveReading);
      try {
        const result = request.call(target, {navigationUI:"hide"});
        if (result?.then) await result;
        return;
      } catch (error) {
        console.warn("SOLved: fullscreen de lectura no disponible", error);
        cleanupFullscreen();
      }
    }
    fallbackReading(target);
  }

  function install() {
    ensureStyle();
    const button = document.getElementById("readingBtn");
    if (button && !button.dataset.readingV2) {
      button.dataset.readingV2 = "1";
      button.onclick = event => { event?.preventDefault?.(); enterReading(); };
    }
    const oldExit = document.getElementById("readingModeExit");
    if (oldExit) { oldExit.hidden = true; oldExit.onclick = leaveReading; }
  }

  document.addEventListener("click", event => {
    const button = event.target.closest?.('[data-html-action="fullscreen"]');
    if (!button) return;
    const viewer = button.closest(".html-viewer");
    const frame = viewer?.querySelector("iframe.imported-html-frame,iframe.personal-pdf-frame");
    if (!frame) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    enterReading(frame);
  }, true);

  document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement) cleanupFullscreen(); });
  document.addEventListener("webkitfullscreenchange", () => { if (!document.webkitFullscreenElement) cleanupFullscreen(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && fallbackOverlay) leaveReading(); });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install, {once:true});
  else install();
  window.addEventListener("lbt-app-ready", install);
  setTimeout(install, 0);
})();
