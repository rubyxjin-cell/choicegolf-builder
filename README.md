# 초이스골프 견적 프로그램 - 배포 가이드

## 📋 구성 요소
- 견적서 / 확정서 / 인보이스 / 국내골프 탭
- AI 검수 기능 (Anthropic API 사용)
- JPG 업로드 → 확정서 자동 생성
- 비밀번호 로그인

---

## 🚀 방법 1: 로컬 실행 (회사 PC에서만 사용)

### 1단계: Node.js 설치
1. https://nodejs.org 접속
2. **LTS 버전** 다운로드 및 설치 (Next 계속 클릭)
3. 설치 확인: 명령 프롬프트(CMD)에서 `node --version` 입력

### 2단계: 프로그램 실행
1. 이 폴더를 PC의 원하는 위치에 압축 해제
2. 명령 프롬프트(CMD) 열기
3. 폴더로 이동:
   ```
   cd C:\Users\사용자\Desktop\choicegolf-app
   ```
4. 패키지 설치 (최초 1회만):
   ```
   npm install
   ```
5. 실행:
   ```
   npm run dev
   ```
6. 브라우저에서 http://localhost:3000 접속

### 비밀번호
- 기본 비밀번호: `choice2026`
- 변경하려면 `src/App.jsx` 파일의 `ACCESS_PASSWORD` 수정

### AI 기능 설정
1. https://console.anthropic.com 가입
2. API Keys 메뉴에서 키 생성
3. 프로그램 상단 ⚙️설정 → API 키 입력

---

## 🌐 방법 2: Vercel 배포 (어디서든 접속)

### 1단계: GitHub 가입 & 저장소 생성
1. https://github.com 가입
2. 새 저장소(Repository) 생성: `choicegolf-builder`
3. 이 폴더의 모든 파일을 저장소에 업로드

### 2단계: Vercel 배포
1. https://vercel.com 가입 (GitHub 계정으로)
2. "New Project" 클릭
3. GitHub의 `choicegolf-builder` 저장소 선택
4. "Deploy" 클릭
5. 자동으로 `https://choicegolf-builder.vercel.app` 같은 주소 생성

### 2-1단계: 커스텀 도메인 (선택사항)
- Vercel 대시보드 → Settings → Domains에서 원하는 도메인 연결 가능

---

## ⚠️ 주의사항
- AI 기능(검수, JPG인식)은 Anthropic API 키 필요 (유료, 건당 약 30~60원)
- 비밀번호는 클라이언트 측 보호입니다 (가벼운 보안용)
- 작성한 견적서는 각자 브라우저의 localStorage에 저장됩니다
- 브라우저 데이터 삭제 시 백업 데이터도 삭제되므로 정기적으로 백업/복원 기능 사용 권장

---

## 📁 파일 구조
```
choicegolf-app/
├── index.html          # HTML 진입점
├── package.json        # 패키지 설정
├── vite.config.js      # Vite 빌드 설정
├── README.md           # 이 파일
└── src/
    ├── main.jsx        # React 진입점
    ├── App.jsx         # 로그인 + 설정 래퍼
    └── QuotationBuilder.jsx  # 메인 견적 프로그램
```

## 🔄 업데이트 방법
1. Claude에게 수정 요청
2. 수정된 `QuotationBuilder.jsx` 파일을 받아서 `src/` 폴더에 교체
3. 로컬: 자동 반영 (npm run dev 상태에서)
4. Vercel: GitHub에 push하면 자동 재배포
