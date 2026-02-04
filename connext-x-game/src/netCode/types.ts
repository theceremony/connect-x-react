import type { Player } from "../gameLogic/types";

export type PlayerSocketEvent = { id: string };

export interface FromGame {
  ["fg:request-connection"]: (data: { room: string }) => void;
  ["fg:start-game"]: (data: { room: string; players: Player[] }) => void;
}

export interface ToGame {
  serverMsg: (data: { msg: string; room: string }) => void;
}

export interface FromPlayer {
  serverMsg: (data: { msg: string; room: string }) => void;
}

export interface ToRequestingPlayer {
  serverMsg: (data: { msg: string; room: string }) => void;
}

export interface ToAllPlayers {
  serverMsg: (data: { msg: string; room: string }) => void;
}

/*

From game
    -> request connection
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
