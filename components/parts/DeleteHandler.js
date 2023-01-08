import { deleteService } from '@/services';
import { useMainStore } from '@/store/MainStore';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';

function DeleteHandler({ name, item, setItem, id, setState }) {
    const items = useMainStore(state => state[item]);
    const setItems = useMainStore(state => state[setItem]);
    useEffect(() => {
        const deleteItem = async () => {
            const res = await deleteService(name, id);
            if (res) {
                setItems(items.filter(i => i.id !== id));
                toast.success(res.message, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            setState(null);
        }
        deleteItem();
    }, []);
    return (
        <>
        </>
    )
}

export default DeleteHandler