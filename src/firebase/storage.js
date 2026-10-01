import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export async function uploadMenuItemImage(file) {
  const fileName = `${Date.now()}-${file.name}`;
  const imageRef = ref(storage, `menuItems/${fileName}`);

  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);

  return url;
}

export async function uploadEnquiryImage(file) {
  const fileName = `${Date.now()}-${file.name}`;
  const imageRef = ref(storage, `enquiries/${fileName}`);

  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);

  return url;
}