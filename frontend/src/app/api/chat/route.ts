import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        // Call the FastAPI backend
        const backendResponse = await fetch(`${BACKEND_URL}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });

        if (!backendResponse.ok) {
            throw new Error(`Backend error: ${backendResponse.status}`);
        }

        const data = await backendResponse.json();
        
        // Backend returns { response: string }, frontend expects { reply: string }
        return NextResponse.json({ reply: data.response });
    } catch (error) {
        console.error('Chat API error:', error);
        // Fallback to echo if backend is not available
        try {
            const { message } = await request.clone().json();
            return NextResponse.json({ reply: `[Demo mode] You said: ${message}` });
        } catch {
            return NextResponse.json(
                { reply: 'Sorry, something went wrong.' },
                { status: 500 }
            );
        }
    }
}