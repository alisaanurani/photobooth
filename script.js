/* =====================================================
   SNAPBOX INDONESIA
   JAVASCRIPT
===================================================== */


/* =====================================================
   DATA APLIKASI
===================================================== */

const aplikasi = {

    kamera: null,

    kameraDepan: true,

    jumlahFoto: 1,

    waktuHitung: 3,

    templat: "klasik",

    filter: "normal",

    warnaBingkai: "#ffffff",

    foto: [],

    stiker: [],

    caption: "",

    nama: "",

    tanggal: "",

    font: "Nunito",

    musikURL: null,

    idGaleriAktif: null

};


/* =====================================================
   ELEMENT
===================================================== */

const video =
    document.getElementById(
        "kameraVideo"
    );

const kanvas =
    document.getElementById(
        "kanvas"
    );

const placeholder =
    document.getElementById(
        "kameraPlaceholder"
    );

const statusKamera =
    document.getElementById(
        "statusKamera"
    );

const angkaHitung =
    document.getElementById(
        "angkaHitungMundur"
    );

const hasilSection =
    document.getElementById(
        "hasilSection"
    );

const hasilGambar =
    document.getElementById(
        "hasilGambar"
    );

const gridGaleri =
    document.getElementById(
        "gridGaleri"
    );

const gridFavorit =
    document.getElementById(
        "gridFavorit"
    );

const galeriKosong =
    document.getElementById(
        "galeriKosong"
    );

const favoritKosong =
    document.getElementById(
        "favoritKosong"
    );

const notifikasi =
    document.getElementById(
        "notifikasi"
    );

const modal =
    document.getElementById(
        "modalPreview"
    );

const gambarModal =
    document.getElementById(
        "gambarModal"
    );


/* =====================================================
   NAVIGASI
===================================================== */

document
    .querySelectorAll(".nav-link")
    .forEach(tombol => {

        tombol.addEventListener(
            "click",
            () => {

                bukaHalaman(
                    tombol.dataset.page
                );

            }
        );

    });


function bukaHalaman(namaHalaman) {

    document
        .querySelectorAll(".page")
        .forEach(halaman => {

            halaman.classList.remove(
                "active"
            );

        });


    const halaman =
        document.getElementById(
            namaHalaman + "Page"
        );


    if (halaman) {

        halaman.classList.add(
            "active"
        );

    }


    document
        .querySelectorAll(".nav-link")
        .forEach(tombol => {

            tombol.classList.toggle(
                "active",
                tombol.dataset.page ===
                namaHalaman
            );

        });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (
        namaHalaman === "galeri"
    ) {

        tampilkanGaleri();

    }


    if (
        namaHalaman === "favorit"
    ) {

        tampilkanFavorit();

    }

}


/* =====================================================
   TOMBOL MULAI FOTO
===================================================== */

document
    .getElementById(
        "mulaiFotoButton"
    )
    .addEventListener(
        "click",
        () => {

            bukaHalaman("studio");

            aktifkanKamera();

        }
    );


document
    .getElementById(
        "mulaiDariGaleriButton"
    )
    .addEventListener(
        "click",
        () => {

            bukaHalaman("studio");

            aktifkanKamera();

        }
    );


/* =====================================================
   KAMERA
===================================================== */

document
    .getElementById(
        "aktifkanKameraButton"
    )
    .addEventListener(
        "click",
        aktifkanKamera
    );


async function aktifkanKamera() {

    try {

        if (
            aplikasi.kamera
        ) {

            aplikasi.kamera
                .getTracks()
                .forEach(
                    track =>
                        track.stop()
                );

        }


        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices
                .getUserMedia
        ) {

            tampilkanNotifikasi(
                "Browser tidak mendukung kamera."
            );

            return;

        }


        aplikasi.kamera =
            await navigator.mediaDevices
                .getUserMedia({

                    video: {

                        facingMode:
                            aplikasi.kameraDepan
                                ? "user"
                                : "environment",

                        width: {
                            ideal: 1280
                        },

                        height: {
                            ideal: 720
                        }

                    },

                    audio: false

                });


        video.srcObject =
            aplikasi.kamera;


        video.style.display =
            "block";


        placeholder.style.display =
            "none";


        statusKamera.textContent =
            "KAMERA AKTIF";


        document
            .querySelector(
                ".status-dot"
            )
            .style.background =
            "#59e39a";


        tampilkanNotifikasi(
            "Kamera berhasil diaktifkan 📸"
        );

    }

    catch (error) {

        console.error(error);


        statusKamera.textContent =
            "IZIN KAMERA DITOLAK";


        tampilkanNotifikasi(
            "Izinkan akses kamera untuk mengambil foto."
        );

    }

}


/* =====================================================
   BALIK KAMERA
===================================================== */

