export interface UIComponent {
  id: string;
  type: ComponentType;
  properties: {
    position: {
      x: number;
      y: number;
    };
    size: {
      width: number;
      height: number;
    };
    style: Record<string, any>;
  };
}

export enum ComponentType {
  NAVIGATION = 'NAVIGATION',
  LOGIN_FORM = 'LOGIN_FORM',
  BUTTON = 'BUTTON',
  INPUT = 'INPUT',
  CARD = 'CARD',
  PRODUCT_LIST = 'product_list',
  PRODUCT_DETAIL = 'product_detail',
  CART = 'cart',
}