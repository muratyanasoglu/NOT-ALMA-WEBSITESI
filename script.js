document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('save-note');
    const noteTextInput = document.getElementById('note-text');
    const notesList = document.getElementById('list-of-notes');
    let notes = [];

    saveButton.addEventListener('click', function () {
        const noteText = noteTextInput.value;
        if (noteText) {
            notes.push(noteText);
            noteTextInput.value = '';
            updateNotesList();
        }
    });

    function updateNotesList() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const li = document.createElement('li');
            const textSpan = document.createElement('span');
            textSpan.textContent = note;

            // Delete Note butonu
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete Note';
            deleteButton.className = 'delete-note';
            deleteButton.addEventListener('click', function (event) {
                event.stopPropagation();
                notes.splice(index, 1); // Notu diziden sil
                updateNotesList(); // Not listesini güncelle
            });

            // Open Note butonu
            const openButton = document.createElement('button');
            openButton.textContent = 'Open Note';
            openButton.className = 'open-note';
            openButton.addEventListener('click', function () {
                noteTextInput.value = note; // Notu metin giriş alanına yerleştir
            });

            // Download butonu
            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download';
            downloadButton.className = 'download-note';

            // İndirme seçenekleri
            const downloadOptions = document.createElement('div');
            downloadOptions.className = 'download-options';

            const pdfButton = document.createElement('button');
            pdfButton.textContent = 'PDF';
            pdfButton.className = 'export-pdf';
            pdfButton.addEventListener('click', function (event) {
                event.stopPropagation();
                exportAsPDF(note);
            });

            const wordButton = document.createElement('button');
            wordButton.textContent = 'Word';
            wordButton.className = 'export-word';
            wordButton.addEventListener('click', function (event) {
                event.stopPropagation();
                exportAsWord(note);
            });

            downloadOptions.appendChild(pdfButton);
            downloadOptions.appendChild(wordButton);

            // Butonlar ve seçenekler li'ye ekleniyor
            li.appendChild(textSpan);
            li.appendChild(deleteButton);
            li.appendChild(openButton);
            li.appendChild(downloadButton);
            li.appendChild(downloadOptions);

            notesList.appendChild(li);

            // Download butonuna tıklama işlevi
            downloadButton.addEventListener('click', function (event) {
                event.stopPropagation();
                // Diğer açık indirme seçeneklerini kapat
                document.querySelectorAll('.download-options').forEach(function (el) {
                    if (el !== downloadOptions) {
                        el.style.display = 'none';
                    }
                });
                // Bu not için indirme seçeneklerini aç/kapat
                downloadOptions.style.display = downloadOptions.style.display === 'none' ? 'block' : 'none';
            });
        });
    }

    // Notları PDF ve Word olarak dışa aktarma fonksiyonları
    function exportAsPDF(note) {
        const doc = new jsPDF();
        doc.text(note, 10, 10);
        doc.save('note.pdf');
    }

    function exportAsWord(note) {
        const content = `<p>${note}</p>`;
        const converted = htmlDocx.asBlob(content);
        saveAs(converted, 'note.docx');
    }
});
