export default function(response){
    let headerLine = response.headers['content-disposition'];
    let startFileNameIndex = headerLine.indexOf('"') + 1;
    let endFileNameIndex = headerLine.lastIndexOf('"');
    let filename = headerLine.substring(startFileNameIndex, endFileNameIndex);

    const url = window.URL.createObjectURL(new Blob([response.data],{ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename); //or any other extension
    document.body.appendChild(link)
    link.click();
}