document
    .getElementById(
        "balikKameraButton"
    )
    .addEventListener(
        "click",
        balikKamera
    );


document
    .getElementById(
        "balikKameraButton2"
    )
    .addEventListener(
        "click",
        balikKamera
    );


async function balikKamera() {

    aplikasi.kameraDepan =
        !aplikasi.kameraDepan;


    if (
        aplikasi.kamera
    ) {

        await aktifkanKamera();

    }

}


/* =====================================================
   JUMLAH FOTO
===================================================== */

document
    .querySelectorAll(
        ".pilihan-button"
    )
    .forEach(tombol => {

        tombol.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".pilihan-button"
                    )
                    .forEach(
                        item =>
                            item.classList
                                .remove(
                                    "aktif"
                                )
                    );


                tombol.classList.add(
                    "aktif"
                );


                aplikasi.jumlahFoto =
                    Number(
                        tombol.dataset.jumlah
                    );

            }
        );

    });


/* =====================================================
   HITUNG MUNDUR
===================================================== */

document
    .querySelectorAll(
        ".hitungan-button"
    )
    .forEach(tombol => {

        tombol.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".hitungan-button"
                    )
                    .forEach(
                        item =>
                            item.classList
                                .remove(
                                    "aktif"
                                )
                    );


                tombol.classList.add(
                    "aktif"
                );


                aplikasi.waktuHitung =
                    Number(
                        tombol.dataset.waktu
                    );

            }
        );

    });


/* =====================================================
   AMBIL FOTO
===================================================== */

document
    .getElementById(
        "ambilFotoButton"
    )
    .addEventListener(
        "click",
        mulaiSesiFoto
    );


async function mulaiSesiFoto() {

    if (
        !aplikasi.kamera
    ) {

        tampilkanNotifikasi(
            "Aktifkan kamera terlebih dahulu 📷"
        );

        return;

    }


    aplikasi.foto = [];


    const tombol =
        document.getElementById(
            "ambilFotoButton"
        );


    tombol.disabled = true;


    const audio =
        document.getElementById(
            "pemutarMusik"
        );


    if (
        audio.src
    ) {

        audio.currentTime = 0;

        audio.play().catch(
            () => {}
        );

    }


    for (
        let i = 0;
        i < aplikasi.jumlahFoto;
        i++
    ) {

        await hitungMundur();


        const foto =
            ambilFrameKamera();


        aplikasi.foto.push(
            foto
        );


        tampilkanNotifikasi(
            `Foto ${i + 1} dari ${aplikasi.jumlahFoto} berhasil 📸`
        );


        await tunggu(700);

    }


    tombol.disabled = false;


    buatHasilFoto();

}


/* =====================================================
   HITUNG MUNDUR
===================================================== */

function hitungMundur() {

    return new Promise(
        selesai => {

            let angka =
                aplikasi.waktuHitung;


            angkaHitung.textContent =
                angka;


            const interval =
                setInterval(
                    () => {

                        angka--;


                        if (
                            angka <= 0
                        ) {

                            clearInterval(
                                interval
                            );


                            angkaHitung.textContent =
                                "📸";


                            setTimeout(
                                () => {

                                    angkaHitung
                                        .textContent =
                                        "";

                                    selesai();

                                },
                                250
                            );

                        }

                        else {

                            angkaHitung
                                .textContent =
                                angka;

                        }

                    },
                    1000
                );

        }
    );

}


/* =====================================================
   AMBIL FRAME KAMERA
===================================================== */

function ambilFrameKamera() {

    const lebar =
        video.videoWidth ||
        1280;

    const tinggi =
        video.videoHeight ||
        720;


    kanvas.width =
        lebar;

    kanvas.height =
        tinggi;


    const ctx =
        kanvas.getContext(
            "2d"
        );


    ctx.save();


    ctx.filter =
        dapatkanFilterCanvas();


    if (
        aplikasi.kameraDepan
    ) {

        ctx.translate(
            lebar,
            0
        );

        ctx.scale(
            -1,
            1
        );

    }


    ctx.drawImage(
        video,
        0,
        0,
        lebar,
        tinggi
    );


    ctx.restore();


    return kanvas.toDataURL(
        "image/jpeg",
        .9
    );

}


/* =====================================================
   FILTER
===================================================== */

function dapatkanFilterCanvas() {

    const filter = {

        "normal":
            "none",

        "hitam-putih":
            "grayscale(1)",

        "vintage":
            "sepia(.45) contrast(1.08) saturate(.8)",

        "hangat":
            "sepia(.18) saturate(1.35) contrast(1.03)",

        "dingin":
            "hue-rotate(12deg) saturate(.9)",

        "dreamy":
            "brightness(1.08) saturate(.78) contrast(.95)",

        "y2k":
            "saturate(1.45) contrast(1.1)",

        "vhs":
            "contrast(1.2) saturate(.8) brightness(.96)"

    };


    return (
        filter[
            aplikasi.filter
        ] ||
        "none"
    );

}


