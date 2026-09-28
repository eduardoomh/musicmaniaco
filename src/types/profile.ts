import type { GradientStop } from './collection';

export interface Profile {
	id: string;
	username: string;
	name: string;
	avatar: string;
	bio: string;
	settings: {
		gradient: { angle: number; stops: GradientStop[] };
		borderColor?: string;
		descriptionCardColor?: string;
		descriptionCardBorderColor?: string;
	};
}
