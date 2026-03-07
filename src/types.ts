import type { ChunkType } from './constants';

export interface FragmentInfo {
  x: number;
  y: number;
  id: string;
  collected: boolean;
}

export type EnemyKind = 'scout' | 'chaser' | 'sniper';

export interface EnemyData {
  id: string;
  kind: EnemyKind;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  activated: boolean;   // chaser/sniper: 已感应到玩家
  stepCount: number;    // chaser: 冲刺步计数
  attackTimer: number;  // sniper: 距离下次射击的回合数
  visibleCells: string[]; // sniper: 预计算的 LOS 格子 "x,y"
  broadcasting: boolean;  // scout: 正在广播玩家位置
}

export interface ChunkData {
  cx: number;
  cy: number;
  grid: number[][];
  chunkType: ChunkType;
  fragments: FragmentInfo[];
  enemies: EnemyData[];
  chestUnlocked: boolean;
  chestOpened: boolean;
  state: 'uncharted' | 'anchored';
  seed: number;
}

export interface MapKey {
  /** 地图快照，可用于任意区块的锚定 */
  grid: number[][];
  /** 仅用于 UI 显示，例如「从 (2,-1) 获得」 */
  label: string;
}

export interface SaveData {
  chunkX: number;
  chunkY: number;
  tileX: number;
  tileY: number;
  keys: MapKey[];
  hp: number;
  healBank: number;
  coins: number;
  timestamp: number;
}

export interface AnchoredChunkData {
  grid: number[][];
  type: string;
  anchoredAt: number;
}
