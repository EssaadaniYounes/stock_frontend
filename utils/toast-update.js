import { toast } from 'react-toastify';

export default function ToastDone(message, id, res) {
    return toast.update(id, {
        render: message,
        type: res.success ? 'success' : 'error',
        isLoading: false,
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}