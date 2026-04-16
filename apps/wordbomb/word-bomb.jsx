import { useState, useEffect, useRef, useCallback } from "react";

// ─── 한국어 단어 사전 (주제별) ───
const WORDS = {
  general: [
    "사과","바나나","포도","딸기","수박","참외","복숭아","자두","귤","레몬",
    "오렌지","망고","키위","체리","블루베리","라임","코코넛","파인애플","감","배",
    "학교","선생님","학생","교실","운동장","도서관","체육관","급식","과학","수학",
    "국어","영어","역사","음악","미술","시험","숙제","공부","친구","졸업",
    "컴퓨터","스마트폰","인터넷","게임","프로그램","키보드","마우스","모니터","노트북","태블릿",
    "자동차","비행기","기차","버스","지하철","택시","자전거","오토바이","배","헬리콥터",
    "사자","호랑이","코끼리","기린","원숭이","토끼","거북이","펭귄","독수리","고래",
    "돌고래","다람쥐","판다","캥거루","하마","코뿔소","얼룩말","앵무새","부엉이","두루미",
    "김치","비빔밥","불고기","떡볶이","라면","만두","삼겹살","치킨","피자","햄버거",
    "초밥","짜장면","짬뽕","탕수육","냉면","갈비","순두부","김밥","떡국","잡채",
    "서울","부산","대구","인천","광주","대전","울산","제주도","강원도","경기도",
    "바다","산","강","호수","사막","숲","계곡","폭포","동굴","화산",
    "봄","여름","가을","겨울","바람","구름","눈","비","천둥","번개",
    "태양","달","별","지구","화성","목성","토성","은하","우주","행성",
    "축구","야구","농구","배구","테니스","탁구","골프","수영","스키","마라톤",
    "음악","영화","드라마","뮤지컬","콘서트","전시회","축제","여행","캠핑","낚시",
    "의사","간호사","소방관","경찰관","군인","교사","요리사","과학자","변호사","기자",
    "대통령","장관","국회의원","판사","검사","외교관","공무원","회계사","건축가","디자이너",
    "사랑","행복","기쁨","슬픔","분노","공포","놀라움","감동","희망","용기",
    "가족","부모","형제","자매","할머니","할아버지","이모","삼촌","사촌","조카",
    "병원","약국","소방서","경찰서","우체국","은행","시장","마트","백화점","편의점",
    "책상","의자","침대","소파","냉장고","세탁기","에어컨","텔레비전","전자레인지","청소기",
    "연필","지우개","공책","가방","필통","자","풀","색연필","크레파스","도화지",
    "모자","양말","장갑","목도리","우산","안경","시계","반지","목걸이","귀걸이",
    "빵","우유","달걀","치즈","버터","잼","커피","주스","요구르트","아이스크림",
    "장미","해바라기","튤립","백합","국화","진달래","벚꽃","무궁화","라벤더","카네이션",
    "다이아몬드","루비","사파이어","에메랄드","진주","수정","자수정","오팔","토파즈","터키석",
    "로봇","드론","인공지능","가상현실","메타버스","블록체인","암호화폐","클라우드","빅데이터","사물인터넷",
    "피아노","기타","바이올린","드럼","플루트","첼로","하모니카","트럼펫","색소폰","우쿨렐레",
    "축구공","야구공","농구공","배드민턴","라켓","글러브","헬멧","운동화","유니폼","호루라기",
    "마법","용","요정","마녀","기사","공주","왕자","성","보물","모험",
    "신문","잡지","편지","일기","소설","시","수필","동화","만화","웹툰",
    "초콜릿","사탕","젤리","과자","케이크","쿠키","마카롱","도넛","와플","팝콘",
    "산소","수소","탄소","질소","헬륨","철","금","은","구리","알루미늄",
    "삼각형","사각형","원","타원","오각형","육각형","마름모","평행사변형","사다리꼴","별",
    "빨강","주황","노랑","초록","파랑","남색","보라","분홍","하양","검정",
    "거울","창문","계단","엘리베이터","지붕","벽","바닥","문","천장","베란다",
    "나무","풀","꽃","잎","열매","뿌리","줄기","씨앗","가지","이끼",
    "소금","설탕","간장","된장","고추장","식초","참기름","후추","마늘","생강",
    "원피스","청바지","티셔츠","코트","점퍼","치마","바지","조끼","넥타이","블라우스",
  ],
};

