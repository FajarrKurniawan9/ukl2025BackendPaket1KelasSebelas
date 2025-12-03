import { PrismaClient } from "@prisma/client";
import md5 from "md5";

const prisma = new PrismaClient();

// Data coffee menu
const coffeeNames = [
  "Espresso",
  "Americano",
  "Cappuccino",
  "Latte",
  "Mocha",
  "Macchiato",
  "Flat White",
  "Affogato",
  "Irish Coffee",
  "Vienna Coffee",
  "Caramel Latte",
  "Vanilla Latte",
  "Hazelnut Latte",
  "Iced Coffee",
  "Cold Brew",
  "Frappuccino",
  "Matcha Latte",
  "Hot Chocolate",
  "Chai Tea Latte",
  "Turkish Coffee",
];

const sizes = ["small", "medium", "large"];
const orderTypes = ["dine-in", "take-away", "delivery"];

// Generate random number in range
const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random date in the last 30 days
const randomDate = () => {
  const today = new Date();
  const daysAgo = randomInRange(0, 30);
  const date = new Date(today.setDate(today.getDate() - daysAgo));
  return date.toISOString().split("T")[0];
};

// Generate random customer name
const customerNames = [
  "John Doe",
  "Jane Smith",
  "Michael Johnson",
  "Emily Brown",
  "David Wilson",
  "Sarah Davis",
  "Robert Taylor",
  "Lisa Anderson",
  "William Thomas",
  "Jessica Martinez",
];

async function main() {
  console.log("🌱 Starting seeding...");

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  await prisma.order_detail.deleteMany();
  await prisma.order_list.deleteMany();
  await prisma.coffee.deleteMany();
  await prisma.users.deleteMany();
  console.log("✅ Existing data cleared");

  // Seed Users
  console.log("👥 Seeding users...");
  const users = [];

  // Create 5 admin users
  for (let i = 1; i <= 5; i++) {
    const admin = await prisma.users.create({
      data: {
        name: `admin${i}`,
        email: `admin${i}@coffee.com`,
        password: md5(`admin${i}123`),
        role: "admin",
      },
    });
    users.push(admin);
    console.log(`   ✓ Created admin: ${admin.name}`);
  }

  // Create 5 cashier users
  for (let i = 1; i <= 5; i++) {
    const cashier = await prisma.users.create({
      data: {
        name: `cashier${i}`,
        email: `cashier${i}@coffee.com`,
        password: md5(`cashier${i}123`),
        role: "cashier",
      },
    });
    users.push(cashier);
    console.log(`   ✓ Created cashier: ${cashier.name}`);
  }

  // Seed Coffee Menu
  console.log("☕ Seeding coffee menu...");
  const coffees = [];

  for (let i = 0; i < 20; i++) {
    const coffee = await prisma.coffee.create({
      data: {
        name: coffeeNames[i],
        size: sizes[randomInRange(0, 2)],
        price: randomInRange(15000, 50000),
        quantity: randomInRange(20, 30),
        image: `${coffeeNames[i].toLowerCase().replace(/\s+/g, "-")}.jpg`,
      },
    });
    coffees.push(coffee);
    console.log(
      `   ✓ Created coffee: ${coffee.name} (${coffee.size}) - Rp ${coffee.price}`
    );
  }

  // Seed Orders
  console.log("📦 Seeding orders...");

  for (let i = 1; i <= 10; i++) {
    const customerName =
      customerNames[randomInRange(0, customerNames.length - 1)];
    const orderType = orderTypes[randomInRange(0, orderTypes.length - 1)];
    const orderDate = randomDate();
    const randomUser = users[randomInRange(0, users.length - 1)];

    // Create order_list
    const order = await prisma.order_list.create({
      data: {
        customer_name: customerName,
        order_type: orderType,
        order_date: orderDate,
      },
    });

    // Create 1-4 order details per order
    const numItems = randomInRange(1, 4);
    let totalPrice = 0;

    for (let j = 0; j < numItems; j++) {
      const randomCoffee = coffees[randomInRange(0, coffees.length - 1)];
      const quantity = randomInRange(1, 3);

      await prisma.order_detail.create({
        data: {
          order_id: order.id,
          coffee_id: randomCoffee.id,
          user_id: randomUser.id,
          quantity: quantity,
          price: randomCoffee.price,
        },
      });

      // Update coffee stock
      await prisma.coffee.update({
        where: { id: randomCoffee.id },
        data: {
          quantity: {
            decrement: quantity,
          },
        },
      });

      totalPrice += randomCoffee.price * quantity;
    }

    console.log(
      `   ✓ Created order #${order.id}: ${customerName} - ${orderType} (${numItems} items) - Total: Rp ${totalPrice}`
    );
  }

  console.log("\n🎉 Seeding completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`   - Users: ${users.length} (5 admins, 5 cashiers)`);
  console.log(`   - Coffee menu: ${coffees.length} items`);
  console.log(`   - Orders: 10 transactions`);
  console.log("\n🔑 Default credentials:");
  console.log("   Admin: admin1 / admin1123 (to admin5)");
  console.log("   Cashier: cashier1 / cashier1123 (to cashier5)");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });