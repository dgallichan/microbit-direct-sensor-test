input.onButtonPressed(Button.AB, function () {
    variableMode += 1
    if (variableMode > 2) {
        variableMode = 0
    }
    for (let index = 0; index <= 4; index++) {
        led.unplot(index, 4)
    }
    led.plot(variableMode, 4)
})
let variableMode = 0
basic.showLeds(`
    # . # . #
    . # . # .
    # . # . #
    # # # # #
    . . . . .
    `)
variableMode = 0
led.plot(variableMode, 4)
basic.forever(function () {
    if (variableMode == 0) {
        serial.writeLine("" + convertToText(input.acceleration(Dimension.X)) + "," + convertToText(input.acceleration(Dimension.Y)) + "," + convertToText(input.acceleration(Dimension.Z)) + "," + convertToText(input.magneticForce(Dimension.X)) + "," + convertToText(input.magneticForce(Dimension.Y)) + "," + convertToText(input.magneticForce(Dimension.Z)))
    } else if (variableMode == 1) {
        serial.writeValue("m.x", input.magneticForce(Dimension.X))
        serial.writeValue("m.y", input.magneticForce(Dimension.Y))
        serial.writeValue("m.z", input.magneticForce(Dimension.Z))
        serial.writeValue("c", input.compassHeading())
    } else {
        serial.writeValue("a.x", input.acceleration(Dimension.X))
        serial.writeValue("a.y", input.acceleration(Dimension.Y))
        serial.writeValue("a.z", input.acceleration(Dimension.Z))
        serial.writeValue("r.p", input.rotation(Rotation.Pitch))
        serial.writeValue("r.r", input.rotation(Rotation.Roll))
        serial.writeValue("c", input.compassHeading())
    }
    basic.pause(100)
})
