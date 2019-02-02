export interface OnCreated {
  created(): void;
}

export interface OnMounted {
  mounted(): void;
}

export interface LineType {
  mode?: string;
  command?: string;
  username?: string;
}

export interface Line extends LineType {
  key: number;
  extra?: any;
}

export interface User {
  id: string;
}

export interface Attendee {
  id: string;
  firstname: string;
  cityhall: boolean;
  cityhall_companions: number;
  scavenger_hunt: boolean;
  scavenger_hunt_companions: number;
  bar: boolean;
  bar_companions: number;
}
