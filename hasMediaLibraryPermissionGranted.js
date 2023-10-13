import * as ImagePicker from "expo-image-picker";

const hasMediaLibraryPermissionGranted = async () => {
  let granted =  false;

  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.canAskAgain || permission.status === "denied") {
    granted = false;

  }

  if (permission.granted) {
    granted = true;
  }

  return granted;
};

export default hasMediaLibraryPermissionGranted
