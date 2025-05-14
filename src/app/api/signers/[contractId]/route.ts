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

export async function GET(
  request: NextRequest,
  { params }: { params: { contractId: string } }
) {
  try {
    const signers = await server.getSigners(params.contractId);
    return NextResponse.json(signers);
  } catch (error: any) {
    console.error('Error retrieving signers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 