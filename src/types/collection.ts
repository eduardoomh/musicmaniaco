export interface GradientStop {
	color: string;
	at: number;
}

export interface CollectionSong {
	id: string;
	name: string;
	artists: string[];
	duration: string;
	album: { name: string; image: string };
	description?: string;
	links?: {
		appleMusic?: string;
		spotify?: string;
		youtube?: string;
	};
}

export interface Collection {
	id: string;
	name: string;
	description: string;
	image: string;
	createdAt: string;
	updatedAt: string;
	user: {
		username: string;
		name: string;
		avatar: string;
		bio: string;
	};
	settings: {
		gradient: { angle: number; stops: GradientStop[] };
		showSongsDescription?: boolean;
		borderColor?: string;
		descriptionCardColor?: string;
		descriptionCardBorderColor?: string;
	};
	links?: {
		appleMusic?: string;
		spotify?: string;
	};
	songs: CollectionSong[];
}
