import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, purpose, message } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required.' },
                { status: 400 }
            );
        }

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>', // Change this after domain verification
            to: ['mehdihassan22@gmail.com'], // The email you viewed in Contact.tsx
            subject: `New Transmission: ${purpose} from ${name}`,
            replyTo: email,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #E84A5F; border-bottom: 2px solid #E84A5F; padding-bottom: 10px;">New Transmission Received</h2>
                    <p><strong>From:</strong> ${name} (${email})</p>
                    <p><strong>Purpose:</strong> ${purpose}</p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
                    <p style="font-size: 12px; color: #888;">This message was sent via your portfolio contact form.</p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(
            { message: 'Transmission received successfully.', id: data?.id },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send transmission.' },
            { status: 500 }
        );
    }
}
