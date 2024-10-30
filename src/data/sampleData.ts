import type { Product, Brand, Category } from '../types.ts'

export const sampleBrands: Brand[] = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Samsung' },
    { id: 3, name: 'Sony' },
    { id: 4, name: 'LG' },
    { id: 5, name: 'Dell' },
    { id: 6, name: 'Asus' },
    { id: 7, name: 'Lenovo' },
    { id: 8, name: 'HP' }
]

export const sampleCategories: Category[] = [
    { id: 1, name: 'Điện thoại' },
    { id: 2, name: 'Laptop' },
    { id: 3, name: 'Máy tính bảng' },
    { id: 4, name: 'Tai nghe' },
    { id: 5, name: 'Đồng hồ thông minh' },
    { id: 6, name: 'Phụ kiện' }
]

export const sampleProducts: Product[] = [
    {
        id: 1,
        name: 'iPhone 14 Pro Max',
        description: 'Điện thoại iPhone 14 Pro Max mới nhất với chip A16 Bionic, camera 48MP và Dynamic Island',
        price: 27990000,
        imageUrl: 'https://example.com/iphone-14-pro-max.jpg',
        brandId: 1,
        categoryId: 1,
        status: 'in_stock',
        stock: 50,
        sku: 'IPH14PM-256-GOLD'
    },
    {
        id: 2,
        name: 'Samsung Galaxy S23 Ultra',
        description: 'Samsung Galaxy S23 Ultra với bút S-Pen, camera 200MP và pin 5000mAh',
        price: 26990000,
        imageUrl: 'https://example.com/samsung-s23-ultra.jpg',
        brandId: 2,
        categoryId: 1,
        status: 'in_stock',
        stock: 35,
        sku: 'SS-S23U-256-BLACK'
    },
    {
        id: 3,
        name: 'MacBook Pro 14"',
        description: 'MacBook Pro 14 inch với chip M2 Pro, 16GB RAM và màn hình Liquid Retina XDR',
        price: 45990000,
        imageUrl: 'https://example.com/macbook-pro-14.jpg',
        brandId: 1,
        categoryId: 2,
        status: 'out_of_stock',
        stock: 0,
        sku: 'MPB14-M2P-512-GREY'
    },
    {
        id: 4,
        name: 'Dell XPS 13',
        description: 'Dell XPS 13 với Intel Core i7 thế hệ 12, 16GB RAM và màn hình 4K',
        price: 32990000,
        imageUrl: 'https://example.com/dell-xps-13.jpg',
        brandId: 5,
        categoryId: 2,
        status: 'in_stock',
        stock: 15,
        sku: 'DELL-XPS13-i7-512'
    },
    {
        id: 5,
        name: 'iPad Pro 12.9"',
        description: 'iPad Pro 12.9 inch với chip M2, màn hình Liquid Retina XDR và hỗ trợ Apple Pencil 2',
        price: 23990000,
        imageUrl: 'https://example.com/ipad-pro.jpg',
        brandId: 1,
        categoryId: 3,
        status: 'in_stock',
        stock: 25,
        sku: 'IPDP129-256-GREY'
    },
    {
        id: 6,
        name: 'Samsung Galaxy Tab S9',
        description: 'Samsung Galaxy Tab S9 với Snapdragon 8 Gen 2, S-Pen và màn hình AMOLED',
        price: 19990000,
        imageUrl: 'https://example.com/galaxy-tab-s9.jpg',
        brandId: 2,
        categoryId: 3,
        status: 'out_of_stock',
        stock: 0,
        sku: 'SS-TABS9-256-SILVER'
    },
    {
        id: 7,
        name: 'Sony WH-1000XM5',
        description: 'Tai nghe chống ồn cao cấp với LDAC, DSEE Extreme và đàm thoại crystal clear',
        price: 8490000,
        imageUrl: 'https://example.com/sony-wh1000xm5.jpg',
        brandId: 3,
        categoryId: 4,
        status: 'in_stock',
        stock: 40,
        sku: 'SONY-WH1000XM5-BLK'
    },
    {
        id: 8,
        name: 'Apple Watch Series 8',
        description: 'Apple Watch Series 8 với cảm biến nhiệt độ, phát hiện tai nạn và pin 18 giờ',
        price: 10990000,
        imageUrl: 'https://example.com/apple-watch-s8.jpg',
        brandId: 1,
        categoryId: 5,
        status: 'in_stock',
        stock: 30,
        sku: 'AWS8-45MM-CELL'
    },
    {
        id: 9,
        name: 'Samsung Galaxy Watch 5 Pro',
        description: 'Samsung Galaxy Watch 5 Pro với pin 590mAh, màn hình Sapphire và GPS độ chính xác cao',
        price: 8990000,
        imageUrl: 'https://example.com/galaxy-watch-5-pro.jpg',
        brandId: 2,
        categoryId: 5,
        status: 'in_stock',
        stock: 20,
        sku: 'SS-GW5P-45-BLACK'
    },
    {
        id: 10,
        name: 'AirPods Pro 2',
        description: 'AirPods Pro 2 với chống ồn chủ động nâng cao, chip H2 và sạc MagSafe',
        price: 6790000,
        imageUrl: 'https://example.com/airpods-pro-2.jpg',
        brandId: 1,
        categoryId: 4,
        status: 'out_of_stock',
        stock: 0,
        sku: 'APP2-2022-WHITE'
    }
]

// Hàm helper để khởi tạo dữ liệu mẫu trong localStorage
export function initializeSampleData() {
    const storage = window.localStorage

    // Kiểm tra xem đã có dữ liệu trong localStorage chưa
    if (!storage.getItem('products')) {
        storage.setItem('products', JSON.stringify(sampleProducts))
    }

    if (!storage.getItem('brands')) {
        storage.setItem('brands', JSON.stringify(sampleBrands))
    }

    if (!storage.getItem('categories')) {
        storage.setItem('categories', JSON.stringify(sampleCategories))
    }
}