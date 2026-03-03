import { useState, useEffect } from "react";
import QuotationBuilder from "./QuotationBuilder.jsx";

// ========== 설정 ==========
// 접속 비밀번호 (여기서 변경하세요)
const ACCESS_PASSWORD = "choice2026";

// ========== 앱 ==========
export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  // 로그인 상태 & API키 복원
  useEffect(() => {
    const saved = localStorage.getItem("cg_auth");
    if (saved === "true") setAuthenticated(true);
    const key = localStorage.getItem("cg_api_key");
    if (key) setApiKey(key);
  }, []);

  const handleLogin = () => {
    if (password === ACCESS_PASSWORD) {
      setAuthenticated(true);
      localStorage.setItem("cg_auth", "true");
      setError("");
    } else {
      setError("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("cg_auth");
  };

  const handleSaveApiKey = () => {
    localStorage.setItem("cg_api_key", apiKey);
    setShowSettings(false);
    alert("API 키가 저장되었습니다.");
  };

  // ===== 로그인 화면 =====
  if (!authenticated) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "linear-gradient(135deg, #1a5c3a 0%, #0a2e1c 100%)" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "48px 40px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", width: "380px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#1a5c3a", marginBottom: "8px" }}>
            🏌️ 초이스골프
          </div>
          <div style={{ fontSize: "14px", color: "#888", marginBottom: "32px" }}>
            견적 프로그램
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="비밀번호를 입력하세요"
            style={{ width: "100%", padding: "14px 16px", border: "2px solid #ddd", borderRadius: "8px", fontSize: "16px", marginBottom: "16px", outline: "none" }}
          />
          {error && <div style={{ color: "#e74c3c", fontSize: "13px", marginBottom: "12px" }}>{error}</div>}
          <button
            onClick={handleLogin}
            style={{ width: "100%", padding: "14px", background: "#1a5c3a", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  // ===== 메인 화면 =====
  return (
    <div>
      {/* 상단 바 */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, background: "#1a5c3a", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 20px", fontSize: "13px" }}>
        <span style={{ fontWeight: "700" }}>🏌️ 초이스골프 견적 프로그램</span>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "none", borderRadius: "4px", padding: "4px 12px", cursor: "pointer", fontSize: "12px" }}
          >
            ⚙️ 설정
          </button>
          <button
            onClick={handleLogout}
            style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "none", borderRadius: "4px", padding: "4px 12px", cursor: "pointer", fontSize: "12px" }}
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* API 키 설정 패널 */}
      {showSettings && (
        <div style={{ position: "fixed", top: "40px", right: "20px", zIndex: 10000, background: "#fff", border: "1px solid #ddd", borderRadius: "8px", padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", width: "400px" }}>
          <div style={{ fontWeight: "700", marginBottom: "12px" }}>⚙️ AI 설정 (검수/JPG인식)</div>
          <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
            Anthropic API 키를 입력하세요. <br/>
            <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" style={{ color: "#1a5c3a" }}>console.anthropic.com</a>에서 발급 가능
          </div>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-ant-api..."
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", marginBottom: "12px", fontFamily: "monospace" }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={handleSaveApiKey} style={{ flex: 1, padding: "8px", background: "#1a5c3a", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "700" }}>저장</button>
            <button onClick={() => setShowSettings(false)} style={{ flex: 1, padding: "8px", background: "#eee", border: "none", borderRadius: "6px", cursor: "pointer" }}>닫기</button>
          </div>
          {!apiKey && <div style={{ fontSize: "11px", color: "#e67e22", marginTop: "8px" }}>⚠️ API 키 미설정 시 AI 검수/JPG 인식 기능을 사용할 수 없습니다.</div>}
        </div>
      )}

      {/* 빌더 (상단바 높이만큼 패딩) */}
      <div style={{ paddingTop: "40px" }}>
        <QuotationBuilder apiKey={apiKey} />
      </div>
    </div>
  );
}
