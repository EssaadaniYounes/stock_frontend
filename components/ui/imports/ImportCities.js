import React from 'react'
import * as XLSX from 'xlsx';
function ImportCities() {
    const importExcel = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = async (event) => {
            const bstr = event.target.result;
            const workBook = XLSX.read(bstr, { type: 'binary' });
            // return;
            const workSheetName = workBook.SheetNames[0];
            const worksheet = workBook.Sheets[workSheetName];
            const fileData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const headers = fileData[0];
            const heads = headers.map(head => ({ title: head, field: head }))
            fileData.splice(0, 1);
            // return;
            console.log(heads)
            const rows = await convertJSON(heads, fileData);
            console.log(rows);
        }

        reader.readAsBinaryString(file);


    }
    const convertJSON = async (headers, data) => {
        const rows = [];
        data.map(async row => {
            let rowData = {};
            row.map(async (el, ind) => {
                rowData[headers[ind]] = el;
            })
            rows.push(rowData);
        })
        return rows;
    }
    return (
        <div>

            <input type="file" accept='.xlsx' name="xlsx" id="" onChange={e => importExcel(e)} />

        </div>
    )
}

export default ImportCities