// ─── 제시 글자 (포함해야 할 글자/글자조합) ───
const BOMB_LETTERS = [
  "가","나","다","라","마","바","사","아","자","차","카","타","파","하",
  "고","노","도","로","모","보","소","오","조","포","호",
  "구","누","두","루","무","부","수","우","주","추","후",
  "기","니","디","리","미","비","시","이","지","키","피",
  "거","너","더","러","머","버","서","어","저","커","터",
  "대","래","매","배","새","재","해",
  "과","관","광","강","공","국","금","기",
  "전","정","제","조","중","진",
  "인","일","임",
  "상","생","선","설","성",
  "화","환","활",
];

// 난이도 설정
const DIFFICULTY = {
  easy:   { label: "쉬움", time: 12, minLen: 1, color: "#3FB950", lives: 5 },
  normal: { label: "보통", time: 8,  minLen: 2, color: "#58A6FF", lives: 4 },
  hard:   { label: "어려움", time: 5, minLen: 2, color: "#F85149", lives: 3 },
};

function getRandomLetter() {
  return BOMB_LETTERS[Math.floor(Math.random() * BOMB_LETTERS.length)];
}

function isValidWord(word, allWords) {
  return allWords.includes(word);
}

export default function WordBomb() {
  const [screen, setScreen] = useState("home");
  const [difficulty, setDifficulty] = useState("normal");
  const [bombLetter, setBombLetter] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [lives, setLives] = useState(4);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [usedWords, setUsedWords] = useState(new Set());
  const [feedback, setFeedback] = useState(null); // {type, message}
  const [shake, setShake] = useState(false);
  const [explosion, setExplosion] = useState(false);
  const [round, setRound] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [bombPulse, setBombPulse] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const diff = DIFFICULTY[difficulty];
  const allWords = WORDS.general;

  // 타이머
  useEffect(() => {
    if (screen !== "play") return;
    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 0.1), 100);
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, screen]);

  // 폭탄 긴급 펄스
  useEffect(() => {
    if (screen === "play" && timeLeft <= 3 && timeLeft > 0) {
      setBombPulse(true);
    } else {
      setBombPulse(false);
    }
  }, [timeLeft, screen]);

  const startGame = useCallback((diff) => {
    setDifficulty(diff);
    setLives(DIFFICULTY[diff].lives);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setUsedWords(new Set());
    setRound(0);
    setFeedback(null);
    setInput("");
    nextRound(DIFFICULTY[diff].time);
    setScreen("play");
    setTimeout(() => inputRef.current?.focus(), 200);
  }, []);

  const nextRound = (time) => {
    const letter = getRandomLetter();
    setBombLetter(letter);
    setTimeLeft(time || diff.time);
    setInput("");
    setFeedback(null);
    setRound(r => r + 1);
    setExplosion(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleTimeUp = () => {
    setExplosion(true);
    setShake(true);
    setLives(l => {
      const next = l - 1;
      if (next <= 0) {
        setTimeout(() => {
          setScreen("result");
          if (score > highScore) setHighScore(score);
        }, 800);
      } else {
        setCombo(0);
        setFeedback({ type: "fail", message: "💥 시간 초과!" });
        setTimeout(() => nextRound(), 1200);
      }
      return next;
    });
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = () => {
    const word = input.trim();
    if (!word) return;

    if (word.length < diff.minLen) {
      setFeedback({ type: "warn", message: `${diff.minLen}글자 이상 입력하세요` });
      triggerShake();
      return;
    }

    if (!word.includes(bombLetter)) {
      setFeedback({ type: "warn", message: `"${bombLetter}" 글자가 포함되어야 해요!` });
      triggerShake();
      return;
    }

    if (usedWords.has(word)) {
      setFeedback({ type: "warn", message: "이미 사용한 단어예요!" });
      triggerShake();
      return;
    }

    if (!isValidWord(word, allWords)) {
      setFeedback({ type: "warn", message: "사전에 없는 단어예요!" });
      triggerShake();
      return;
    }

    // 성공!
    const newCombo = combo + 1;
    const wordScore = word.length * 10 + (newCombo > 1 ? newCombo * 5 : 0);
    setScore(s => s + wordScore);
    setCombo(newCombo);
    setMaxCombo(m => Math.max(m, newCombo));
    setUsedWords(prev => new Set([...prev, word]));
    setFeedback({ type: "success", message: `+${wordScore}점${newCombo > 1 ? ` (${newCombo}콤보!)` : ""}` });

    setTimeout(() => nextRound(), 600);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  // ─── THEME ───
  const t = {
    bg: "#0B0E14",
    card: "#141921",
    border: "#1E2736",
    text: "#E2E8F0",
    sub: "#64748B",
    accent: "#F59E0B",
    danger: "#EF4444",
    success: "#22C55E",
    bomb: "#FF6B2C",
  };

  const baseStyle = {
    minHeight: "100vh",
    background: `radial-gradient(ellipse at 50% 0%, #1A1208 0%, ${t.bg} 50%)`,
    color: t.text,
    fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 16px",
    boxSizing: "border-box",
  };

  // ═══════════════════ HOME ═══════════════════
  if (screen === "home") {
    return (
      <div style={baseStyle}>
        <div style={{
          maxWidth: 440, width: "100%", textAlign: "center",
          opacity: animate ? 1 : 0, transform: animate ? "none" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          {/* 폭탄 아이콘 */}
          <div style={{
            fontSize: 80, marginBottom: 4,
            animation: "bombFloat 2s ease-in-out infinite",
          }}>💣</div>

          <h1 style={{
            fontSize: 36, fontWeight: 900, margin: "0 0 4px",
            background: "linear-gradient(135deg, #FF6B2C, #F59E0B, #EF4444)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
          }}>단어 폭탄</h1>
          <p style={{ color: t.sub, fontSize: 14, margin: "0 0 36px", letterSpacing: "0.5px" }}>
            제한 시간 안에 해당 글자가 포함된 단어를 입력하세요!
          </p>

          {/* 규칙 카드 */}
          <div style={{
            background: t.card, borderRadius: 16, padding: "18px 20px",
            border: `1px solid ${t.border}`, marginBottom: 28, textAlign: "left",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.accent, marginBottom: 10 }}>📖 게임 규칙</div>
            <div style={{ fontSize: 13, color: t.sub, lineHeight: 1.8 }}>
              🔤 제시된 <span style={{color: t.bomb, fontWeight: 700}}>글자가 포함된 단어</span>를 입력<br/>
              ⏱️ 시간이 다 되면 <span style={{color: t.danger, fontWeight: 700}}>HP 감소</span><br/>
              🔥 연속 정답 시 <span style={{color: t.accent, fontWeight: 700}}>콤보 보너스</span><br/>
              ❌ 같은 단어는 두 번 사용 불가
            </div>
          </div>

          {/* 난이도 선택 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {Object.entries(DIFFICULTY).map(([key, val]) => (
              <button
                key={key}
                onClick={() => startGame(key)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "16px 20px", borderRadius: 14,
                  background: t.card, border: `1.5px solid ${val.color}30`,
                  color: t.text, cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  e.target.style.borderColor = val.color;
                  e.target.style.boxShadow = `0 0 20px ${val.color}20`;
                }}
                onMouseLeave={e => {
                  e.target.style.borderColor = `${val.color}30`;
                  e.target.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: val.color, boxShadow: `0 0 8px ${val.color}60`,
                  }} />
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{val.label}</span>
                </div>
                <div style={{ fontSize: 12, color: t.sub }}>
                  ❤️ {val.lives} · ⏱️ {val.time}초
                </div>
              </button>
            ))}
          </div>

          {highScore > 0 && (
            <div style={{
              marginTop: 20, padding: "10px 16px", borderRadius: 10,
              background: "#F59E0B10", border: "1px solid #F59E0B30",
              fontSize: 13, color: t.accent, fontWeight: 600,
            }}>
              🏆 최고 기록: {highScore}점
            </div>
          )}
        </div>

        <style>{`
          @keyframes bombFloat {
            0%, 100% { transform: translateY(0) rotate(-5deg); }
            50% { transform: translateY(-12px) rotate(5deg); }
          }
        `}</style>
      </div>
    );
  }

  // ═══════════════════ PLAY ═══════════════════
  if (screen === "play") {
    const timePercent = (timeLeft / diff.time) * 100;
    const isUrgent = timeLeft <= 3;
    const timerColor = isUrgent ? t.danger : timeLeft <= 5 ? t.accent : diff.color;

    return (
      <div style={{
        ...baseStyle,
        animation: shake ? "shakeScreen 0.4s ease" : "none",
      }}>
        <div style={{ maxWidth: 440, width: "100%" }}>

          {/* 상단 바: 점수 + HP */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 20,
          }}>
            <div>
              <div style={{ fontSize: 11, color: t.sub, fontWeight: 600, marginBottom: 2 }}>SCORE</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: t.accent }}>{score}</div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {Array.from({ length: diff.lives }).map((_, i) => (
                <span key={i} style={{
                  fontSize: 22,
                  opacity: i < lives ? 1 : 0.2,
                  transition: "opacity 0.3s, transform 0.3s",
                  transform: i < lives ? "scale(1)" : "scale(0.7)",
                  filter: i < lives ? "none" : "grayscale(1)",
                }}>❤️</span>
              ))}
            </div>
          </div>

          {/* 콤보 표시 */}
          {combo > 1 && (
            <div style={{
              textAlign: "center", marginBottom: 12,
              animation: "comboPopIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}>
              <span style={{
                display: "inline-block", padding: "4px 14px", borderRadius: 20,
                background: "linear-gradient(135deg, #F59E0B20, #EF444420)",
                border: "1px solid #F59E0B40",
                fontSize: 13, fontWeight: 800, color: t.accent,
              }}>
                🔥 {combo} COMBO
              </span>
            </div>
          )}

          {/* 폭탄 + 제시 글자 */}
          <div style={{
            textAlign: "center", marginBottom: 20,
            position: "relative",
          }}>
            {/* 폭발 이펙트 */}
            {explosion && (
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 200, height: 200, borderRadius: "50%",
                background: "radial-gradient(circle, #FF6B2C60, transparent 70%)",
                animation: "explode 0.8s ease-out forwards",
                pointerEvents: "none",
              }} />
            )}

            <div style={{
              fontSize: 56,
              animation: bombPulse ? "bombPulse 0.5s ease-in-out infinite" : "bombFloat 2s ease-in-out infinite",
              filter: isUrgent ? "drop-shadow(0 0 20px #EF4444)" : "drop-shadow(0 0 10px #FF6B2C40)",
              transition: "filter 0.3s",
            }}>💣</div>

            <div style={{
              display: "inline-block", marginTop: 8,
              padding: "10px 32px", borderRadius: 16,
              background: `linear-gradient(135deg, ${t.bomb}20, ${t.accent}10)`,
              border: `2px solid ${t.bomb}60`,
              boxShadow: `0 0 30px ${t.bomb}15`,
            }}>
              <span style={{
                fontSize: 36, fontWeight: 900,
                color: t.bomb,
                textShadow: `0 0 20px ${t.bomb}40`,
              }}>{bombLetter}</span>
            </div>
          </div>

          {/* 타이머 바 */}
          <div style={{
            height: 6, borderRadius: 3,
            background: `${t.border}`,
            marginBottom: 20, overflow: "hidden",
          }}>
            <div style={{
              height: "100%", borderRadius: 3,
              background: timerColor,
              width: `${Math.max(0, timePercent)}%`,
              transition: "width 0.1s linear, background 0.3s",
              boxShadow: isUrgent ? `0 0 12px ${t.danger}` : "none",
            }} />
          </div>

          {/* 입력 필드 */}
          <div style={{
            display: "flex", gap: 8, marginBottom: 16,
          }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`"${bombLetter}" 포함 단어 입력...`}
              autoFocus
              style={{
                flex: 1, padding: "14px 18px", fontSize: 16, fontWeight: 600,
                background: t.card, color: t.text,
                border: `1.5px solid ${feedback?.type === "warn" ? t.danger : t.border}`,
                borderRadius: 14, outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = t.accent}
              onBlur={e => e.target.style.borderColor = t.border}
            />
            <button
              onClick={handleSubmit}
              style={{
                padding: "14px 20px", fontSize: 16, fontWeight: 800,
                background: `linear-gradient(135deg, ${t.bomb}, ${t.accent})`,
                color: "#fff", border: "none", borderRadius: 14, cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: `0 4px 16px ${t.bomb}30`,
              }}
            >
              입력
            </button>
          </div>

          {/* 피드백 */}
          {feedback && (
            <div style={{
              textAlign: "center", padding: "10px",
              borderRadius: 10, marginBottom: 12,
              background: feedback.type === "success" ? `${t.success}12`
                : feedback.type === "fail" ? `${t.danger}12`
                : `${t.accent}12`,
              border: `1px solid ${
                feedback.type === "success" ? `${t.success}30`
                : feedback.type === "fail" ? `${t.danger}30`
                : `${t.accent}30`
              }`,
              color: feedback.type === "success" ? t.success
                : feedback.type === "fail" ? t.danger
                : t.accent,
              fontSize: 14, fontWeight: 700,
              animation: "fadeInUp 0.3s ease",
            }}>
              {feedback.message}
            </div>
          )}

          {/* 사용한 단어 목록 */}
          {usedWords.size > 0 && (
            <div style={{
              background: t.card, borderRadius: 14, padding: "14px 16px",
              border: `1px solid ${t.border}`, marginTop: 8,
            }}>
              <div style={{ fontSize: 11, color: t.sub, fontWeight: 600, marginBottom: 8 }}>
                사용한 단어 ({usedWords.size}개)
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {[...usedWords].reverse().map((w, i) => (
                  <span key={i} style={{
                    padding: "3px 10px", borderRadius: 8,
                    background: `${t.accent}10`, border: `1px solid ${t.accent}20`,
                    fontSize: 12, color: t.sub,
                  }}>{w}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <style>{`
          @keyframes bombFloat {
            0%, 100% { transform: translateY(0) rotate(-3deg); }
            50% { transform: translateY(-8px) rotate(3deg); }
          }
          @keyframes bombPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
          }
          @keyframes shakeScreen {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-5px); }
            80% { transform: translateX(5px); }
          }
          @keyframes explode {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes comboPopIn {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  // ═══════════════════ RESULT ═══════════════════
  if (screen === "result") {
    const isNewHigh = score >= highScore && score > 0;
    return (
      <div style={baseStyle}>
        <div style={{
          maxWidth: 440, width: "100%", textAlign: "center",
          animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{ fontSize: 72, marginBottom: 8 }}>
            {isNewHigh ? "🏆" : score > 100 ? "🎉" : "💥"}
          </div>

          <h1 style={{
            fontSize: 28, fontWeight: 900, margin: "0 0 4px",
            color: isNewHigh ? t.accent : t.text,
          }}>
            {isNewHigh ? "🎊 신기록!" : "게임 오버"}
          </h1>
          <p style={{ color: t.sub, fontSize: 13, margin: "0 0 32px" }}>
            {DIFFICULTY[difficulty].label} 모드
          </p>

          {/* 스코어 */}
          <div style={{
            background: t.card, borderRadius: 20, padding: "28px 24px",
            border: `1px solid ${t.border}`, marginBottom: 24,
          }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: t.accent, marginBottom: 4 }}>
              {score}
            </div>
            <div style={{ fontSize: 13, color: t.sub, marginBottom: 20 }}>점</div>

            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
            }}>
              {[
                { label: "라운드", value: round, icon: "🎯" },
                { label: "최대 콤보", value: maxCombo, icon: "🔥" },
                { label: "사용 단어", value: usedWords.size, icon: "📝" },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: `${t.border}40`, borderRadius: 12, padding: "12px 8px",
                }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{stat.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: t.sub }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              onClick={() => startGame(difficulty)}
              style={{
                width: "100%", padding: "16px", fontSize: 16, fontWeight: 800,
                background: `linear-gradient(135deg, ${t.bomb}, ${t.accent})`,
                color: "#fff", border: "none", borderRadius: 14, cursor: "pointer",
                boxShadow: `0 4px 20px ${t.bomb}30`,
              }}
            >
              다시 도전 🔥
            </button>
            <button
              onClick={() => { setScreen("home"); setAnimate(true); }}
              style={{
                width: "100%", padding: "15px", fontSize: 15, fontWeight: 600,
                background: t.card, color: t.text,
                border: `1px solid ${t.border}`, borderRadius: 14, cursor: "pointer",
              }}
            >
              홈으로
            </button>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  return null;
}
