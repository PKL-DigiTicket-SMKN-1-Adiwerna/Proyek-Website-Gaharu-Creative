/* Cek cepat parser isi studi kasus: `node --test src/lib/studiKasus.test.mjs` */
import { test } from "node:test";
import assert from "node:assert/strict";
import { bacaStudiKasus, adaBagianTerstruktur } from "./studiKasus.js";

test("teks tanpa penanda tetap jadi paragraf biasa", () => {
  const bagian = bacaStudiKasus("Test");
  assert.equal(adaBagianTerstruktur(bagian), false);
  assert.deepEqual(bagian[0].paragraf, ["Test"]);
});

test("output, metrik, dan kutipan dipisah sesuai penanda", () => {
  const body = [
    "## Tantangan",
    "Jangkauan pasar terbatas.",
    "",
    "## Output dan Cakupan Kerja",
    "- Struktur katalog e-commerce",
    "- Kalender konten harian",
    "",
    "## Ringkasan Dampak Bisnis",
    "+320% | Omzet penjualan",
    "3.8x | ROAS",
    "> Kerja sama ini titik balik pertumbuhan kami.",
  ].join("\n");

  const bagian = bacaStudiKasus(body);
  assert.equal(adaBagianTerstruktur(bagian), true);
  assert.equal(bagian.length, 3);
  assert.deepEqual(bagian[0].judul, "Tantangan");
  assert.deepEqual(bagian[0].paragraf, ["Jangkauan pasar terbatas."]);
  assert.equal(bagian[1].poin.length, 2);
  assert.deepEqual(bagian[2].metrik[0], { nilai: "+320%", label: "Omzet penjualan" });
  assert.deepEqual(bagian[2].kutipan, ["Kerja sama ini titik balik pertumbuhan kami."]);
});
