import { useState, useMemo, useEffect } from 'react'
import WordCloudSVG from './components/WordCloudSVG'
import { vibetermData } from './data/vibeterm-freq'
import splash1 from './assets/splash.png'
import splash2 from './assets/splash2.png'
import splash3 from './assets/splash3.png'
import splash4 from './assets/splash4.png'
import './App.css'

type Theme = 'sage' | 'ocean' | 'slate' | 'earth' | 'gold' | 'warm' | 'cool' | 'mono' | 'sunset' | 'forest' | 'purple' | 'gradient'
type UITheme = 'dark' | 'light' | 'gray' | 'gemini'

const THEMES = {
    sage: {
        name: { ko: '세이지', en: 'Sage' },
        colors: ['#5a7d6f', '#8fae8d', '#4a5f54', '#6b9080', '#a4c3a2', '#7fa88f'],
        bg: '#f5f7f6'
    },
    ocean: {
        name: { ko: '오션', en: 'Ocean' },
        colors: ['#4fc3f7', '#7e57c2', '#90a4ae', '#ab47bc', '#5c6bc0', '#9575cd'],
        bg: '#e3f2fd'
    },
    slate: {
        name: { ko: '슬레이트', en: 'Slate' },
        colors: ['#78909c', '#cfd8dc', '#37474f', '#90a4ae', '#000000', '#546e7a'],
        bg: '#eceff1'
    },
    earth: {
        name: { ko: '어스', en: 'Earth' },
        colors: ['#a1887f', '#d7ccc8', '#6d4c41', '#bcaaa4', '#4e342e', '#8d6e63'],
        bg: '#efebe9'
    },
    gold: {
        name: { ko: '골드', en: 'Gold' },
        colors: ['#f9d71c', '#d4a017', '#8b6914', '#4a3f35', '#c17817', '#6b4423'],
        bg: '#fffbf0'
    },
    warm: {
        name: { ko: '웜', en: 'Warm' },
        colors: ['#ff6f00', '#ff8a65', '#d84315', '#bf360c', '#ff5722', '#e64a19'],
        bg: '#fff3e0'
    },
    cool: {
        name: { ko: '쿨', en: 'Cool' },
        colors: ['#0288d1', '#4fc3f7', '#01579b', '#0277bd', '#0097a7', '#00acc1'],
        bg: '#e1f5fe'
    },
    mono: {
        name: { ko: '모노', en: 'Mono' },
        colors: ['#424242', '#757575', '#9e9e9e', '#bdbdbd', '#e0e0e0', '#000000'],
        bg: '#fafafa'
    },
    sunset: {
        name: { ko: '선셋', en: 'Sunset' },
        colors: ['#ffa726', '#ff7043', '#ef5350', '#ec407a', '#ab47bc', '#7e57c2'],
        bg: '#fff8e1'
    },
    forest: {
        name: { ko: '포레스트', en: 'Forest' },
        colors: ['#558b2f', '#689f38', '#7cb342', '#8bc34a', '#9ccc65', '#aed581'],
        bg: '#f1f8e9'
    },
    purple: {
        name: { ko: '퍼플', en: 'Purple' },
        colors: ['#6a1b9a', '#8e24aa', '#ab47bc', '#ba68c8', '#ce93d8', '#e1bee7'],
        bg: '#f3e5f5'
    },
    gradient: {
        name: { ko: '그라디언트', en: 'Gradient' },
        colors: ['#00d4ff', '#7928ca', '#ff006e', '#8338ec', '#3a86ff', '#06ffa5'],
        bg: '#ffffff'
    }
}

