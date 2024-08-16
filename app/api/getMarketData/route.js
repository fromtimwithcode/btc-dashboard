export async function GET() {
  // ID 1 = BTC
  const res = await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY,
      },
    },
  );
  const marketData = await res.json();

  return Response.json({ marketData });
}
