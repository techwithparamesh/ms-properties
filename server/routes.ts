import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPropertySchema, contactFormSchema } from "@shared/schema";
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin: Reject property
  app.patch("/api/properties/:id/reject", async (req, res) => {
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

  // Admin: Mark property as sold
  app.patch("/api/properties/:id/sold", async (req, res) => {
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
  // User Signup Route
  app.post('/api/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      // Check if user already exists
      const [rows] = await connection.execute<any[]>('SELECT id FROM users WHERE email = ?', [email]);
      if (rows && rows.length > 0) {
        return res.status(409).json({ error: 'User already exists.' });
      }
      // Hash password
      const password_hash = await bcrypt.hash(password, 10);
      // Insert user
      await connection.execute(
        'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [name, email, password_hash, role || 'user']
      );
      res.status(201).json({ success: true, message: 'User registered successfully.' });
    } catch (err) {
      console.error('Signup error:', err);
      res.status(500).json({ error: 'Signup failed', details: err instanceof Error ? err.message : String(err) });
    }
  });
  // User Login Route

  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      const [rows] = await connection.execute<any[]>('SELECT * FROM users WHERE email = ?', [email]);
      console.log('Login attempt:', { email, rows });
      if (!rows || rows.length === 0) {
        console.log('No user found for email:', email);
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const user = rows[0];
      console.log('User found:', user);
      console.log('Comparing password:', password, 'with hash:', user.password_hash);
      const valid = await bcrypt.compare(password, user.password_hash);
      console.log('Password valid:', valid);
      if (!valid) {
        console.log('Password mismatch for user:', email);
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.json({ success: true, user: { id: user.id, name: user.name, role: user.role } });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Login failed', details: err instanceof Error ? err.message : String(err) });
    }
  });
  // Property Routes
  
  // Get all properties
  app.get("/api/properties", async (req, res) => {
    try {
      const properties = await storage.getAllProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  // Get property by ID
  app.get("/api/properties/:id", async (req, res) => {
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

  // Create property
  app.post("/api/properties", async (req, res) => {
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

  // Update property
  app.patch("/api/properties/:id", async (req, res) => {
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

  // Delete property
  app.delete("/api/properties/:id", async (req, res) => {
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

  // Get properties for a specific user (for dashboard management)
  app.get("/api/my-properties", async (req, res) => {
    // For demo: get userId from query param; in real app, use auth token/session
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }
    try {
      const properties = await storage.getAllProperties();
      const myProperties = properties.filter((p) => String(p.ownerId) === String(userId));
      res.json(myProperties);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user properties" });
    }
  });

  // Blog Routes
  
  // Get all blogs
  app.get("/api/blogs", async (req, res) => {
    try {
      const blogs = await storage.getAllBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  });

  // Get blog by ID
  app.get("/api/blogs/:id", async (req, res) => {
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

  // Contact Form Submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      // Send email using nodemailer
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'msproperties96@gmail.com',
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      const mailOptions = {
        from: validatedData.email,
        to: 'msproperties96@gmail.com',
        subject: `New Contact Form Submission from ${validatedData.name}`,
        text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nPhone: ${validatedData.phone}\nMessage: ${validatedData.message}`,
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

  const httpServer = createServer(app);
  return httpServer;
}