const TRANSLATIONS = {
    ko: {
        appName: 'J워드클라우드',
        premium: 'Premium WordCloud Engine',
        hidePanel: '제어박스 숨기기',
        showPanel: '제어박스 보이기',
        langToggle: 'Language (KOR/ENG)',
        uploadTitle: '텍스트 파일 업로드',
        selectFile: 'TXT 파일 선택',
        changeFile: '다른 파일 선택',
        reset: '초기화',
        statsTitle: '통계',
        totalWords: '전체 단어 수',
        totalFreq: '총 빈도',
        top10Title: 'TOP 10 단어',
        more: '더보기 ▼',
        less: '접기 ▲',
        themeTitle: '색상 테마',
        invert: '반전',
        fontTitle: '폰트 설정',
        selectFont: '폰트 선택',
        weight: '폰트 굵기',
        tech: '기술 스택',
        dev: '개발자',
        ver: '버전',
        info: '정보',
        dark: '다크 테마',
        light: '라이트 테마',
        gray: '그레이 테마',
        gemini: '제미나이 테마'
    },
    en: {
        appName: 'JWordCloud',
        premium: 'Premium WordCloud Engine',
        hidePanel: 'Hide Control Panel',
        showPanel: 'Show Control Panel',
        langToggle: '언어 전환 (KOR/ENG)',
        uploadTitle: 'Text File Upload',
        selectFile: 'Select TXT File',
        changeFile: 'Choose Another File',
        reset: 'Reset',
        statsTitle: 'Statistics',
        totalWords: 'Total Words',
        totalFreq: 'Total Frequency',
        top10Title: 'Top 10 Word',
        more: 'More ▼',
        less: 'Less ▲',
        themeTitle: 'Color Theme',
        invert: 'Invert',
        fontTitle: 'Font Settings',
        selectFont: 'Select Font',
        weight: 'Font Weight',
        tech: 'Tech Stack',
        dev: 'Developer',
        ver: 'Version',
        info: 'Info',
        dark: 'Dark',
        light: 'Light',
        gray: 'Gray',
        gemini: 'Gemini'
    }
}

