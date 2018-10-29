/**
 * 
 * @file 
 * Contains the function to encode string using RTC-3986
 */



/**
 * 
 * @param {String} str Encoding string
 * @returns Encoded string
 */
function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}

export default fixedEncodeURIComponent;