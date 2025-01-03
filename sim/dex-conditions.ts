import {BasicEffect, toID} from './dex-data';
import type {SecondaryEffect, MoveEventMethods} from './dex-moves';

export interface EventMethods {
	onDamagingHit?: (this: Battle, damage: number, target: Character, source: Character, move: ActiveMove) => void;
	onEmergencyExit?: (this: Battle, character: Character) => void;
	onAfterEachBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character, effect: Effect) => void;
	onAfterHit?: MoveEventMethods['onAfterHit'];
	onAfterMega?: (this: Battle, pokemon: Character) => void;
	onAfterSetStatus?: (this: Battle, status: Condition, target: Character, source: Character, effect: Effect) => void;
	onAfterSubDamage?: MoveEventMethods['onAfterSubDamage'];
	onAfterSwitchInSelf?: (this: Battle, pokemon: Character) => void;
	onAfterTerastallization?: (this: Battle, pokemon: Character) => void;
	onAfterUseItem?: (this: Battle, item: Item, pokemon: Character) => void;
	onAfterTakeItem?: (this: Battle, item: Item, pokemon: Character) => void;
	onAfterBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character, effect: Effect) => void;
	onAfterFaint?: (this: Battle, length: number, target: Character, source: Character, effect: Effect) => void;
	onAfterMoveSecondarySelf?: MoveEventMethods['onAfterMoveSecondarySelf'];
	onAfterMoveSecondary?: MoveEventMethods['onAfterMoveSecondary'];
	onAfterMove?: MoveEventMethods['onAfterMove'];
	onAfterMoveSelf?: CommonHandlers['VoidSourceMove'];
	onAttract?: (this: Battle, target: Character, source: Character) => void;
	onAccuracy?: (
		this: Battle, accuracy: number, target: Character, source: Character, move: ActiveMove
	) => number | boolean | null | void;
	onBasePower?: CommonHandlers['ModifierSourceMove'];
	onBeforeFaint?: (this: Battle, pokemon: Character, effect: Effect) => void;
	onBeforeMove?: CommonHandlers['VoidSourceMove'];
	onBeforeSwitchIn?: (this: Battle, pokemon: Character) => void;
	onBeforeSwitchOut?: (this: Battle, pokemon: Character) => void;
	onBeforeTurn?: (this: Battle, pokemon: Character) => void;
	onChangeBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character, effect: Effect) => void;
	onTryBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character, effect: Effect) => void;
	onChargeMove?: CommonHandlers['VoidSourceMove'];
	onCriticalHit?: ((this: Battle, pokemon: Character, source: null, move: ActiveMove) => boolean | void) | boolean;
	onDamage?: (
		this: Battle, damage: number, target: Character, source: Character, effect: Effect
	) => number | boolean | null | void;
	onDeductPP?: (this: Battle, target: Character, source: Character) => number | void;
	onDisableMove?: (this: Battle, pokemon: Character) => void;
	onDragOut?: (this: Battle, pokemon: Character, source?: Character, move?: ActiveMove) => void;
	onEatItem?: (this: Battle, item: Item, pokemon: Character) => void;
	onEffectiveness?: MoveEventMethods['onEffectiveness'];
	onEntryHazard?: (this: Battle, pokemon: Character) => void;
	onFaint?: CommonHandlers['VoidEffect'];
	onFlinch?: ((this: Battle, pokemon: Character) => boolean | void) | boolean;
	onFractionalPriority?: CommonHandlers['ModifierSourceMove'] | -0.1;
	onHit?: MoveEventMethods['onHit'];
	onImmunity?: (this: Battle, type: string, pokemon: Character) => void;
	onLockMove?: string | ((this: Battle, pokemon: Character) => void | string);
	onMaybeTrapPokemon?: (this: Battle, pokemon: Character) => void;
	onModifyAccuracy?: CommonHandlers['ModifierMove'];
	onModifyAtk?: CommonHandlers['ModifierSourceMove'];
	onModifyBoost?: (this: Battle, boosts: SparseBoostsTable, pokemon: Character) => SparseBoostsTable | void;
	onModifyCritRatio?: CommonHandlers['ModifierSourceMove'];
	onModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onModifyDef?: CommonHandlers['ModifierMove'];
	onModifyMove?: MoveEventMethods['onModifyMove'];
	onModifyPriority?: CommonHandlers['ModifierSourceMove'];
	onModifySecondaries?: (
		this: Battle, secondaries: SecondaryEffect[], target: Character, source: Character, move: ActiveMove
	) => void;
	onModifyType?: MoveEventMethods['onModifyType'];
	onModifyTarget?: MoveEventMethods['onModifyTarget'];
	onModifySpA?: CommonHandlers['ModifierSourceMove'];
	onModifySpD?: CommonHandlers['ModifierMove'];
	onModifySpe?: (this: Battle, spe: number, pokemon: Character) => number | void;
	onModifySTAB?: CommonHandlers['ModifierSourceMove'];
	onModifyWeight?: (this: Battle, weighthg: number, pokemon: Character) => number | void;
	onMoveAborted?: CommonHandlers['VoidMove'];
	onNegateImmunity?: ((this: Battle, pokemon: Character, type: string) => boolean | void) | boolean;
	onOverrideAction?: (this: Battle, pokemon: Character, target: Character, move: ActiveMove) => string | void;
	onPrepareHit?: CommonHandlers['ResultSourceMove'];
	onRedirectTarget?: (
		this: Battle, target: Character, source: Character, source2: Effect, move: ActiveMove
	) => Character | void;
	onResidual?: (this: Battle, target: Character, source: Character, effect: Effect) => void;
	onSetAbility?: (
		this: Battle, ability: string, target: Character, source: Character, effect: Effect
	) => null | void;
	onSetStatus?: (
		this: Battle, status: Condition, target: Character, source: Character, effect: Effect
	) => boolean | null | void;
	onSetWeather?: (this: Battle, target: Character, source: Character, weather: Condition) => boolean | void;
	onStallMove?: (this: Battle, pokemon: Character) => boolean | void;
	onSwitchIn?: (this: Battle, pokemon: Character) => void;
	onSwitchOut?: (this: Battle, pokemon: Character) => void;
	onSwap?: (this: Battle, target: Character, source: Character) => void;
	onTakeItem?: (
		(this: Battle, item: Item, pokemon: Character, source: Character, move?: ActiveMove) => boolean | void
	) | boolean;
	onWeatherChange?: (this: Battle, target: Character, source: Character, sourceEffect: Effect) => void;
	onTerrainChange?: (this: Battle, target: Character, source: Character, sourceEffect: Effect) => void;
	onTrapPokemon?: (this: Battle, pokemon: Character) => void;
	onTryAddVolatile?: (
		this: Battle, status: Condition, target: Character, source: Character, sourceEffect: Effect
	) => boolean | null | void;
	onTryEatItem?: boolean | ((this: Battle, item: Item, pokemon: Character) => boolean | void);
	onTryHeal?: (
		((this: Battle, relayVar: number, target: Character, source: Character, effect: Effect) => number | boolean | void)
	);
	onTryHit?: MoveEventMethods['onTryHit'];
	onTryHitField?: MoveEventMethods['onTryHitField'];
	onTryHitSide?: CommonHandlers['ResultMove'];
	onInvulnerability?: CommonHandlers['ExtResultMove'];
	onTryMove?: MoveEventMethods['onTryMove'];
	onTryPrimaryHit?: (this: Battle, target: Character, source: Character, move: ActiveMove) => boolean | null | number | void;
	onType?: (this: Battle, types: string[], pokemon: Character) => string[] | void;
	onUseItem?: (this: Battle, item: Item, pokemon: Character) => void;
	onUpdate?: (this: Battle, pokemon: Character) => void;
	onWeather?: (this: Battle, target: Character, source: null, effect: Condition) => void;
	onWeatherModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onModifyDamagePhase1?: CommonHandlers['ModifierSourceMove'];
	onModifyDamagePhase2?: CommonHandlers['ModifierSourceMove'];
	onFoeDamagingHit?: (this: Battle, damage: number, target: Character, source: Character, move: ActiveMove) => void;
	onFoeAfterEachBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character) => void;
	onFoeAfterHit?: MoveEventMethods['onAfterHit'];
	onFoeAfterSetStatus?: (this: Battle, status: Condition, target: Character, source: Character, effect: Effect) => void;
	onFoeAfterSubDamage?: MoveEventMethods['onAfterSubDamage'];
	onFoeAfterSwitchInSelf?: (this: Battle, pokemon: Character) => void;
	onFoeAfterUseItem?: (this: Battle, item: Item, pokemon: Character) => void;
	onFoeAfterBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character, effect: Effect) => void;
	onFoeAfterFaint?: (this: Battle, length: number, target: Character, source: Character, effect: Effect) => void;
	onFoeAfterMoveSecondarySelf?: MoveEventMethods['onAfterMoveSecondarySelf'];
	onFoeAfterMoveSecondary?: MoveEventMethods['onAfterMoveSecondary'];
	onFoeAfterMove?: MoveEventMethods['onAfterMove'];
	onFoeAfterMoveSelf?: CommonHandlers['VoidSourceMove'];
	onFoeAttract?: (this: Battle, target: Character, source: Character) => void;
	onFoeAccuracy?: (
		this: Battle, accuracy: number, target: Character, source: Character, move: ActiveMove
	) => number | boolean | null | void;
	onFoeBasePower?: CommonHandlers['ModifierSourceMove'];
	onFoeBeforeFaint?: (this: Battle, pokemon: Character, effect: Effect) => void;
	onFoeBeforeMove?: CommonHandlers['VoidSourceMove'];
	onFoeBeforeSwitchIn?: (this: Battle, pokemon: Character) => void;
	onFoeBeforeSwitchOut?: (this: Battle, pokemon: Character) => void;
	onFoeTryBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character, effect: Effect) => void;
	onFoeChargeMove?: CommonHandlers['VoidSourceMove'];
	onFoeCriticalHit?: ((this: Battle, pokemon: Character, source: null, move: ActiveMove) => boolean | void) | boolean;
	onFoeDamage?: (
		this: Battle, damage: number, target: Character, source: Character, effect: Effect
	) => number | boolean | null | void;
	onFoeDeductPP?: (this: Battle, target: Character, source: Character) => number | void;
	onFoeDisableMove?: (this: Battle, pokemon: Character) => void;
	onFoeDragOut?: (this: Battle, pokemon: Character, source?: Character, move?: ActiveMove) => void;
	onFoeEatItem?: (this: Battle, item: Item, pokemon: Character) => void;
	onFoeEffectiveness?: MoveEventMethods['onEffectiveness'];
	onFoeFaint?: CommonHandlers['VoidEffect'];
	onFoeFlinch?: ((this: Battle, pokemon: Character) => boolean | void) | boolean;
	onFoeHit?: MoveEventMethods['onHit'];
	onFoeImmunity?: (this: Battle, type: string, pokemon: Character) => void;
	onFoeLockMove?: string | ((this: Battle, pokemon: Character) => void | string);
	onFoeMaybeTrapPokemon?: (this: Battle, pokemon: Character, source?: Character) => void;
	onFoeModifyAccuracy?: CommonHandlers['ModifierMove'];
	onFoeModifyAtk?: CommonHandlers['ModifierSourceMove'];
	onFoeModifyBoost?: (this: Battle, boosts: SparseBoostsTable, pokemon: Character) => SparseBoostsTable | void;
	onFoeModifyCritRatio?: CommonHandlers['ModifierSourceMove'];
	onFoeModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onFoeModifyDef?: CommonHandlers['ModifierMove'];
	onFoeModifyMove?: MoveEventMethods['onModifyMove'];
	onFoeModifyPriority?: CommonHandlers['ModifierSourceMove'];
	onFoeModifySecondaries?: (
		this: Battle, secondaries: SecondaryEffect[], target: Character, source: Character, move: ActiveMove
	) => void;
	onFoeModifySpA?: CommonHandlers['ModifierSourceMove'];
	onFoeModifySpD?: CommonHandlers['ModifierMove'];
	onFoeModifySpe?: (this: Battle, spe: number, pokemon: Character) => number | void;
	onFoeModifySTAB?: CommonHandlers['ModifierSourceMove'];
	onFoeModifyType?: MoveEventMethods['onModifyType'];
	onFoeModifyTarget?: MoveEventMethods['onModifyTarget'];
	onFoeModifyWeight?: (this: Battle, weighthg: number, pokemon: Character) => number | void;
	onFoeMoveAborted?: CommonHandlers['VoidMove'];
	onFoeNegateImmunity?: ((this: Battle, pokemon: Character, type: string) => boolean | void) | boolean;
	onFoeOverrideAction?: (this: Battle, pokemon: Character, target: Character, move: ActiveMove) => string | void;
	onFoePrepareHit?: CommonHandlers['ResultSourceMove'];
	onFoeRedirectTarget?: (
		this: Battle, target: Character, source: Character, source2: Effect, move: ActiveMove
	) => Character | void;
	onFoeResidual?: (this: Battle, target: Character & Side, source: Character, effect: Effect) => void;
	onFoeSetAbility?: (this: Battle, ability: string, target: Character, source: Character, effect: Effect) => boolean | void;
	onFoeSetStatus?: (
		this: Battle, status: Condition, target: Character, source: Character, effect: Effect
	) => boolean | null | void;
	onFoeSetWeather?: (this: Battle, target: Character, source: Character, weather: Condition) => boolean | void;
	onFoeStallMove?: (this: Battle, pokemon: Character) => boolean | void;
	onFoeSwitchIn?: (this: Battle, pokemon: Character) => void;
	onFoeSwitchOut?: (this: Battle, pokemon: Character) => void;
	onFoeTakeItem?: (
		(this: Battle, item: Item, pokemon: Character, source: Character, move?: ActiveMove) => boolean | void
	) | boolean;
	onFoeTerrain?: (this: Battle, pokemon: Character) => void;
	onFoeTrapPokemon?: (this: Battle, pokemon: Character) => void;
	onFoeTryAddVolatile?: (
		this: Battle, status: Condition, target: Character, source: Character, sourceEffect: Effect
	) => boolean | null | void;
	onFoeTryEatItem?: boolean | ((this: Battle, item: Item, pokemon: Character) => boolean | void);
	/* FIXME: onFoeTryHeal() is run with two different sets of arguments */
	onFoeTryHeal?: (
		((this: Battle, relayVar: number, target: Character, source: Character, effect: Effect) => number | boolean | void) |
		((this: Battle, pokemon: Character) => boolean | void) | boolean
	);
	onFoeTryHit?: MoveEventMethods['onTryHit'];
	onFoeTryHitField?: MoveEventMethods['onTryHitField'];
	onFoeTryHitSide?: CommonHandlers['ResultMove'];
	onFoeInvulnerability?: CommonHandlers['ExtResultMove'];
	onFoeTryMove?: MoveEventMethods['onTryMove'];
	onFoeTryPrimaryHit?: (
		this: Battle, target: Character, source: Character, move: ActiveMove
	) => boolean | null | number | void;
	onFoeType?: (this: Battle, types: string[], pokemon: Character) => string[] | void;
	onFoeWeatherModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onFoeModifyDamagePhase1?: CommonHandlers['ModifierSourceMove'];
	onFoeModifyDamagePhase2?: CommonHandlers['ModifierSourceMove'];
	onSourceDamagingHit?: (this: Battle, damage: number, target: Character, source: Character, move: ActiveMove) => void;
	onSourceAfterEachBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character) => void;
	onSourceAfterHit?: MoveEventMethods['onAfterHit'];
	onSourceAfterSetStatus?: (this: Battle, status: Condition, target: Character, source: Character, effect: Effect) => void;
	onSourceAfterSubDamage?: MoveEventMethods['onAfterSubDamage'];
	onSourceAfterSwitchInSelf?: (this: Battle, pokemon: Character) => void;
	onSourceAfterUseItem?: (this: Battle, item: Item, pokemon: Character) => void;
	onSourceAfterBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character, effect: Effect) => void;
	onSourceAfterFaint?: (this: Battle, length: number, target: Character, source: Character, effect: Effect) => void;
	onSourceAfterMoveSecondarySelf?: MoveEventMethods['onAfterMoveSecondarySelf'];
	onSourceAfterMoveSecondary?: MoveEventMethods['onAfterMoveSecondary'];
	onSourceAfterMove?: MoveEventMethods['onAfterMove'];
	onSourceAfterMoveSelf?: CommonHandlers['VoidSourceMove'];
	onSourceAttract?: (this: Battle, target: Character, source: Character) => void;
	onSourceAccuracy?: (
		this: Battle, accuracy: number, target: Character, source: Character, move: ActiveMove
	) => number | boolean | null | void;
	onSourceBasePower?: CommonHandlers['ModifierSourceMove'];
	onSourceBeforeFaint?: (this: Battle, pokemon: Character, effect: Effect) => void;
	onSourceBeforeMove?: CommonHandlers['VoidSourceMove'];
	onSourceBeforeSwitchIn?: (this: Battle, pokemon: Character) => void;
	onSourceBeforeSwitchOut?: (this: Battle, pokemon: Character) => void;
	onSourceTryBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character, effect: Effect) => void;
	onSourceChargeMove?: CommonHandlers['VoidSourceMove'];
	onSourceCriticalHit?: ((this: Battle, pokemon: Character, source: null, move: ActiveMove) => boolean | void) | boolean;
	onSourceDamage?: (
		this: Battle, damage: number, target: Character, source: Character, effect: Effect
	) => number | boolean | null | void;
	onSourceDeductPP?: (this: Battle, target: Character, source: Character) => number | void;
	onSourceDisableMove?: (this: Battle, pokemon: Character) => void;
	onSourceDragOut?: (this: Battle, pokemon: Character, source?: Character, move?: ActiveMove) => void;
	onSourceEatItem?: (this: Battle, item: Item, pokemon: Character) => void;
	onSourceEffectiveness?: MoveEventMethods['onEffectiveness'];
	onSourceFaint?: CommonHandlers['VoidEffect'];
	onSourceFlinch?: ((this: Battle, pokemon: Character) => boolean | void) | boolean;
	onSourceHit?: MoveEventMethods['onHit'];
	onSourceImmunity?: (this: Battle, type: string, pokemon: Character) => void;
	onSourceLockMove?: string | ((this: Battle, pokemon: Character) => void | string);
	onSourceMaybeTrapPokemon?: (this: Battle, pokemon: Character) => void;
	onSourceModifyAccuracy?: CommonHandlers['ModifierMove'];
	onSourceModifyAtk?: CommonHandlers['ModifierSourceMove'];
	onSourceModifyBoost?: (this: Battle, boosts: SparseBoostsTable, pokemon: Character) => SparseBoostsTable | void;
	onSourceModifyCritRatio?: CommonHandlers['ModifierSourceMove'];
	onSourceModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onSourceModifyDef?: CommonHandlers['ModifierMove'];
	onSourceModifyMove?: MoveEventMethods['onModifyMove'];
	onSourceModifyPriority?: CommonHandlers['ModifierSourceMove'];
	onSourceModifySecondaries?: (
		this: Battle, secondaries: SecondaryEffect[], target: Character, source: Character, move: ActiveMove
	) => void;
	onSourceModifySpA?: CommonHandlers['ModifierSourceMove'];
	onSourceModifySpD?: CommonHandlers['ModifierMove'];
	onSourceModifySpe?: (this: Battle, spe: number, pokemon: Character) => number | void;
	onSourceModifySTAB?: CommonHandlers['ModifierSourceMove'];
	onSourceModifyType?: MoveEventMethods['onModifyType'];
	onSourceModifyTarget?: MoveEventMethods['onModifyTarget'];
	onSourceModifyWeight?: (this: Battle, weighthg: number, pokemon: Character) => number | void;
	onSourceMoveAborted?: CommonHandlers['VoidMove'];
	onSourceNegateImmunity?: ((this: Battle, pokemon: Character, type: string) => boolean | void) | boolean;
	onSourceOverrideAction?: (this: Battle, pokemon: Character, target: Character, move: ActiveMove) => string | void;
	onSourcePrepareHit?: CommonHandlers['ResultSourceMove'];
	onSourceRedirectTarget?: (
		this: Battle, target: Character, source: Character, source2: Effect, move: ActiveMove
	) => Character | void;
	onSourceResidual?: (this: Battle, target: Character & Side, source: Character, effect: Effect) => void;
	onSourceSetAbility?: (
		this: Battle, ability: string, target: Character, source: Character, effect: Effect
	) => boolean | void;
	onSourceSetStatus?: (
		this: Battle, status: Condition, target: Character, source: Character, effect: Effect
	) => boolean | null | void;
	onSourceSetWeather?: (this: Battle, target: Character, source: Character, weather: Condition) => boolean | void;
	onSourceStallMove?: (this: Battle, pokemon: Character) => boolean | void;
	onSourceSwitchIn?: (this: Battle, pokemon: Character) => void;
	onSourceSwitchOut?: (this: Battle, pokemon: Character) => void;
	onSourceTakeItem?: (
		(this: Battle, item: Item, pokemon: Character, source: Character, move?: ActiveMove) => boolean | void
	) | boolean;
	onSourceTerrain?: (this: Battle, pokemon: Character) => void;
	onSourceTrapPokemon?: (this: Battle, pokemon: Character) => void;
	onSourceTryAddVolatile?: (
		this: Battle, status: Condition, target: Character, source: Character, sourceEffect: Effect
	) => boolean | null | void;
	onSourceTryEatItem?: boolean | ((this: Battle, item: Item, pokemon: Character) => boolean | void);
	/* FIXME: onSourceTryHeal() is run with two different sets of arguments */
	onSourceTryHeal?: (
		((this: Battle, relayVar: number, target: Character, source: Character, effect: Effect) => number | boolean | void) |
		((this: Battle, pokemon: Character) => boolean | void) | boolean
	);
	onSourceTryHit?: MoveEventMethods['onTryHit'];
	onSourceTryHitField?: MoveEventMethods['onTryHitField'];
	onSourceTryHitSide?: CommonHandlers['ResultMove'];
	onSourceInvulnerability?: CommonHandlers['ExtResultMove'];
	onSourceTryMove?: MoveEventMethods['onTryMove'];
	onSourceTryPrimaryHit?: (
		this: Battle, target: Character, source: Character, move: ActiveMove
	) => boolean | null | number | void;
	onSourceType?: (this: Battle, types: string[], pokemon: Character) => string[] | void;
	onSourceWeatherModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onSourceModifyDamagePhase1?: CommonHandlers['ModifierSourceMove'];
	onSourceModifyDamagePhase2?: CommonHandlers['ModifierSourceMove'];
	onAnyDamagingHit?: (this: Battle, damage: number, target: Character, source: Character, move: ActiveMove) => void;
	onAnyAfterEachBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character) => void;
	onAnyAfterHit?: MoveEventMethods['onAfterHit'];
	onAnyAfterSetStatus?: (this: Battle, status: Condition, target: Character, source: Character, effect: Effect) => void;
	onAnyAfterSubDamage?: MoveEventMethods['onAfterSubDamage'];
	onAnyAfterSwitchInSelf?: (this: Battle, pokemon: Character) => void;
	onAnyAfterUseItem?: (this: Battle, item: Item, pokemon: Character) => void;
	onAnyAfterBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character, effect: Effect) => void;
	onAnyAfterFaint?: (this: Battle, length: number, target: Character, source: Character, effect: Effect) => void;
	onAnyAfterMoveSecondarySelf?: MoveEventMethods['onAfterMoveSecondarySelf'];
	onAnyAfterMoveSecondary?: MoveEventMethods['onAfterMoveSecondary'];
	onAnyAfterMove?: MoveEventMethods['onAfterMove'];
	onAnyAfterMoveSelf?: CommonHandlers['VoidSourceMove'];
	onAnyAttract?: (this: Battle, target: Character, source: Character) => void;
	onAnyAccuracy?: (
		this: Battle, accuracy: number, target: Character, source: Character, move: ActiveMove
	) => number | boolean | null | void;
	onAnyBasePower?: CommonHandlers['ModifierSourceMove'];
	onAnyBeforeFaint?: (this: Battle, pokemon: Character, effect: Effect) => void;
	onAnyBeforeMove?: CommonHandlers['VoidSourceMove'];
	onAnyBeforeSwitchIn?: (this: Battle, pokemon: Character) => void;
	onAnyBeforeSwitchOut?: (this: Battle, pokemon: Character) => void;
	onAnyTryBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character, effect: Effect) => void;
	onAnyChargeMove?: CommonHandlers['VoidSourceMove'];
	onAnyCriticalHit?: ((this: Battle, pokemon: Character, source: null, move: ActiveMove) => boolean | void) | boolean;
	onAnyDamage?: (
		this: Battle, damage: number, target: Character, source: Character, effect: Effect
	) => number | boolean | null | void;
	onAnyDeductPP?: (this: Battle, target: Character, source: Character) => number | void;
	onAnyDisableMove?: (this: Battle, pokemon: Character) => void;
	onAnyDragOut?: (this: Battle, pokemon: Character, source?: Character, move?: ActiveMove) => void;
	onAnyEatItem?: (this: Battle, item: Item, pokemon: Character) => void;
	onAnyEffectiveness?: MoveEventMethods['onEffectiveness'];
	onAnyFaint?: CommonHandlers['VoidEffect'];
	onAnyFlinch?: ((this: Battle, pokemon: Character) => boolean | void) | boolean;
	onAnyHit?: MoveEventMethods['onHit'];
	onAnyImmunity?: (this: Battle, type: string, pokemon: Character) => void;
	onAnyLockMove?: string | ((this: Battle, pokemon: Character) => void | string);
	onAnyMaybeTrapPokemon?: (this: Battle, pokemon: Character) => void;
	onAnyModifyAccuracy?: CommonHandlers['ModifierMove'];
	onAnyModifyAtk?: CommonHandlers['ModifierSourceMove'];
	onAnyModifyBoost?: (this: Battle, boosts: SparseBoostsTable, pokemon: Character) => SparseBoostsTable | void;
	onAnyModifyCritRatio?: CommonHandlers['ModifierSourceMove'];
	onAnyModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onAnyModifyDef?: CommonHandlers['ModifierMove'];
	onAnyModifyMove?: MoveEventMethods['onModifyMove'];
	onAnyModifyPriority?: CommonHandlers['ModifierSourceMove'];
	onAnyModifySecondaries?: (
		this: Battle, secondaries: SecondaryEffect[], target: Character, source: Character, move: ActiveMove
	) => void;
	onAnyModifySpA?: CommonHandlers['ModifierSourceMove'];
	onAnyModifySpD?: CommonHandlers['ModifierMove'];
	onAnyModifySpe?: (this: Battle, spe: number, pokemon: Character) => number | void;
	onAnyModifySTAB?: CommonHandlers['ModifierSourceMove'];
	onAnyModifyType?: MoveEventMethods['onModifyType'];
	onAnyModifyTarget?: MoveEventMethods['onModifyTarget'];
	onAnyModifyWeight?: (this: Battle, weighthg: number, pokemon: Character) => number | void;
	onAnyMoveAborted?: CommonHandlers['VoidMove'];
	onAnyNegateImmunity?: ((this: Battle, pokemon: Character, type: string) => boolean | void) | boolean;
	onAnyOverrideAction?: (this: Battle, pokemon: Character, target: Character, move: ActiveMove) => string | void;
	onAnyPrepareHit?: CommonHandlers['ResultSourceMove'];
	onAnyPseudoWeatherChange?: (this: Battle, target: Character, source: Character, pseudoWeather: Condition) => void;
	onAnyRedirectTarget?: (
		this: Battle, target: Character, source: Character, source2: Effect, move: ActiveMove
	) => Character | void;
	onAnyResidual?: (this: Battle, target: Character & Side, source: Character, effect: Effect) => void;
	onAnySetAbility?: (this: Battle, ability: string, target: Character, source: Character, effect: Effect) => boolean | void;
	onAnySetStatus?: (
		this: Battle, status: Condition, target: Character, source: Character, effect: Effect
	) => boolean | null | void;
	onAnySetWeather?: (this: Battle, target: Character, source: Character, weather: Condition) => boolean | void;
	onAnyStallMove?: (this: Battle, pokemon: Character) => boolean | void;
	onAnySwitchIn?: (this: Battle, pokemon: Character) => void;
	onAnySwitchOut?: (this: Battle, pokemon: Character) => void;
	onAnyTakeItem?: (
		(this: Battle, item: Item, pokemon: Character, source: Character, move?: ActiveMove) => boolean | void
	) | boolean;
	onAnyTerrain?: (this: Battle, pokemon: Character) => void;
	onAnyTrapPokemon?: (this: Battle, pokemon: Character) => void;
	onAnyTryAddVolatile?: (
		this: Battle, status: Condition, target: Character, source: Character, sourceEffect: Effect
	) => boolean | null | void;
	onAnyTryEatItem?: boolean | ((this: Battle, item: Item, pokemon: Character) => boolean | void);
	/* FIXME: onAnyTryHeal() is run with two different sets of arguments */
	onAnyTryHeal?: (
		((this: Battle, relayVar: number, target: Character, source: Character, effect: Effect) => number | boolean | void) |
		((this: Battle, pokemon: Character) => boolean | void) | boolean
	);
	onAnyTryHit?: MoveEventMethods['onTryHit'];
	onAnyTryHitField?: MoveEventMethods['onTryHitField'];
	onAnyTryHitSide?: CommonHandlers['ResultMove'];
	onAnyInvulnerability?: CommonHandlers['ExtResultMove'];
	onAnyTryMove?: MoveEventMethods['onTryMove'];
	onAnyTryPrimaryHit?: (
		this: Battle, target: Character, source: Character, move: ActiveMove
	) => boolean | null | number | void;
	onAnyType?: (this: Battle, types: string[], pokemon: Character) => string[] | void;
	onAnyWeatherModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onAnyModifyDamagePhase1?: CommonHandlers['ModifierSourceMove'];
	onAnyModifyDamagePhase2?: CommonHandlers['ModifierSourceMove'];

	// Priorities (incomplete list)
	onAccuracyPriority?: number;
	onDamagingHitOrder?: number;
	onAfterMoveSecondaryPriority?: number;
	onAfterMoveSecondarySelfPriority?: number;
	onAfterMoveSelfPriority?: number;
	onAfterSetStatusPriority?: number;
	onAnyBasePowerPriority?: number;
	onAnyInvulnerabilityPriority?: number;
	onAnyModifyAccuracyPriority?: number;
	onAnyFaintPriority?: number;
	onAnyPrepareHitPriority?: number;
	onAllyBasePowerPriority?: number;
	onAllyModifyAtkPriority?: number;
	onAllyModifySpAPriority?: number;
	onAllyModifySpDPriority?: number;
	onAttractPriority?: number;
	onBasePowerPriority?: number;
	onBeforeMovePriority?: number;
	onBeforeSwitchOutPriority?: number;
	onChangeBoostPriority?: number;
	onDamagePriority?: number;
	onDragOutPriority?: number;
	onEffectivenessPriority?: number;
	onFoeBasePowerPriority?: number;
	onFoeBeforeMovePriority?: number;
	onFoeModifyDefPriority?: number;
	onFoeModifySpDPriority?: number;
	onFoeRedirectTargetPriority?: number;
	onFoeTrapPokemonPriority?: number;
	onFractionalPriorityPriority?: number;
	onHitPriority?: number;
	onInvulnerabilityPriority?: number;
	onModifyAccuracyPriority?: number;
	onModifyAtkPriority?: number;
	onModifyCritRatioPriority?: number;
	onModifyDefPriority?: number;
	onModifyMovePriority?: number;
	onModifyPriorityPriority?: number;
	onModifySpAPriority?: number;
	onModifySpDPriority?: number;
	onModifySpePriority?: number;
	onModifySTABPriority?: number;
	onModifyTypePriority?: number;
	onModifyWeightPriority?: number;
	onRedirectTargetPriority?: number;
	onResidualOrder?: number;
	onResidualPriority?: number;
	onResidualSubOrder?: number;
	onSourceBasePowerPriority?: number;
	onSourceInvulnerabilityPriority?: number;
	onSourceModifyAccuracyPriority?: number;
	onSourceModifyAtkPriority?: number;
	onSourceModifyDamagePriority?: number;
	onSourceModifySpAPriority?: number;
	onSwitchInPriority?: number;
	onTrapPokemonPriority?: number;
	onTryEatItemPriority?: number;
	onTryHealPriority?: number;
	onTryHitPriority?: number;
	onTryMovePriority?: number;
	onTryPrimaryHitPriority?: number;
	onTypePriority?: number;
}

export interface PokemonEventMethods extends EventMethods {
	onAllyDamagingHit?: (this: Battle, damage: number, target: Character, source: Character, move: ActiveMove) => void;
	onAllyAfterEachBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character) => void;
	onAllyAfterHit?: MoveEventMethods['onAfterHit'];
	onAllyAfterSetStatus?: (this: Battle, status: Condition, target: Character, source: Character, effect: Effect) => void;
	onAllyAfterSubDamage?: MoveEventMethods['onAfterSubDamage'];
	onAllyAfterSwitchInSelf?: (this: Battle, pokemon: Character) => void;
	onAllyAfterUseItem?: (this: Battle, item: Item, pokemon: Character) => void;
	onAllyAfterBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character, effect: Effect) => void;
	onAllyAfterFaint?: (this: Battle, length: number, target: Character, source: Character, effect: Effect) => void;
	onAllyAfterMoveSecondarySelf?: MoveEventMethods['onAfterMoveSecondarySelf'];
	onAllyAfterMoveSecondary?: MoveEventMethods['onAfterMoveSecondary'];
	onAllyAfterMove?: MoveEventMethods['onAfterMove'];
	onAllyAfterMoveSelf?: CommonHandlers['VoidSourceMove'];
	onAllyAttract?: (this: Battle, target: Character, source: Character) => void;
	onAllyAccuracy?: (
		this: Battle, accuracy: number, target: Character, source: Character, move: ActiveMove
	) => number | boolean | null | void;
	onAllyBasePower?: CommonHandlers['ModifierSourceMove'];
	onAllyBeforeFaint?: (this: Battle, pokemon: Character, effect: Effect) => void;
	onAllyBeforeMove?: CommonHandlers['VoidSourceMove'];
	onAllyBeforeSwitchIn?: (this: Battle, pokemon: Character) => void;
	onAllyBeforeSwitchOut?: (this: Battle, pokemon: Character) => void;
	onAllyTryBoost?: (this: Battle, boost: SparseBoostsTable, target: Character, source: Character, effect: Effect) => void;
	onAllyChargeMove?: CommonHandlers['VoidSourceMove'];
	onAllyCriticalHit?: ((this: Battle, pokemon: Character, source: null, move: ActiveMove) => boolean | void) | boolean;
	onAllyDamage?: (
		this: Battle, damage: number, target: Character, source: Character, effect: Effect
	) => number | boolean | null | void;
	onAllyDeductPP?: (this: Battle, target: Character, source: Character) => number | void;
	onAllyDisableMove?: (this: Battle, pokemon: Character) => void;
	onAllyDragOut?: (this: Battle, pokemon: Character, source?: Character, move?: ActiveMove) => void;
	onAllyEatItem?: (this: Battle, item: Item, pokemon: Character) => void;
	onAllyEffectiveness?: MoveEventMethods['onEffectiveness'];
	onAllyFaint?: CommonHandlers['VoidEffect'];
	onAllyFlinch?: ((this: Battle, pokemon: Character) => boolean | void) | boolean;
	onAllyHit?: MoveEventMethods['onHit'];
	onAllyImmunity?: (this: Battle, type: string, pokemon: Character) => void;
	onAllyLockMove?: string | ((this: Battle, pokemon: Character) => void | string);
	onAllyMaybeTrapPokemon?: (this: Battle, pokemon: Character) => void;
	onAllyModifyAccuracy?: CommonHandlers['ModifierMove'];
	onAllyModifyAtk?: CommonHandlers['ModifierSourceMove'];
	onAllyModifyBoost?: (this: Battle, boosts: SparseBoostsTable, pokemon: Character) => SparseBoostsTable | void;
	onAllyModifyCritRatio?: CommonHandlers['ModifierSourceMove'];
	onAllyModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onAllyModifyDef?: CommonHandlers['ModifierMove'];
	onAllyModifyMove?: MoveEventMethods['onModifyMove'];
	onAllyModifyPriority?: CommonHandlers['ModifierSourceMove'];
	onAllyModifySecondaries?: (
		this: Battle, secondaries: SecondaryEffect[], target: Character, source: Character, move: ActiveMove
	) => void;
	onAllyModifySpA?: CommonHandlers['ModifierSourceMove'];
	onAllyModifySpD?: CommonHandlers['ModifierMove'];
	onAllyModifySpe?: (this: Battle, spe: number, pokemon: Character) => number | void;
	onAllyModifySTAB?: CommonHandlers['ModifierSourceMove'];
	onAllyModifyType?: MoveEventMethods['onModifyType'];
	onAllyModifyTarget?: MoveEventMethods['onModifyTarget'];
	onAllyModifyWeight?: (this: Battle, weighthg: number, pokemon: Character) => number | void;
	onAllyMoveAborted?: CommonHandlers['VoidMove'];
	onAllyNegateImmunity?: ((this: Battle, pokemon: Character, type: string) => boolean | void) | boolean;
	onAllyOverrideAction?: (this: Battle, pokemon: Character, target: Character, move: ActiveMove) => string | void;
	onAllyPrepareHit?: CommonHandlers['ResultSourceMove'];
	onAllyRedirectTarget?: (
		this: Battle, target: Character, source: Character, source2: Effect, move: ActiveMove
	) => Character | void;
	onAllyResidual?: (this: Battle, target: Character & Side, source: Character, effect: Effect) => void;
	onAllySetAbility?: (this: Battle, ability: string, target: Character, source: Character, effect: Effect) => boolean | void;
	onAllySetStatus?: (
		this: Battle, status: Condition, target: Character, source: Character, effect: Effect
	) => boolean | null | void;
	onAllySetWeather?: (this: Battle, target: Character, source: Character, weather: Condition) => boolean | void;
	onAllySideConditionStart?: (this: Battle, target: Character, source: Character, sideCondition: Condition) => void;
	onAllyStallMove?: (this: Battle, pokemon: Character) => boolean | void;
	onAllySwitchIn?: (this: Battle, pokemon: Character) => void;
	onAllySwitchOut?: (this: Battle, pokemon: Character) => void;
	onAllyTakeItem?: (
		(this: Battle, item: Item, pokemon: Character, source: Character, move?: ActiveMove) => boolean | void
	) | boolean;
	onAllyTerrain?: (this: Battle, pokemon: Character) => void;
	onAllyTrapPokemon?: (this: Battle, pokemon: Character) => void;
	onAllyTryAddVolatile?: (
		this: Battle, status: Condition, target: Character, source: Character, sourceEffect: Effect
	) => boolean | null | void;
	onAllyTryEatItem?: boolean | ((this: Battle, item: Item, pokemon: Character) => boolean | void);
	/* FIXME: onAllyTryHeal() is run with two different sets of arguments */
	onAllyTryHeal?: (
		((this: Battle, relayVar: number, target: Character, source: Character, effect: Effect) => number | boolean | void) |
		((this: Battle, pokemon: Character) => boolean | void) | boolean
	);
	onAllyTryHit?: MoveEventMethods['onTryHit'];
	onAllyTryHitField?: MoveEventMethods['onTryHitField'];
	onAllyTryHitSide?: CommonHandlers['ResultMove'];
	onAllyInvulnerability?: CommonHandlers['ExtResultMove'];
	onAllyTryMove?: MoveEventMethods['onTryMove'];
	onAllyTryPrimaryHit?: (
		this: Battle, target: Character, source: Character, move: ActiveMove
	) => boolean | null | number | void;
	onAllyType?: (this: Battle, types: string[], pokemon: Character) => string[] | void;
	onAllyWeatherModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onAllyModifyDamagePhase1?: CommonHandlers['ModifierSourceMove'];
	onAllyModifyDamagePhase2?: CommonHandlers['ModifierSourceMove'];
}
export interface SideEventMethods extends EventMethods {
	onSideStart?: (this: Battle, target: Side, source: Character, sourceEffect: Effect) => void;
	onSideRestart?: (this: Battle, target: Side, source: Character, sourceEffect: Effect) => void;
	onSideResidual?: (this: Battle, target: Side, source: Character, effect: Effect) => void;
	onSideEnd?: (this: Battle, target: Side) => void;
	onSideResidualOrder?: number;
	onSideResidualPriority?: number;
	onSideResidualSubOrder?: number;
}
export interface FieldEventMethods extends EventMethods {
	onFieldStart?: (this: Battle, target: Field, source: Character, sourceEffect: Effect) => void;
	onFieldRestart?: (this: Battle, target: Field, source: Character, sourceEffect: Effect) => void;
	onFieldResidual?: (this: Battle, target: Field, source: Character, effect: Effect) => void;
	onFieldEnd?: (this: Battle, target: Field) => void;
	onFieldResidualOrder?: number;
	onFieldResidualPriority?: number;
	onFieldResidualSubOrder?: number;
}
export interface PokemonConditionData extends Partial<Condition>, PokemonEventMethods {}
export interface SideConditionData extends
	Partial<Omit<Condition, 'onStart' | 'onRestart' | 'onEnd'>>, SideEventMethods {}
