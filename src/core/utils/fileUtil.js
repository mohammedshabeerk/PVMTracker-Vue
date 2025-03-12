const FileUtil = {
    humanizeFileSize: function (kb) {
        const DIVISOR = 1024;
        function decimalCutoff(val) {
            // do not have decimal points if greater than 10
            let div = val < 10 ? 10 : 1;
            return Math.round(val * div) / div;
        }
        if (kb < 1000) {
            return `${decimalCutoff(kb)} KB`;
        }
        var mb = kb / DIVISOR;
        if (mb < 1000) {
            return `${decimalCutoff(mb)} MB`;
        }
        var gb = mb / DIVISOR;
        if (gb < 1000) {
            return `${decimalCutoff(gb)} GB`;
        }
        var tb = gb / DIVISOR;
        return `${decimalCutoff(tb)} TB`;
    },
    acceptedDocTypes: function () {
        return [
            '.pdf',
            '.doc',
            '.docx',
            '.csv',
            '.xls',
            '.xlsx',
            '.txt',
            '.png',
            '.jpeg',
            '.jpg'
        ];
    },
 
    getFileIcon: function (ext) {
        var icon = 'file';
        switch (ext.toLowerCase()) {
            case 'ai': icon = 'ai'; break;

            case 'wmv':
            case 'avi': icon = 'avi'; break;

            case 'scss':
            case 'css': icon = 'css'; break;

            case 'csv': icon = 'csv'; break;

            case 'docx':
            case 'doc': icon = 'doc'; break;

            case 'dwg': icon = 'dwg'; break;

            case 'exe': icon = 'exe'; break;

            case 'html': icon = 'html'; break;

            case 'iso': icon = 'iso'; break;

            case 'js': icon = 'javascript'; break;

            case 'jpeg':
            case 'tiff':
            case 'bmp':
            case 'heif':
            case 'gif':
            case 'webp':
            case 'jpg': icon = 'jpg'; break;

            case 'json': icon = 'json-file'; break;

            case 'aac':
            case 'm4a':
            case 'ac3':
            case 'wav':
            case 'mp3': icon = 'mp3'; break;

            case 'm4v':
            case 'mov':
            case 'mkv':
            case 'mpg':
            case 'mp4': icon = 'mp4'; break;

            case 'pdf': icon = 'pdf'; break;

            case 'png': icon = 'png'; break;

            case 'pptx':
            case 'ppt': icon = 'ppt'; break;

            case 'psd': icon = 'psd'; break;

            case 'rtf': icon = 'rtf'; break;

            case 'svg': icon = 'svg'; break;

            case 'txt': icon = 'txt'; break;

            case 'xlsx':
            case 'xls': icon = 'xls'; break;

            case 'xml': icon = 'xml'; break;

            case 'rar':
            case '7z':
            case 'tar':
            case 'gz':
            case 'zip': icon = 'zip'; break;

            default:
                icon = 'file';
        }
        return require(`@/custom/media/files/${icon}.svg`);
    }
}

export default FileUtil;