/* =====================================================
   TEMPlAT
===================================================== */

document
    .querySelectorAll(
        ".templat-button"
    )
    .forEach(tombol => {

        tombol.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".templat-button"
                    )
                    .forEach(
                        item =>
                            item.classList
                                .remove(
                                    "aktif"
                                )
                    );


                tombol.classList.add(
                    "aktif"
                );


                aplikasi.templat =
                    tombol.dataset
                        .templat;


                if (
                    aplikasi.foto.length
                ) {

                    buatHasilFoto();

                }

            }
        );

    });


/* =====================================================
   FILTER
===================================================== */

document
    .querySelectorAll(
        ".filter-button"
    )
    .forEach(tombol => {

        tombol.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".filter-button"
                    )
                    .forEach(
                        item =>
                            item.classList
                                .remove(
                                    "aktif"
                                )
                    );


                tombol.classList.add(
                    "aktif"
                );


                aplikasi.filter =
                    tombol.dataset.filter;


                if (
                    aplikasi.foto.length
                ) {

                    buatHasilFoto();

                }

            }
        );

    });


/* =====================================================
   WARNA BINGKAI
===================================================== */

document
    .querySelectorAll(
        ".warna-button"
    )
    .forEach(tombol => {

        tombol.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".warna-button"
                    )
                    .forEach(
                        item =>
                            item.classList
                                .remove(
                                    "aktif"
                                )
                    );


                tombol.classList.add(
                    "aktif"
                );


                aplikasi.warnaBingkai =
                    tombol.dataset.warna;


                if (
                    aplikasi.foto.length
                ) {

                    buatHasilFoto();

                }

            }
        );

    });


/* =====================================================
   TEKS
===================================================== */

document
    .getElementById(
        "terapkanTeksButton"
    )
    .addEventListener(
        "click",
        () => {

            aplikasi.caption =
                document
                    .getElementById(
                        "inputCaption"
                    )
                    .value;


            aplikasi.nama =
                document
                    .getElementById(
                        "inputNama"
                    )
                    .value;


            aplikasi.tanggal =
                document
                    .getElementById(
                        "inputTanggal"
                    )
                    .value;


            aplikasi.font =
                document
                    .getElementById(
                        "pilihanFont"
                    )
                    .value;


            if (
                aplikasi.foto.length
            ) {

                buatHasilFoto();

            }


            tampilkanNotifikasi(
                "Teks berhasil diterapkan ✏️"
            );

        }
    );


/* =====================================================
   STIKER
===================================================== */

document
    .querySelectorAll(
        ".stiker-button"
    )
    .forEach(tombol => {

        tombol.addEventListener(
            "click",
            () => {

                aplikasi.stiker.push(
                    tombol.textContent
                );


                if (
                    aplikasi.foto.length
                ) {

                    buatHasilFoto();

                }

            }
        );

    });


document
    .getElementById(
        "hapusStikerButton"
    )
    .addEventListener(
        "click",
        () => {

            aplikasi.stiker = [];


            if (
                aplikasi.foto.length
            ) {

                buatHasilFoto();

            }


            tampilkanNotifikasi(
                "Semua stiker dihapus."
            );

        }
    );


/* =====================================================
   TAB EDITOR
===================================================== */

document
    .querySelectorAll(
        ".editor-tab"
    )
    .forEach(tombol => {

        tombol.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".editor-tab"
                    )
                    .forEach(
                        item =>
                            item.classList
                                .remove(
                                    "aktif"
                                )
                    );


                document
                    .querySelectorAll(
                        ".isi-editor"
                    )
                    .forEach(
                        item =>
                            item.classList
                                .remove(
                                    "aktif"
                                )
                    );


                tombol.classList.add(
                    "aktif"
                );


                const target =
                    document.getElementById(
                        tombol.dataset
                            .editor +
                        "Editor"
                    );


                if (target) {

                    target.classList.add(
                        "aktif"
                    );

                }

            }
        );

    });


/* =====================================================
   BUAT HASIL FOTO
===================================================== */

function buatHasilFoto() {

    if (
        !aplikasi.foto.length
    ) {

        return;

    }


    const gambar =
        buatKanvasTemplat();


    hasilGambar.src =
        gambar;


    hasilSection.classList.remove(
        "tersembunyi"
    );


    setTimeout(
        () => {

            hasilSection.scrollIntoView({
                behavior: "smooth"
            });

        },
        100
    );

}


/* =====================================================
   BUAT KANVAS TEMPlAT
===================================================== */

