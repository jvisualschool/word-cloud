# ☁️ J워드클라우드 (JWordCloud) 
### **Premium WordCloud Engine**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![D3](https://img.shields.io/badge/D3.js-cloud-F9A03C?logo=d3.js&logoColor=white)](https://d3js.org/)

**J워드클라우드**는 사용자의 텍스트를 분석하여 아름답고 직관적인 워드클라우드를 생성해주는 웹 애플리케이션입니다. 단순한 시각화를 넘어, 실시간 통계 분석과 프리미엄 디자인 옵션을 제공합니다.

---

## 🚀 주요 기능 (Key Features)

### 📊 스마트 텍스트 분석
- **사용자 파일 업로드**: `.txt` 파일을 직접 업로드하여 자신만의 데이터를 시각화할 수 있습니다.
- **실시간 통계**: 전체 단어 수, 총 빈도수, 상위 10개 단어 점유율 등을 즉시 계산하여 보여줍니다.
- **불용어 필터링**: 의미 없는 조사, 접속사(한글/영문)를 자동으로 제거하여 핵심 키워드만 추출합니다.

### 🎨 프리미엄 커스터마이징
- **12가지 색상 테마**: 전문가가 엄선한 12가지 컬러 팔레트를 제공합니다.
- **색상 반전 기능**: 클릭 한 번으로 색상 배치를 반전시켜 새로운 느낌을 연출합니다.
- **폰트 최적화**: Escoredream, Paperozi 등 가독성 높은 폰트와 100~900 단계의 정교한 굵기 조절이 가능합니다.
- **언어별 자동 최적화**: 업로드된 텍스트의 언어를 감지하여 영문 위주(Bold 700) 등의 최적 세팅을 자동으로 적용합니다.

### ✨ 몰입감 있는 UX
- **4가지 UI 테마**: Dark, Light, Gray, Gemini 모드를 지원하여 작업 환경에 맞는 눈의 편안함을 제공합니다.
- **테마별 스플래시 화면**: 각 테마에 어울리는 감각적인 초기 화면을 제공합니다.
- **제어박스 토글**: 대화형 제어박스를 자유롭게 숨기거나 보여주며 워드클라우드 결과물에 집중할 수 있습니다.

---

## 🛠 기술 스택 (Tech Stack)

- **Frontend**: React 19, TypeScript
- **Bundler**: Vite
- **Visualization**: d3-cloud
- **Animation**: Framer Motion
- **Styling**: Vanilla CSS (Premium Design System)
- **Deployment**: AWS Lightsail (Apache htdocs)

---

## 🏃 시작하기 (Getting Started)

### 로컬 개발 환경 실행
```bash
# 저장소 복제
git clone <repository-url>

# 프로젝트 디렉토리 이동
cd wordcloud-app

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 빌드 및 배포
```bash
# 프로덕션 빌드
npm run build

# 서버 배포 (deploy.sh 스크립트 활용)
./deploy.sh
```

---

## 🌐 서비스 주소
**배포 URL**: [https://jvibeschool.org/WCLOUD/](https://jvibeschool.org/WCLOUD/)

---

## 👨‍💻 개발자 정보
- **Developer**: Jinho Jung
- **Email**: jvibeschool.com
- **Version**: 2026.1

---
© 2025-2026 JWordCloud. All rights reserved.
