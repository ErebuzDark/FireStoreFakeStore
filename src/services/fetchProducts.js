import { API } from "@config/apiConfig";

export const fetchProducts = async () => {
  try {
    const response = await API.get('products');
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}