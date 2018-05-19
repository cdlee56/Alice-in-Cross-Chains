export class Actor {
	Name: string;
	BadgeNumber: string;
	Title: string;
	IsAdmin: boolean;

	Actor(n: string, b: string, t: string) {
		this.Name = n
		this.BadgeNumber = b
		this.Title = t
	}
}
