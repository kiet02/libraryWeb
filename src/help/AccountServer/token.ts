export function decodeJWT(token: string): any | null {
  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    return JSON.parse(payloadJson);
  } catch (e) {
    return null;
  }
}

// ---- Kiểm tra hạn token ----
export function isTokenValid(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return false;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
}

// ---- Xử lý token: nếu hết hạn thì xóa, nếu còn thì decode ----
export function handleToken(
  token: string | null
): { id: number; email?: string; role?: string } | null {
  if (!token) return null;

  if (!isTokenValid(token)) {
    // Hết hạn => xóa khỏi localStorage (hoặc Recoil, tùy nơi bạn lưu)
    localStorage.removeItem("token"); // hoặc dùng resetRecoil(tokenState)
    return null;
  }

  const payload = decodeJWT(token);
  console.log(payload);

  return {
    id: payload.id,
    email: payload.email,
    role: payload.role,
  };
}
