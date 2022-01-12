import { Note } from '~/types';

export const createNote = async (data: { title: string; body: string; userId: number }): Promise<Note> => {
	const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
	});
	const newNote = await res.json();
	return newNote;
};

export const getAllNotes = async () => {
	const notes = await fetch('https://jsonplaceholder.typicode.com/posts');
	const data = await notes.json();
	const promises = data.map(async (note: Note) => await getUser(note.userId));
	const users = await Promise.all(promises);
	return data.map((note: Note, idx: number) => ({ ...note, user: users[idx] }));
};

export const getNote = async (id: string) => {
	const notes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
	const data = await notes.json();
	const user = await getUser(data.userId);
	return { ...data, user };
};

export const getAllUsers = async () => {
	const users = await fetch('https://jsonplaceholder.typicode.com/users');
	const data = await users.json();
	return data;
};

export const getUser = async (id: number) => {
	const user = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
	const data = await user.json();
	return data;
};
