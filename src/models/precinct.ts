import { Evidence } from './evidence'

export class Precinct {
	ID: string;
	Name: string;
	Address: string;
	Evidence: Evidence[];
	EvidenceCount: number;
}
