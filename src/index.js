import './style.css';
import Missing from './missing.png';
import {Game} from './game';
import { GameScreen } from './screen';

const game = new Game(new GameScreen('game-screen'));

game.setup();

game.loop();