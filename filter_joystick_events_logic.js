//https://flaviocopes.com/arduino-johnny-five-browser-game/



const { Board, Joystick } = require("johnny-five")
const board = new Board()

board.on("ready", () => {
  const joystick = new Joystick({
    pins: ["A0", "A1"],
  })

  joystick.on("change", function () {
    if (this.x > 0.5) {
      console.log("right")
    }
    if (this.x < -0.5) {
      console.log("left")
    }
    if (this.x > -0.5 && this.x < 0.5) {
      console.log("still")
    }
    if (this.y > 0.5) {
      console.log("down")
    }
    if (this.y < -0.5) {
      console.log("up")
    }
  })
})
