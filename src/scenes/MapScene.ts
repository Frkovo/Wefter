import Phaser from 'phaser';
import { VIEWPORT_W, VIEWPORT_H, Colors, ChunkType } from '../constants';
import type { ChunkManager } from '../systems/ChunkManager';

interface MapSceneData {
  chunkManager: ChunkManager;
  playerChunkX: number;
  playerChunkY: number;
  canTeleport: boolean;
  onTeleport: (cx: number, cy: number) => void;
}

export class MapScene extends Phaser.Scene {
  private chunkManager!: ChunkManager;
  private playerChunkX = 0;
  private playerChunkY = 0;
  private canTeleport = false;
  private onTeleportCb!: (cx: number, cy: number) => void;
  private keyM!: Phaser.Input.Keyboard.Key;
  private keyEsc!: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: 'MapScene' });
  }

  init(data: MapSceneData): void {
    this.chunkManager = data.chunkManager;
    this.playerChunkX = data.playerChunkX;
    this.playerChunkY = data.playerChunkY;
    this.canTeleport = data.canTeleport;
    this.onTeleportCb = data.onTeleport;
  }

  create(): void {
    this.add.rectangle(VIEWPORT_W / 2, VIEWPORT_H / 2, VIEWPORT_W, VIEWPORT_H, 0x000000, 0.85);

    this.add.text(VIEWPORT_W / 2, 30, '🗺️ 世界地图', {
      fontSize: '24px', fontFamily: '"Microsoft YaHei", sans-serif', color: '#aabbcc',
    }).setOrigin(0.5);

    const cellSize = 36;
    const range = 7;
    const cx0 = VIEWPORT_W / 2;
    const cy0 = VIEWPORT_H / 2;

    const anchoredTypeMap = this.chunkManager.getAnchoredTypeMap();
    const anchoredSet = new Set(Object.keys(anchoredTypeMap));
    const SHOP_COLOR   = 0xcc8800;
    const ENEMY_COLOR  = 0x882222;
    const WILD_COLOR   = Colors.ANCHORED;

    // 悬浮提示（动态更新）
    const tooltip = this.add.text(VIEWPORT_W / 2, VIEWPORT_H - 55, '', {
      fontSize: '13px', fontFamily: '"Microsoft YaHei", sans-serif', color: '#ffaa44',
    }).setOrigin(0.5).setDepth(10);

    for (let dy = -range; dy <= range; dy++) {
      for (let dx = -range; dx <= range; dx++) {
        const cx = this.playerChunkX + dx;
        const cy = this.playerChunkY + dy;
        const key = `${cx},${cy}`;
        const px = cx0 + dx * cellSize;
        const py = cy0 + dy * cellSize;

        const isHome = cx === 0 && cy === 0;
        const isAnchored = anchoredSet.has(key);
        const isPlayer = dx === 0 && dy === 0;
        const isTeleportable = isHome || isAnchored;
        const chunkType = anchoredTypeMap[key] as ChunkType | undefined;

        let color = 0x1a1a2e, alpha = 0.3;
        if (isHome)                                    { color = Colors.HOME;  alpha = 0.8; }
        else if (isAnchored && chunkType === ChunkType.Shop)  { color = SHOP_COLOR;  alpha = 0.8; }
        else if (isAnchored && chunkType === ChunkType.Enemy) { color = ENEMY_COLOR; alpha = 0.7; }
        else if (isAnchored)                           { color = WILD_COLOR;   alpha = 0.7; }

        const cell = this.add.rectangle(px, py, cellSize - 2, cellSize - 2, color, alpha);

        if (isPlayer) cell.setStrokeStyle(2, 0x00ff88);

        // 图标
        let label = '';
        if (isHome)                                         label = '🏠';
        else if (isAnchored && chunkType === ChunkType.Shop)  label = '🏩';
        else if (isAnchored && chunkType === ChunkType.Enemy) label = '⚔️';
        else if (isAnchored)                                label = '🔒';
        else if (isPlayer)                                  label = '▲';

        if (label) {
          this.add.text(px, py, label, {
            fontSize: '14px',
            color: isPlayer && !isTeleportable ? '#00ff88' : '#ffffff',
          }).setOrigin(0.5);
        }

        // 坐标标注
        if (isHome || isPlayer || isAnchored) {
          this.add.text(px, py + cellSize / 2 + 2, `${cx},${cy}`, {
            fontSize: '9px', color: '#667788',
          }).setOrigin(0.5, 0);
        }

        // 可传送的格子加交互
        if (isTeleportable && !isPlayer) {
          cell.setInteractive({ useHandCursor: this.canTeleport });

          const typeLabel = isHome ? '家园' :
            chunkType === ChunkType.Shop  ? '锚定商店' :
            chunkType === ChunkType.Enemy ? '锚定敌营' : '锚定區块';

          cell.on('pointerover', () => {
            cell.setStrokeStyle(2, this.canTeleport ? 0x00ff88 : 0xff6644);
            tooltip.setText(
              this.canTeleport
                ? `点击传送至 (${cx}, ${cy}) [${typeLabel}]`
                : '需在已锚定区块才能使用传送',
            );
          });
          cell.on('pointerout', () => {
            cell.setStrokeStyle(0);
            tooltip.setText('');
          });
          cell.on('pointerdown', () => {
            if (!this.canTeleport) return;
            this.onTeleportCb(cx, cy);
            this.scene.stop();
            this.scene.resume('GameScene');
          });
        }
      }
    }

    // 图例
    const legends: { color: number; label: string }[] = [
      { color: Colors.HOME,  label: '家园' },
      { color: WILD_COLOR,   label: '锚定荆野' },
      { color: SHOP_COLOR,   label: '锚定商店' },
      { color: ENEMY_COLOR,  label: '锚定敌营' },
    ];
    legends.forEach((l, i) => {
      const lx = 16 + i * 115;
      this.add.rectangle(lx + 7, VIEWPORT_H - 60, 14, 14, l.color, 0.8);
      this.add.text(lx + 18, VIEWPORT_H - 60, l.label, {
        fontSize: '12px', fontFamily: '"Microsoft YaHei", sans-serif', color: '#aabbcc',
      }).setOrigin(0, 0.5);
    });

    const hint = this.canTeleport
      ? '点击已锚定区块可传送  |  M / ESC 关闭'
      : '「传送」需在已锚定区块中才可用  |  M / ESC 关闭';
    this.add.text(VIEWPORT_W / 2, VIEWPORT_H - 30, hint, {
      fontSize: '13px', fontFamily: '"Microsoft YaHei", sans-serif',
      color: this.canTeleport ? '#667788' : '#886644',
    }).setOrigin(0.5);

    const kb = this.input.keyboard!;
    this.keyM = kb.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    this.keyEsc = kb.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.keyM) || Phaser.Input.Keyboard.JustDown(this.keyEsc)) {
      this.scene.stop();
      this.scene.resume('GameScene');
    }
  }
}
