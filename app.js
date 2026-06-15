// Navigasi menu
const buttons = document.querySelectorAll('.menu-btn');
buttons.forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(btn.dataset.menu).classList.add('active');
  };
});

// Fungsi pencarian dokumen
function searchDocument() {
  const no = document.getElementById('searchDoc').value.trim();
  if (!no) {
    alert('Masukkan nomor dokumen');
    return;
  }
  fetch(`https://script.google.com/macros/s/AKfycbyNwlMe3xxSAIlVK1PdCPWoizI4uDCmtdTILB7ovw6oeVvZbPCorL58_EwOPFaRNX8j/exec?type=doc&nomor=${no}`)
    .then(res => res.json())
    .then(data => {
      const resDiv = document.getElementById('resultDoc');
      if (data.found) {
        resDiv.innerHTML = `<p>Dokumen ditemukan: ${data.nama}</p><button onclick="lihatDokumen('${data.pdfUrl}')">Lihat Dokumen</button>`;
      } else {
        resDiv.innerHTML = `<p>Dokumen tidak ditemukan</p>`;
      }
    });
}

function searchCertificate() {
  const no = document.getElementById('searchCert').value.trim();
  if (!no) {
    alert('Masukkan nomor e-Sertifikat');
    return;
  }
  fetch(`https://script.google.com/macros/s/AKfycbyNwlMe3xxSAIlVK1PdCPWoizI4uDCmtdTILB7ovw6oeVvZbPCorL58_EwOPFaRNX8j/exec?type=cert&nomor=${no}`)
    .then(res => res.json())
    .then(data => {
      const resDiv = document.getElementById('resultCert');
      if (data.found) {
        resDiv.innerHTML = `<p>e-Sertifikat ditemukan: ${data.nama}</p><button onclick="lihatDokumen('${data.pdfUrl}')">Lihat e-Sertifikat</button>`;
      } else {
        resDiv.innerHTML = `<p>e-Sertifikat tidak ditemukan</p>`;
      }
    });
}

function lihatDokumen(url) {
  document.getElementById('pdfFrame').src = url;
  document.getElementById('pdfModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('pdfModal').style.display = 'none';
  document.getElementById('pdfFrame').src = '';
}

// Download kartu anggota
function downloadKartu() {
  // Ganti URL sesuai lokasi file kartu anggota
  window.open('https://link-ke-kartu-anggota.pdf', '_blank');
}

// Scan tanda tangan menggunakan ZXing
let selectedDeviceId = null;
let codeReader = null;

function startScan() {
  codeReader = new ZXing.BrowserBarcodeReader();
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      const videoInputDevices = devices.filter(d => d.kind === 'videoinput');
      if (videoInputDevices.length > 0) {
        selectedDeviceId = videoInputDevices[0].deviceId;
        codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
          if (result) {
            document.getElementById('scanResult').innerText = 'Tanda tangan terverifikasi: ' + result.text;
            // Verifikasi tanda tangan melalui Apps Script
            verifyTTD(result.text);
            codeReader.reset();
          }
        });
      } else {
        alert('Kamera tidak terdeteksi');
      }
    });
}

function verifyTTD(kode) {
  fetch(`https://script.google.com/macros/s/AKfycbyNwlMe3xxSAIlVK1PdCPWoizI4uDCmtdTILB7ovw6oeVvZbPCorL58_EwOPFaRNX8j/exec?type=ttd&kode=${kode}`)
    .then(res => res.json())
    .then(data => {
      if (data.valid) {
        alert(`Tanda tangan terverifikasi atas nama: ${data.nama}`);
        // Tambahkan fitur menampilkan dokumen TTD jika diperlukan
      } else {
        alert('Tanda tangan tidak terverifikasi');
      }
    });
}

// Pendaftaran Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker terdaftar:', reg))
      .catch(error => console.log('Gagal mendaftar Service Worker:', error));
  });
}
