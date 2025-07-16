import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongo";

export async function GET(request: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { 
          error: "Not authenticated", 
          authenticated: false,
          user: null,
          provider: null
        }, 
        { status: 401 }
      );
    }

    // Connect to MongoDB to get full user details
    let userFromDb = null;
    let dbConnection = null;
    
    try {
      const client = await connectMongo;
      if (client) {
        const db = client.db();
        const users = db.collection("users");
        
        // Find user by email
        userFromDb = await users.findOne({ 
          email: session.user.email 
        });
        
        dbConnection = {
          status: "connected",
          database: db.databaseName,
          collection: "users"
        };
      }
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      dbConnection = {
        status: "error",
        error: dbError instanceof Error ? dbError.message : "Unknown database error"
      };
    }

    // Determine authentication provider
    let provider = "unknown";
    if (userFromDb) {
      if (userFromDb.accounts && userFromDb.accounts.length > 0) {
        provider = userFromDb.accounts[0].provider;
      } else {
        // Check for linked accounts in separate collection
        try {
          const client = await connectMongo;
          if (client) {
            const db = client.db();
            const accounts = db.collection("accounts");
            const userAccount = await accounts.findOne({ 
              userId: userFromDb._id 
            });
            provider = userAccount?.provider || "email";
          }
        } catch (accountError) {
          console.error("Account lookup error:", accountError);
        }
      }
    }

    // If no provider found but user exists, likely email/magic link
    if (provider === "unknown" && session.user.email) {
      provider = "email";
    }

    const response = {
      authenticated: true,
      session: {
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        },
        expires: session.expires
      },
      provider: provider,
      database: dbConnection,
      userFromDatabase: userFromDb ? {
        id: userFromDb._id,
        name: userFromDb.name,
        email: userFromDb.email,
        image: userFromDb.image,
        emailVerified: userFromDb.emailVerified,
        createdAt: userFromDb.createdAt || null,
        updatedAt: userFromDb.updatedAt || null,
      } : null,
      validation: {
        sessionValid: true,
        userInDatabase: !!userFromDb,
        providerIdentified: provider !== "unknown",
        timestamp: new Date().toISOString()
      }
    };

    return NextResponse.json(response, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    });

  } catch (error) {
    console.error("Auth validation error:", error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        authenticated: false,
        details: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    );
  }
}
