import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    
  } catch (error) {
    return NextResponse.json(
      { error: `Unknown 500 Error ${error}` },
      { status: 500 },
    );
  }
}