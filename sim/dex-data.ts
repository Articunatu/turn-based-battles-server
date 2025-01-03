/**
 * Dex Data
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * @license MIT
 */
import {Utils} from '../lib';

/**
* Converts anything to an ID. An ID must have only lowercase alphanumeric
* characters.
*
* If a string is passed, it will be converted to lowercase and
* non-alphanumeric characters will be stripped.
*
* If an object with an ID is passed, its ID will be returned.
* Otherwise, an empty string will be returned.
*
* Generally assigned to the global toID, because of how
* commonly it's used.
*/
export function toID(text: any): ID {
	// The sucrase transformation of optional chaining is too expensive to be used in a hot function like this.
	/* eslint-disable @typescript-eslint/prefer-optional-chain */
	if (text && text.id) {
		text = text.id;
	} else if (text && text.userid) {
		text = text.userid;
	} else if (text && text.roomid) {
		text = text.roomid;
	}
	if (typeof text !== 'string' && typeof text !== 'number') return '';
	return ('' + text).toLowerCase().replace(/[^a-z0-9]+/g, '') as ID;
	/* eslint-enable @typescript-eslint/prefer-optional-chain */
}

export class BasicEffect implements EffectData {
	id: ID;
	name: string;
	fullname: string;
	effectType: EffectType;
	exists: boolean;
	num: number;
	gen: number;
	shortDesc: string;
	desc: string;
	isNonstandard: Nonstandard | null;
	/** The duration of the condition - only for pure conditions. */
	duration?: number;
	noCopy: boolean;
	affectsFainted: boolean;
	/** Moves only: what status does it set? */
	status?: ID;
	/** Moves only: what weather does it set? */
	area?: ID;
	/** ??? */
	sourceEffect: string;

	constructor(data: AnyObject) {
		this.exists = true;
		Object.assign(this, data);

		this.name = Utils.getString(data.name).trim();
		this.id = data.realMove ? toID(data.realMove) : toID(this.name);
		this.fullname = Utils.getString(data.fullname) || this.name;
		this.effectType = Utils.getString(data.effectType) as EffectType || 'Condition';
		this.exists = !!(this.exists && this.id);
		this.num = data.num || 0;
		this.gen = data.gen || 0;
		this.shortDesc = data.shortDesc || '';
		this.desc = data.desc || '';
		this.isNonstandard = data.isNonstandard || null;
		this.duration = data.duration;
		this.noCopy = !!data.noCopy;
		this.affectsFainted = !!data.affectsFainted;
		this.status = data.status as ID || undefined;
		this.area = data.weather as ID || undefined;
		this.sourceEffect = data.sourceEffect || '';
	}

	toString() {
		return this.name;
	}
}

export class Role extends BasicEffect implements Readonly<BasicEffect & RoleData> {
	readonly effectType: 'Role';
	readonly plus?: AttributeIdExceptHealth;
	readonly minus?: AttributeIdExceptHealth;
	constructor(data: AnyObject) {
		super(data);
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		data = this;

		this.fullname = `role: ${this.name}`;
		this.effectType = 'Role';
		this.plus = data.plus || undefined;
		this.minus = data.minus || undefined;
	}
}

export interface RoleData {
	name: string;
	plus?: AttributeIdExceptHealth;
	minus?: AttributeIdExceptHealth;
}

export type ModdedRoleData = RoleData | Partial<Omit<RoleData, 'name'>> & {inherit: true};

export interface RoleDataTable {[roleid: IDEntry]: RoleData}


export class DbRoles {
	readonly db: ModdedDb;
	readonly roleCache = new Map<ID, Role>();
	allCache: readonly Role[] | null = null;

	constructor(dex: ModdedDb) {
		this.db = dex;
	}

	get(name: string | Role): Role {
		if (name && typeof name !== 'string') return name;

		return this.getByID(toID(name));
	}
	getByID(id: ID): Role {
		let role = this.roleCache.get(id);
		if (role) return role;

		if (this.db.data.Aliases.hasOwnProperty(id)) {
			role = this.get(this.db.data.Aliases[id]);
			if (role.exists) {
				this.roleCache.set(id, role);
			}
			return role;
		}
		if (id && this.db.data.Roles.hasOwnProperty(id)) {
			const roleData = this.db.data.Roles[id];
			role = new Role(roleData);
			if (role.gen > this.db.gen) role.isNonstandard = 'Future';
		} else {
			role = new Role({name: id, exists: false});
		}

		if (role.exists) this.roleCache.set(id, this.db.deepFreeze(role));
		return role;
	}

	all(): readonly Role[] {
		if (this.allCache) return this.allCache;
		const roles = [];
		for (const id in this.db.data.Roles) {
			roles.push(this.getByID(id as ID));
		}
		this.allCache = Object.freeze(roles);
		return this.allCache;
	}
}

export interface ElementData {
	damageTaken: {[attackingElementNameOrEffectid: string]: number};
	Healthdvs?: SparseStatsTable;
	Healthivs?: SparseStatsTable;
	isNonstandard?: Nonstandard | null;
}

export type ModdedElementData = ElementData | Partial<Omit<ElementData, 'name'>> & {inherit: true};
export interface ElementDataTable {[typeid: IDEntry]: ElementData}
export interface ModdedElementDataTable {[typeid: IDEntry]: ModdedElementData}

type ElementInfoEffectType = 'Type' | 'EffectType';

