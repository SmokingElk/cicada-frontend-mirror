export interface HeaderMenuItemT {
  href: string;
  label: string;
  highlight?: string;
}

const headerMenuItems = [
  { href: "/", label: "Главная" },
  { href: "/lobby", label: "Игра" },
  { href: "/profile/info", label: "Профиль", highlight: "/profile" },
];

export default headerMenuItems;
