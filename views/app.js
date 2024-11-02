function fetchAllData() {
    fetch('/api/produksi/all')
        .then(response => response.json())
        .then(data => renderTable(data));
}

function clearTable() {
    document.querySelector('#dataTable tbody').innerHTML = '';
}

//Fungsi Filter Data
function filterData() {
    const tahun = document.getElementById('tahun').value;
    const jenis = document.getElementById('jenis').value;
    const hasil = document.getElementById('hasil').value;

    let url = `/api/produksi/filter?`;
    if (tahun) url += `tahun=${tahun}&`;
    if (jenis) url += `jenis=${jenis}&`;
    if (hasil) url += `hasil=${hasil}&`;
    

    fetch(url)
        .then(response => response.json())
        .then(data => renderTable(data));
}

//Fungsi POST Data
function addData() {
    const tahun = document.getElementById('tahun').value;
    const jenis = document.getElementById('jenis').value;
    const hasil = document.getElementById('hasil').value;

    fetch('/api/produksi/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tahun, jenis, hasil })
    })
    .then(response => response.json())
    .then(data => {
        alert("Data berhasil ditambahkan!");
        fetchAllData(); // Refresh data
    })
    .catch(error => console.error("Error:", error));
}

//Fungsi Update Data
function updateData(id) {
    const tahun = prompt("Masukkan tahun baru:");
    const jenis = prompt("Masukkan jenis baru:");
    const hasil = prompt("Masukkan hasil baru:");

    fetch(`/api/produksi/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tahun, jenis, hasil })
    })
    .then(response => response.json())
    .then(data => {
        alert("Data berhasil diperbarui!");
        fetchAllData();
    })
    .catch(error => console.error("Error:", error));
}

//Fungsi Hapus / Delete Data
function deleteData(id) {
    if (confirm("Anda yakin ingin menghapus data ini?")) {
        fetch(`/api/produksi/delete/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert("Data berhasil dihapus!");
            fetchAllData();
        })
        .catch(error => console.error("Error:", error));
    }
}

function fetchAllData() {
    fetch('/api/produksi/all')
        .then(response => response.json())
        .then(data => {
            renderTable(data);
            // Kosongkan input setelah mengambil semua data
            document.getElementById('tahun').value = '';
            document.getElementById('jenis').value = '';
            document.getElementById('hasil').value = '';
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function renderTable(data) {
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = '';
    data.forEach(item => {
        const row = `<tr>
            <td>${item.tahun}</td>
            <td>${item.jenis}</td>
            <td>${item.hasil}</td>
            <td>
                <button onclick="updateData('${item._id}')">Edit</button>
                <button onclick="deleteData('${item._id}')">Delete</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}
