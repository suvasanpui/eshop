import Banner from "@/components/Banner";
import ProductsList from "@/components/ProductsList";
import { getData } from "@/helpers";
import { getBaseUrl } from "@/utils/singleProductUtills";

export default async function Home() {
  const baseUrl = getBaseUrl();
  const endpoint = `${baseUrl}/products`;
  const {products} = await getData(endpoint);
  
  return (
    <main>
      <Banner/>
      <ProductsList products={products}/>
    </main>
  );
}

