interface Product {
  _id?: string;
  id?: string;
}

export const getProductId = (product: Product): string => {
  // MongoDB uses _id, DummyJSON uses id
  return product?._id?.toString() || product?.id?.toString() || "";
};