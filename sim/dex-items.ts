import type {PokemonEventMethods, ConditionData} from './dex-conditions';
import {BasicEffect, toID} from './dex-data';

export interface EquipmentData extends Partial<Equipment>, PokemonEventMethods {
	name: string;
}

export type ModdedEquipmentData = EquipmentData | Partial<Omit<EquipmentData, 'name'>> & {
	inherit: true,
	onCustap?: (this: Battle, character: Character) => void,
};

export interface ItemDataTable {[itemid: IDEntry]: EquipmentData}
export interface ModdedItemDataTable {[itemid: IDEntry]: ModdedEquipmentData}

export class Equipment extends BasicEffect implements Readonly<BasicEffect> {
	declare readonly effectType: 'Item';

	/** just controls location on the item spritesheet */
	declare readonly num: number;

	readonly transform?: string;

	readonly tranforms?: string;

	readonly ultimate?: true | string;

	readonly ultimateElement?: string;

	readonly ultimateSpecial?: string;

	readonly equipmentCharacter?: string[];
	readonly isConsumable: boolean;
	readonly isAttackBooster: boolean;

	declare readonly condition?: ConditionData;
	declare readonly forcedForme?: string;
	declare readonly isLocked?: boolean;
	declare readonly spritenum?: number;
	declare readonly boosts?: SparseBoostsTable | false;

	declare readonly onConsume?: ((this: Battle, character: Character) => void) | false;
	declare readonly onPrimal?: (this: Battle, character: Character) => void;
	declare readonly onStart?: (this: Battle, target: Character) => void;
	declare readonly onEnd?: (this: Battle, target: Character) => void;

	constructor(data: AnyObject) {
		super(data);
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		data = this;

		this.fullname = `item: ${this.name}`;
		this.effectType = 'Item';
		this.transform = data.megaStone || undefined;
		this.tranforms = data.megaEvolves || undefined;
		this.ultimate = data.zMove || undefined;
		this.ultimateElement = data.zMoveType || undefined;
		this.ultimateSpecial = data.zMoveFrom || undefined;
		this.equipmentCharacter = data.itemUser || undefined;
		this.isConsumable = !!data.isBerry;
		this.isAttackBooster = !!data.isGem;
	}
}

export class DbEquipments {
	readonly db: ModdedDb;
	readonly equipmentCache = new Map<ID, Equipment>();
	allCache: readonly Equipment[] | null = null;

	constructor(dex: ModdedDb) {
		this.db = dex;
	}

	get(name?: string | Equipment): Equipment {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		const id = toID(name);
		return this.getByID(id);
	}

	getByID(id: ID): Equipment {
		let equipment = this.equipmentCache.get(id);
		if (equipment) return equipment;
		if (this.db.data.Aliases.hasOwnProperty(id)) {
			equipment = this.get(this.db.data.Aliases[id]);
			if (equipment.exists) {
				this.equipmentCache.set(id, equipment);
			}
			return equipment;
		}
		if (id && !this.db.data.Equipments[id] && this.db.data.Equipments[id + 'consume']) {
			equipment = this.getByID(id + 'consume' as ID);
			this.equipmentCache.set(id, equipment);
			return equipment;
		}
		if (id && this.db.data.Equipments.hasOwnProperty(id)) {
			const equipmentData = this.db.data.Equipments[id] as any;
			const equipmentTextData = this.db.getDescs('Equipments', id, equipmentData);
			equipment = new Equipment({
				name: id,
				...equipmentData,
				...equipmentTextData,
			});
			if (equipment.gen > this.db.gen) {
				(equipment as any).isNonstandard = 'Future';
			}
		} else {
			equipment = new Equipment({name: id, exists: false});
		}

		if (equipment.exists) this.equipmentCache.set(id, this.db.deepFreeze(equipment));
		return equipment;
	}

	all(): readonly Equipment[] {
		if (this.allCache) return this.allCache;
		const equipments = [];
		for (const id in this.db.data.Equipments) {
			equipments.push(this.getByID(id as ID));
		}
		this.allCache = Object.freeze(equipments);
		return this.allCache;
	}
}