function buatKanvasTemplat() {

    const hasil =
        document.createElement(
            "canvas"
        );


    const ctx =
        hasil.getContext(
            "2d"
        );


    const lebar = 1000;


    const tinggi =
        aplikasi.foto.length *
        470 +
        280;


    hasil.width =
        lebar;

    hasil.height =
        tinggi;


    /* LATAR */

    ctx.fillStyle =
        aplikasi.warnaBingkai;


    ctx.fillRect(
        0,
        0,
        lebar,
        tinggi
    );


    /* LATAR TEMPlAT */

    terapkanLatarTemplat(
        ctx,
        lebar,
        tinggi
    );


    /* FOTO */

    const margin = 55;

    const jarak = 18;

    const lebarFoto =
        lebar -
        margin * 2;

    const tinggiFoto =
        380;


    aplikasi.foto.forEach(
        (src, index) => {

            const gambar =
                new Image();


            gambar.src =
                src;


            const y =
                35 +
                index *
                (
                    tinggiFoto +
                    jarak
                );


            ctx.save();


            buatKotakBulat(
                ctx,
                margin,
                y,
                lebarFoto,
                tinggiFoto,
                16
            );


            ctx.clip();


            ctx.filter =
                dapatkanFilterCanvas();


            ctx.drawImage(
                gambar,
                margin,
                y,
                lebarFoto,
                tinggiFoto
            );


            ctx.restore();

        }
    );


    /* TEKS */

    const warnaTeks =
        warnaTeksTemplat();


    ctx.textAlign =
        "center";


    ctx.fillStyle =
        warnaTeks;


    ctx.font =
        `800 37px "${aplikasi.font}"`;


    const posisiTeks =
        tinggi - 145;


    if (
        aplikasi.caption
    ) {

        ctx.fillText(
            aplikasi.caption,
            lebar / 2,
            posisiTeks
        );

    }


    ctx.font =
        `700 23px "${aplikasi.font}"`;


    if (
        aplikasi.nama
    ) {

        ctx.fillText(
            aplikasi.nama,
            lebar / 2,
            posisiTeks + 38
        );

    }


    ctx.font =
        `500 18px "${aplikasi.font}"`;


    ctx.fillText(
        aplikasi.tanggal ||
        tanggalHariIni(),
        lebar / 2,
        posisiTeks + 70
    );


    /* STIKER */

    if (
        aplikasi.stiker.length
    ) {

        ctx.font =
            "40px sans-serif";


        aplikasi.stiker.forEach(
            (stiker, index) => {

                const x =
                    60 +
                    (
                        index % 6
                    ) * 165;


                ctx.fillText(
                    stiker,
                    x,
                    tinggi - 35
                );

            }
        );

    }


    /* LOGO */

    ctx.font =
        `900 15px "${aplikasi.font}"`;


    ctx.fillStyle =
        warnaTeks;


    ctx.fillText(
        "SNAPBOX ✦",
        lebar / 2,
        tinggi - 10
    );


    return hasil.toDataURL(
        "image/png"
    );

}


/* =====================================================
   LATAR TEMPlAT
===================================================== */

function terapkanLatarTemplat(
    ctx,
    lebar,
    tinggi
) {

    let gradient;


    if (
        aplikasi.templat ===
        "pink"
    ) {

        gradient =
            ctx.createLinearGradient(
                0,
                0,
                lebar,
                tinggi
            );


        gradient.addColorStop(
            0,
            "#ffd5e8"
        );


        gradient.addColorStop(
            1,
            "#fff2f8"
        );


        ctx.fillStyle =
            gradient;


        ctx.fillRect(
            0,
            0,
            lebar,
            tinggi
        );

    }


    else if (
        aplikasi.templat ===
        "biru"
    ) {

        gradient =
            ctx.createLinearGradient(
                0,
                0,
                lebar,
                tinggi
            );


        gradient.addColorStop(
            0,
            "#c2ecff"
        );


        gradient.addColorStop(
            1,
            "#effaff"
        );


        ctx.fillStyle =
            gradient;


        ctx.fillRect(
            0,
            0,
            lebar,
            tinggi
        );

    }


    else if (
        aplikasi.templat ===
        "y2k"
    ) {

        gradient =
            ctx.createLinearGradient(
                0,
                0,
                lebar,
                tinggi
            );


        gradient.addColorStop(
            0,
            "#e6dcff"
        );


        gradient.addColorStop(
            .5,
            "#ffffff"
        );


        gradient.addColorStop(
            1,
            "#bdeaff"
        );


        ctx.fillStyle =
            gradient;


        ctx.fillRect(
            0,
            0,
            lebar,
            tinggi
        );

    }


    else if (
        aplikasi.templat ===
        "film"
    ) {

        ctx.fillStyle =
            "#211e1e";


        ctx.fillRect(
            0,
            0,
            lebar,
            tinggi
        );


        ctx.fillStyle =
            "#ffffff";


        for (
            let y = 15;
            y < tinggi;
            y += 50
        ) {

            ctx.fillRect(
                9,
                y,
                27,
                27
            );


            ctx.fillRect(
                lebar - 36,
                y,
                27,
                27
            );

        }

    }


    else if (
        aplikasi.templat ===
        "gelap"
    ) {

        ctx.fillStyle =
            "#171720";


        ctx.fillRect(
            0,
            0,
            lebar,
            tinggi
        );

    }


    else if (
        aplikasi.templat ===
        "pesta"
    ) {

        gradient =
            ctx.createLinearGradient(
                0,
                0,
                lebar,
                tinggi
            );


        gradient.addColorStop(
            0,
            "#ffd4e8"
        );


        gradient.addColorStop(
            .5,
            "#e2d7ff"
        );


        gradient.addColorStop(
            1,
            "#c5ecff"
        );


        ctx.fillStyle =
            gradient;


        ctx.fillRect(
            0,
            0,
            lebar,
            tinggi
        );

    }

}


