"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_saver_1 = require("file-saver");
/**
 * Saves a file by opening file-save-as dialog in the browser
 * using file-save library.
 * @param blobContent file content as a Blob
 * @param fileName name file should be saved as
 */
exports.saveFile = function (blobContent, fileName) {
    var blob = new Blob([blobContent], { type: 'application/octet-stream' });
    file_saver_1.saveAs(blob, fileName);
};
/**
 * Derives file name from the http response
 * by looking inside content-disposition
 * @param res http Response
 */
exports.getFileNameFromResponseContentDisposition = function (res) {
    var contentDisposition = res.headers.get('content-disposition') || '';
    var matches = /filename=([^;]+)/ig.exec(contentDisposition);
    var fileName = (matches[1] || 'untitled').trim();
    return fileName;
};
//# sourceMappingURL=file-download.js.map