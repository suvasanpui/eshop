import Container from "@/components/Container";
import { getData } from "@/helpers";
import ProductImages from "@/components/ProductImages";
import { getBaseUrl } from "@/utils/singleProductUtills";
import ProductPrice from "@/components/ProductPrice";
import { MdStar } from "react-icons/md";
import ProductPriceFormat from "@/components/ProductPriceFormat";
import AddToCartButton from "@/components/AddToCartButton";
import Image from "next/image";
import payment from "@/assets/payment.webp";

interface Review {
  reviewerName: string;
  reviewerEmail: string;
  comment: string;
  rating: number;  // Add this line
}

interface Props {
  params: {
    id: string;
  };
}



const SingleProductPage = async ({ params }: Props) => {
  const { id } = params;
  const baseUrl = getBaseUrl();
  const endpoint = `${baseUrl}/products/${id}`;

  try {
    const response = await getData(endpoint);
    const product = response.res || response;

    if (!product) {
      throw new Error("Product not found");
    }

    return (
      <Container className="py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductImages images={product?.images || []} />
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{product?.title}</h2>
          <div className="flex items-center justify-between gap-5">
            <ProductPrice product={product} />
            <div className="flex items-center gap-1">
              <div className="text-base text-lightText flex items-center">
                {Array.from({ length: 5 }).map((_, index) => {
                  const ratingFilledFull =
                    index + 1 <= Math.floor(product?.rating);
                  const ratingFilledHalf =
                    index + 1 > Math.floor(product?.rating) &&
                    index < Math.ceil(product?.rating);

                  return (
                    <MdStar
                      key={index}
                      className={`${
                        ratingFilledFull
                          ? "text-[#fa8900]"
                          : ratingFilledHalf
                          ? "text-[#f7ca00]"
                          : "text-lightText"
                      }`}
                    />
                  );
                })}
              </div>
              <p className="text-base font-semibold">{`(${product?.rating?.toFixed(
                1
              )}) review`}</p>
            </div>
          </div>
          <p className="text-gray-600">{product?.description}</p>
          <p className="text-base">{product?.warrantyInformation}</p>
          <p>
            Brand: <span className=" font-medium">{product?.brand}</span>
          </p>
          <div className="flex items-center gap-1">
            <span>save: </span>
            <ProductPriceFormat
              amount={(product?.price * (product?.discountPercentage / 100)) * (product?.quantity || 1)}
              className="text-base font-semibold text-green-500"
            />
          </div>
          <AddToCartButton product={product} />
          <div className=" bg-[#f7f7f7] p-5 rounded-md flex flex-col items-center justify-center gap-2">
            <Image
              src={payment}
              alt="paymentImage"
              className="w-auto object-cover"
            />
            <p className="font-semibold">Guaranteed Safe & Secure Checkout</p>
          </div>
        </div>
        {/*product review */}
        <div className="p-10 bg-[#f7f7f7] md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product?.reviews?.map((items: Review) => (
              <div
                key={`${items.reviewerName}-${items.reviewerEmail}`}
                className="bg-white/80 p-5 border-[1px] border-amazonOrangeDark/50 rounded-md hover:border-amazonOrangeDark hover:bg-white duration-200 flex flex-col gap-1"
              >
                <p className="text-base font-semibold line-clamp-2">{items.comment}</p>
                <div className="text-xs">
                  <p className="font-semibold">{items.reviewerName}</p>
                  <p className="break-all">{items.reviewerEmail}</p>
                </div>
                <div className="flex items-center">
                  <div className="flex items-start">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <MdStar
                        key={index}
                        className={
                          index < items?.rating
                            ? "text-yellow-500"
                            : "text-lightText"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <Container className="py-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold text-red-500">
            Error Loading Product
          </h2>
          <p className="text-gray-600">
            Sorry, we could not find the product you are looking for.
          </p>
        </div>
      </Container>
    );
  }
};

export default SingleProductPage;
