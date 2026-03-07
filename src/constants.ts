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
export const PLAYER_MAX_HP = 20;
export const HEAL_BANK_MAX = 200;
export const HEAL_BANK_REGEN_MS = 120_000; // 2分钟 +1 储量
// === AZCoin 金币奖励 ===
export const COIN_FRAGMENT    = 1;   // 每个碎片
export const COIN_WILD_CHEST  = 5;   // 荒野宝箱
export const COIN_ENEMY_KILL  = 1;   // 击杀敌人
export const COIN_ENEMY_CHEST = 10;  // 敌营宝箱

export const SCOUT_DETECT_RADIUS = 5;   // 欧氏距离，穿墙
export const CHASER_DETECT_STEPS = 10;  // BFS 最短路径步数
export const SNIPER_DETECT_STEPS = 15;  // BFS 最短路径步数
export const PLAYER_FIRE_RANGE = 8;     // 直线 LOS 格数
export const SNIPER_FIRE_RATE = 3;      // 回合数/次放射

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
  WALL:          0x141428,
  FLOOR:         0x08080e,
  CENTER_FLOOR:  0x181838,
  PLAYER:        0x00ff88,
  FRAGMENT:      0x44ddff,
  CHEST_LOCKED:  0x8b4513,
  CHEST_UNLOCKED:0xdaa520,
  HOME:          0x88ee44,
  ANCHORED:      0x44aa22,
  LIBERATED:     0x556633,
  EXIT:          0x323260,
  SCOUT:         0x2244cc,
  CHASER:        0xcc2222,
  SNIPER:        0xaa8800,
  BULLET_P:      0x00ff88,
  BULLET_E:      0xff6644,
} as const;
