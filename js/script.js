// NGEBATESIN SIZE FILE

var uploadField = document.getElementById('input');
uploadField.onchange = function () {
    if (this.files[0].size > 2000000) { // ini untuk ukuran 1000000 = 1 MB.
        alert("Erorr! Your file size more than 2MB.");
        this.value = "";
    };
};

//IMPORT XLS CSV

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement('th');
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTableRows(table, data) {
    let newRow = table.insertRow(-1);
    data.map((row, index) => {
        let newCell = newRow.insertCell();
        let newText = document.createTextNode(row);
        newCell.appendChild(newText);
    });
}

var input = document.getElementById('input');
input.addEventListener('change', function () {
    let len = input.files[0].name.split('.').length
    let ext = input.files[0].name.split('.')[len - 1]

    if(ext == 'xls' || ext == 'xlsx'){ //Ini XLS
        readXlsxFile(input.files[0]).then(function (data) {
            console.log(data);
            var i = 0;
            data.map((row, index) => {
                if (i == 0) {
                    let table = document.getElementById('tbl-data');
                    generateTableHead(table, row);
                }
    
                if (i > 0) {
                    let table = document.getElementById('tbl-data');
                    generateTableRows(table, row);
                }
                i++;
            });
        });
    }else if(ext == 'csv'){ //Ini CSV
        Papa.parse(document.getElementById('input').files[0], {
            download: true,
            header: false,
            complete: function (results) {
                let i = 0;
                results.data.map((data, index) => {
                    if (i === 0) {
                        let table = document.getElementById('tbl-data');
                        generateTableHead(table, data);
                    } else {
                        let table = document.getElementById('tbl-data');
                        generateTableRows(table, data);
                    }
                    i++;
                });
            }
        });
    }
});


