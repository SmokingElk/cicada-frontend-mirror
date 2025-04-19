export interface HeaderMenuItem {
	href?: string;
	label: string;
	highlight?: string;
	/** guest — только для неавторизованных; auth — только для авторизованных */
	visibility?: 'all' | 'guest' | 'auth';
	action?: 'logout';
}

const items: HeaderMenuItem[] = [
	{href: '/', label: 'Главная', visibility: 'all'},
	{href: '/lobby', label: 'Игра', visibility: 'all'},
	{href: '/profile/info', label: 'Профиль', highlight: '/profile', visibility: 'auth'},
	{href: '/registration', label: 'Регистрация', visibility: 'guest'},
	{href: '/login', label: 'Войти', visibility: 'guest'},
	{action: 'logout', label: 'Выйти', visibility: 'auth'},
];

export default items;
