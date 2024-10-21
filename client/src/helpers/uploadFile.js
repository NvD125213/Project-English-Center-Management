import { storage, ref, uploadBytesResumable, getDownloadURL } from './firebase';
import { v4 } from 'uuid';

export const uploadFilesToFirebase = async (files, folderPath, onProgress) => {
    try {
        const uploadPromises = files.map((file) => {
            const nameFile = `${v4()}_${file.name}`;
            const fileRef = ref(storage, `${folderPath}/${nameFile}`);

            // Sử dụng uploadBytesResumable để theo dõi tiến trình
            const uploadTask = uploadBytesResumable(fileRef, file);

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        if (onProgress) onProgress(progress);  
                    },
                    (error) => {
                        console.error("Lỗi upload:", error);
                        reject(error);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(downloadURL);
                    }
                );
            });
        });

        const downloadURLs = await Promise.all(uploadPromises);
        return downloadURLs;
    } catch (err) {
        console.error("Lỗi upload:", err);
        throw err;
    }
};
