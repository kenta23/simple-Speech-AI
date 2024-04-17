import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req, res:NextApiResponse) {

  return NextResponse.json({ message: 'Hello from Next.js API!', data: 'Some data' }); // Set appropriate status code and response data
}