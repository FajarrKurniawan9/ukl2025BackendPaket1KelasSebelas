import { PrismaClient } from "@prisma/client";
import md5 from "md5";

const prisma = new PrismaClient();

// ===================================================
// DATA DUMMY
// ===================================================

const users = [
  // 3 Admin
  {
    name: "admin1",
    email: "admin1@moklet.com",
    password: "Moklet123",
    role: "admin",
  },
  {
    name: "admin2",
    email: "admin2@moklet.com",
    password: "Moklet123",
    role: "admin",
  },
  {
    name: "admin3",
    email: "admin3@moklet.com",
    password: "Moklet123",
    role: "admin",
  },

  // 5 Kasir
  {
    name: "kasir1",
    email: "kasir1@moklet.com",
    password: "Moklet123",
    role: "cashier",
  },
  {
    name: "kasir2",
    email: "kasir2@moklet.com",
    password: "Moklet123",
    role: "cashier",
  },
  {
    name: "kasir3",
    email: "kasir3@moklet.com",
    password: "Moklet123",
    role: "cashier",
  },
  {
    name: "kasir4",
    email: "kasir4@moklet.com",
    password: "Moklet123",
    role: "cashier",
  },
  {
    name: "kasir5",
    email: "kasir5@moklet.com",
    password: "Moklet123",
    role: "cashier",
  },
];

// 20 Menu Coffee + Makanan/Cemilan
const menuItems = [
  // Coffee (10 items)
  { name: "Espresso", price: 18000, quantity: 30, size: "Small" },
  { name: "Americano", price: 20000, quantity: 30, size: "Medium" },
  { name: "Cappuccino", price: 25000, quantity: 30, size: "Medium" },
  { name: "Latte", price: 28000, quantity: 30, size: "Large" },
  { name: "Mocha", price: 30000, quantity: 30, size: "Large" },
  { name: "Macchiato", price: 27000, quantity: 30, size: "Medium" },
  { name: "Flat White", price: 26000, quantity: 30, size: "Medium" },
  { name: "Affogato", price: 32000, quantity: 30, size: "Small" },
  { name: "Cold Brew", price: 29000, quantity: 30, size: "Large" },
  { name: "Iced Latte", price: 30000, quantity: 30, size: "Large" },

  // Makanan & Cemilan (10 items)
  { name: "Croissant", price: 15000, quantity: 30, size: "Small" },
  { name: "Donut", price: 12000, quantity: 30, size: "Small" },
  { name: "Brownie", price: 18000, quantity: 30, size: "Medium" },
  { name: "Cheesecake", price: 35000, quantity: 30, size: "Medium" },
  { name: "Waffle", price: 28000, quantity: 30, size: "Large" },
  { name: "Pancake", price: 30000, quantity: 30, size: "Large" },
  { name: "Sandwich", price: 25000, quantity: 30, size: "Medium" },
  { name: "Muffin", price: 16000, quantity: 30, size: "Small" },
  { name: "Cookies", price: 10000, quantity: 30, size: "Small" },
  { name: "Tiramisu", price: 40000, quantity: 30, size: "Medium" },
];

// Customer names untuk transaksi
const customerNames = [
  "Budi Santoso",
  "Siti Nurhaliza",
  "Ahmad Dhani",
  "Dewi Lestari",
  "Eko Prasetyo",
  "Fitri Handayani",
  "Gilang Ramadhan",
  "Hana Pertiwi",
  "Indra Kusuma",
  "Joko Widodo",
];

const orderTypes = ["Dine In", "Take Away", "Delivery"];

// ===================================================
// HELPER FUNCTIONS
// ===================================================

// Random antara min dan max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random pick dari array
function randomPick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Generate random date antara start dan end
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Format date ke YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// ===================================================
// MAIN SEED FUNCTION
// ===================================================

