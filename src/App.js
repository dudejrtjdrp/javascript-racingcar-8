import RaceController from './Controller/RaceController.js';

class App {
  async run() {
    await RaceController.playRace();
  }
}

export default App;
