# Bird Simulator Server

This server supports the Bird Simulator app. The server functions as a flight control system (or FCS for short) for each bird in the simulator. For example, at any interval, the FCS of each bird compares the desired state and the current state. Then it calculates the position, speed and height (and more...) according to the states. The server also handles the commands the user sends from the app to the bird.

## Installation

To install the dependencies for this project, run the following command:

```bash
npm install
```

## Usage

To start the server, run the following command:


```bash
npm run dev
```