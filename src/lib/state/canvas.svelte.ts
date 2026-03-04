export type BlockType = 'hero' | 'text' | 'feature-grid' | 'footer';

export interface Block {
	id: string;
	type: BlockType;
	properties: Record<string, unknown>;
	// Optional layout specific properties (e.g. padding, background)
	styles?: Record<string, string>;
}

// Svelte 5 Runes Class for Global State
export class CanvasState {
	blocks = $state<Block[]>([]);
	globalCss = $state<string>('');
	selectedBlockId = $state<string | null>(null);

	// Derived values
	selectedBlock = $derived(this.blocks.find((b) => b.id === this.selectedBlockId));

	// Actions
	addBlock(type: BlockType, index?: number, defaultProperties: Record<string, unknown> = {}) {
		const newBlock: Block = {
			id: `block-${crypto.randomUUID()}`,
			type,
			properties: defaultProperties
		};

		if (index !== undefined && index >= 0) {
			this.blocks.splice(index, 0, newBlock);
		} else {
			this.blocks.push(newBlock);
		}

		// Auto-select new block
		this.selectedBlockId = newBlock.id;
	}

	removeBlock(id: string) {
		this.blocks = this.blocks.filter((b) => b.id !== id);
		if (this.selectedBlockId === id) {
			this.selectedBlockId = null;
		}
	}

	updateBlockProperty(id: string, key: string, value: unknown) {
		const block = this.blocks.find((b) => b.id === id);
		if (block) {
			block.properties[key] = value;
		}
	}

	selectBlock(id: string | null) {
		this.selectedBlockId = id;
	}

	moveBlock(fromIndex: number, toIndex: number) {
		if (
			fromIndex < 0 ||
			fromIndex >= this.blocks.length ||
			toIndex < 0 ||
			toIndex >= this.blocks.length
		)
			return;

		const blockToMove = this.blocks[fromIndex];
		this.blocks.splice(fromIndex, 1);
		this.blocks.splice(toIndex, 0, blockToMove);
	}
}

// Export a singleton instance to be used across the app
export const canvas = new CanvasState();
