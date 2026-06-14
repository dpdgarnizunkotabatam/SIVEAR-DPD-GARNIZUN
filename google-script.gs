function doGet(e) {
  const type = e.parameter.type;
  if (type === 'doc') {
    const nomor = e.parameter.nomor;
    // Cari di Spreadsheet
    const sheet = SpreadsheetApp.openById('SPREADSHEET_ID').getSheetByName('Dokumen');
    const data = sheet.getDataRange().getValues();
    for (let i=1; i<data.length; i++) {
      if (data[i][0] == nomor) {
        return ContentService.createTextOutput(
          JSON.stringify({found:true, nama: data[i][1], pdfUrl: data[i][2]})
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }
    return ContentService.createTextOutput(
      JSON.stringify({found:false})
    ).setMimeType(ContentService.MimeType.JSON);
  } else if (type === 'cert') {
    const nomor = e.parameter.nomor;
    const sheet = SpreadsheetApp.openById('SPREADSHEET_ID').getSheetByName('Sertifikat');
    const data = sheet.getDataRange().getValues();
    for (let i=1; i<data.length; i++) {
      if (data[i][0] == nomor) {
        return ContentService.createTextOutput(
          JSON.stringify({found:true, nama: data[i][1], pdfUrl: data[i][2]})
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }
    return ContentService.createTextOutput(
      JSON.stringify({found:false})
    ).setMimeType(ContentService.MimeType.JSON);
  } else if (type === 'ttd') {
    const kode = e.parameter.kode;
    // Verifikasi tanda tangan
    // Contoh: jika kode cocok
    if (kode === '123456') {
      return ContentService.createTextOutput(
        JSON.stringify({valid:true, nama:'Bapak/SIbu Nama'})
      ).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(
        JSON.stringify({valid:false})
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }
  // Jika tidak dikenali
  return ContentService.createTextOutput('Invalid request');
}
