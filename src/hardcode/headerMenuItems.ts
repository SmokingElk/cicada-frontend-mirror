export interface HeaderMenuItemT {
  href: string;
  label: string;
  highlight?: string;
}

const headerMenuItems = [
  { href: "/", label: "Главная" },
  { href: "/game", label: "Игра" },
  { href: "/profile/info", label: "Профиль", highlight: "/profile" },
];

export default headerMenuItems;
