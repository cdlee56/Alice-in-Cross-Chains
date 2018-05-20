export class Actor {
	Name: string;
	Address: string
	BadgeNumber: string;
	Title: string;
	IsAdmin: boolean = false;

	Actor(n: string, b: string, t: string) {
		this.Name = n
		this.BadgeNumber = b
		this.Title = t
	}
}