export interface FieldConditionData extends
	Partial<Omit<Condition, 'onStart' | 'onRestart' | 'onEnd'>>, FieldEventMethods {}

export type ConditionData = PokemonConditionData | SideConditionData | FieldConditionData;

export type ModdedConditionData = ConditionData & {inherit?: true};
export interface ConditionDataTable {[id: IDEntry]: ConditionData}
export interface ModdedConditionDataTable {[id: IDEntry]: ModdedConditionData}

export class Condition extends BasicEffect implements
	Readonly<BasicEffect & SideConditionData & FieldConditionData & PokemonConditionData> {
	declare readonly effectType: 'Condition' | 'Weather' | 'Status' | 'Terastal';
	declare readonly counterMax?: number;

	declare readonly durationCallback?: (this: Battle, target: Character, source: Character, effect: Effect | null) => number;
	declare readonly onCopy?: (this: Battle, pokemon: Character) => void;
	declare readonly onEnd?: (this: Battle, target: Character) => void;
	declare readonly onRestart?: (
		this: Battle, target: Character, source: Character, sourceEffect: Effect
	) => boolean | null | void;
	declare readonly onStart?: (
		this: Battle, target: Character, source: Character, sourceEffect: Effect
	) => boolean | null | void;

	constructor(data: AnyObject) {
		super(data);
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		data = this;
		this.effectType = (['Weather', 'Status'].includes(data.effectType) ? data.effectType : 'Condition');
	}
}

