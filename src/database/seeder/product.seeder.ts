import { AppDataSource } from "../../data-source";
import { CategoryProduct } from "../entity/CategoryProduct";
import { GalleryProduct, GalleryProductType } from "../entity/GalleryProduct";
import { Product, StatusProduct } from "../entity/Product";
import { ProductStock } from "../entity/ProductStock";
import { Variation } from "../entity/Variation";
import { VariationItem } from "../entity/VariationItem";
import { VariationItemStock } from "../entity/VariationItemStock";

export const ProductSeeder = async () => {
    try {
        await dummyVariationSatuItem();
        await dummyVariationDuaItem();

        console.log("Product seeding completed!");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in productSeeder:", error.message);
        } else {
            console.error("Error in productSeeder:", error);
        }
    }
};

async function dummyVariationDuaItem() {
    const productRepo = AppDataSource.getRepository(Product);
    const categoryRepo = AppDataSource.getRepository(CategoryProduct);
    const galleryProductRepo = AppDataSource.getRepository(GalleryProduct);
    const variantRepo = AppDataSource.getRepository(Variation);
    const productStockRepo = AppDataSource.getRepository(ProductStock);
    const variationItemRepo = AppDataSource.getRepository(VariationItem);
    const variationItemStockRepo =
        AppDataSource.getRepository(VariationItemStock);

    const productsData = [
        {
            name: "Baju freya wangi",
            material: "Kain",
            categoryIndex: 2, // Index kategori (0, 1, 2, dst.)
            weight: 100,
            description: "Naju tanda tangan asli dari freya",
            galleryUrl: "https://picsum.photos/500/500",
            variants: [
                {
                    name: "Warna",
                    items: ["Merah", "Biru", "Kuning"] // Variasi warna
                },
                {
                    name: "Ukuran",
                    items: ["XL", "S", "L"] // Variasi ukuran
                }
            ]
        },
        {
            name: "Baju JKT 48",
            material: "Kain",
            categoryIndex: 2, // Index kategori (0, 1, 2, dst.)
            weight: 150,
            description: "Naju hangat untuk penggemar JKT 48",
            galleryUrl: "https://picsum.photos/500/500",
            variants: [
                {
                    name: "Warna",
                    items: ["Hitam", "Coklat"] // Variasi warna
                },
                {
                    name: "Ukuran",
                    items: ["XL", "S", "L"] // Variasi ukuran
                }
            ]
        },
        {
            name: "Baju AKB 48",
            material: "Kain",
            categoryIndex: 2, // Index kategori (0, 1, 2, dst.)
            weight: 150,
            description: "Naju hangat untuk penggemar AKB 48",
            galleryUrl: "https://picsum.photos/500/500",
            variants: [
                {
                    name: "Warna",
                    items: ["Hitam", "Coklat"] // Variasi warna
                },
                {
                    name: "Ukuran",
                    items: ["XL", "S", "L"] // Variasi ukuran
                }
            ]
        },
        {
            name: "Baju SNH 48",
            material: "Kain",
            categoryIndex: 2, // Index kategori (0, 1, 2, dst.)
            weight: 150,
            description: "Naju hangat untuk penggemar SNH 48",
            galleryUrl: "https://picsum.photos/500/500",
            variants: [
                {
                    name: "Warna",
                    items: ["Hitam", "Coklat"] // Variasi warna
                },
                {
                    name: "Ukuran",
                    items: ["XL", "S", "L"] // Variasi ukuran
                }
            ]
        }
    ];

    // Ambil semua kategori
    const categories = await categoryRepo.find();

    // Loop untuk membuat produk
    for (const productData of productsData) {
        // Buat produk
        const product = productRepo.create({
            status_product: StatusProduct.TERSEDIA,
            material: productData.material,
            name: productData.name,
            category_product: categories[productData.categoryIndex], // Gunakan index kategori
            weight: productData.weight,
            description: productData.description,
            publish: true
        });

        const savedProduct = await productRepo.save(product);

        // Tambahkan gallery product
        await galleryProductRepo.insert({
            type: GalleryProductType.IMAGE,
            gallery_url: productData.galleryUrl,
            product: savedProduct
        });

        // Simpan semua variasi
        const savedVariants = [];
        for (const variantData of productData.variants) {
            const variant = variantRepo.create({
                show_image: false,
                name: variantData.name
            });

            const savedVariant = await variantRepo.save(variant);
            savedVariants.push(savedVariant);

            // Buat variasi item (misalnya, warna atau ukuran)
            for (const itemName of variantData.items) {
                const variationItem = variationItemRepo.create({
                    name: itemName,
                    variation: savedVariant
                });

                await variationItemRepo.save(variationItem);
            }
        }

        // Hubungkan variasi dengan produk
        savedProduct.variations = savedVariants;
        await productRepo.save(savedProduct);

        // Buat kombinasi dari kedua variasi
        const [variant1Items, variant2Items] = await Promise.all([
            variationItemRepo.find({
                where: { variation_id: savedVariants[0].id }
            }),
            variationItemRepo.find({
                where: { variation_id: savedVariants[1].id }
            })
        ]);

        // console.log("varianItem1: ", variant1Items);
        // console.log("varianItem2: ", variant2Items);

        for (const item1 of variant1Items) {
            for (const item2 of variant2Items) {
                // Buat stok produk untuk setiap kombinasi variasi
                const productStock = productStockRepo.create({
                    price_sell: getRandomPrice(1000, 20000),
                    quantity: getRandomNumber(1, 10),
                    product: savedProduct
                });

                const savedProductStock = await productStockRepo.save(
                    productStock
                );

                // Hubungkan kombinasi variasi dengan stok produk
                const variationItemStock = variationItemStockRepo.create({
                    product_stock: savedProductStock,
                    variation_item_1: item1, // Warna
                    variation_item_2: item2 // Ukuran
                });

                await variationItemStockRepo.save(variationItemStock);
            }
        }
    }
}

async function dummyVariationSatuItem() {
    const productRepo = AppDataSource.getRepository(Product);
    const categoryRepo = AppDataSource.getRepository(CategoryProduct);
    const galleryProductRepo = AppDataSource.getRepository(GalleryProduct);
    const variantRepo = AppDataSource.getRepository(Variation);
    const productStockRepo = AppDataSource.getRepository(ProductStock);
    const variationItemRepo = AppDataSource.getRepository(VariationItem);
    const variationItemStockRepo =
        AppDataSource.getRepository(VariationItemStock);

    // Hapus data sebelumnya
    // await variationItemStockRepo.delete({});
    // await productStockRepo.delete({});
    // await variationItemRepo.delete({});
    // await variantRepo.delete({});
    // await galleryProductRepo.delete({});
    // await productRepo.delete({});

    // Data yang bisa diatur sendiri
    const productsData = [
        {
            name: "Gantungan Kunci JKT",
            material: "Plastik",
            categoryIndex: 1, // Index kategori (0, 1, 2, dst.)
            weight: 100,
            description: "Gantungan kunci satupaket JKT 48",
            galleryUrl: "https://picsum.photos/500/500",
            variants: [
                {
                    name: "Warna",
                    items: ["Merah", "Biru", "Kuning"] // Variasi warna
                }
            ]
        },
        {
            name: "Kunci souvenir1",
            material: "Plastik",
            categoryIndex: 0, // Index kategori (0, 1, 2, dst.)
            weight: 150,
            description: "Tas jinjing dengan bahan berkualitas tinggi",
            galleryUrl: "https://picsum.photos/500/500",
            variants: [
                {
                    name: "Warna",
                    items: ["Kecil", "Sedang", "Besar"] // Variasi ukuran
                }
            ]
        },
        {
            name: "Kunci souvenir2",
            material: "Plastik",
            categoryIndex: 0, // Index kategori (0, 1, 2, dst.)
            weight: 150,
            description: "Tas jinjing dengan bahan berkualitas tinggi",
            galleryUrl: "https://picsum.photos/500/500",
            variants: [
                {
                    name: "Warna",
                    items: ["Kecil", "Sedang", "Besar"] // Variasi ukuran
                }
            ]
        },
        {
            name: "Kunci souvenir3",
            material: "Plastik",
            categoryIndex: 0, // Index kategori (0, 1, 2, dst.)
            weight: 150,
            description: "Tas jinjing dengan bahan berkualitas tinggi",
            galleryUrl: "https://picsum.photos/500/500",
            variants: [
                {
                    name: "Warna",
                    items: ["Kecil", "Sedang", "Besar"] // Variasi ukuran
                }
            ]
        },
        {
            name: "Gantungan Kunci AKB",
            material: "Plastik",
            categoryIndex: 1, // Index kategori (0, 1, 2, dst.)
            weight: 100,
            description: "Gantungan kunci satupaket AKB 48",
            galleryUrl: "https://picsum.photos/500/500",
            variants: [
                {
                    name: "Warna",
                    items: ["Merah", "Biru", "Kuning"] // Variasi warna
                }
            ]
        }
        // Tambahkan produk lain di sini...
    ];

    // Ambil semua kategori
    const categories = await categoryRepo.find();

    // Loop untuk membuat produk
    for (const productData of productsData) {
        // Buat produk
        const product = productRepo.create({
            status_product: StatusProduct.TERSEDIA,
            material: productData.material,
            name: productData.name,
            category_product: categories[productData.categoryIndex], // Gunakan index kategori
            weight: productData.weight,
            description: productData.description,
            publish: true,
            sold_quantity: getRandomQuantity(1, 20)
        });

        const savedProduct = await productRepo.save(product);

        // Tambahkan gallery product
        await galleryProductRepo.insert({
            type: GalleryProductType.IMAGE,
            gallery_url: productData.galleryUrl,
            product: savedProduct
        });

        // Buat variasi dan variasi item
        for (const variantData of productData.variants) {
            const variant = variantRepo.create({
                show_image: false,
                name: variantData.name
            });

            const savedVariant = await variantRepo.save(variant);

            // Hubungkan variasi dengan produk
            savedProduct.variations = [savedVariant];
            await productRepo.save(savedProduct);

            // Buat variasi item (misalnya, warna atau ukuran)
            for (const itemName of variantData.items) {
                const variationItem = variationItemRepo.create({
                    name: itemName,
                    variation: savedVariant
                });

                const savedVariationItem = await variationItemRepo.save(
                    variationItem
                );

                // Buat stok produk untuk setiap variasi item
                const productStock = productStockRepo.create({
                    price_sell: getRandomPrice(1000, 20000),
                    quantity: getRandomNumber(1, 10),
                    product: savedProduct
                });

                const savedProductStock = await productStockRepo.save(
                    productStock
                );

                // Hubungkan variasi item dengan stok produk
                const variationItemStock = variationItemStockRepo.create({
                    product_stock: savedProductStock,
                    variation_item_1: savedVariationItem
                });

                await variationItemStockRepo.save(variationItemStock);
            }
        }
    }
}

function getRandomPrice(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomQuantity(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
