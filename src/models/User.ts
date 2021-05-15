interface IUser {
	id: string;
	name: string;
	lastName: string;
	avatar: string;
	nickname: string;
	company: string;
	jobTitle: string;
	email: string;
	phone: string;
	address: string;
	birthday: string | undefined;
	notes: string;
}

export default IUser;
