export interface OnCreated {
  created(): void;
}

export interface OnMounted {
  mounted(): void;
}

export interface LineType {
  mode?: string;
  command?: string;
}

export interface Line extends LineType {
  key: number;
  extra?: any;
}
