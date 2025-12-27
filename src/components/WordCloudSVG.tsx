import React, { useEffect, useState } from 'react';
import cloud from 'd3-cloud';

interface WordCloudProps {
    data: [string, number][];
    width?: number;
    height?: number;
    maxWords?: number;
    fontWeight?: number;
    fontFamily?: string;
    colors?: string[];
}

interface WordItem {
    text: string;
    size: number;
    x: number;
    y: number;
    rotate: number;
}

const WordCloudSVG: React.FC<WordCloudProps> = ({
    data,
    width = 1920,
    height = 1080,
    maxWords = 300,
    fontWeight = 500,
    fontFamily = 'Paperozi',
    colors = ['#00d4ff', '#7928ca', '#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b', '#fb5607']
}) => {
    const [words, setWords] = useState<WordItem[]>([]);

    useEffect(() => {
        const maxFreq = Math.max(...data.map(d => d[1]));
        const cloudData = data
            .slice(0, maxWords)
            .map(([text, freq]) => ({
                text,
                size: 10 + (freq / maxFreq) * 140
            }));

        const layout = cloud()
            .size([width, height])
            .words(cloudData)
            .padding(4)
            .rotate(0)
            .font(fontFamily)
            .fontSize((d) => d.size || 20)
            .on('end', (computedWords: any[]) => {
                setWords(computedWords as WordItem[]);
            });

        layout.start();
    }, [data, width, height, maxWords, fontWeight, fontFamily, colors]);

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <svg
                width={width}
                height={height}
                className="w-full h-full"
                style={{ userSelect: 'text' }}
            >
                <g transform={`translate(${width / 2}, ${height / 2})`}>
                    {words.map((word, i) => (
                        <text
                            key={`${word.text}-${i}`}
                            style={{
                                fontSize: `${word.size}px`,
                                fontFamily: fontFamily,
                                fontWeight: fontWeight,
                                fill: colors[i % colors.length],
                                cursor: 'text',
                                userSelect: 'text',
                                stroke: '#ffffff33', // 배경이 어두울 때 대비를 위한 아주 연한 외곽선
                                strokeWidth: '0.2px'
                            }}
                            textAnchor="middle"
                            transform={`translate(${word.x}, ${word.y})`}
                        >
                            {word.text}
                        </text>
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default WordCloudSVG;
