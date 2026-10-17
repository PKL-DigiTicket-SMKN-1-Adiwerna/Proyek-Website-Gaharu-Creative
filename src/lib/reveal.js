/* Mesin animasi "reveal saat scroll".
 *
 * Alur kerjanya:
 * 1. Semua blok konten di dalam [data-reveal-root] diberi atribut data-reveal
 *    beserta --reveal-delay bertingkat, sehingga tiap blok muncul berurutan
 *    (stagger) dan tidak terasa monoton.
 * 2. IntersectionObserver memantau tiap blok. Saat blok masuk viewport,
 *    keadaannya ditandai "in" agar keyframes di src/index.css berjalan.
 * 3. Ketika animasi selesai, keadaan ditukar jadi "done" supaya properti
 *    transform tidak lagi menempel di elemen (hover tetap normal).
 *
 * Keadaan reveal disimpan pada atribut data-reveal-state, BUKAN kelas CSS.
 * Alasannya: React menulis ulang seluruh atribut class setiap kali nilai prop
 * className berubah, misalnya saat kartu filter berubah jadi aktif. Kelas yang
 * ditambahkan mesin ini dari luar React ikut terhapus, sementara atribut
 * data-reveal tetap ada, sehingga CSS menahan elemen di opacity 0 dan kartu
 * "hilang" setelah dipilih. Atribut yang tidak pernah dirender React tidak bisa
 * terhapus dengan cara itu.
 *
 * Pemilihan elemen sengaja memakai :scope + querySelectorAll supaya ringan,
 * lalu hasilnya disaring oleh pruneAncestors: elemen yang membungkus elemen
 * lain yang juga dianimasikan akan dibuang, jadi tidak ada gerakan bertumpuk.
 */

const STEP_MS = 80;
const MAX_STEPS = 5;

const PENDING = "pending";
const IN = "in";
const DONE = "done";

/* Blok yang layak beranimasi: isi section, isi container di dalam section,
 * dan kartu-kartu di dalam grid.
 */
const SELECTOR = [
  ":scope > *",
  ":scope > * > *",
  ":scope section > *",
  ":scope section > * > *",
  ":scope [class~='grid'] > *",
  ":scope article",
  ":scope figure",
].join(", ");

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

/* Buang elemen yang membungkus calon elemen lain, supaya tidak dobel. */
function pruneAncestors(nodes) {
  return nodes.filter((el) => {
    for (const other of nodes) {
      if (other !== el && el.contains(other)) return false;
    }
    return true;
  });
}

/* Delay bertingkat berdasarkan urutan antar kandidat bersaudara. */
function stagedDelay(el, pool) {
  const parent = el.parentElement;
  if (!parent) return 0;
  let index = 0;
  for (const child of parent.children) {
    if (child === el) break;
    if (pool.has(child)) index += 1;
  }
  return Math.min(index, MAX_STEPS) * STEP_MS;
}

function stateOf(el) {
  return el.getAttribute("data-reveal-state");
}

function mark(el, state) {
  el.setAttribute("data-reveal-state", state);
}

function delayOf(el) {
  const value = Number.parseFloat(el.style.getPropertyValue("--reveal-delay"));
  return Number.isFinite(value) ? value : 0;
}

export function initScrollReveal(roots) {
  const rootList = Array.from(roots || []).filter(
    (node) => node && node.nodeType === 1
  );
  if (rootList.length === 0) return () => {};

  const reduce = prefersReducedMotion();

  const observer =
    !reduce && typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              const el = entry.target;
              observer.unobserve(el);
              if (stateOf(el) === DONE) continue;
              mark(el, IN);
              /* Jaring aman: kalau animationend tidak pernah sampai (misalnya
               * elemen disembunyikan saat animasi berjalan), keadaan tetap
               * dipromosikan agar isi halaman tidak tertinggal tak terlihat. */
              window.setTimeout(() => {
                if (stateOf(el) === IN) mark(el, DONE);
              }, delayOf(el) + 1200);
            }
          },
          { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
        )
      : null;

  /* Reveal memakai dua animasi (fade + rise). Hanya akhir animasi geser
   * (gc-rise) yang menandai selesai, agar fade yang lebih pendek tidak
   * memotong pergeseran elemen di tengah jalan. */
  const onAnimationEnd = (event) => {
    if (event.animationName !== "gc-rise") return;
    const el = event.target;
    if (el && typeof el.setAttribute === "function" && stateOf(el) === IN) {
      mark(el, DONE);
    }
  };

  rootList.forEach((root) => root.addEventListener("animationend", onAnimationEnd));

  const tagged = new WeakSet();

  function tag(nodes) {
    const fresh = nodes.filter(
      (el) => !tagged.has(el) && stateOf(el) !== DONE && stateOf(el) !== IN
    );
    if (fresh.length === 0) return;

    const pool = new Set(fresh);
    for (const el of fresh) {
      tagged.add(el);
      el.setAttribute("data-reveal", "rise");
      el.style.setProperty("--reveal-delay", `${stagedDelay(el, pool)}ms`);
      if (observer) {
        mark(el, PENDING);
        observer.observe(el);
      } else {
        mark(el, DONE);
      }
    }
  }

  function scan(scope) {
    const found = Array.from(scope.querySelectorAll(SELECTOR)).filter(
      (el) => el.getAttribute("data-reveal") !== "none"
    );
    tag(pruneAncestors(found));
  }

  rootList.forEach(scan);

  // Konten yang muncul belakangan (hasil filter, ganti slide, dsb.) tetap
  // ikut dianimasikan. MutationObserver hanya memantau perubahan anak, jadi
  // atribut yang kita tambahkan sendiri tidak memicu putaran baru.
  const mutation =
    observer && typeof MutationObserver !== "undefined"
      ? new MutationObserver((records) => {
          const scopes = new Set();
          for (const record of records) {
            for (const node of record.addedNodes) {
              if (node.nodeType === 1 && node.parentElement) {
                scopes.add(node.parentElement);
              }
            }
          }
          scopes.forEach((scope) => scan(scope));
        })
      : null;

  if (mutation) {
    rootList.forEach((root) =>
      mutation.observe(root, { childList: true, subtree: true })
    );
  }

  return () => {
    if (observer) observer.disconnect();
    if (mutation) mutation.disconnect();
    rootList.forEach((root) =>
      root.removeEventListener("animationend", onAnimationEnd)
    );
  };
}