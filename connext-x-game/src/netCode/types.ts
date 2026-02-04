import type { Player } from "../gameLogic/types";

export type PlayerSocketEvent = { id: string };

export interface ClientEvents {
  // Game
  ["fg:request-connection"]: (data: { room: string }) => void;
  ["fg:start-game"]: (data: { room: string; players: Player[] }) => void;
  // Player
  ["fp:request-connection"]: (data: { room: string }) => void;
}

export interface ServerEvents {
  // Game
  ["tg:approve-connection"]: (data: { room: string }) => void;
  ["tg:new-player-connected"]: (data: { room: string; player: Player }) => void;
  // Player
  ["tp:approve-connection"]: (data: { room: string; player: Player }) => void;
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
