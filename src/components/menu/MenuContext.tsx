import { createContext } from 'react';

export type MenuMode = 'horizontal' | 'vertical';

export interface MenuInfo {
  key: string;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

export type MenuClickEventHandler = (info: MenuInfo) => void;

export interface MenuContextProps {
  mode: MenuMode;
  selectedKey: string;
  onSelect?: MenuClickEventHandler;
}

const MenuContext = createContext<MenuContextProps>({
  mode: 'horizontal',
  selectedKey: '',
});

export default MenuContext;
