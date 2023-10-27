export interface DataSet {
  fileName: string;
}

export interface TransferData {
  placeId: string;
  population: number;
  groups: Array<Array<[number, number]>>;
}

export interface PlaceData {
  population: number;
  groups: Array<Array<[number, number]>>;
}

export interface Group {
  name: string;
  colour: string;
  wikipage: string;
}

export enum DataMode {
  Ethnic,
  Religious,
}

export enum ViewMode {
  MAJ,
  SEC,
  FOC
}
