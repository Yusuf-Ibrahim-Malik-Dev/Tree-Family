const fs = require('fs');
const path = require('path');
const https = require('https');

// Konfigurasi folder dan file yang akan diunduh
const ASSETS_DIR = path.join(__dirname, 'assets');
const LIBRARIES = [
    {
        name: 'html2canvas.min.js',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
    },
    {
        name: 'jspdf.umd.min.js',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
    }
];

// Fungsi untuk membuat folder jika belum ada
if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR);
    console.log('📁 Folder "assets" berhasil dibuat.');
}

// Fungsi pembantu untuk mengunduh file via HTTPS
function downloadFile(url, destPath, filename) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Gagal mengunduh ${filename}. Status: ${response.statusCode}`));
                return;
            }
            
            response.pipe(file);
            
            file.on('finish', () => {
                file.close();
                console.log(`✅ Berhasil mengunduh: ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(destPath, () => {}); // Hapus file corup jika error
            reject(err);
        });
    });
}

// Eksekusi proses unduh semua silsilah aset pustaka
async function main() {
    console.log('⏳ Memulai pengunduhan aset pustaka untuk mode offline...');
    for (const lib of LIBRARIES) {
        const destPath = path.join(ASSETS_DIR, lib.name);
        try {
            await downloadFile(lib.url, destPath, lib.name);
        } catch (error) {
            console.error(`❌ ${error.message}`);
        }
    }
    console.log('\n🎉 Selesai! Semua aset eksternal kini tersedia secara lokal.');
    console.log('Aplikasi Anda sekarang siap dijalankan 100% Offline.');
}

main();