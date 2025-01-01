import * as fs from 'node:fs';
import * as path from 'node:path';

interface ArmourTypeRow {
    BaseItemTypesKey: number;
    Armour: number;
    Evasion: number;
    EnergyShield: number;
}

interface BaseItemTypeRow {
    _index: number;
    Id: string;
    Width: number;
    Height: number;
    Name: string;
    DropLevel: number;
    Implicit_ModsKeys: string[];
    ItemVisualIdentity: number;
    IsCorrupted: boolean;
    ItemClassesKey: string;
    SiteVisibility: number;
    TagsKeys: string[];
}

interface ItemClassRow {
    Id: string;
}

interface ItemVisualIdentityRow {
    _index: number;
    Id: string;
    DDSFile: string;
    AOFile: string;
}

interface TagRow {
    Id: string;
    DisplayString: string;
}

interface UniqueStashLayoutRow {
    WordsKey: number;
    ShowIfEmptyChallengeLeague: boolean;
    RenamedVersion: number;
    UniqueStashTypesKey: number;
    ItemVisualIdentityKey: number;
    ShowIfEmptyStandard: boolean;
    IsAlternateArt: boolean;
}

interface WordRow {
    _index: number;
    Wordlist: number;
    Text: string;
    SpawnWeight_Tags: number[];
    SpawnWeight_Values: number[];
    Text2: string;
}

interface StatsRow {
    Id: string;
    IsLocal: boolean;
    IsWeaponLocal: boolean;
    Semantics: number;
    Text: string;
    IsVirtual: boolean;
    HASH32: number;
    BelongsActiveSkillsKey: string[];
    IsScalable: boolean;
}

function readJsonFile<T>(fileName: string): T {
    const data = fs.readFileSync(path.join(__dirname, fileName), { encoding: 'utf-8' });
    return JSON.parse(data) as T;
}

export function ArmourTypes(): ArmourTypeRow[] {
    return readJsonFile<ArmourTypeRow[]>('ArmourTypes.json');
}

export function BaseItemTypes(lang: string = 'en'): BaseItemTypeRow[] {
    return readJsonFile<BaseItemTypeRow[]>('BaseItemTypes.json');
}

export function ItemClasses(): ItemClassRow[] {
    return readJsonFile<ItemClassRow[]>('ItemClasses.json');
}

export function ItemVisualIdentity(): ItemVisualIdentityRow[] {
    return readJsonFile<ItemVisualIdentityRow[]>('ItemVisualIdentity.json');
}

export function Tags(): TagRow[] {
    return readJsonFile<TagRow[]>('Tags.json');
}

export function UniquesStashLayout(): UniqueStashLayoutRow[] {
    return readJsonFile<UniqueStashLayoutRow[]>('UniquesStashLayout.json');
}

export function Words(lang: string = 'en'): WordRow[] {
    return readJsonFile<WordRow[]>('Words.json');
}

export function Stats(): StatsRow[] {
    return readJsonFile<StatsRow[]>('Stats.json');
}