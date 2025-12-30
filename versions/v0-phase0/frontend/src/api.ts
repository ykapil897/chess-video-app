const BASE_URL = "http://localhost:3001";

export async function createGame(gameId: string) {
  const res = await fetch(`${BASE_URL}/game/create/${gameId}`, {
    method: "POST"
  });
  if (!res.ok) throw new Error("Game creation failed");
  return res.json();
}

export async function getGame(gameId: string) {
  const res = await fetch(`${BASE_URL}/game/${gameId}`);
  if (!res.ok) throw new Error("Game fetch failed");
  return res.json();
}

export async function makeMove(
  gameId: string,
  from: string,
  to: string,
  promotion?: string
) {
  const res = await fetch(`${BASE_URL}/game/move/${gameId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, promotion })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Illegal move");
  return data;
}
