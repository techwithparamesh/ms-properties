// server/index.ts
import express2 from "express";
import dotenv from "dotenv";
import path3 from "path";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  properties;
  blogs;
  constructor() {
    this.properties = /* @__PURE__ */ new Map();
    this.blogs = /* @__PURE__ */ new Map();
    this.seedData();
  }
  // Property methods
  async getAllProperties() {
    return Array.from(this.properties.values());
  }
  async getPropertyById(id) {
    return this.properties.get(id);
  }
  async createProperty(insertProperty) {
    const id = randomUUID();
    const property = {
      id,
      title: insertProperty.title,
      description: insertProperty.description,
      city: insertProperty.city,
      area: insertProperty.area,
      propertyType: insertProperty.propertyType,
      price: insertProperty.price,
      bedrooms: insertProperty.bedrooms ?? null,
      bathrooms: insertProperty.bathrooms ?? null,
      sqft: insertProperty.sqft,
      images: insertProperty.images ?? [],
      amenities: insertProperty.amenities ?? [],
      latitude: insertProperty.latitude ?? null,
      longitude: insertProperty.longitude ?? null,
      status: insertProperty.status ?? "available",
      featured: insertProperty.featured ?? 0,
      ownerId: insertProperty.ownerId,
      mobile: insertProperty.mobile ?? ""
    };
    this.properties.set(id, property);
    return property;
  }
  async updateProperty(id, insertProperty) {
    if (!this.properties.has(id)) {
      return void 0;
    }
    const property = {
      id,
      title: insertProperty.title,
      description: insertProperty.description,
      city: insertProperty.city,
      area: insertProperty.area,
      propertyType: insertProperty.propertyType,
      price: insertProperty.price,
      bedrooms: insertProperty.bedrooms ?? null,
      bathrooms: insertProperty.bathrooms ?? null,
      sqft: insertProperty.sqft,
      images: insertProperty.images ?? [],
      amenities: insertProperty.amenities ?? [],
      latitude: insertProperty.latitude ?? null,
      longitude: insertProperty.longitude ?? null,
      status: insertProperty.status ?? "available",
      featured: insertProperty.featured ?? 0,
      ownerId: insertProperty.ownerId,
      mobile: insertProperty.mobile ?? ""
    };
    this.properties.set(id, property);
    return property;
  }
  async deleteProperty(id) {
    return this.properties.delete(id);
  }
  // Blog methods
  async getAllBlogs() {
    return Array.from(this.blogs.values());
  }
  async getBlogById(id) {
    return this.blogs.get(id);
  }
  // Seed initial data
  seedData() {
    const sampleOwnerId = "demo-user-1";
    const sampleProperties = [
      {
        title: "Elegant 4BHK Penthouse with City View",
        description: "Experience luxury living in this spacious 4BHK penthouse featuring panoramic city views, private terrace, and premium amenities. Ideal for families seeking comfort and style.",
        city: "Tirupati",
        area: "City Center",
        propertyType: "Apartments",
        price: "12500000",
        bedrooms: 4,
        bathrooms: 4,
        sqft: 3200,
        images: [
          "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200"
        ],
        amenities: ["Private Terrace", "Gym", "Swimming Pool", "24/7 Security", "Parking", "Smart Home Features"],
        latitude: "13.6285",
        longitude: "79.4200",
        status: "available",
        featured: 1,
        ownerId: sampleOwnerId,
        mobile: "9999999999"
      },
      {
        title: "Luxury 3BHK Villa in Renigunta Road",
        description: "Spacious luxury villa with modern amenities, premium fittings, and beautiful landscaped gardens. Located in the heart of Tirupati with excellent connectivity to all major landmarks.",
        city: "Tirupati",
        area: "Renigunta Road",
        propertyType: "Villas",
        price: "8500000",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2500,
        images: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200"
        ],
        amenities: ["Swimming Pool", "Gym", "24/7 Security", "Power Backup", "Parking", "Garden"],
        latitude: "13.6288",
        longitude: "79.4192",
        status: "available",
        featured: 1,
        ownerId: sampleOwnerId
      },
      {
        title: "Modern 2BHK Apartment Near Tirumala",
        description: "Well-designed 2BHK apartment with contemporary interiors, located near the spiritual city of Tirumala. Perfect for families seeking a peaceful environment.",
        city: "Tirupati",
        area: "Alipiri",
        propertyType: "Apartments",
        price: "4500000",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200"
        ],
        amenities: ["Lift", "Parking", "Security", "Water Supply", "Intercom"],
        latitude: "13.6503",
        longitude: "79.4189",
        status: "available",
        featured: 1,
        ownerId: sampleOwnerId
      },
      {
        title: "Spacious Independent House in Gandhi Nagar",
        description: "Beautiful independent house with ample space for family living. Features a large compound, modern kitchen, and well-ventilated rooms.",
        city: "Tirupati",
        area: "Gandhi Nagar",
        propertyType: "Independent Houses",
        price: "6500000",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2e3,
        images: [
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200"
        ],
        amenities: ["Parking", "Garden", "Bore Well", "Solar Panels", "Compound Wall"],
        latitude: "13.6352",
        longitude: "79.4192",
        status: "available",
        featured: 0,
        ownerId: sampleOwnerId
      },
      {
        title: "Cozy 1BHK Apartment in University Area",
        description: "Compact and well-maintained 1BHK apartment perfect for students or young professionals. Located near SVU with easy access to educational institutions.",
        city: "Tirupati",
        area: "SV University",
        propertyType: "Apartments",
        price: "2500000",
        bedrooms: 1,
        bathrooms: 1,
        sqft: 650,
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200"
        ],
        amenities: ["Parking", "Security", "Water Supply", "24/7 Power"],
        latitude: "13.6352",
        longitude: "79.4065",
        status: "available",
        featured: 0,
        ownerId: sampleOwnerId
      },
      {
        title: "2BHK Furnished Apartment near Bus Stand",
        description: "Bright 2BHK apartment, fully furnished with modular kitchen and balcony. Close to transport, shops and schools. Suitable for small families.",
        city: "Tirupati",
        area: "Bus Stand",
        propertyType: "Apartments",
        price: "3800000",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 980,
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200"
        ],
        amenities: ["Lift", "Parking", "Gas Pipeline", "Security"],
        latitude: "13.6280",
        longitude: "79.4100",
        status: "available",
        featured: 0,
        ownerId: sampleOwnerId
      },
      {
        title: "Family Independent House in Old Town",
        description: "Spacious independent house with courtyard, ideal for multigenerational families. Close-knit neighbourhood with schools and markets nearby.",
        city: "Tirupati",
        area: "Old Town",
        propertyType: "Independent Houses",
        price: "5200000",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800,
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
        ],
        amenities: ["Parking", "Garden", "Borewell", "Compound Wall"],
        latitude: "13.6340",
        longitude: "79.4170",
        status: "available",
        featured: 0,
        ownerId: sampleOwnerId
      },
      {
        title: "Sunny 3BHK Apartment by the Park",
        description: "A bright 3BHK apartment with park views, modern fittings and community garden access.",
        city: "Tirupati",
        area: "Park View",
        propertyType: "Apartments",
        price: "5600000",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1400,
        images: [
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200"
        ],
        amenities: ["Park", "Lift", "Parking"],
        latitude: "13.6295",
        longitude: "79.4205",
        status: "available",
        featured: 0,
        ownerId: sampleOwnerId
      },
      {
        title: "Countryside Luxury Villa",
        description: "A luxury villa set amidst rolling hills with private orchard and guest house.",
        city: "Tirupati",
        area: "Hillview",
        propertyType: "Villas",
        price: "14500000",
        bedrooms: 4,
        bathrooms: 4,
        sqft: 4200,
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
        ],
        amenities: ["Orchard", "Guest House", "Solar Panels"],
        latitude: "13.6365",
        longitude: "79.4210",
        status: "available",
        featured: 0,
        ownerId: sampleOwnerId
      },
      {
        title: "Renovated Colonial House",
        description: "Classic colonial-style house with modernized kitchens and large verandahs.",
        city: "Tirupati",
        area: "Heritage Lane",
        propertyType: "Independent Houses",
        price: "7200000",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2600,
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
        ],
        amenities: ["Verandah", "Garden", "Storage"],
        latitude: "13.6390",
        longitude: "79.4220",
        status: "available",
        featured: 0,
        ownerId: sampleOwnerId
      },
      {
        title: "Corner Commercial Plot",
        description: "High-footfall corner commercial plot ideal for retail or restaurant development.",
        city: "Tirupati",
        area: "Business District",
        propertyType: "Lands",
        price: "20000000",
        sqft: 8e3,
        images: [
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200"
        ],
        amenities: ["Main Road", "Electricity", "Water"],
        latitude: "13.6300",
        longitude: "79.4150",
        status: "available",
        featured: 0,
        ownerId: sampleOwnerId
      }
    ];
    sampleProperties.forEach((prop) => {
      const id = randomUUID();
      const property = {
        id,
        title: prop.title,
        description: prop.description,
        city: prop.city,
        area: prop.area,
        propertyType: prop.propertyType,
        price: prop.price,
        bedrooms: prop.bedrooms ?? null,
        bathrooms: prop.bathrooms ?? null,
        sqft: prop.sqft,
        images: prop.images ?? [],
        amenities: prop.amenities ?? [],
        latitude: prop.latitude ?? null,
        longitude: prop.longitude ?? null,
        status: prop.status ?? "available",
        featured: prop.featured ?? 0
      };
      this.properties.set(id, property);
    });
    const debugProp = Array.from(this.properties.values()).find((p) => p.title.includes("Family Independent House"));
    if (debugProp) {
      console.log("[storage] Debug property images:", debugProp.title, debugProp.images);
    }
    const sampleBlogs = [
      {
        title: "7 Essential Tips for First-Time Real Estate Investors",
        excerpt: "Practical advice for new investors: budgeting, legal checks, location, and more. Avoid common mistakes and make smart property decisions.",
        content: `Investing in real estate can be a rewarding way to build wealth and secure your financial future. Whether you're buying your first apartment, a plot, or a commercial space, these tips will help you make smart decisions and avoid common pitfalls.

1. **Research the Market:** Study local trends, property prices, and future development plans. Understanding the market helps you spot good deals and avoid overpriced properties.

2. **Set a Realistic Budget:** Factor in not just the property cost, but also registration fees, taxes, maintenance, and possible renovation expenses.

3. **Check Legal Clearances:** Ensure the property has clear titles, necessary approvals, and is free from disputes. Consult a legal expert if needed.

4. **Location Matters:** Choose areas with good connectivity, infrastructure, and growth potential. Proximity to schools, hospitals, and markets adds value.

5. **Inspect the Property:** Visit the site, check construction quality, amenities, and talk to neighbors for honest feedback.

6. **Plan for the Long Term:** Real estate is best suited for long-term investment. Be patient and avoid panic selling during market fluctuations.

7. **Consult Professionals:** Work with trusted real estate agents, lawyers, and financial advisors to guide your purchase and paperwork.

---

**Quick Checklist Before You Buy:**
- Verify builder reputation and track record
- Check RERA registration for new projects
- Review payment plans and loan options
- Understand resale potential and rental yields

Investing in property is a big step\u2014take your time, do your homework, and seek expert advice. Happy house hunting!`,
        category: "Investment Tips",
        author: "MS Properties Team",
        date: "2025-10-13",
        featuredImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
      },
      {
        title: "Top 10 Reasons to Invest in Tirupati Real Estate",
        excerpt: "Discover why Tirupati is emerging as one of the most promising real estate markets in South India. From spiritual tourism to educational hubs, learn what makes this city special.",
        content: `Tirupati has become a hotspot for real estate investment in recent years. Here are the top 10 reasons why you should consider investing in Tirupati properties:

1. **Spiritual Tourism Hub**: With millions of pilgrims visiting Tirumala every year, the demand for residential and commercial properties continues to grow.

2. **Educational Excellence**: Home to Sri Venkateswara University and numerous prestigious institutions, creating steady demand for student housing.

3. **Infrastructure Development**: Major road and rail connectivity improvements have enhanced accessibility and property values.

4. **Affordable Prices**: Compared to metro cities, Tirupati offers excellent value with properties at reasonable prices.

5. **Growing IT Sector**: Technology parks and IT companies are setting up operations, driving employment and housing demand.

6. **Cultural Heritage**: Rich cultural heritage ensures sustained interest from both domestic and international buyers.

7. **Healthcare Facilities**: World-class hospitals and medical facilities attract medical professionals and patients.

8. **Rental Yields**: Strong rental market due to continuous influx of pilgrims, students, and professionals.

9. **Government Initiatives**: Smart city projects and urban development schemes are enhancing infrastructure.

10. **Future Growth Potential**: Planned metro rail and airport expansion promise significant appreciation in property values.

The combination of spiritual significance, educational importance, and infrastructure development makes Tirupati an ideal location for long-term real estate investment.`,
        category: "Investment Guide",
        author: "Ramesh Kumar",
        date: "2025-10-01",
        featuredImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
      },
      {
        title: "Understanding Property Documentation in Andhra Pradesh",
        excerpt: "A comprehensive guide to essential documents you need when buying property in Tirupati. Ensure a smooth transaction with proper documentation.",
        content: `When buying property in Andhra Pradesh, particularly in cities like Tirupati, proper documentation is crucial. Here's your complete guide:

**Essential Documents for Property Purchase:**

1. **Sale Deed**: The primary document that transfers ownership from seller to buyer. Must be registered with the Sub-Registrar office.

2. **Encumbrance Certificate**: Shows the property is free from legal or monetary liabilities for the past 13-30 years.

3. **Property Tax Receipts**: Last 5 years of paid property tax receipts to verify no outstanding dues.

4. **Approved Building Plan**: Municipal-approved architectural plans showing the property complies with local regulations.

5. **Occupancy Certificate**: Certifies the building is suitable for occupation and meets safety standards.

6. **Mother Deed**: Original document showing the first owner and subsequent chain of ownership.

7. **NOC from Society**: If applicable, No Objection Certificate from the housing society or apartment association.

**Verification Process:**

- Verify seller's identity and ownership through land records
- Check for any pending litigation or disputes
- Ensure proper measurement and boundary verification
- Confirm adherence to RERA regulations
- Verify all utility connections and tax payments

**Registration Process:**

1. Draft the sale agreement
2. Pay stamp duty and registration fees
3. Visit Sub-Registrar office with documents
4. Complete biometric verification
5. Obtain registered sale deed

Always consult a legal expert before finalizing any property transaction. Proper due diligence protects your investment and ensures a hassle-free ownership experience.`,
        category: "Legal Guide",
        author: "Advocate Lakshmi Devi",
        date: "2025-09-28",
        featuredImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800"
      }
      // Removed Kadapa-specific market analysis blog
    ];
    sampleBlogs.forEach((blog) => {
      const id = randomUUID();
      this.blogs.set(id, { ...blog, id });
    });
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  city: text("city").notNull(),
  // City (e.g., Tirupati)
  area: text("area").notNull(),
  propertyType: text("property_type").notNull(),
  // Apartments, Villas, Penthouses, Independent Houses, Lands
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  sqft: integer("sqft").notNull(),
  images: text("images").array().notNull(),
  amenities: text("amenities").array().notNull(),
  mobile: varchar("mobile", { length: 20 }),
  // Only visible to admin
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  status: text("status").notNull().default("available"),
  // available, sold, pending
  featured: integer("featured").notNull().default(0),
  // 0 or 1 for boolean
  ownerId: varchar("owner_id").notNull()
  // User ID of property owner
});
var insertPropertySchema = createInsertSchema(properties).omit({ id: true }).extend({
  amenities: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return val.split(",").map((s) => s.trim()).filter(Boolean);
      }
      return val;
    },
    z.array(z.string())
  ),
  images: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return val.split(",").map((s) => s.trim()).filter(Boolean);
      }
      return val;
    },
    z.array(z.string())
  ),
  mobile: z.string().min(10).max(20).optional()
});
var blogs = pgTable("blogs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  date: text("date").notNull(),
  featuredImage: text("featured_image").notNull()
});
var insertBlogSchema = createInsertSchema(blogs).omit({
  id: true
});
var contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

