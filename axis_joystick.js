var devices = HID.devices();
var deviceInfo = devices.find( function(d) {
    var axis = d.vendorId===0x16C0 && d.productId===0x0486;
    return isTeensy && d.usagePage===0xFFAB && d.usage===0x200;
});
if( deviceInfo ) {
  var device = new HID.HID( deviceInfo.path );
  // ... use device
}
