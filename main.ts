input.onButtonPressed(Button.A, function () {
    SensorWet = pins.analogReadPin(SensorPin)
    SensorThreshold = pins.map(
    20,
    0,
    100,
    SensorDry,
    SensorWet
    )
})
input.onButtonPressed(Button.B, function () {
    SensorDry = pins.analogReadPin(SensorPin)
    SensorThreshold = pins.map(
    20,
    0,
    100,
    SensorDry,
    SensorWet
    )
})
let SensorThreshold = 0
let SensorWet = 0
let SensorDry = 0
let SensorPin = 0
let WateringDurationMs = 20
let MeasurementDelayMs = 20
let PumpPin = DigitalPin.P0
SensorPin = AnalogPin.P2
SensorDry = 700
SensorWet = 300
SensorThreshold = pins.map(
20,
0,
100,
SensorDry,
SensorWet
)
datalogger.mirrorToSerial(true)
serial.redirectToUSB()
datalogger.setColumnTitles("moisture")
basic.forever(function () {
    datalogger.log(datalogger.createCV("moisture", pins.analogReadPin(SensorPin)))
    if (pins.analogReadPin(SensorPin) > SensorThreshold) {
        pins.digitalWritePin(PumpPin, 1)
        basic.pause(WateringDurationMs)
        pins.digitalWritePin(PumpPin, 0)
        basic.clearScreen()
    }
    basic.pause(MeasurementDelayMs)
})
