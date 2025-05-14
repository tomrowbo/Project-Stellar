import { PasskeyServer } from 'passkey-kit';
import { NextRequest, NextResponse } from 'next/server';

// Server-side code - not bundled with client
const server = new PasskeyServer({
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
  launchtubeUrl: process.env.NEXT_PUBLIC_LAUNCHTUBE_URL || '',
  launchtubeJwt: process.env.LAUNCHTUBE_JWT || '',
  mercuryProjectName: process.env.NEXT_PUBLIC_MERCURY_PROJECT_NAME || '',
  mercuryUrl: process.env.NEXT_PUBLIC_MERCURY_URL || '',
  mercuryJwt: process.env.MERCURY_JWT || '',
});

export async function POST(request: NextRequest) {
  try {
    const xdr = await request.text();
    const res = await server.send(xdr);
    
    return NextResponse.json(res);
  } catch (error: any) {
    console.error('Error sending transaction:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 