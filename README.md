# Bird Simulator Server

This server supports the Bird Simulator app. The server functions as a flight control system (or FCS for short) for each bird in the simulator. For example, at any interval, the FCS of each bird compares the desired state and the current state. Then it calculates the position, speed, and height (and more) according to the states. The server also handles the commands the user sends from the app to the bird.
## Installation

To install the dependencies for this project, run the following command:

```bash
npm install
```

## Usage

To start the server, run the following command:

```bash
npm start
```

After starting the server, you will need to run the Bird Simulator Client to send commands and receive updates on the state of the birds.

### Configuration

The `config.js` file is where you can change the server's settings. The following variables can be modified:

```javascript
exports.intervalRate = 1000; // the server's run interval in milliseconds (should be the same as the client's)
exports.caloriesGainPerSecondWhenEating = 20; // default bird calorie consumption per second
exports.ifRandomBirdData = false; // toggle for generating random birds. false will spawn only one bird as default
```

Modify these values as necessary to adjust the server's behavior to your needs.

## License

This project is currently private and not available under an open-source license.




