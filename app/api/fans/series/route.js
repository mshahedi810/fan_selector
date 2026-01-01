// app/api/fans/series/route.js
export async function GET() {
  try {
    const res = await fetch("http://localhost:4000/api/fans/series"); // آدرس واقعی بک‌اند
    if (!res.ok) throw new Error("Failed to fetch fan series");
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch fan series" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
