import { Actor } from './actor'
import { Action } from './action'

export class Evidence {
	ID: number;
	PrecinctID: number;
	Title: string;
	What: string;
	Image: string;
	Actions: Action[] = []
	ActionCount: number;
}
