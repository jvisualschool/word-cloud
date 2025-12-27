# ☁️ J워드클라우드 (JWordCloud) 
### **Premium WordCloud Engine Powered by React & D3**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![D3](https://img.shields.io/badge/D3.js-cloud-F9A03C?logo=d3.js&logoColor=white)](https://d3js.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**J워드클라우드**는 사용자의 텍스트 데이터를 예술적인 시각화 작품으로 변환해주는 차세대 웹 애플리케이션입니다. 단순한 단어 배치를 넘어, 데이터의 가치를 발견하는 **통찰력(Insight)**과 시각적 즐거움을 주는 **미학(Aesthetics)**을 동시에 추구합니다.

---

## 💎 디자인 철학 (Design Philosophy)

> "Data is not just numbers, it's a story waiting to be told visually."

J워드클라우드는 **'몰입감 있는 데이터 경험'**을 최우선 가치로 둡니다.
- **Glassmorphism UI**: 배경이 은은하게 비치는 반투명 패널과 섬세한 블러 효과를 사용하여 현대적이고 고급스러운 느낌을 연출했습니다.
- **Micro-Interactions**: 버튼 호버, 모달 등장, 스위치 토글 등 사용자의 모든 행동에 반응하는 미세한 애니메이션을 적용하여 살아있는 애플리케이션의 느낌을 줍니다.
- **Content-First**: 불필요한 장식을 배제하고, 화려한 색채의 워드클라우드 자체가 주인공이 되도록 UI 요소를 최소화했습니다.

---

## 🚀 핵심 기능 (Key Features)

### 1. 📊 지능형 텍스트 분석 (Intelligent Analysis)
- **실시간 빈도 추출**: 수만 자의 텍스트도 0.1초 이내에 분석하여 단어 발생 빈도를 계산합니다.
- **스마트 불용어 제거**: 한국어 조사('은/는/이/가')와 영어 기능어('the/a/is') 등 의미 없는 단어를 정교한 알고리즘으로 필터링하여 핵심 키워드만 남깁니다.
- **데이터 자동 감지**: 업로드된 파일의 주 사용 언어(한글 vs 영어)를 자동으로 판단하여 시각화에 최적화된 폰트와 레이아웃을 추천합니다.

### 2. 🌍 완벽한 다국어 지원 (Multilingual Support)
- **KOR / ENG 모드**: 버튼 하나로 모든 인터페이스 텍스트(메뉴, 설명, 툴팁 등)가 한국어와 영어로 즉시 전환됩니다.
- **글로벌 호환성**: 유니코드를 완벽 지원하여 전 세계 어떤 언어의 텍스트도 깨짐 없이 시각화할 수 있습니다.

### 3. 🎬 시네마틱 스플래시 경험 (Cinematic Intro)
- **역동적인 카운트다운**: 앱 실행 시 화면 정중앙에서 펼쳐지는 3-2-1 카운트다운은 데이터 탐험의 시작을 알리는 긴장감을 줍니다.
- **부드러운 기능 소개**: 카운트다운 직후, 앱의 주요 특징들이 영화 엔딩 크레딧처럼 부드럽게 스크롤되며 사용자에게 기대감을 심어줍니다.
- **테마별 아트워크**: 선택한 UI 테마에 맞춰 시작 화면의 배경 이미지와 분위기가 함께 변화합니다.

### 4. 🎨 전문가급 커스터마이징 (Pro Customization)
- **12종 컬러 팔레트**: 자연에서 영감을 받은 'Sage', 강렬한 'Sunset', 차분한 'Ocean' 등 디자이너가 엄선한 배색 테마를 제공합니다.
- **다크/라이트 모드**: 눈이 편안한 Dark 모드부터, 깔끔한 Light, 모던한 Gray, 신비로운 Gemini 모드까지 4가지 UI 테마를 지원합니다.
- **정밀한 폰트 제어**: 
    - 폰트 종류: Escoredream(고딕), Paperozi(손글씨) 등 엄선된 서체
    - 굵기 조절: 100(Thin)부터 900(Black)까지 10단계 굵기 미세 조정

---

## 🛠 기술 스택 및 성능 최적화 (Tech Stack & Optimization)

### Frontend Core
- **React 19**: 최신 기능인 모던 Hooks와 컴포넌트 아키텍처를 적극 활용하여 유지보수성을 극대화했습니다.
- **TypeScript**: 엄격한 타입 시스템을 도입하여 런타임 오류를 사전에 방지하고 코드 안정성을 확보했습니다.
- **Vite 6**: 초고속 HMR(Hot Module Replacement)과 최적화된 번들링으로 개발 생산성을 높였습니다.

### Visualization & Interaction
- **D3-Cloud**: 효율적인 충돌 감지 알고리즘을 통해 단어들이 서로 겹치지 않으면서도 공간을 꽉 채우는 유려한 배치를 구현했습니다.
- **CSS3 Animations & Transitions**: 하드웨어 가속을 활용한 60fps 부드러운 애니메이션을 구현했습니다.

### Deployment / Ops
- **AWS Lightsail**: 안정적인 고성능 클라우드 서버 호스팅
- **Automated Deploy Script**: 원클릭 쉘 스크립트(`deploy.sh`)로 빌드부터 배포, 백업까지 전 과정을 자동화했습니다.

---

## 🏃 시작하기 (Getting Started)

### 사전 요구 사항 (Prerequisites)
- [Node.js](https://nodejs.org/) (v18.0.0 이상)
- npm 또는 yarn 패키지 매니저

### 설치 및 실행 (Installation)
1. **저장소 복제**
   ```bash
   git clone https://github.com/your-repo/wordcloud-app.git
   cd wordcloud-app
   ```

2. **패키지 설치**
   ```bash
   # 모든 의존성 패키지 설치
   npm install
   ```

3. **개발 서버 시작**
   ```bash
   # 로컬 호스트(http://localhost:5173)에서 실행
   npm run dev
   ```

4. **프로덕션 빌드**
   ```bash
   # 배포를 위한 최적화된 정적 파일 생성
   npm run build
   ```

---

## 🌐 서비스 주소
현재 AWS 서버에서 24시간 라이브 서비스 중입니다.
- **배포 URL**: [https://jvibeschool.org/WCLOUD/](https://jvibeschool.org/WCLOUD/)

---

## 🗺 향후 로드맵 (Future Roadmap)
- [ ] **소셜 공유 기능**: 생성된 워드클라우드 이미지를 SNS에 바로 공유
- [ ] **3D 워드클라우드**: Three.js를 활용한 입체적인 단어 구름 표현
- [ ] **감성 분석(Sentiment Analysis)**: 텍스트의 긍정/부정 감정을 분석하여 색상 자동 추천

---

## 👨‍💻 개발자 (Developer)
**Jinho Jung**
- **Email**: support@jvibeschool.com
- **Role**: Full Stack Developer & UI/UX Designer
- **Version**: 2026.1 (Stable)

---
© 2025-2026 **JWordCloud**. All rights reserved.
Powered by *Passion* and *Code*.