const EMPTY_CONDITION: Condition = new Condition({name: '', exists: false});

export class DexConditions {
	readonly dex: ModdedDb;
	readonly conditionCache = new Map<ID, Condition>();

	constructor(dex: ModdedDb) {
		this.dex = dex;
	}

	get(name?: string | Effect | null): Condition {
		if (!name) return EMPTY_CONDITION;
		if (typeof name !== 'string') return name as Condition;

		return this.getByID(name.startsWith('item:') || name.startsWith('ability:') ? name as ID : toID(name));
	}

	getByID(id: ID): Condition {
		if (!id) return EMPTY_CONDITION;

		let condition = this.conditionCache.get(id);
		if (condition) return condition;

		let found;
		if (id.startsWith('item:')) {
			const item = this.dex.items.getByID(id.slice(5) as ID);
			condition = {...item, id: 'item:' + item.id as ID} as any as Condition;
		} else if (id.startsWith('ability:')) {
			const ability = this.dex.abilities.getByID(id.slice(8) as ID);
			condition = {...ability, id: 'ability:' + ability.id as ID} as any as Condition;
		} else if (this.dex.data.Rulesets.hasOwnProperty(id)) {
			condition = this.dex.formats.get(id) as any as Condition;
			// formats can't be frozen if they don't have a ruleTable
			this.conditionCache.set(id, condition);
			return condition;
		} else if (this.dex.data.Conditions.hasOwnProperty(id)) {
			condition = new Condition({name: id, ...this.dex.data.Conditions[id]});
		} else if (
			(this.dex.data.Moves.hasOwnProperty(id) && (found = this.dex.data.Moves[id]).condition) ||
			(this.dex.data.Abilities.hasOwnProperty(id) && (found = this.dex.data.Abilities[id]).condition) ||
			(this.dex.data.Equipments.hasOwnProperty(id) && (found = this.dex.data.Equipments[id]).condition)
		) {
			condition = new Condition({name: found.name || id, ...found.condition});
		} else if (id === 'recoil') {
			condition = new Condition({name: 'Recoil', effectType: 'Recoil'});
		} else if (id === 'drain') {
			condition = new Condition({name: 'Drain', effectType: 'Drain'});
		} else {
			condition = new Condition({name: id, exists: false});
		}

		this.conditionCache.set(id, this.dex.deepFreeze(condition));
		return condition;
	}
}
