/**
 * Resizes image with params
 * 
 * @param {Blob} file       Image data from input 
 * @param {Number} MAX_WIDTH     Max width of resizing
 * @param {Number} MAX_HEIGHT    Max heiht of resizing
 */
export function resizeImage(file, MAX_WIDTH, MAX_HEIGHT) {
    return new Promise(resolve => {
        let img = document.createElement('img');
        const reader = new FileReader();
        reader.onload = (e) => {
            img.onload = () => {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                var dataurl = canvas.toDataURL("image/png");
                resolve(dataurl)
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);

    })
}


/**
 * Converts DataUrI to Blob format
 * @param {String} dataURI 
 */
export function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}