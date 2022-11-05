import { addService } from "@/services";

const uploadFile = async (name, file, endpoint) => {

    const formData = new FormData();
    formData.append(name, file);
    const data = await addService(endpoint, formData);
    return data;

}

export default uploadFile;