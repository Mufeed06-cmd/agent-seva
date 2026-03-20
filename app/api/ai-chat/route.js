import { NextResponse } from 'next/server'

export async function POST(req) {
  const { message, role, name } = await req.json()

  const systemPrompt = `You are Seva AI, a smart business assistant for Agent Seva — a platform helping local Indian vendors grow their business. You are talking to ${name}, who is a ${role}.

Your personality:
- Friendly, warm, and encouraging like a trusted Indian business advisor
- Use simple, clear English. Occasionally use Hindi words naturally (like "Namaste", "bilkul", "bahut achha")
- Keep responses concise (2-4 sentences max) unless asked for detailed advice
- Focus on practical, actionable tips for small local Indian vendors
- Understand Indian market context: festivals, local suppliers, cash-based transactions, etc.

If user is an admin: help with platform management, vendor onboarding, analytics insights.
If user is a vendor: help with product management, pricing, inventory, sales tips, customer retention.

Always be positive and motivating. End with a helpful follow-up question or suggestion when appropriate.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 300,
        system: systemPrompt,
        messages: [{ role: 'user', content: message }]
      })
    })

    const data = await response.json()
    const reply = data.content?.[0]?.text || 'Sorry, I could not process that. Please try again!'

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('AI error:', error)
    return NextResponse.json({ reply: 'AI service is temporarily unavailable. Please try again later.' }, { status: 500 })
  }
}