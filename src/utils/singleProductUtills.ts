export const getBaseUrl = (): string => {
  // Try local API first, fallback to dummy API
  return  process.env.PRODUCT_LIST_DUMMY_URL || 'https://dummyjson.com';
}