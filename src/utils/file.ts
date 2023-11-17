export const downloadFile = (path: string, name: string) => {
  const downloadLink = document.createElement("a");
  downloadLink.href = path;
  downloadLink.download = name;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
