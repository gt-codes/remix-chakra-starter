import { Post } from '../types';

export const getAllPosts = async () => {
	const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
	const data = await posts.json();
	const promises = data.map(async (post: Post) => await getUser(post.userId));
	const users = await Promise.all(promises);
	return data.map((post: Post, idx: number) => ({ ...post, user: users[idx] }));
};

export const getPost = async (id: string) => {
	const posts = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
	const data = await posts.json();
	const user = await getUser(data.userId);
	return { ...data, user };
};

export const getUser = async (id: number) => {
	const user = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
	const data = await user.json();
	return data;
};
