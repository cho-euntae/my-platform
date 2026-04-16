# 배포 가이드

## 🎯 배포 전 체크리스트

- [ ] 모든 환경 변수 설정 확인
- [ ] 프로덕션 빌드 테스트 완료
- [ ] API 엔드포인트 확인
- [ ] Socket.io 연결 테스트
- [ ] 마지막 commit 및 push

## 📱 프론트엔드 배포 (Vercel)

### 1. 프로젝트 준비

```bash
# 프로덕션 빌드 테스트
cd frontend
npm run build
npm run preview
```

### 2. Vercel 연결

1. [Vercel](https://vercel.com) 접속 및 GitHub 계정 연동
2. "New Project" 클릭
3. 저장소 선택 (word-bomb)
4. Framework Preset: **Vite** 선택
5. Root Directory: **frontend** 입력

### 3. 환경 변수 설정

Vercel Dashboard → Settings → Environment Variables

```
VITE_API_URL=https://word-bomb-api.herokuapp.com/api
VITE_SOCKET_URL=https://word-bomb-api.herokuapp.com
```

### 4. 배포

"Deploy" 클릭 → 자동 배포 시작

**배포 완료**: `https://word-bomb.vercel.app` 같은 URL 생성

---

## 🚀 백엔드 배포

### 옵션 1: Railway

#### 준비
```bash
# 프로덕션용 .env 생성
cd backend
echo "PORT=3001
FRONTEND_URL=https://word-bomb.vercel.app
NODE_ENV=production" > .env.production
```

#### 배포 단계
1. [Railway](https://railway.app) 접속
2. GitHub 연동
3. "New Project" → "Deploy from GitHub repo"
4. word-bomb 저장소 선택
5. Service 이름: `word-bomb-api`
6. Root Directory: `backend`
7. Start Command: `npm start`

#### 환경 변수 설정
Railway Dashboard에서:
```
PORT=$PORT
FRONTEND_URL=https://word-bomb.vercel.app
NODE_ENV=production
```

#### 배포 완료
Railway에서 자동으로 생성된 URL 확인 (예: `https://word-bomb-api.up.railway.app`)

---

### 옵션 2: Fly.io

#### 준비
1. [Fly.io](https://fly.io) 가입
2. CLI 설치: `npm install -g flyctl`

```bash
cd backend

# Fly.io 앱 초기화
flyctl launch

# 앱 이름: word-bomb-api
# 리전: 선택 (서울: icn)
```

#### fly.toml 수정
```toml
[env]
  FRONTEND_URL = "https://word-bomb.vercel.app"
  NODE_ENV = "production"
```

#### 배포
```bash
flyctl deploy
```

---

## 🔗 배포 후 연결

### 1. 백엔드 URL 확인
- Railway: 프로젝트 대시보드에서 URL 복사
- Fly.io: `flyctl status -a word-bomb-api` 실행

### 2. 프론트엔드 환경 변수 업데이트

Vercel Settings에서:
```
VITE_API_URL=https://word-bomb-api.up.railway.app/api
VITE_SOCKET_URL=https://word-bomb-api.up.railway.app
```

### 3. 재배포
Vercel 대시보드에서 "Redeploy" 클릭

---

## 🗄️ 데이터베이스 연결 (선택사항)

### MongoDB Atlas (클라우드)

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 회가입
2. Cluster 생성 (무료 tier)
3. Database user 생성
4. Connection string 복사

#### 백엔드 .env 추가
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/wordbomb?retryWrites=true&w=majority
```

### Redis (선택)

Railway/Fly.io에서 Redis add-on 추가 또는:
- [Redis Cloud](https://redis.com/try-free/) 사용

---

## 📊 모니터링 및 로깅

### Vercel 모니터링
- Vercel Dashboard → Analytics 탭
- 성능, 에러율 모니터링

### Railway/Fly.io 모니터링
- Redis 또는 Fly.io 대시보드에서 로그 확인
- 에러 추적

### Sentry (에러 트래킹) - 추가
```bash
npm install @sentry/node
```

**backend/server.js**:
```javascript
import * as Sentry from "@sentry/node"

Sentry.init({ dsn: process.env.SENTRY_DSN })
```

---

## 🔒 보안 체크리스트

- [ ] 환경 변수에 민감한 정보 저장 (절대 코드에 하드코딩 금지)
- [ ] CORS 설정 정확 (프론트엔드 URL 명시)
- [ ] HTTPS 강제 설정
- [ ] 요청 레이트 제한 설정
- [ ] SQL Injection 방지 (몽고디비 사용 시)
- [ ] XSS 방지 (입력 검증)

---

## 🐛 배포 문제 해결

### 1. CORS 에러
```
Access to XMLHttpRequest blocked
```

**해결**:
```javascript
// backend/server.js
const cors = require('cors')

app.use(cors({
  origin: 'https://word-bomb.vercel.app',
  credentials: true
}))
```

### 2. Socket.io 연결 실패
**확인**:
- 프론트엔드의 `VITE_SOCKET_URL` 정확성
- 백엔드 CORS 설정
- 방화벽/네트워크 설정

### 3. 느린 응답
- Railway/Fly.io 리전 확인
- 데이터베이스 쿼리 최적화
- CDN 설정 (Vercel 자동 포함)

### 4. 메모리 부족
Railway/Fly.io에서 인스턴스 업그레이드

---

## 📈 성능 최적화

### 프론트엔드
- 번들 크기 분석: `npm run build -- --report`
- 이미지 최적화
- 코드 스플리팅

### 백엔드
- API 응답 캐싱 (Redis)
- 데이터베이스 인덱싱
- 연결 풀링

---

## 🚀 CI/CD 셋업 (선택사항)

### GitHub Actions

**.github/workflows/deploy.yml**:
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Railway
        run: |
          npm i -g @railway/cli
          railway up --service word-bomb-api
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## 📞 배포 후 확인

배포 후 반드시 확인해야 할 사항:

1. **프론트엔드 접속**
   ```
   curl https://word-bomb.vercel.app
   ```

2. **API 헬스 체크**
   ```
   curl https://word-bomb-api.up.railway.app/health
   ```

3. **단어 검증 테스트**
   ```bash
   curl -X POST https://word-bomb-api.up.railway.app/api/words/validate \
     -H "Content-Type: application/json" \
     -d '{"word": "사과", "bombLetter": "과"}'
   ```

4. **Socket.io 연결 테스트** (브라우저 콘솔)
   ```javascript
   const socket = io('https://word-bomb-api.up.railway.app')
   socket.on('connect', () => console.log('연결됨'))
   ```

---

## 📝 배포 완료 체크리스트

- [ ] 프론트엔드 배포 완료 링크 확인
- [ ] 백엔드 배포 완료 링크 확인
- [ ] 환경 변수 모두 설정
- [ ] 헬스 체크 통과
- [ ] 게임 실행 테스트
- [ ] 랭킹 저장 테스트
- [ ] 멀티플레이 소켓 연결 테스트 (준비중)

---

## 🎉 축하합니다!

배포 완료! 이제 모든 사용자가 접속할 수 있습니다:

**🎮 [https://word-bomb.vercel.app](https://word-bomb.vercel.app)**

문제가 발생하면 각 플랫폼의 로그를 확인하세요!