/* =====================================================
   WARNA TEKS
===================================================== */

function warnaTeksTemplat() {

    if (
        aplikasi.templat ===
        "gelap" ||

        aplikasi.templat ===
        "film"
    ) {

        return "#ffffff";

    }


    return "#252536";

}


/* =====================================================
   KOTAK BULAT
===================================================== */

function buatKotakBulat(
    ctx,
    x,
    y,
    width,
    height,
    radius
) {

    ctx.beginPath();


    ctx.roundRect(
        x,
        y,
        width,
        height,
        radius
    );

}


/* =====================================================
   UPLOAD FOTO
===================================================== */

document
    .getElementById(
        "galeriUploadButton"
    )
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "uploadFotoInput"
                )
                .click();

        }
    );


document
    .getElementById(
        "uploadFotoInput"
    )
    .addEventListener(
        "change",
        async event => {

            const fileList =
                [
                    ...event.target.files
                ];


            if (
                !fileList.length
            ) {

                return;

            }


            aplikasi.foto = [];


            for (
                const file
                of fileList
            ) {

                if (
                    aplikasi.foto.length >=
                    aplikasi.jumlahFoto
                ) {

                    break;

                }


                const gambar =
                    await bacaFile(
                        file
                    );


                aplikasi.foto.push(
                    gambar
                );

            }


            buatHasilFoto();


            tampilkanNotifikasi(
                "Foto berhasil ditambahkan 🖼️"
            );

        }
    );


function bacaFile(file) {

    return new Promise(
        selesai => {

            const pembaca =
                new FileReader();


            pembaca.onload =
                () => {

                    selesai(
                        pembaca.result
                    );

                };


            pembaca.readAsDataURL(
                file
            );

        }
    );

}


/* =====================================================
   MUSIK
===================================================== */

document
    .getElementById(
        "inputMusik"
    )
    .addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];


            if (
                !file
            ) {

                return;

            }


            const audio =
                document.getElementById(
                    "pemutarMusik"
                );


            if (
                aplikasi.musikURL
            ) {

                URL.revokeObjectURL(
                    aplikasi.musikURL
                );

            }


            aplikasi.musikURL =
                URL.createObjectURL(
                    file
                );


            audio.src =
                aplikasi.musikURL;


            audio.hidden =
                false;


            tampilkanNotifikasi(
                "Musik berhasil ditambahkan 🎵"
            );

        }
    );


document
    .getElementById(
        "putarMusikButton"
    )
    .addEventListener(
        "click",
        () => {

            const audio =
                document.getElementById(
                    "pemutarMusik"
                );


            if (
                !audio.src
            ) {

                tampilkanNotifikasi(
                    "Pilih musik terlebih dahulu."
                );

                return;

            }


            audio.play();

        }
    );


document
    .getElementById(
        "jedaMusikButton"
    )
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "pemutarMusik"
                )
                .pause();

        }
    );


document
    .getElementById(
        "volumeMusik"
    )
    .addEventListener(
        "input",
        event => {

            document
                .getElementById(
                    "pemutarMusik"
                )
                .volume =
                Number(
                    event.target.value
                );

        }
    );


/* =====================================================
   SIMPAN GALERI
===================================================== */

function ambilDataGaleri() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "snapbox_galeri"
            )
        ) || [];

    }

    catch {

        return [];

    }

}


function simpanDataGaleri(
    data
) {

    try {

        localStorage.setItem(
            "snapbox_galeri",
            JSON.stringify(data)
        );


        return true;

    }

    catch {

        tampilkanNotifikasi(
            "Penyimpanan penuh. Hapus beberapa foto."
        );


        return false;

    }

}


/* =====================================================
   SIMPAN KE GALERI
===================================================== */

