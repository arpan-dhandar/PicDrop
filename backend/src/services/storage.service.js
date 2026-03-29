import imagekit from '@imagekit/nodejs';


const imagekitInstance = new imagekit({

    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publickey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT    
});

async function uploadFile(buffer) {

    console.log(buffer);
    

    const result = await imagekitInstance.files.upload({
        file: buffer.toString('base64'),
        fileName: "image.jpg"
    })

    return result;
}

export default uploadFile;