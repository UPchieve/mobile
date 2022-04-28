import * as FileSystem from 'expo-file-system';

export function isLessThanTheMB(
    fileSize: number,
    smallerThanSizeMB: number
): boolean {
    const isLessThan = fileSize / 1024 / 1024 < smallerThanSizeMB;
    return isLessThan;
}

export async function getFileInfo(
    fileURI: string
): Promise<FileSystem.FileInfo> {
    return await FileSystem.getInfoAsync(fileURI);
}
