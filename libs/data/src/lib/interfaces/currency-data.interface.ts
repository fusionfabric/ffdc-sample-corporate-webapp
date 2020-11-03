export interface Rates {
  base: string;
  date: string;
  rates : {
    currency: string;
    rate: string;
  }
}
  
export interface Conversion {
  success: string;
  query: {
    from: string;
    to: string;
    amount: string;
  },
  rate: number;
  date: string;
  result: number;
}
