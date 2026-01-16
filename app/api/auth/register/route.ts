import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// In a real app, this would write to a database
// For now we just simulate the success response
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    // Check if user exists (mock check)
    if (email === "demo@ejemplo.com") {
      return NextResponse.json(
        { message: "El correo electrónico ya está registrado" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (mock)
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    console.log("New user registered (mock):", newUser);

    // Return success without sensitive data
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { 
        message: "Usuario registrado exitosamente", 
        user: userWithoutPassword 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
