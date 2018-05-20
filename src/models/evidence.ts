import { Actor } from './actor'
import { Action } from './action'

export class Evidence {
	ID: number;
	Title: string;
	What: string;
	img: string;
	Actions: Action[] = []
}
