const config = window.localStorage;

let allBook = document.getElementById("allBook");
let completedBook = document.getElementById("completedBook");
let unCompletedBook = document.getElementById("unCompletedBook");
let search = document.getElementById("search");
let btnSearch = document.getElementById("btn_search");

function template(id, judul, penulis, tahun, deskripsi, keterangan) {
    let isComplete, button;
    if (keterangan == true) {
        isComplete = `<span class="badge bg-secondary mb-4 fw-normal">Yeay! Kamu telah melakukan kebaikan ini!</span>`;
        button = `<button class="btn btn-warning text-white" onclick="updateData(${id})">Ganti <i class="bi bi-dash-circle"></i></button>`
    } else {
        isComplete = `<span class="badge bg-warning mb-4 fw-normal">Ayo segera selesaikan kebaikan kamu yang ini!</span>`;
        button = `<button class="btn btn-success" onclick="updateData(${id})">Selesai <i class="bi bi-plus-circle"></i></button>`;
    }

    return `<div class="my-3" id="${id}">
                    <div class="card ">
                        <div class="card-body">
                            <h3 class="card-title">
                                ${judul}
                            </h3>
                            ${isComplete}
                            <div class="d-flex row-cols-2">
                                <div class="col-md-4">
                                    <p>Target</p>
                                    <p>Waktu (dalam menit)</p>
                                    <p>Deskripsi</p>
                                </div>
                                <div class="col-md-8">
                                    <p>${penulis}</p>
                                    <p>${tahun}</p>
                                    <p>${deskripsi}</p>

                                    <div class="d-flex">
                                        <div class="col-md-6">
                                            ${button}
                                        </div>
                                        <div class="col-md-6">
                                            <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                                Hapus
                                                <i class="bi bi-trash-fill"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="deleteModalLabel">Apakah kamu yakin?</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Apakah kamu yakin ingin menghapus datanya ?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                                <button type="button" class="btn btn-danger" onclick="deleteData(${id})">Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
                `
}

function getFormValue(id, judul, keterangan, penulis, tahun, deskripsi) {
    data = {
        id: id,
        title: judul,
        isComplete: keterangan,
        author: penulis,
        year: tahun,
        description: deskripsi
    }
    return data
}

function getDataFromLocalStorage(id) {
    let data = config.getItem(id);
    let result = JSON.parse(data);
    return result;
}

function addDataToLocalStorage(getFormValue) {
    let id = getFormValue.id;
    let json = JSON.stringify(getFormValue);
    config.setItem(id, json);
}

function submitData() {
    let temp = new Date;
    id = temp.getTime();
    judul = document.getElementById("judulBuku").value;
    penulis = document.getElementById("penulisBuku").value;
    tahun = document.getElementById("tahunBuku").value;
    deskripsi = document.getElementById("deskripsiBuku").value;

    let radio = document.getElementsByName("isComplete");

    keterangan = radio[0].checked ? true : false;

    getFormValue(id, judul, keterangan, penulis, tahun, deskripsi);
    addDataToLocalStorage(data);
}

function searchData(e) {
    let datax = {
        ...localStorage
    };
    let titleSearch = search.value;
    let keyObj = Object.keys(datax);
    let arraySearch = [];
    for (let x = 0; x < localStorage.length; x++) {
        let raw = localStorage.getItem(keyObj[x]);
        let data = JSON.parse(raw);
        if (data.title == titleSearch) {
            arraySearch[x] = template(data.id, data.title, data.author, data.year, data.description, data.isComplete);
        }
    }
    const newArr = arraySearch.filter((a) => a);
    let container = ""
    for (const item of newArr) {
        container += item
    }
    document.getElementById("containerSemuaBuku").innerHTML = "";
    document.getElementById("containerSemuaBuku").innerHTML = container;
    e.preventDefault();
}

function updateData(id) {
    let data = getDataFromLocalStorage(id);
    data.isComplete = data.isComplete == true ? false : true;
    let json = JSON.stringify(data);
    config.setItem(id, json);
    location.reload();
}

function deleteData(id) {
    localStorage.removeItem(id);
    location.reload();
}

allBook.addEventListener("click", showAllBookFun);
completedBook.addEventListener("click", showCompletedBookFun);
unCompletedBook.addEventListener("click", showUnCompletedBookFun);
btnSearch.addEventListener("click", searchData);

function showAllBook() {
    let datax = {
        ...localStorage
    };
    let keyObj = Object.keys(datax);
    let arraySemuaBuku = [];
    for (let x = 0; x < localStorage.length; x++) {
        let raw = localStorage.getItem(keyObj[x]);
        let data = JSON.parse(raw);
        arraySemuaBuku[x] = template(data.id, data.title, data.author, data.year, data.description, data.isComplete);
    }

    let container = ""
    for (const item of arraySemuaBuku) {
        container += item
    }
    document.getElementById("containerSemuaBuku").innerHTML = "";
    document.getElementById("containerSemuaBuku").innerHTML = container;
}

function showCompletedBook() {
    let datax = {
        ...localStorage
    };
    let keyObj = Object.keys(datax);
    let arraySelesaiDibaca = [];
    for (let x = 0; x < localStorage.length; x++) {
        let raw = localStorage.getItem(keyObj[x]);
        let data = JSON.parse(raw);
        if (data.isComplete == true) {
            arraySelesaiDibaca[x] = template(data.id, data.title, data.author, data.year, data.description, data.isComplete);
        }
    }

    const newArr = arraySelesaiDibaca.filter((a) => a);

    let container = ""
    for (const item of newArr) {
        container += item
    }
    document.getElementById("containerSemuaBuku").innerHTML = "";
    document.getElementById("containerSemuaBuku").innerHTML = container;
}

function showUnCompletedBook() {
    let datax = {
        ...localStorage
    };
    let keyObj = Object.keys(datax);
    let arrayBelumSelesaiDibaca = [];
    for (let x = 0; x < localStorage.length; x++) {
        let raw = localStorage.getItem(keyObj[x]);
        let data = JSON.parse(raw);
        if (data.isComplete == false) {
            arrayBelumSelesaiDibaca[x] = template(data.id, data.title, data.author, data.year, data.description, data.isComplete);
        }
    }
    const newArr = arrayBelumSelesaiDibaca.filter((a) => a);
    let container = ""
    for (const item of newArr) {
        container += item
    }
    document.getElementById("containerSemuaBuku").innerHTML = "";
    document.getElementById("containerSemuaBuku").innerHTML = container;
}

function showAllBookFun(e) {
    unCompletedBook.classList.remove("active");
    completedBook.classList.remove("active");
    allBook.classList.add("active");
    showAllBook();
    e.preventDefault();
}

function showCompletedBookFun(e) {
    unCompletedBook.classList.remove("active");
    completedBook.classList.add("active");
    allBook.classList.remove("active");
    showCompletedBook();
    e.preventDefault();
}

function showUnCompletedBookFun(e) {
    unCompletedBook.classList.add("active");
    completedBook.classList.remove("active");
    allBook.classList.remove("active");
    showUnCompletedBook();
    e.preventDefault();
}

window.onload = function () {
    showAllBookFun();
    showCompletedBookFun();
    showUnCompletedBookFun();
    searchData();
}