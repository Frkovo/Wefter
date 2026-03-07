export const TILE_SIZE = 28;
export const CHUNK_TILES = 21; // 奇数，保证出口中点
export const CHUNK_PX = CHUNK_TILES * TILE_SIZE; // 588
export const VIEWPORT_W = 800;
export const VIEWPORT_H = 600;
export const OFFSET_X = Math.floor((VIEWPORT_W - CHUNK_PX) / 2); // 106
export const OFFSET_Y = Math.floor((VIEWPORT_H - CHUNK_PX) / 2); // 6
export const MID = Math.floor(CHUNK_TILES / 2); // 10
export const FRAGMENT_COUNT = 5;
export const PLAYER_MOVE_SPEED = 10; // tiles/sec

export const enum TileType {
  Floor = 0,
  Wall = 1,
  Exit = 2,
}

export enum ChunkType {
  Wild  = 'wild',
  Shop  = 'shop',
  Enemy = 'enemy',
}

export const Colors = {
  WALL:          0x141428,   // 未锚定区块——深冰蓝（诊异森林）
  FLOOR:         0x08080e,   // 未锚定区块——近黑
  CENTER_FLOOR:  0x181838,   // 未锚定区块中心房间——稍亮
  PLAYER:        0x00ff88,
  FRAGMENT:      0x44ddff,
  CHEST_LOCKED:  0x8b4513,
  CHEST_UNLOCKED:0xdaa520,
  HOME:          0x88ee44,   // 家园边框——亮草绿
  ANCHORED:      0x44aa22,   // 锚定区块边框——森林绿
  LIBERATED:     0x556633,
  EXIT:          0x323260,
} as const;
