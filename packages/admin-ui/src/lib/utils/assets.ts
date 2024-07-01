export const getFileListIntoArray = (fileList: FileList | null) =>
  fileList ? Array.from(fileList) : [];

export const getFilePreview = (file: File) => URL.createObjectURL(file);
