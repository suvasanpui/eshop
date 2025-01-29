import bannerImageOne from '@/assets/banner/bannerImageOne.webp'

export const navigation=[
    {title: "Home" , href: '/'},
    {title: "Products" , href: '/products'},
    {title: "Categories" , href: '/categories'},
    {title: "Offers" , href: '/offers'},
    {title: "Blog" , href: '/blog'},
    {title: "Contacts" , href: '/contacts'},
];

export const banner={
    _id: 1001,
    priceText: "Starting at $999",
    title: "The best tablet collection 2025",
    textOne: "Exclusive One",
    offerPrice:"-30%",
    texttwo: "off this week",
    buttonLink: '/products',
    image: bannerImageOne
};