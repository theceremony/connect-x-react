import type { Game, Move, Player } from "../gameLogic/types";

export type PlayerSocketEvent = { id: string };

export interface ClientEvents {
  //
  // Game
  // ---------------------------------------------------------------------------
  ["fg:request-connection"]: (data: { id: string; room: string }) => void;
  ["fg:game-status-update"]: (data: {
    id: string;
    room: string;
    gameStatus: Game;
  }) => void;
  ["fg:request-player-status"]: (data: {
    playerId: string;
    room: string;
  }) => void;
  ["fg:player-connection-approved"]: (data: {
    id: string;
    room: string;
    player: Player;
  }) => void;
  //
  // Player
  // ---------------------------------------------------------------------------
  ["fp:request-connection"]: (data: { id: string; room: string }) => void;
  ["fp:player-move"]: (data: {
    id: string;
    room: string;
    player: Player;
    move: Move;
  }) => void;
  ["fp:report-player-status"]: (data: {
    id: string;
    room: string;
    player: Player;
  }) => void;
}

export interface ServerEvents {
  //
  // Game
  // ---------------------------------------------------------------------------
  ["tg:approve-connection"]: (data: { id: string; room: string }) => void;
  ["tg:request-player-connection"]: (data: {
    room: string;
    playerId: string;
  }) => void;
  ["tg:player-move"]: (data: {
    room: string;
    player: Player;
    move: Move;
  }) => void;
  ["tg:report-player-status"]: (data: {
    id: string;
    room: string;
    player: Player;
  }) => void;
  //
  // Player
  // ---------------------------------------------------------------------------
  ["tp:approve-connection"]: (data: { room: string; player: Player }) => void;
  //
  // All Players
  // ---------------------------------------------------------------------------
  ["tap:players-updated"]: (data: { room: string; newPlayer: Player }) => void;
  ["tap:game-status-update"]: (data: {
    room: string;
    gameStatus: Game;
  }) => void;
  ["tap:request-player-status"]: () => void;
}

/*

From game
    -> request connection
        * room id
    -> start game
        * room id
        * players 
To game
    -> approve connection
        * room ID

    -> new player connected
        * room id
        * player id
        
    -> player requesting move
        * room id
        * player id
        * move data


From player 
    -> request connection
   

To requesting player
    -> approve connection
        * room ID
        * player id
        * player piece color 
        
To all players
    -> player move result
        * room id
        * player id
        * move data
        * move result

*/