function simpanKeGaleri(
    favorit = false
) {

    if (
        !hasilGambar.src
    ) {

        return;

    }


    const galeri =
        ambilDataGaleri();


    const dataBaru = {

        id:
            Date.now(),

        gambar:
            hasilGambar.src,

        favorit:
            favorit,

        waktu:
            new Date().toISOString()

    };


    galeri.unshift(
        dataBaru
    );


    if (
        simpanDataGaleri(
            galeri
        )
    ) {

        tampilkanNotifikasi(
            favorit
                ? "Disimpan ke Favorit ❤️"
                : "Foto disimpan ke Galeri ✨"
        );

    }


    tampilkanGaleri();
    tampilkanFavorit();

}


/* =====================================================
   TOMBOL SIMPAN FAVORIT
===================================================== */

document
    .getElementById(
        "simpanFavoritButton"
    )
    .addEventListener(
        "click",
        () => {

            simpanKeGaleri(
                true
            );

        }
    );


/* =====================================================
   TAMPILKAN GALERI
===================================================== */

function tampilkanGaleri() {

    const galeri =
        ambilDataGaleri();


    gridGaleri.innerHTML =
        "";


    if (
        !galeri.length
    ) {

        galeriKosong.style.display =
            "block";


        return;

    }


    galeriKosong.style.display =
        "none";


    galeri.forEach(
        item => {

            gridGaleri.appendChild(
                buatItemGaleri(
                    item
                )
            );

        }
    );

}


/* =====================================================
   BUAT ITEM GALERI
===================================================== */

function buatItemGaleri(
    item
) {

    const div =
        document.createElement(
            "div"
        );


    div.className =
        "item-galeri";


    div.innerHTML = `

        <img
            src="${item.gambar}"
            alt="Foto SnapBox">

        <div class="info-galeri">

            <small>
                ${formatTanggal(item.waktu)}
            </small>

            <button
                class="tombol-hati">

                ${item.favorit
                    ? "❤️"
                    : "♡"}

            </button>

        </div>

    `;


    div.querySelector(
        "img"
    ).addEventListener(
        "click",
        () => {

            bukaModal(
                item
            );

        }
    );


    div.querySelector(
        ".tombol-hati"
    ).addEventListener(
        "click",
        event => {

            event.stopPropagation();


            ubahFavorit(
                item.id
            );

        }
    );


    return div;

}


/* =====================================================
   FAVORIT
===================================================== */

function tampilkanFavorit() {

    const galeri =
        ambilDataGaleri()
            .filter(
                item =>
                    item.favorit
            );


    gridFavorit.innerHTML =
        "";


    if (
        !galeri.length
    ) {

        favoritKosong.style.display =
            "block";


        return;

    }


    favoritKosong.style.display =
        "none";


    galeri.forEach(
        item => {

            gridFavorit.appendChild(
                buatItemGaleri(
                    item
                )
            );

        }
    );

}


/* =====================================================
   UBAH FAVORIT
===================================================== */

function ubahFavorit(
    id
) {

    const galeri =
        ambilDataGaleri();


    const item =
        galeri.find(
            data =>
                data.id === id
        );


    if (
        !item
    ) {

        return;

    }


    item.favorit =
        !item.favorit;


    simpanDataGaleri(
        galeri
    );


    tampilkanGaleri();

    tampilkanFavorit();


    tampilkanNotifikasi(
        item.favorit
            ? "Ditambahkan ke Favorit ❤️"
            : "Dihapus dari Favorit"
    );

}


/* =====================================================
   MODAL
===================================================== */

function bukaModal(
    item
) {

    aplikasi.idGaleriAktif =
        item.id;


    gambarModal.src =
        item.gambar;


    modal.classList.add(
        "aktif"
    );

}


function tutupModal() {

    modal.classList.remove(
        "aktif"
    );

}


document
    .getElementById(
        "tutupModalButton"
    )
    .addEventListener(
        "click",
        tutupModal
    );


modal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            modal
        ) {

            tutupModal();

        }

    }
);


/* =====================================================
   MODAL DOWNLOAD
===================================================== */

document
    .getElementById(
        "unduhModalButton"
    )
    .addEventListener(
        "click",
        () => {

            unduhGambar(
                gambarModal.src
            );

        }
    );


/* =====================================================
   MODAL FAVORIT
===================================================== */

document
    .getElementById(
        "favoritModalButton"
    )
    .addEventListener(
        "click",
        () => {

            if (
                aplikasi.idGaleriAktif
            ) {

                ubahFavorit(
                    aplikasi.idGaleriAktif
                );

            }

        }
    );


/* =====================================================
   MODAL HAPUS
===================================================== */

document
    .getElementById(
        "hapusModalButton"
    )
    .addEventListener(
        "click",
        () => {

            if (
                !aplikasi.idGaleriAktif
            ) {

                return;

            }


            const galeri =
                ambilDataGaleri()
                    .filter(
                        item =>
                            item.id !==
                            aplikasi.idGaleriAktif
                    );


            simpanDataGaleri(
                galeri
            );


            tutupModal();


            tampilkanGaleri();
            tampilkanFavorit();


            tampilkanNotifikasi(
                "Foto berhasil dihapus 🗑️"
            );

        }
    );


