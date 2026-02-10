import type {
  Game,
  Lobby,
  Move,
  Player,
  PlayerAction,
} from "../gameLogic/types";

export type PlayerActionSocketData = {
  id: string;
  room: string;
  player: Player;
  action: PlayerAction;
};
export type PlayerMoveSocketData = {
  id: string;
  room: string;
  player: Player;
  move: Move;
};
export type GameStatusSocketData = { room: string; gameStatus: Game };
export type PlayerStatusSocketData = {
  id: string;
  room: string;
  player: Player;
};

// (((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))
// (((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))
export interface ClientEvents {
  // ---------------------------------------------------------------------------
  // Game
  // ---------------------------------------------------------------------------
  ["fg:request-connection"]: (data: { room: string }) => void;
  // ...........................................................................
  ["fg:game-status-update"]: (data: GameStatusSocketData) => void;
  // ...........................................................................
  ["fg:request-player-status"]: (data: {
    playerId: string;
    room: string;
  }) => void;
  // ...........................................................................
  ["fg:lobby-update"]: (data: { room: string; lobby: Lobby }) => void;
  // ...........................................................................
  ["fg:player-connection-approved"]: (data: {
    room: string;
    player: Player;
  }) => void;
  ["fg:player-disconnected"]: (data: { room: string; player: Player }) => void;
  // ---------------------------------------------------------------------------
  // Player
  // ---------------------------------------------------------------------------
  ["fp:request-connection"]: (data: { room: string }) => void;
  // ...........................................................................
  ["fp:player-action"]: (data: PlayerActionSocketData) => void;
  // ...........................................................................
  ["fp:player-move"]: (data: PlayerMoveSocketData) => void;
  // ...........................................................................
  ["fp:report-player-status"]: (data: PlayerStatusSocketData) => void;
}
// (((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))
// (((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))
export interface ServerEvents {
  // ---------------------------------------------------------------------------
  // Game
  // ---------------------------------------------------------------------------
  ["tg:approve-connection"]: (data: { id: string; room: string }) => void;
  // ...........................................................................
  ["tg:disconnect"]: (data: { id: string }) => void;
  // ...........................................................................
  ["tg:request-player-connection"]: (data: {
    room: string;
    playerId: string;
  }) => void;
  ["tg:player-action"]: (data: PlayerActionSocketData) => void;
  // ...........................................................................
  ["tg:player-move"]: (data: PlayerMoveSocketData) => void;
  // ...........................................................................
  ["tg:report-player-status"]: (data: PlayerStatusSocketData) => void;
  // ---------------------------------------------------------------------------
  // Player
  // ---------------------------------------------------------------------------
  ["tp:approve-connection"]: (data: { room: string; player: Player }) => void;
  // ---------------------------------------------------------------------------
  // All Players
  // ---------------------------------------------------------------------------
  ["tap:players-updated"]: (data: { room: string; newPlayer: Player }) => void;
  // ...........................................................................
  ["tap:game-status-update"]: (data: GameStatusSocketData) => void;
  // ...........................................................................
  ["tap:request-player-status"]: () => void;
}
// (((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))
// (((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))
