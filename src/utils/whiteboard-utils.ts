import { ImagePickerInfo } from '../interfaces/sessionInterfaces';
import { getFileInfo, isLessThanTheMB } from './file-system-utils';

export async function isValidWhiteboardImageUpload(image: ImagePickerInfo): Promise<void> {
    const fileInfo = await getFileInfo(image.uri);
    if (!fileInfo.size) {
        throw new Error("Can't select this file as the size is unknown.");
    }

    if (image.type === 'image')
        if (!isLessThanTheMB(fileInfo.size, 10)) {
            throw new Error(
                'The photo is too large. Please upload a photo less than 10mb.'
            );
        }
}
