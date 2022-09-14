var HID = require('node-hid');
console.log(HID.devices()); //locate your device by pid (productId) and vid (vendorId)