/* Efek parallax ringan yang mengikuti scroll.
 *
 * Cara kerjanya sengaja sederhana supaya tetap ringan:
 * 1. Tiap elemen bertanda [data-parallax] diukur posisinya relatif viewport.
 * 2. Semakin jauh dari tengah layar, semakin besar pergeseran kecil yang
 *    diterapkan lewat custom property --parallax-y (lihat src/index.css).
 * 3. Perhitungan dijalankan di dalam requestAnimationFrame agar tidak
 *    membanjiri thread dengan puluhan pembaruan tiap frame.
 *
 * Karena pergeseran ditulis sebagai custom property, transform milik elemen
 * tetap bisa dipakai utility lain (mis. scale untuk hover) tanpa saling timpa.
 * Pemakai yang mengaktifkan "kurangi gerakan" akan dilewati sepenuhnya.
 */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/* Jarak geser maksimum dalam piksel (untuk kekuatan 1). Dibuat kecil supaya
 * terasa halus, bukan seperti gambar terlepas dari bingkainya. */
const MAX_SHIFT_PX = 16;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function initParallax(nodes) {
  const list = Array.from(nodes || []).filter(
    (node) => node && node.nodeType === 1
  );
  if (list.length === 0 || prefersReducedMotion()) return () => {};

  let frame = 0;

  function update() {
    frame = 0;
    const viewport = window.innerHeight || 1;

    for (const el of list) {
      const rect = el.getBoundingClientRect();
      if (rect.height === 0) continue;

      /* p = 0 saat elemen tepat di tengah layar, positif saat masih di bawah,
       * negatif saat sudah lewat ke atas. Dibatasi -1..1 lalu dikalikan jarak
       * geser agar tidak pernah terlalu jauh. */
      const center = rect.top + rect.height / 2;
      const progress = clamp((center - viewport / 2) / viewport, -1, 1);
      const strength = Number.parseFloat(el.dataset.parallax) || 1;
      const offset = (progress * MAX_SHIFT_PX * strength).toFixed(2);

      el.style.setProperty("--parallax-y", `${offset}px`);
    }
  }

  function request() {
    if (frame) return;
    frame = window.requestAnimationFrame(update);
  }

  update();
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);

  return () => {
    if (frame) window.cancelAnimationFrame(frame);
    window.removeEventListener("scroll", request);
    window.removeEventListener("resize", request);
    for (const el of list) el.style.removeProperty("--parallax-y");
  };
}