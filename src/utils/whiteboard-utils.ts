import { ImagePickerAsset } from 'expo-image-picker'
import { getFileInfo, isLessThanTheMB } from './file-system-utils'

export async function isValidWhiteboardImageUpload(
  image: ImagePickerAsset
): Promise<void> {
  const fileInfo = await getFileInfo(image.uri)
  if (fileInfo.exists === false) {
    throw new Error("Can't select this file as the size is unknown.")
  }

  if (fileInfo.uri.includes('heic')) {
    throw new Error(
      "We don't support .HEIC images yet. Try a screenshot of your photo, those are jpeg!"
    )
  }

  if (image.type === 'image')
    if (!isLessThanTheMB(fileInfo.size, 10)) {
      throw new Error(
        'The photo is too large. Please upload a photo less than 10mb.'
      )
    }
}