export class ElementInfo implements Readonly<ElementData> {
	readonly id: ID;
	readonly name: string;
	/** Effect type. */
	readonly effectType: ElementInfoEffectType;
	/**
	 * Does it exist? For historical reasons, when you use an accessor
	 * for an effect that doesn't exist, you get a dummy effect that
	 * doesn't do anything, and this field set to false.
	 */
	readonly exists: boolean;
	readonly isNonstandard: Nonstandard | null;
	readonly damageTaken: {[attackingTypeNameOrEffectid: string]: number};
	readonly Healthivs: SparseStatsTable;
	readonly Healthdvs: SparseStatsTable;

	constructor(data: AnyObject) {
		this.exists = true;
		Object.assign(this, data);

		this.name = data.name;
		this.id = data.id;
		this.effectType = Utils.getString(data.effectType) as ElementInfoEffectType || 'Type';
		this.exists = !!(this.exists && this.id);
		this.isNonstandard = data.isNonstandard || null;
		this.damageTaken = data.damageTaken || {};
		this.Healthivs = data.HPivs || {};
		this.Healthdvs = data.HPdvs || {};
	}

	toString() {
		return this.name;
	}
}

export class DexTypes {
	readonly dex: ModdedDb;
	readonly typeCache = new Map<ID, ElementInfo>();
	allCache: readonly ElementInfo[] | null = null;
	namesCache: readonly string[] | null = null;

	constructor(dex: ModdedDb) {
		this.dex = dex;
	}

	get(name: string | ElementInfo): ElementInfo {
		if (name && typeof name !== 'string') return name;
		return this.getByID(toID(name));
	}

	getByID(id: ID): ElementInfo {
		let type = this.typeCache.get(id);
		if (type) return type;

		const typeName = id.charAt(0).toUpperCase() + id.substr(1);
		if (typeName && this.dex.data.TypeChart.hasOwnProperty(id)) {
			type = new ElementInfo({name: typeName, id, ...this.dex.data.TypeChart[id]});
		} else {
			type = new ElementInfo({name: typeName, id, exists: false, effectType: 'EffectType'});
		}

		if (type.exists) this.typeCache.set(id, this.dex.deepFreeze(type));
		return type;
	}

	names(): readonly string[] {
		if (this.namesCache) return this.namesCache;

		this.namesCache = this.all().filter(type => !type.isNonstandard).map(type => type.name);

		return this.namesCache;
	}

	isName(name: string): boolean {
		const id = name.toLowerCase();
		const typeName = id.charAt(0).toUpperCase() + id.substr(1);
		return name === typeName && this.dex.data.TypeChart.hasOwnProperty(id);
	}

	all(): readonly ElementInfo[] {
		if (this.allCache) return this.allCache;
		const types = [];
		for (const id in this.dex.data.TypeChart) {
			types.push(this.getByID(id as ID));
		}
		this.allCache = Object.freeze(types);
		return this.allCache;
	}
}

// const idsCache: readonly AttributeID[] = ['hp', 'sth', 'tos', 'mac', 'con', 'agy'];
// const reverseCache: {readonly [k: IDEntry]: AttributeID} = {
// 	__proto: null as any,
// 	"hitpoints": 'hp',
// 	"strength": 'strength',
// 	"toughness": 'toughness',
// 	"specialattack": 'spa', "spatk": 'spa', "spattack": 'spa', "specialatk": 'spa',
// 	"special": 'spa', "spc": 'spa',
// 	"specialdefense": 'spd', "spdef": 'spd', "spdefense": 'spd', "specialdef": 'spd',
// 	"speed": 'agy',
// // };
// export class DbStats {
// 	readonly shortNames: {readonly [k in AttributeID]: string};
// 	readonly mediumNames: {readonly [k in AttributeID]: string};
// 	readonly names: {readonly [k in AttributeID]: string};
// 	constructor(dex: ModdedDb) {
// 		if (dex.gen !== 1) {
// 			this.shortNames = {
// 				__proto__: null, hp: "HP", atk: "Atk", def: "Def", spa: "SpA", spd: "SpD", spe: "Spe",
// 			} as any;
// 			this.mediumNames = {
// 				__proto__: null, hp: "HP", atk: "Attack", def: "Defense", spa: "Sp. Atk", spd: "Sp. Def", spe: "Speed",
// 			} as any;
// 			this.names = {
// 				__proto__: null, hp: "HP", atk: "Attack", def: "Defense", spa: "Special Attack", spd: "Special Defense", spe: "Speed",
// 			} as any;
// 		} else {
// 			this.shortNames = {
// 				__proto__: null, hp: "HP", atk: "Atk", def: "Def", spa: "Spc", spd: "[SpD]", spe: "Spe",
// 			} as any;
// 			this.mediumNames = {
// 				__proto__: null, hp: "HP", atk: "Attack", def: "Defense", spa: "Special", spd: "[Sp. Def]", spe: "Speed",
// 			} as any;
// 			this.names = {
// 				__proto__: null, hp: "HP", atk: "Attack", def: "Defense", spa: "Special", spd: "[Special Defense]", spe: "Speed",
// 			} as any;
// 		}
// 	}
// 	getID(name: string) {
// 		if (name === 'Spd') return 'spe' as AttributeID;
// 		const id = toID(name);
// 		if (reverseCache[id]) return reverseCache[id];
// 		if (idsCache.includes(id as AttributeID)) return id as AttributeID;
// 		return null;
// 	}
// 	ids(): typeof idsCache {
// 		return idsCache;
// 	}
// }