function App() {
    const [fontWeight, setFontWeight] = useState(700)
    const [theme, setTheme] = useState<Theme>('gradient')
    const [fontFamily, setFontFamily] = useState<'Paperozi' | 'Escoredream'>('Paperozi')
    const [showAllTop10, setShowAllTop10] = useState(false)
    const [uiTheme, setUITheme] = useState<UITheme>('dark')
    const [showSplash, setShowSplash] = useState(false)
    const [uploadedData, setUploadedData] = useState<[string, number][] | null>(null)
    const [showControlPanel, setShowControlPanel] = useState(true)
    const [isInverted, setIsInverted] = useState(false)
    const [lang, setLang] = useState<'ko' | 'en'>('ko')
    const [countdown, setCountdown] = useState<number | null>(null)
    const [showScrollContent, setShowScrollContent] = useState(false)

    const t = TRANSLATIONS[lang]

    // 테마별 스플래시 이미지 선택
    const currentSplashImage = useMemo(() => {
        switch (uiTheme) {
            case 'dark': return splash1
            case 'light': return splash2
            case 'gray': return splash3
            case 'gemini': return splash4
            default: return splash1
        }
    }, [uiTheme])

    // 스플래시 카운트다운 및 스크롤 시퀀스 로직
    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        let initialTimeout: ReturnType<typeof setTimeout>;

        if (showSplash) {
            setCountdown(null)
            setShowScrollContent(false)

            initialTimeout = setTimeout(() => {
                setCountdown(3)
                timer = setInterval(() => {
                    setCountdown(prev => {
                        if (prev === 1) {
                            clearInterval(timer)
                            setShowScrollContent(true) // 카운트다운 종료 후 즉시 스크롤 시작
                            return null
                        }
                        return prev ? prev - 1 : null
                    })
                }, 1000)
            }, 1000)
        } else {
            // showSplash가 false가 되면 카운트다운과 스크롤 상태를 초기화
            setCountdown(null);
            setShowScrollContent(false);
        }

        return () => {
            if (timer) clearInterval(timer)
            if (initialTimeout) clearTimeout(initialTimeout)
        }
    }, [showSplash])

    // 파일 업로드 핸들러
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            const text = e.target?.result as string
            if (!text) return

            // 영문 비율 체크 (영문 위주인 경우 700으로 자동 설정)
            const englishMatch = text.match(/[a-zA-Z]/g) || []
            const koreanMatch = text.match(/[가-힣]/g) || []
            if (englishMatch.length > koreanMatch.length) {
                setFontWeight(700)
            }

            // 텍스트 분석
            const words = text.match(/[가-힣a-zA-Z]+/g) || []
            const freq: { [key: string]: number } = {}

            // 불용어 제거 (한글 및 영문)
            const stopWords = new Set([
                '정의', '용도', '참고', '의', '에', '을', '를', '이', '가', '은', '는', '과', '와', '도', '로', '으로', '에서', '하다', '되다', '있다', '없다', '것', '수', '등', '및',
                '있습니다', '합니다', '하는', '할', '이미', '대한', '대해', '위해', '통해', '가지', '관련', '내용', '통해', '경우', '대한',
                'the', 'and', 'a', 'an', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'as', 'it', 'its', 'they', 'them', 'their', 'this', 'that', 'there', 'these', 'those'
            ])

            words.forEach(word => {
                const lowerWord = word.toLowerCase()
                if (word.length > 1 && !stopWords.has(lowerWord) && !stopWords.has(word)) {
                    freq[word] = (freq[word] || 0) + 1
                }
            })

            // 빈도순 정렬
            const sorted = Object.entries(freq)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 300) as [string, number][]

            setUploadedData(sorted)
        }

        reader.readAsText(file, 'UTF-8')
    }

    // 사용할 데이터 결정
    const currentData = uploadedData || vibetermData

    // 통계 계산
    const stats = useMemo(() => {
        const totalWords = currentData.length
        const totalFreq = currentData.reduce((sum, [, freq]) => sum + freq, 0)
        const top10 = currentData.slice(0, 10).map(([word, freq]) => ({
            word,
            freq,
            percentage: ((freq / totalFreq) * 100).toFixed(1)
        }))

        return { totalWords, totalFreq, top10 }
    }, [currentData])

    return (
        <div className={`app-container ${uiTheme}`} style={{ background: isInverted ? '#111827' : THEMES[theme].bg }}>
            {/* Header */}
            <div className="header">
                <h1>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                    </svg>
                    {t.appName}
                </h1>

                <div className="theme-toggle">
                    {/* Control Panel Toggle */}
                    <button
                        className={`theme-toggle-btn control-toggle-btn ${showControlPanel ? 'active' : ''}`}
                        onClick={() => setShowControlPanel(!showControlPanel)}
                        title={showControlPanel ? t.hidePanel : t.showPanel}
                    >
                        {showControlPanel ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <line x1="9" y1="3" x2="9" y2="21" />
                            </svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" opacity="0.5" />
                                <line x1="9" y1="3" x2="9" y2="21" />
                            </svg>
                        )}
                    </button>

                    <span className="header-divider">|</span>

                    {/* Language Toggle */}
                    <button
                        className="theme-toggle-btn lang-toggle-btn"
                        onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
                        title={t.langToggle}
                        style={{ width: 'auto', padding: '0 8px', fontSize: '10px', fontWeight: 'bold' }}
                    >
                        {lang === 'ko' ? 'KOR' : 'ENG'}
                    </button>

                    <span className="header-divider">|</span>
                    <button
                        className={`theme-toggle-btn ${uiTheme === 'dark' ? 'active' : ''}`}
                        onClick={() => setUITheme('dark')}
                        title={t.dark}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    </button>
                    <button
                        className={`theme-toggle-btn ${uiTheme === 'light' ? 'active' : ''}`}
                        onClick={() => setUITheme('light')}
                        title={t.light}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                        </svg>
                    </button>
                    <button
                        className={`theme-toggle-btn ${uiTheme === 'gray' ? 'active' : ''}`}
                        onClick={() => setUITheme('gray')}
                        title={t.gray}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                    </button>
                    <button
                        className={`theme-toggle-btn ${uiTheme === 'gemini' ? 'active' : ''}`}
                        onClick={() => setUITheme('gemini')}
                        title={t.gemini}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Control Panel */}
            <div className={`info-panel ${showControlPanel ? '' : 'hidden'}`}>
                {/* Info Icon */}
                <button className="info-icon-btn" onClick={() => setShowSplash(true)} title={t.info}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 13s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                </button>

                {/* File Upload */}
                <h3>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    {t.uploadTitle}
                </h3>

                <div className="control-group">
                    <label htmlFor="file-upload" className="file-upload-label">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                        {uploadedData ? t.changeFile : t.selectFile}
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".txt"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                    />
                    {uploadedData && (
                        <button className="reset-btn" onClick={() => setUploadedData(null)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="1 4 1 10 7 10" />
                                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                            </svg>
                            {t.reset}
                        </button>
                    )}
                </div>

                <div className="divider" />

                {/* Statistics */}
                <h3>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
                        <path d="M3 3v18h18" />
                        <path d="m19 9-5 5-4-4-3 3" />
                    </svg>
                    {t.statsTitle}
                </h3>

                <div className="stat">
                    <span className="label">{t.totalWords}</span>
                    <span className="value">{stats.totalWords}</span>
                </div>
                <div className="stat">
                    <span className="label">{t.totalFreq}</span>
                    <span className="value">{stats.totalFreq}</span>
                </div>

                <div className="divider"></div>

                {/* Top 10 Words */}
                <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
                            <path d="M16 6l2 2 4-4" />
                            <path d="M22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7" />
                        </svg>
                        {t.top10Title}
                    </span>
                    {stats.top10.length > 3 && (
                        <button
                            className="expand-btn-inline"
                            onClick={() => setShowAllTop10(!showAllTop10)}
                        >
                            {showAllTop10 ? t.less : t.more}
                        </button>
                    )}
                </h3>

                <div className="top-words">
                    {stats.top10.slice(0, showAllTop10 ? 10 : 3).map((item, index) => (
                        <div key={item.word} className="word-item">
                            <span className="rank">#{index + 1}</span>
                            <span className="word">{item.word}</span>
                            <span className="count">{item.freq}</span>
                            <span className="percentage">({item.percentage}%)</span>
                        </div>
                    ))}
                </div>

                <div className="divider"></div>

                {/* Theme Selection */}
                <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2a7 7 0 1 0 10 10" />
                        </svg>
                        {t.themeTitle}
                    </span>
                    <label className="invert-toggle" title={t.invert}>
                        <input
                            type="checkbox"
                            checked={isInverted}
                            onChange={(e) => setIsInverted(e.target.checked)}
                        />
                        <span className="invert-label">{t.invert}</span>
                    </label>
                </h3>

                <div className="theme-grid-compact">
                    {(Object.keys(THEMES) as Theme[]).map((t_key) => (
                        <button
                            key={t_key}
                            className={`theme-btn-compact ${theme === t_key ? 'active' : ''}`}
                            onClick={() => setTheme(t_key)}
                            title={THEMES[t_key].name[lang]}
                        >
                            <div className="theme-preview-compact">
                                {THEMES[t_key].colors.slice(0, 3).map((color, i) => (
                                    <div key={i} style={{ background: color }} />
                                ))}
                            </div>
                        </button>
                    ))}
                </div>

                <div className="divider"></div>

                {/* Font Settings */}
                <h3>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
                        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    {t.fontTitle}
                </h3>

                <div className="control-group">
                    <label>{t.selectFont}</label>
                    <div className="theme-grid">
                        <button
                            className={`theme-btn ${fontFamily === 'Paperozi' ? 'active' : ''}`}
                            onClick={() => setFontFamily('Paperozi')}
                        >
                            <span>Paperozi</span>
                        </button>
                        <button
                            className={`theme-btn ${fontFamily === 'Escoredream' ? 'active' : ''}`}
                            onClick={() => setFontFamily('Escoredream')}
                        >
                            <span>Escoredream</span>
                        </button>
                    </div>
                </div>

                <div className="control-group">
                    <label>{t.weight}</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="100"
                            max="900"
                            step="100"
                            value={fontWeight}
                            onChange={(e) => setFontWeight(parseInt(e.target.value))}
                        />
                        <div className="slider-ticks">
                            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((tick) => (
                                <div key={tick} className="tick" />
                            ))}
                        </div>
                    </div>
                    <div className="value-display">{fontWeight}</div>
                </div>
            </div>

            {/* WordCloud */}
            <WordCloudSVG
                key={`${theme}-${fontWeight}-${fontFamily}-${uploadedData ? 'uploaded' : 'default'}-${isInverted}`}
                data={currentData as [string, number][]}
                maxWords={300}
                fontWeight={fontWeight}
                fontFamily={fontFamily}
                colors={(isInverted ? [...THEMES[theme].colors].reverse() : THEMES[theme].colors).map(c => {
                    if (!isInverted) return c;
                    // 어두운 배경에서 안 보이는 색상들 보정
                    const darkColors: { [key: string]: string } = {
                        '#000000': '#e0e0e0',
                        '#37474f': '#90a4ae',
                        '#4e342e': '#bcaaa4',
                        '#4a3f35': '#d4a017',
                        '#bf360c': '#ff8a65',
                        '#546e7a': '#cfd8dc',
                        '#4a5f54': '#a4c3a2',
                        '#6d4c41': '#a1887f',
                        '#8b6914': '#f9d71c',
                        '#424242': '#bdbdbd'
                    };
                    return darkColors[c.toLowerCase()] || c;
                })}
                width={typeof window !== 'undefined' ? window.innerWidth : 1920}
                height={typeof window !== 'undefined' ? window.innerHeight : 1080}
            />

            {/* Splash Modal */}
            {showSplash && (
                <div className="modal-overlay" onClick={() => setShowSplash(false)}>
                    <div className="modal-content-splash" onClick={(e) => e.stopPropagation()} style={{ backgroundImage: `url(${currentSplashImage})` }}>
                        <button className="modal-close-splash" onClick={() => setShowSplash(false)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Top Section - Title */}
                        <div className="splash-top">
                            <h2 className="splash-title-combined">
                                {t.appName} <span className="splash-engine">{t.premium}</span>
                            </h2>
                        </div>

                        {/* Countdown Overlay - Moved outside splash-center for true centering */}
                        {countdown !== null && (
                            <div className="splash-countdown">{countdown}</div>
                        )}

                        {/* Center Section - Features Only */}
                        <div className="splash-center">

                            {showScrollContent && (
                                <div className="splash-features-container">
                                    <div className="splash-features-scroll">
                                        <div className="feature-group">
                                            <h4>Core Engine (핵심 엔진)</h4>
                                            <p><strong>스마트 텍스트 분석:</strong> 한글/영어 텍스트 분석 및 단어별 빈도수 자동 추출</p>
                                            <p><strong>지능형 불용어 제거:</strong> '입니다', 'the' 등 무의미한 기능어 정교 필터링</p>
                                            <p><strong>실시간 시각화:</strong> d3-cloud 기반 SVG 렌더링으로 수백 개 단어 배치</p>
                                            <p><strong>언어 자동 감지:</strong> 텍스트 언어 비율 분석 및 최적 폰트 설정 자동화</p>
                                        </div>

                                        <div className="feature-group">
                                            <h4>Customization (사용자 설정)</h4>
                                            <p><strong>12가지 색상 테마:</strong> 세이지, 오션, 선셋 등 감각적인 컬러 팔레트 제공</p>
                                            <p><strong>색상 반전 모드:</strong> 배경 어둡게 전환 및 컬러 대비 자동 보정</p>
                                            <p><strong>폰트 및 굵기 설정:</strong> 폰트 선택 및 세밀한 굵기(100~900) 조정 가능</p>
                                            <p><strong>데이터 제어:</strong> TXT 파일 업로드 및 실시간 데이터 초기화 지원</p>
                                        </div>

                                        <div className="feature-group">
                                            <h4>User Interface (사용자 인터페이스)</h4>
                                            <p><strong>4가지 UI 테마:</strong> Dark, Light, Gray, Gemini(그라디언트) 모드 지원</p>
                                            <p><strong>다국어 지원:</strong> KOR/ENG 모든 UI 텍스트 및 툴팁 완벽 지원</p>
                                            <p><strong>컴팩트 제어박스:</strong> 화면 우측 상주, 토글 버튼으로 노출/숨김 가능</p>
                                            <p><strong>통계 시스템:</strong> 전체 단어 수, 총 빈도, TOP 10 순위 실시간 표시</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bottom Section - Info */}
                        <div className="splash-bottom">
                            <div className="splash-info-single">
                                <div className="splash-badges">
                                    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19" />
                                    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5" />
                                    <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite 6" />
                                    <img src="https://img.shields.io/badge/D3.js-cloud-F9A03C?logo=d3.js&logoColor=white" alt="D3.js" />
                                </div>
                                <span className="splash-divider">|</span>
                                <span className="splash-info-text">{t.dev} <strong>Jinho Jung</strong></span>
                                <span className="splash-divider">|</span>
                                <span className="splash-info-text">{t.ver} <strong>2026.1</strong></span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
