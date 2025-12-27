import React, { useEffect, useRef } from 'react';
import cloud from 'd3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeTableau10 } from 'd3-scale-chromatic';

interface WordCloudProps {
    text?: string;
    data?: [string, number][];
    width?: number;
    height?: number;
    maxWords?: number;
    fontFamily?: string;
}

const WordCloudCanvas: React.FC<WordCloudProps> = ({
    text = '',
    data: preProcessedData,
    width = 800,
    height = 600,
    maxWords = 300,
    fontFamily = 'Impact',
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        let cloudData: { text: string; size: number }[] = [];

        if (preProcessedData && preProcessedData.length > 0) {
            // Use pre-processed frequency data
            const maxFreq = Math.max(...preProcessedData.map(d => d[1]));
            cloudData = preProcessedData
                .slice(0, maxWords)
                .map(([text, freq]) => ({
                    text,
                    size: 15 + (freq / maxFreq) * 85 // Proportional scaling between 15 and 100
                }));
        } else {
            // Internal simple frequency analysis
            const words = text
                .split(/[\s,.]+/)
                .filter((w) => w.length > 1)
                .reduce((acc: { [key: string]: number }, word) => {
                    acc[word] = (acc[word] || 0) + 1;
                    return acc;
                }, {});

            const maxFreq = Math.max(...Object.values(words));
            cloudData = Object.entries(words)
                .sort((a, b) => b[1] - a[1])
                .slice(0, maxWords)
                .map(([text, freq]) => ({
                    text,
                    size: 15 + (freq / maxFreq) * 85
                }));
        }

        // Theme-aware color palette
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const colors = isDark
            ? ['#00d4ff', '#7928ca', '#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b', '#fb5607']
            : ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0'];

        const layout = cloud()
            .size([width, height])
            .words(cloudData)
            .padding(5)
            .rotate(0)
            .font(fontFamily)
            .fontSize((d) => d.size || 10)
            .on('end', draw);

        layout.start();

        function draw(words: any[]) {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Clear with theme background
            const bgColor = isDark ? '#0f0f0f' : '#ffffff';
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);
            ctx.save();
            ctx.translate(width / 2, height / 2);

            words.forEach((word, i) => {
                ctx.font = `${word.size}px ${word.font}`;
                ctx.fillStyle = colors[i % colors.length];
                ctx.textAlign = 'center';
                ctx.save();
                ctx.translate(word.x, word.y);
                ctx.rotate((word.rotate * Math.PI) / 180);
                ctx.fillText(word.text, 0, 0);
                ctx.restore();
            });

            ctx.restore();
        }
    }, [text, width, height, maxWords, fontFamily, preProcessedData]);

    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="max-w-full max-h-full drop-shadow-2xl"
            />
        </div>
    );
};

export default WordCloudCanvas;
