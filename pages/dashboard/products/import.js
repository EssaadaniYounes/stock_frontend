import { CurrentPageHeader } from '@/components/layouts'
import { ImportProductActions } from '@/components/ui'
import uploadFile from '@/utils/files';
import React, { useState } from 'react'

function importItems() {
    const [file, setFile] = useState(null);

    const sendFile = async () => {
        const res = await uploadFile('fileData', file, 'products/import');
        console.log(res);
    }

    return (
        <div>
            <CurrentPageHeader title="Import Products" component={ImportProductActions} />
            <div className="m-2 shadow-md bg-gray-300 rounded-md overflow-hidden">
                <div className="text-uppercase font-semibold bg-red-300 py-2 px-3">
                    Warning!
                </div>
                <div className="pt-1 pb-4 px-6">
                    <ul className="text-capitalize list-disc ltr:ml-2 rtl:mr-2 mt-1">
                        <li>Make sure the file contains at least the barcode and name of the product.</li>
                        <li>If the any line does not contain the supplier, category or unit the system will add a default ones.</li>
                        <li>If the quantity, sell price and buy price are null the system will add <span className="font-semibold">&quot;0&quot;</span> as a default values.</li>
                        <li>Do not close the app while importing.</li>
                    </ul>
                    <div className="flex items-center justify-between mt-2">
                        <div>
                            <label htmlFor="file" className="label">File:</label>
                            <input type="file" accept='.xlsx' name="file" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <button className="hovered-blue-button" onClick={() => sendFile()}>Import</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default importItems