// ./app/api/fans/variants/route.js
export async function GET() {
  try {
    const res = await fetch("http://localhost:4000/api/fans/variants"); // آدرس backend واقعی
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch variants" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
