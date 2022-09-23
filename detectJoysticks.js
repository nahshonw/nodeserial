var HID = require('node-hid');
var devices = HID.devices();
//console.log(devices);


//var devices = HID.devices();

var deviceInfo = devices.find(function (d) {
//    console.log(d);
    return d.vendorId === 1678;
});

console.log(deviceInfo);

if (deviceInfo) {
    var device = new HID.HID(deviceInfo.path);
    console.log(devices);
}