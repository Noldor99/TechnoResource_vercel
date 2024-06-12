export interface IProduct {
  id: string;
  name: string;
  imageURL?: string;
  brand: string;
  category: string;
  desc: string;
  price: number;
  createdAt?: Date;
}

export interface IProducts {
  products: IProduct[];
}

export interface ICard {
  id: string;
  desc: string;
  name: string;
  imageURL?: string;
  price: number;
  category: string;
  brand: string;
  cartQuantity: number;
}

//Order

export interface IOrder {
  id: string;
  userEmail: string;
  orderAmount: number;
  orderDate: string;
  createdAt: CreatedAt;
  userID: string;
  shippingAddress: IShippingAddress;
  orderStatus: string;
  orderTime: string;
  cartItems: ICard[];
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface IShippingAddress {
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
}
