import { type Property, type InsertProperty, type Blog, type InsertBlog } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Property methods
  getAllProperties(): Promise<Property[]>;
  getPropertyById(id: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, property: InsertProperty): Promise<Property | undefined>;
  deleteProperty(id: string): Promise<boolean>;
  
  // Blog methods
  getAllBlogs(): Promise<Blog[]>;
  getBlogById(id: string): Promise<Blog | undefined>;
}

export class MemStorage implements IStorage {
  private properties: Map<string, Property>;
  private blogs: Map<string, Blog>;

  constructor() {
    this.properties = new Map();
    this.blogs = new Map();
    this.seedData();
  }

  // Property methods
  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getPropertyById(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const property: Property = {
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
    } as unknown as Property;
    this.properties.set(id, property);
    return property;
  }

  async updateProperty(id: string, insertProperty: InsertProperty): Promise<Property | undefined> {
    if (!this.properties.has(id)) {
      return undefined;
    }
    const property: Property = {
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
    } as unknown as Property;
    this.properties.set(id, property);
    return property;
  }

  async deleteProperty(id: string): Promise<boolean> {
    return this.properties.delete(id);
  }

  // Blog methods
  async getAllBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values());
  }

  async getBlogById(id: string): Promise<Blog | undefined> {
    return this.blogs.get(id);
  }

  // Seed initial data
  private seedData() {
    // Seed Properties
    const sampleProperties: InsertProperty[] = [
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
        sqft: 2000,
        images: [
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200"
        ],
        amenities: ["Parking", "Garden", "Bore Well", "Solar Panels", "Compound Wall"],
        latitude: "13.6352",
        longitude: "79.4192",
        status: "available",
        featured: 0,
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
      },
      {
        title: "Corner Commercial Plot",
        description: "High-footfall corner commercial plot ideal for retail or restaurant development.",
        city: "Tirupati",
        area: "Business District",
        propertyType: "Lands",
        price: "20000000",
        sqft: 8000,
        images: [
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200"
        ],
        amenities: ["Main Road", "Electricity", "Water"],
        latitude: "13.6300",
        longitude: "79.4150",
        status: "available",
        featured: 0,
      },
  ];

    sampleProperties.forEach((prop) => {
      const id = randomUUID();
      const property: Property = {
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
        featured: prop.featured ?? 0,
      } as unknown as Property;
      this.properties.set(id, property);
    });

    // Debug: log specific property images to help verify client image issues
    const debugProp = Array.from(this.properties.values()).find(p => p.title.includes('Family Independent House'));
    if (debugProp) {
      // eslint-disable-next-line no-console
      console.log('[storage] Debug property images:', debugProp.title, debugProp.images);
    }

    // Seed Blogs
    const sampleBlogs: InsertBlog[] = [
      {
        title: "7 Essential Tips for First-Time Real Estate Investors",
        excerpt: "Practical advice for new investors: budgeting, legal checks, location, and more. Avoid common mistakes and make smart property decisions.",
        content: `Investing in real estate can be a rewarding way to build wealth and secure your financial future. Whether you're buying your first apartment, a plot, or a commercial space, these tips will help you make smart decisions and avoid common pitfalls.\n\n1. **Research the Market:** Study local trends, property prices, and future development plans. Understanding the market helps you spot good deals and avoid overpriced properties.\n\n2. **Set a Realistic Budget:** Factor in not just the property cost, but also registration fees, taxes, maintenance, and possible renovation expenses.\n\n3. **Check Legal Clearances:** Ensure the property has clear titles, necessary approvals, and is free from disputes. Consult a legal expert if needed.\n\n4. **Location Matters:** Choose areas with good connectivity, infrastructure, and growth potential. Proximity to schools, hospitals, and markets adds value.\n\n5. **Inspect the Property:** Visit the site, check construction quality, amenities, and talk to neighbors for honest feedback.\n\n6. **Plan for the Long Term:** Real estate is best suited for long-term investment. Be patient and avoid panic selling during market fluctuations.\n\n7. **Consult Professionals:** Work with trusted real estate agents, lawyers, and financial advisors to guide your purchase and paperwork.\n\n---\n\n**Quick Checklist Before You Buy:**\n- Verify builder reputation and track record\n- Check RERA registration for new projects\n- Review payment plans and loan options\n- Understand resale potential and rental yields\n\nInvesting in property is a big step—take your time, do your homework, and seek expert advice. Happy house hunting!`,
        category: "Investment Tips",
        author: "Dream Dwellings Team",
        date: "2025-10-13",
        featuredImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
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
        featuredImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
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
        featuredImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
      },
      // Removed Kadapa-specific market analysis blog
    ];

    sampleBlogs.forEach((blog) => {
      const id = randomUUID();
      this.blogs.set(id, { ...blog, id });
    });
  }
}

export const storage = new MemStorage();
