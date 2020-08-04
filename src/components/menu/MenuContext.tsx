import { createContext } from 'react';

export interface MenuContextProps {
  key: string;
}

const MenuContext = createContext<MenuContextProps>({
  key: '',
});

export default MenuContext;
