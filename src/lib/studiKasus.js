/* Membaca isi detail studi kasus dari panel admin menjadi bagian-bagian
 * terstruktur, supaya studi kasus yang ditambahkan lewat panel admin memakai
 * tata letak yang sama dengan studi kasus lama (kartu output + kartu metrik),
 * tanpa perlu kolom baru di basis data.
 *
 * Penanda di kolom "Isi detail":
 *   ## Judul bagian      -> satu bagian baru
 *   - teks               -> satu kartu output
 *   Nilai | Label        -> satu kartu metrik (contoh: "+320% | Omzet penjualan")
 *   > kutipan            -> kutipan testimoni
 * Tanpa penanda, teks dianggap paragraf biasa seperti sebelumnya.
 */
const RE_JUDUL = /^#{1,6}\s*(.+)$/;
const RE_POIN = /^[-*]\s+(.+)$/;
const RE_METRIK = /^(.+?)\s*\|\s*(.+)$/;
const RE_KUTIPAN = /^>\s*(.+)$/;

export function bacaStudiKasus(body) {
  const bagian = [];
  let kini = null;
  const mulai = (judul) => {
    kini = { judul: judul || "", paragraf: [], poin: [], metrik: [], kutipan: [] };
    bagian.push(kini);
    return kini;
  };

  for (const mentah of String(body || "").split(/\r?\n/)) {
    const baris = mentah.trim();
    if (!baris) continue;

    const cocokJudul = baris.match(RE_JUDUL);
    if (cocokJudul) {
      mulai(cocokJudul[1].trim());
      continue;
    }
    if (!kini) mulai("");

    const cocokPoin = baris.match(RE_POIN);
    if (cocokPoin) {
      kini.poin.push(cocokPoin[1].trim());
      continue;
    }
    const cocokMetrik = baris.match(RE_METRIK);
    if (cocokMetrik) {
      kini.metrik.push({ nilai: cocokMetrik[1].trim(), label: cocokMetrik[2].trim() });
      continue;
    }
    const cocokKutipan = baris.match(RE_KUTIPAN);
    if (cocokKutipan) {
      kini.kutipan.push(cocokKutipan[1].trim());
      continue;
    }
    kini.paragraf.push(baris);
  }

  return bagian;
}

/* True kalau isi memakai penanda bagian, jadi halaman detail bisa memilih
 * tata letak kaya atau tata letak paragraf biasa. */
export function adaBagianTerstruktur(bagian) {
  return Array.isArray(bagian) && bagian.some((b) => b.judul);
}
