export const getFileListIntoArray = (fileList: FileList | null) =>
  fileList ? Array.from(fileList) : [];
