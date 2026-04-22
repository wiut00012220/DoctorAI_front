import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const uploadFileToFirebase = async (file, folder = "doctors") => {
  try {
    if (!file) throw new Error("No file selected");

    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;

    const storageRef = ref(storage, fileName);

    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("Uploaded file metadata:", snapshot.metadata);
    console.log("Download URL:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Firebase upload error:", error);
    throw error;
  }
};