/* =====================================================
   HAPUS SEMUA GALERI
===================================================== */

document
    .getElementById(
        "hapusGaleriButton"
    )
    .addEventListener(
        "click",
        () => {

            const galeri =
                ambilDataGaleri();


            if (
                !galeri.length
            ) {

                return;

            }


            const yakin =
                confirm(
                    "Apakah kamu yakin ingin menghapus semua foto?"
                );


            if (
                !yakin
            ) {

                return;

            }


            localStorage.removeItem(
                "snapbox_galeri"
            );


            tampilkanGaleri();
            tampilkanFavorit();


            tampilkanNotifikasi(
                "Semua foto telah dihapus."
            );

        }
    );


/* =====================================================
   UNDUH
===================================================== */

document
    .getElementById(
        "unduhButton"
    )
    .addEventListener(
        "click",
        () => {

            unduhGambar(
                hasilGambar.src
            );

        }
    );


function unduhGambar(
    sumber
) {

    if (
        !sumber
    ) {

        return;

    }


    const link =
        document.createElement(
            "a"
        );


    link.href =
        sumber;


    link.download =
        `snapbox-${Date.now()}.png`;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    tampilkanNotifikasi(
        "Foto berhasil diunduh 📥"
    );

}


/* =====================================================
   BAGIKAN
===================================================== */

document
    .getElementById(
        "bagikanButton"
    )
    .addEventListener(
        "click",
        async () => {

            if (
                !hasilGambar.src
            ) {

                return;

            }


            try {

                const respons =
                    await fetch(
                        hasilGambar.src
                    );


                const blob =
                    await respons.blob();


                const file =
                    new File(
                        [
                            blob
                        ],
                        "snapbox.png",
                        {
                            type:
                                "image/png"
                        }
                    );


                if (
                    navigator.canShare &&
                    navigator.canShare({
                        files: [file]
                    })
                ) {

                    await navigator.share({

                        title:
                            "Foto SnapBox",

                        text:
                            "Lihat hasil fotoku dari SnapBox 📸",

                        files:
                            [file]

                    });

                }

                else if (
                    navigator.share
                ) {

                    await navigator.share({

                        title:
                            "Foto SnapBox",

                        text:
                            "Lihat hasil fotoku dari SnapBox 📸"

                    });

                }

                else {

                    tampilkanNotifikasi(
                        "Fitur bagikan tidak tersedia di browser ini."
                    );

                }

            }

            catch (
                error
            ) {

                console.log(
                    "Berbagi dibatalkan:",
                    error
                );

            }

        }
    );


/* =====================================================
   EDIT LAGI
===================================================== */

document
    .getElementById(
        "editLagiButton"
    )
    .addEventListener(
        "click",
        () => {

            hasilSection.scrollIntoView({
                behavior:
                    "smooth"
            });

        }
    );


/* =====================================================
   SESI BARU
===================================================== */

document
    .getElementById(
        "sesiBaruButton"
    )
    .addEventListener(
        "click",
        () => {

            aplikasi.foto = [];

            aplikasi.stiker = [];


            hasilGambar.src =
                "";


            hasilSection.classList.add(
                "tersembunyi"
            );


            window.scrollTo({
                top: 0,
                behavior:
                    "smooth"
            });


            tampilkanNotifikasi(
                "Sesi foto baru dimulai 📸"
            );

        }
    );


/* =====================================================
   ACAK GAYA
===================================================== */

document
    .getElementById(
        "acakGayaButton"
    )
    .addEventListener(
        "click",
        () => {

            const pilihan = [

                "imut",
                "y2k",
                "film",
                "biru",
                "gelap",
                "pesta"

            ];


            const acak =
                pilihan[
                    Math.floor(
                        Math.random() *
                        pilihan.length
                    )
                ];


            terapkanGaya(
                acak
            );


            bukaHalaman(
                "studio"
            );


            aktifkanKamera();


            tampilkanNotifikasi(
                `Gaya ${namaGaya(acak)} dipilih ✨`
            );

        }
    );


/* =====================================================
   PILIH GAYA DARI BERANDA
===================================================== */

document
    .querySelectorAll(
        ".gaya-card"
    )
    .forEach(kartu => {

        kartu.addEventListener(
            "click",
            () => {

                const gaya =
                    kartu.dataset.gaya;


                terapkanGaya(
                    gaya
                );


                bukaHalaman(
                    "studio"
                );


                aktifkanKamera();


                tampilkanNotifikasi(
                    `Gaya ${namaGaya(gaya)} dipilih ✨`
                );

            }
        );

    });


function terapkanGaya(
    gaya
) {

    const daftar = {

        imut: {

            templat:
                "pink",

            filter:
                "dreamy",

            warna:
                "#ffd6e8"

        },


        y2k: {

            templat:
                "y2k",

            filter:
                "y2k",

            warna:
                "#ffffff"

        },


        film: {

            templat:
                "film",

            filter:
                "vintage",

            warna:
                "#e7dcc1"

        },


        biru: {

            templat:
                "biru",

            filter:
                "dingin",

            warna:
                "#c7edff"

        },


        gelap: {

            templat:
                "gelap",

            filter:
                "vhs",

            warna:
                "#191922"

        },


        pesta: {

            templat:
                "pesta",

            filter:
                "hangat",

            warna:
                "#ffd6e8"

        }

    };


    const pilihan =
        daftar[gaya];


    if (
        !pilihan
    ) {

        return;

    }


    aplikasi.templat =
        pilihan.templat;


    aplikasi.filter =
        pilihan.filter;


    aplikasi.warnaBingkai =
        pilihan.warna;


    /* Templat */

    document
        .querySelectorAll(
            ".templat-button"
        )
        .forEach(
            tombol => {

                tombol.classList.toggle(
                    "aktif",
                    tombol.dataset
                        .templat ===
                    aplikasi.templat
                );

            }
        );


    /* Filter */

    document
        .querySelectorAll(
            ".filter-button"
        )
        .forEach(
            tombol => {

                tombol.classList.toggle(
                    "aktif",
                    tombol.dataset
                        .filter ===
                    aplikasi.filter
                );

            }
        );


    /* Warna */

    document
        .querySelectorAll(
            ".warna-button"
        )
        .forEach(
            tombol => {

                tombol.classList.toggle(
                    "aktif",
                    tombol.dataset
                        .warna ===
                    aplikasi.warnaBingkai
                );

            }
        );

}


function namaGaya(
    gaya
) {

    const nama = {

        imut:
            "Imut",

        y2k:
            "Y2K",

        film:
            "Film",

        biru:
            "Biru",

        gelap:
            "Gelap",

        pesta:
            "Pesta"

    };


    return (
        nama[gaya] ||
        gaya
    );

}


/* =====================================================
   LIHAT SEMUA TEMPLAT
===================================================== */

document
    .getElementById(
        "lihatTemplatButton"
    )
    .addEventListener(
        "click",
        () => {

            bukaHalaman(
                "studio"
            );


            document
                .getElementById(
                    "gayaEditor"
                )
                .scrollIntoView({
                    behavior:
                        "smooth"
                });

        }
    );


/* =====================================================
   DARK MODE
===================================================== */

document
    .getElementById(
        "modeButton"
    )
    .addEventListener(
        "click",
        () => {

            document.body
                .classList.toggle(
                    "gelap"
                );


            const aktif =
                document.body
                    .classList
                    .contains(
                        "gelap"
                    );


            localStorage.setItem(
                "snapbox_mode",
                aktif
            );


            document
                .getElementById(
                    "modeButton"
                )
                .textContent =
                aktif
                    ? "☀️"
                    : "🌙";

        }
    );


if (
    localStorage.getItem(
        "snapbox_mode"
    ) === "true"
) {

    document.body
        .classList.add(
            "gelap"
        );


    document
        .getElementById(
            "modeButton"
        )
        .textContent =
        "☀️";

}


/* =====================================================
   NOTIFIKASI
===================================================== */

function tampilkanNotifikasi(
    pesan
) {

    notifikasi
        .querySelector(
            "p"
        )
        .textContent =
        pesan;


    notifikasi
        .classList
        .add(
            "tampil"
        );


    clearTimeout(
        window.timerNotifikasi
    );


    window.timerNotifikasi =
        setTimeout(
            () => {

                notifikasi
                    .classList
                    .remove(
                        "tampil"
                    );

            },
            2500
        );

}


/* =====================================================
   TANGGAL
===================================================== */

function tanggalHariIni() {

    return new Date()
        .toLocaleDateString(
            "id-ID",
            {
                day:
                    "2-digit",

                month:
                    "long",

                year:
                    "numeric"
            }
        );

}


function formatTanggal(
    tanggal
) {

    return new Date(
        tanggal
    ).toLocaleDateString(
        "id-ID",
        {
            day:
                "2-digit",

            month:
                "short",

            year:
                "numeric"
        }
    );

}


/* =====================================================
   TUNGGU
===================================================== */

function tunggu(
    waktu
) {

    return new Promise(
        selesai =>
            setTimeout(
                selesai,
                waktu
            )
    );

}


/* =====================================================
   INISIALISASI
===================================================== */

video.style.display =
    "none";


tampilkanGaleri();

tampilkanFavorit();


console.log(
    "📸 SnapBox Indonesia siap digunakan!"
);