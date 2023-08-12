async function createExport(scannedWebpage, foundArticles) {
  try {
    const response = await fetch(
      'http://localhost:5000/api/v1/export/to-excel',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'scanned webpage': scannedWebpage,
          'found articles': foundArticles,
        }),
      },
    );
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'articles.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
  }
}