// server/routes.ts
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
async function registerRoutes(app2) {
  app2.patch("/api/properties/:id/reject", async (req, res) => {
    const id = req.params.id;
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      validatedData.status = "rejected";
      const property = await storage.updateProperty(id, validatedData);
      if (!property) return res.status(404).json({ error: "Property not found" });
      res.json({ success: true, property });
    } catch (error) {
      res.status(500).json({ error: "Failed to reject property" });
    }
  });
  app2.patch("/api/properties/:id/sold", async (req, res) => {
    const id = req.params.id;
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      validatedData.status = "sold";
      const property = await storage.updateProperty(id, validatedData);
      if (!property) return res.status(404).json({ error: "Property not found" });
      res.json({ success: true, property });
    } catch (error) {
      res.status(500).json({ error: "Failed to mark property as sold" });
    }
  });
  app2.post("/api/signup", async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      });
      const [rows] = await connection.execute("SELECT id FROM users WHERE email = ?", [email]);
      if (rows && rows.length > 0) {
        return res.status(409).json({ error: "User already exists." });
      }
      const password_hash = await bcrypt.hash(password, 10);
      await connection.execute(
        "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
        [name, email, password_hash, role || "user"]
      );
      res.status(201).json({ success: true, message: "User registered successfully." });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ error: "Signup failed", details: err instanceof Error ? err.message : String(err) });
    }
  });
  app2.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      });
      const [rows] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
      console.log("Login attempt:", { email, rows });
      if (!rows || rows.length === 0) {
        console.log("No user found for email:", email);
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const user = rows[0];
      console.log("User found:", user);
      console.log("Comparing password:", password, "with hash:", user.password_hash);
      const valid = await bcrypt.compare(password, user.password_hash);
      console.log("Password valid:", valid);
      if (!valid) {
        console.log("Password mismatch for user:", email);
        return res.status(401).json({ error: "Invalid credentials" });
      }
      res.json({ success: true, user: { id: user.id, name: user.name, role: user.role } });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Login failed", details: err instanceof Error ? err.message : String(err) });
    }
  });
  app2.get("/api/properties", async (req, res) => {
    try {
      const properties2 = await storage.getAllProperties();
      res.json(properties2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });
  app2.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getPropertyById(req.params.id);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch property" });
    }
  });
  app2.post("/api/properties", async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(validatedData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to create property" });
      }
    }
  });
  app2.patch("/api/properties/:id", async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.updateProperty(req.params.id, validatedData);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to update property" });
      }
    }
  });
  app2.delete("/api/properties/:id", async (req, res) => {
    try {
      const success = await storage.deleteProperty(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete property" });
    }
  });
  app2.get("/api/my-properties", async (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }
    try {
      const properties2 = await storage.getAllProperties();
      const myProperties = properties2.filter((p) => String(p.ownerId) === String(userId));
      res.json(myProperties);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user properties" });
    }
  });
  app2.get("/api/blogs", async (req, res) => {
    try {
      const blogs2 = await storage.getAllBlogs();
      res.json(blogs2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  });
  app2.get("/api/blogs/:id", async (req, res) => {
    try {
      const blog = await storage.getBlogById(req.params.id);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "msproperties96@gmail.com",
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });
      const mailOptions = {
        from: validatedData.email,
        to: "msproperties96@gmail.com",
        subject: `New Contact Form Submission from ${validatedData.name}`,
        text: `Name: ${validatedData.name}
Email: ${validatedData.email}
Phone: ${validatedData.phone}
Message: ${validatedData.message}`
      };
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to process contact form" });
      }
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}

// server/index.ts
dotenv.config();
var app = express2();
app.use(express2.json({ limit: "20mb" }));
app.use(express2.urlencoded({ extended: false, limit: "20mb" }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") !== "development") {
    const distPath = path3.resolve(__dirname, "../dist");
    app.use(express2.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path3.join(distPath, "index.html"));
    });
  } else {
    await setupVite(app, server);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  const host = process.env.HOST || "127.0.0.1";
  server.listen(port, host, () => {
    log(`serving on ${host}:${port}`);
  });
})();
