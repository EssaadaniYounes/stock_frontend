import addService from "./addService";

const selectAdd = async (controller, item, setMainState, items, setItems) => {
    const res = await addService(controller, item);
    const id = res.data.id;
    setMainState(id);
    setItems([{ value: id, label: item[Object.keys(item)[0]] }, ...items]);
}

export default selectAdd;