async function main() {
  console.log("🌱 Starting seed...\n");

  // ===================================================
  // 1. SEED USERS (3 Admin + 5 Kasir)
  // ===================================================
  console.log("👥 Seeding Users...");
  for (const user of users) {
    await prisma.users.create({
      data: {
        name: user.name,
        email: user.email,
        password: md5(user.password),
        role: user.role,
      },
    });
    console.log(`  ✅ Created ${user.role}: ${user.name}`);
  }
  console.log(`✨ Total Users: ${users.length}\n`);

  // ===================================================
  // 2. SEED COFFEE MENU (20 items)
  // ===================================================
  console.log("☕ Seeding Coffee Menu...");
  const createdMenus = [];
  for (const menu of menuItems) {
    const created = await prisma.coffee.create({
      data: {
        name: menu.name,
        price: menu.price,
        quantity: menu.quantity,
        size: menu.size,
        image: null,
      },
    });
    createdMenus.push(created);
    console.log(
      `  ✅ Created: ${menu.name} - Rp ${menu.price.toLocaleString()} (${
        menu.size
      })`
    );
  }
  console.log(`✨ Total Menu: ${createdMenus.length}\n`);

  // ===================================================
  // 3. SEED TRANSAKSI (10 transaksi)
  // ===================================================
  console.log("🛒 Seeding Transactions...");

  const startDate = new Date("2024-11-01");
  const endDate = new Date(); // Today

  for (let i = 1; i <= 10; i++) {
    // Random customer, order type, dan tanggal
    const customerName = randomPick(customerNames);
    const orderType = randomPick(orderTypes);
    const orderDate = randomDate(startDate, endDate);
    const formattedDate = formatDate(orderDate);

    // Random 1-3 items per transaksi
    const itemCount = randomInt(1, 3);
    const selectedItems = [];

    for (let j = 0; j < itemCount; j++) {
      const randomMenu = randomPick(createdMenus);
      const quantity = randomInt(1, 3);

      selectedItems.push({
        coffee_id: randomMenu.id,
        quantity: quantity,
        price: randomMenu.price,
      });
    }

    // Hitung total
    const totalPrice = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create transaksi dengan detail
    const transaction = await prisma.order_list.create({
      data: {
        customer_name: customerName,
        order_type: orderType,
        order_date: formattedDate,
        createdAt: orderDate,
        orderDetails: {
          create: selectedItems,
        },
      },
      include: {
        orderDetails: {
          include: {
            coffee_Id: true,
          },
        },
      },
    });

    console.log(`  ✅ Transaction #${i}:`);
    console.log(`     Customer: ${customerName}`);
    console.log(`     Type: ${orderType}`);
    console.log(`     Date: ${formattedDate}`);
    console.log(`     Items: ${itemCount} items`);
    console.log(`     Total: Rp ${totalPrice.toLocaleString()}`);

    // Update stock coffee
    for (const item of selectedItems) {
      await prisma.coffee.update({
        where: { id: item.coffee_id },
        data: {
          quantity: {
            decrement: item.quantity,
          },
        },
      });
    }
  }
  console.log(`✨ Total Transactions: 10\n`);

  // ===================================================
  // SUMMARY
  // ===================================================
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🎉 SEED COMPLETED!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📊 Summary:");
  console.log(`   • Users: ${users.length} (3 Admin, 5 Kasir)`);
  console.log(`   • Coffee Menu: ${createdMenus.length}`);
  console.log(`   • Transactions: 10`);
  console.log(`   • Password: Moklet123 (all users)`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  console.log("🔑 Login Credentials:");
  console.log("   Admin:");
  console.log("   • username: admin1, password: Moklet123");
  console.log("   • username: admin2, password: Moklet123");
  console.log("   • username: admin3, password: Moklet123");
  console.log("\n   Kasir:");
  console.log("   • username: kasir1, password: Moklet123");
  console.log("   • username: kasir2, password: Moklet123");
  console.log("   • username: kasir3, password: Moklet123");
  console.log("   • username: kasir4, password: Moklet123");
  console.log("   • username: kasir5, password: Moklet123");
}

// ===================================================
// RUN SEEDER
// ===================================================

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
