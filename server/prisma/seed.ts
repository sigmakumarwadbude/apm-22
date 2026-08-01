import { prisma } from '../src/config/prisma';

async function main() {
    await prisma.product.createMany({
        skipDuplicates: true,
        data: [
            {
                productName: 'Leaf Rake',
                productCode: 'GDN-0011',
                releaseDate: new Date('2026-08-01'),
                description: 'Leaf rake with 48-inch wooden handle.',
                price: 19.95,
                starRating: 3.5,
                imageUrl: 'leaf_rake.png',
                tags: ['garden', 'tool'],
            },
            {
                productName: 'Garden Cart',
                productCode: 'GDN-0023',
                releaseDate: new Date('2026-08-01'),
                description: '15 gallon garden cart.',
                price: 32.99,
                starRating: 4.2,
                imageUrl: 'garden_cart.png',
                tags: ['garden', 'cart'],
            },
            {
                productName: 'Hammer',
                productCode: 'TBX-0048',
                releaseDate: new Date('2026-08-01'),
                description: 'Curved claw steel hammer.',
                price: 8.9,
                starRating: 4.8,
                imageUrl: 'hammer.png',
                tags: ['tool'],
            },
            {
                productName: 'Saw',
                productCode: 'TBX-0022',
                releaseDate: new Date('2026-08-01'),
                description: '15-inch steel hand saw.',
                price: 11.55,
                starRating: 3.7,
                imageUrl: 'saw.png',
                tags: ['tool'],
            },
            {
                productName: 'Video Game Controller',
                productCode: 'GMG-0042',
                releaseDate: new Date('2026-08-01'),
                description: 'Standard two-button video game controller.',
                price: 35.95,
                starRating: 4.6,
                imageUrl: 'controller.png',
                tags: ['gaming'],
            },
        ],
    });

    console.log('✅ Database seeded');
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });