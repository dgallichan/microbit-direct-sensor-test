input.onButtonPressed(Button.AB, function () {
    variableMode += 1
    if (variableMode > 1) {
        variableMode = 0
    }
    for (let index = 0; index <= 4; index++) {
        led.unplot(index, 4)
    }
    led.plot(variableMode, 0)
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
basic.forever(function () {
    if (variableMode == 0) {
        serial.writeValue("a.x", input.acceleration(Dimension.X))
        serial.writeValue("a.y", input.acceleration(Dimension.Y))
        serial.writeValue("a.z", input.acceleration(Dimension.Z))
    } else if (variableMode == 1) {
        serial.writeValue("m.x", input.magneticForce(Dimension.X))
        serial.writeValue("m.y", input.magneticForce(Dimension.Y))
        serial.writeValue("m.z", input.magneticForce(Dimension.Z))
        serial.writeValue("c", input.compassHeading())
    } else {
        serial.writeValue("a.x", input.acceleration(Dimension.X))
        serial.writeValue("a.y", input.acceleration(Dimension.Y))
        serial.writeValue("a.z", input.acceleration(Dimension.Z))
        serial.writeValue("m.x", input.magneticForce(Dimension.X))
        serial.writeValue("m.y", input.magneticForce(Dimension.Y))
        serial.writeValue("m.z", input.magneticForce(Dimension.Z))
        serial.writeValue("c", input.compassHeading())
    }
    basic.pause(100)
})
