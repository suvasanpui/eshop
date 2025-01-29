import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});

const DimensionsSchema = new mongoose.Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
});

const MetaSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  barcode: { type: String },
  qrCode: { type: String },
});

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number },
    rating: { type: Number },
    stock: { type: Number, required: true, default: 0 },
    tags: [String],
    brand: { type: String, required: true },
    sku: { type: String, required: true },
    weight: { type: Number },
    dimensions: DimensionsSchema,
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    reviews: [ReviewSchema],
    returnPolicy: String,
    minimumOrderQuantity: Number,
    meta: MetaSchema,
    images: [String],
    thumbnail: String,
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
