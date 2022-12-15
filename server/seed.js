const { faker } = require("@faker-js/faker");
const { MongoClient } = require("mongodb");
const _ = require("lodash");
const env = require("dotenv").config({ path: "../.env" });
const client = require("../client");
const { min } = require("lodash");

async function main() {
    try {
        await client.connect();

        const productsCollection = client.db("krip").collection("products");
        const categoriesCollection = client.db("krip").collection("categories");

        resetCollection(productsCollection);
        resetCollection(categoriesCollection);

        let categories = ["camisa", "moleton", "calca"].map((category) => {
            return { name: category };
        });
        await categoriesCollection.insertMany(categories);

        let camisaImageUrls = [
            "https://cdn.shopify.com/s/files/1/0568/1902/4078/products/product-image-1761492866.jpg?v=1634093006",
            "https://cdn.shopify.com/s/files/1/0535/9527/5424/products/4_ca859c44-a341-4382-a857-d13211a3e8f5_540x.jpg?v=1647064791",
            "https://cdn.shopify.com/s/files/1/1748/2773/products/product-image-1655289000-sw_900x.jpg?v=163810 3974",
            "https://cdn.shopify.com/s/files/1/0702/9411/products/Unsad1_600x.jpg?v=1634033890",
            "https://img.ltwebstatic.com/images3_pi/2021/12/22/164015258718b3958f90fd5b257c8db3610136dd96_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/06/30/1625019423d8ede51165527f9f4975f2a4d30d8e8a_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/07/07/16571571990466700f2c9ab34954e2a59b9684ebb8_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/03/10/1646902240d07d0a1a6021d54123cbea5117252afc_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/03/02/1646186846be177240270b1ac7c3d52122085c36d1_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/02/21/164540697322fb770f1a7bb26f9327dd81c0fb2c36_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/02/28/16460367956465460a0d3d5793d8447f01b242a5dd_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/10/11/16654547517b032f38935fe626ff8b1ac833e30913_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/08/11/1628660875cfce310885b73391794295c4c0731776_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/08/20/16294271374f772fbeb4e35035f146c1c69a549b9d_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/10/27/1666839789675864818e3f7bd0fccaec87880ddfd0_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2020/10/14/1602655313c4377222c6637bb670d7512439494225_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/02/24/16456980225809c55c3d6ae325e8360da864a4a59a_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/03/15/164733172382b5efe87749d1ec48911f38b7e5ba6d_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/07/28/1658974313f68775d50e5c05c84431e8778c087c70_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images2_pi/2018/04/24/15245723301457649101_thumbnail_600x799.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/11/15/1636939242f497b2e1eda68d5003288a5ef947d88a_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/08/17/162916678684147c35473afd288c20aea068335654_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/12/22/164015190470958570f6f3649e6b2d449b4f9f6ae2_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/07/07/16571775037e491ad2ad04bfab34e48a4b26c2045b_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/12/14/1639464458a744ca60e12028791f4287e5ebaa4c4c_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/04/29/1619663637427f6da1179558433277678f359f39eb_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/06/05/1622882124712d07c52044ba8607c7203b67f3708c_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/07/18/1658137832067f6083ce682d98c3268cca33abbae0_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/03/31/1617154668eae209ef98f5ee1f05e807fab3c79bcd_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/06/15/165528932956a44909f3e6bb79b05e63d91b68870b_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/12/02/1638435356d639b04c12b51f4a160411df87eb2506_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/02/28/1646041110ccf11d4fea73d272946a32be4995b941_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/07/25/1658718696a443a654be8e464207286af82b3e53ab_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/12/29/16407400158832b6684236087abe4dc64c8ad15506_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/06/01/1654077799d7fa3392fa628537dd806397a295a42b_thumbnail_600x.webp",
        ];
        let calcaImageUrls = [
            "https://img.ltwebstatic.com/images3_pi/2022/05/03/165156969418e4724e7d68c5bacc27f94692d593d0_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/08/18/16608119429d1a1d28f35792718bf356b250a75778_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/06/27/1656299515dae70176ab2255514168996f02600f5d_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/05/23/1653275371586abac8a15ea2a361f652856eee0ef4_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/08/29/1661758713ea2c4fac513c936d49651c8dc53aba66_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/01/06/1641452360e670e88bcff2ab4456af7ca28816e0c8_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/08/27/163005271711882ebe92cd4e130a6c1da38f6c41e4_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/06/27/1656293231c1ef4512d7c1f9a286e10cff7ef83f2b_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/10/18/1634524123e86c322d9a12874cd1d8b8b9e3e9a016_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/01/04/16412597365310d2e96efb6a3656ff76841eaad15c_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/11/30/1638270273943ed0240fa8ad1a709e6460e69e876d_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/07/23/16270228545d9e0340748e8175960b93dca8780393_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/08/17/162916387572c3ee1e0ccb5379056391ae2b70b81f_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/04/11/1649647346747ca473020378577726e472ea625da5_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/11/30/1638239450d1bf16f9f040e7ebbe3285e2fd1d35b8_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/04/29/1651221551ffeda9014447803841988fb450f62a90_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/gspCenter/goodsImage/2022/10/5/6150194453_1025763/02E6601E949C5C73B98E0242BBE4B7A9_thumbnail_600x.jpg",
            "https://img.ltwebstatic.com/gspCenter/goodsImage/2022/11/3/5650189635_1029312/3A0BFCD624D07A3D1DC321F6FFF57F89_thumbnail_600x.jpg",
            "https://img.ltwebstatic.com/images3_pi/2022/06/07/16545826704e564686c2e26b5f71be4ce97537f053_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/07/07/162562906499abf8c7b9408f4cdf4ac5a235b6fdba_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/11/25/163782171536ef60aaab8d714e27eea36033208933_thumbnail_600x.webp",
        ];
        let moletomImageUrls = [
            "https://img.ltwebstatic.com/images3_pi/2021/08/05/1628128919a77169b86e9b913b17dc061075c2f668_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/07/28/1658972282e5c1f83f0c208fb0cc855a8eb6ca2ff4_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/08/09/16600175123082db389a2a9906cb8d734bc4f686ce_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/09/27/16642667444212bacd94ddc62daf4f508517bfa83e_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/08/17/1660702006f4f978fc94488e16a662b388318a562b_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/07/25/1658713866c571112673cd72eca7720d2809ed3046_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/07/18/1658122185c3c98d5e01623bfe33badbb5025be378_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/07/29/16590624398a53def7dd86a0597aa27b3ad5a353ac_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/09/23/1663925465fe86111f72f5a83012c4a160c498eb7d_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/08/03/16595181234e690032aec902ddf2f5407125196cb1_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/07/26/1658813462da20f0f323c3598711fa8c8a294ec0bc_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/06/27/165629920289fdc0b966605612d07e74fbb122660d_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/08/19/1629339062190bc64ab2406038b40d7ab8dcab4d0a_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/09/28/1632826380a039889effd7ebc90e532683975be82e_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/10/14/16341873704078fe6f57d924049eca948524269f14_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/08/06/16597802505e1c938a521a2b62edab62ee46751d97_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/08/25/162989098986877d40bc6b259b3aa41c93c712ca90_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/04/11/1649673858844e5416928d9675a470177f6476ee69_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/07/27/162735132508af3beb2212bcb4c20a4c51150aa1fc_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/11/25/16693434361b82f700529936e61f4d1bb654a4e609_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/11/02/1667357590caf71dd03f5aa119b07d7d3bb2118f05_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/09/30/1632971495c0e40d2fb6899ed778c3c90016a78686_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/07/06/165708673107cfd907ccb3ef73403f0f701568ed5a_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/11/08/16678851713fcb57f094f72e407e87e83b9a423683_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2021/07/21/1626833267ab58c9b010e2e0e20543f82b68a87254_thumbnail_600x.webp",
            "https://img.ltwebstatic.com/images3_pi/2022/09/30/1664522078fdaced8244b333c47386fcf068d8eee5_thumbnail_600x.webp",
        ];

        let products = [];
        for (let i = 0; i < 100; i += 1) {
            const price = faker.commerce.price(1, 150, 2, "R$");
            let newProduct = {
                name: faker.commerce.productName(),
                rate: faker.datatype.float({
                    min: 0.0,
                    max: 5.0,
                    precision: 0.1,
                }),
                description: faker.commerce.productDescription(),
                price,
                promotion:
                    _.sample([0, 1, 2, 3]) === 0
                        ? faker.commerce.price(
                              parseFloat(price.slice(2)) * 0.5,
                              parseFloat(price.slice(2)) * 0.8,
                              2,
                              "R$"
                          )
                        : "",
                category: _.sample(categories).name,
            };

            if (newProduct.category === "calca") {
                newProduct.imageUrl = _.sample(calcaImageUrls);
            } else if (newProduct.category === "moleton") {
                newProduct.imageUrl = _.sample(moletomImageUrls);
            } else {
                newProduct.imageUrl = _.sample(camisaImageUrls);
            }

            products.push(newProduct);
        }
        await productsCollection.insertMany(products);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

main();

async function resetCollection(collection) {
    collection.remove();
}
