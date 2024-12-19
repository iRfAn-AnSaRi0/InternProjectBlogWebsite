import { v2 } from "cloudinary";
import fs from "fs";


v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_APIKEY,
    api_secret: process.env.CLOUDINARY_CLOUD_APISECRET
});


const UploadFile = async (localfile) => {
    try {
        if (!localfile) return null

        const response = await v2.uploader.upload(localfile, {
            resource_type: "auto"
        })
        console.log(response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localfile)
        return null;
    }
}

export {UploadFile}