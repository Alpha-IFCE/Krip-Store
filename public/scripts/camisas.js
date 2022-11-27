const camisas = [
    {
        "img": "https://img.ltwebstatic.com/images3_pi/2021/12/30/1640843646c53b15c334c81994a4e3f8bffacb19d1_thumbnail_750x.webp",
        "name":  "Multicolorido Casual Collar Manga Curta Tecido Listrado Embellished Elasticidade Baixa Verão Tops Masculino",
        "price": "58.99",
        "coin": "brl",
        "sizes": ["P", "M", "G"]
    },
    {
        "img": "https://cdn.shopify.com/s/files/1/0568/1902/4078/products/product-image-1761492866.jpg?v=1634093006",
        "name":  "Ingvn 2022 Women Striped Cotton T Shirt Short Sleeve O Neck Tees Ladies Casual Tee Shirt Street Wear Top 6L42",
        "price": "29.99",
        "coin": "usd",
        "sizes": ["P", "M", "G"]
    },
    {
        "img": "https://cdn.shopify.com/s/files/1/0535/9527/5424/products/4_ca859c44-a341-4382-a857-d13211a3e8f5_540x.jpg?v=1647064791",
        "name":  "Gaze T-shirt",
        "price": "33.99",
        "coin": "usd",
        "sizes": ["P", "M", "G"]
    },
    {
        "img": "https://cdn.shopify.com/s/files/1/1748/2773/products/product-image-1655289000-sw_900x.jpg?v=1638103974",
        "name":  "THE \"PHANTOM\" TEE",
        "price": "99.99",
        "promotion": "44.99",
        "coin": "usd",
        "sizes": ["P", "M", "G"]
    }, 
    {
        "img": "https://cdn.shopify.com/s/files/1/0090/2447/1140/products/412914F_1024x1024.jpg?v=1654716425",
        "name":  "Mo Money Slim Fit T-shirt",
        "price": "22.50",
        "coin": "usd",
        "sizes": ["P", "M", "G"]
    },
    {
        "img": "https://cdn-images.threadless.com/threadless-media/artist_shops/shops/stevenrhodes/products/502074/shirt-1523337985-ffa553fa902363a81e2b58be258c2492.png?v=3&d=eyJvbmx5X21ldGEiOiBmYWxzZSwgImZvcmNlIjogZmFsc2UsICJvcHMiOiBbWyJ0cmltc2NyaXB0IiwgWzEyMDAuMCwgMTM3MS40Mjg1NzE0Mjg1NzEzXSwge31dLCBbImVuY29kZSIsIFsiLnBuZyJdLCB7ImRwaSI6IDMwMH1dLCBbInJlc2l6ZSIsIFs4MjZdLCB7fV0sIFsib3ZlcmxheSIsIFsidGhyZWFkbGVzcy1tZWRpYS9hcnRpc3Rfc2hvcHMvb3ZlcmxheXMvMDEyNDc2N2UxMDZhNTE5MzA5NDM0NTA3MjAwZGRkOWQvZnJvbnQtMTYyMzM0NjEzNi04ODI4MzMyN2Y4YzhhYjU5NzE4ODA4NGQyZWVjNTdjYy5wbmciXSwgeyJ5IjogNDU3LCAieCI6IDU4NCwgImJhY2tncm91bmQiOiAiMDAwMDAwIn1dLCBbInJlc2l6ZSIsIFsyMDAwXSwge31dLCBbImNhbnZhc19jZW50ZXJlZCIsIFsyMDAwLCAyMDAwLCAiI2ZmZmZmZiJdLCB7fV0sIFsiZW5jb2RlIiwgWyJqcGciLCA4NV0sIHt9XV19",
        "name":  "Alien Abduction Club",
        "price": "22.44",
        "coin": "usd",
        "sizes": ["P", "M", "G"]
    },
    {
        "img": "https://cdn.shopify.com/s/files/1/0702/9411/products/Unsad1_600x.jpg?v=1634033890",
        "name":  "UNBEARABLE",
        "price": "25",
        "promotion": "15",
        "coin": "usd",
        "sizes": ["P", "M", "G"]
    },
    {
        "img": "https://cdn.shopify.com/s/files/1/0632/5619/9406/products/product-image-1863271909.jpg?v=1647829088",
        "name":  "Jinquedai 2022 New 2pac Rap T Shirts print O-Neck Short Sleeve Regular Mens Top Quality Hip hop tShirt Tupac cotton black oversize t-shirt",
        "price": "24.98",
        "coin": "usd",
        "sizes": ["P", "M", "G"]
    },
    {
        "img": "https://cdn11.bigcommerce.com/s-fbddb/images/stencil/640w/products/1013/3403/scorpions-classic-heavy-metal-hard-rock-roll-band-group-savage-amusement-album-cover-artwork-song-titles-mens-unisex-black-vintage-fashion-t-shirt__46626.1633981585.jpg?c=2",
        "name":  "Scorpions Vintage T-shirt - Savage Amusement Album Cover Art with Song Titles. Men's Unisex Black Fashion Shirt",
        "price": "29.00",
        "coin": "usd",
        "sizes": ["P", "M", "G"]
    },
    {
        "img": "https://cdn.shopify.com/s/files/1/0557/2437/6137/products/cbf9c9a1058b7a643d02c0f1c731c655_5d1b7129-2448-44c2-8c38-9f1a4eadbf43_1024x1024.jpg?v=1666768824",
        "name":  "Streetwear Skeleton Ferris Wheel Printed Harajuku Cotton Short Sleeve Casual T-shirt",
        "price": "39.00",
        "promotion": "32.00",
        "coin": "usd",
        "sizes": ["P", "M", "G"]
    },
    {
        "img": "https://cdn.shopify.com/s/files/1/0021/5629/8301/products/jpeg_19afa529-fdc3-481c-a2d1-36f48cad79bb_540x.jpg?v=1653747098",
        "name":  "Aelfric Eden Vintage Letter Pattern Printing Oversized Tee",
        "price": "29.95",
        "coin": "usd",
        "sizes": ["P", "M", "G"]
    },
    {
        "img": "https://cdn.shopify.com/s/files/1/0014/4729/7084/products/DRS01_720x.png?v=1618349846",
        "name":  "DR. STRANGE - DR. STRANGE | BLACK S/S ADULT FITTED JERSEY T-SHIRT",
        "price": "20.99",
        "coin": "usd",
        "sizes": ["P", "M", "G"]
    },
    {
        "img": "https://cdn.media.amplience.net/s/hottopic/11588908_hi?$productMainDesktop$",
        "name":  "Marvel Spider-Man Legend of Arachknight T-Shirt",
        "price": "24.72",
        "coin": "usd",
        "sizes": ["P", "M", "G"]
    },
    {
        "img": "https://cdn-images.threadless.com/threadless-media/artist_shops/shops/stevenrhodes/products/979522/shirt-1554965587-2671e481b1c35f0935cf60a23d6325c6.png?v=3&d=eyJvbmx5X21ldGEiOiBmYWxzZSwgImZvcmNlIjogZmFsc2UsICJvcHMiOiBbWyJ0cmltc2NyaXB0IiwgWzEyMDAuMCwgMTM3MS40Mjg1NzE0Mjg1NzEzXSwge31dLCBbImVuY29kZSIsIFsiLnBuZyJdLCB7ImRwaSI6IDMwMH1dLCBbInJlc2l6ZSIsIFs4MjZdLCB7fV0sIFsib3ZlcmxheSIsIFsidGhyZWFkbGVzcy1tZWRpYS9hcnRpc3Rfc2hvcHMvb3ZlcmxheXMvMDEyNDc2N2UxMDZhNTE5MzA5NDM0NTA3MjAwZGRkOWQvZnJvbnQtMTYyMzM0NjEzNi04ODI4MzMyN2Y4YzhhYjU5NzE4ODA4NGQyZWVjNTdjYy5wbmciXSwgeyJ5IjogNDU3LCAieCI6IDU4NCwgImJhY2tncm91bmQiOiAiMDAwMDAwIn1dLCBbInJlc2l6ZSIsIFsyMDAwXSwge31dLCBbImNhbnZhc19jZW50ZXJlZCIsIFsyMDAwLCAyMDAwLCAiI2ZmZmZmZiJdLCB7fV0sIFsiZW5jb2RlIiwgWyJqcGciLCA4NV0sIHt9XV19",
        "name":  "My New Family",
        "price": "22.44",
        "coin": "usd",
        "sizes": ["P", "M", "G"]
    }
]

module.exports = camisas