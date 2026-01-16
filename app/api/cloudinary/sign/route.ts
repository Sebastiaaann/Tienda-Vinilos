import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paramsToSign } = body

    // Additional server-side validation
    const allowedFolders = ['products', 'vinilos', 'temp']
    if (paramsToSign.folder && !allowedFolders.includes(paramsToSign.folder)) {
      return NextResponse.json({ error: 'Invalid folder' }, { status: 400 })
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    )

    return NextResponse.json({ signature })
  } catch (error) {
    console.error('Cloudinary signing error:', error)
    return NextResponse.json(
      { error: 'Failed to sign parameters' },
      { status: 500 }
    )
  }
}
