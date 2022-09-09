import React from 'react'
import { Flip, ToastContainer } from 'react-toastify'

function Toast() {
    return (
        <ToastContainer position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            transition={Flip}
            pauseOnHover />
    )
}

export default Toast