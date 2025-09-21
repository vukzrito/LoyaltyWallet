import Svg, { G, Rect, Text } from 'react-native-svg';
import JSBarcode from 'jsbarcode';
import { View } from 'react-native';

/* Based on JsBarcode's svg.js etc. */

export interface BarcodeOptions {
    width: number;
    height: number;
    format: string; // e.g., "CODE128", "UPC", "EAN13", "auto"
    displayValue: boolean;
    fontOptions: 'bold' | 'normal' | 'italic';
    font: string; // e.g., "monospace", "sans-serif", "arial"
    text?: string; // Optional text to display instead of the value
    textAlign: 'left' | 'center' | 'right';
    textPosition: 'top' | 'bottom';
    textMargin: number;
    fontSize: number;
    background: string; // CSS color, e.g., "#ffffff"
    lineColor: string; // CSS color, e.g., "#000000"
    margin?: number;
    marginTop?: number; // Optional, overrides margin
    marginBottom?: number; // Optional, overrides margin
    marginLeft?: number; // Optional, overrides margin
    marginRight?: number; // Optional, overrides margin
    /**
     * A callback function that is triggered when the barcode's validity changes.
     * @param isValid - A boolean indicating if the generated barcode is valid.
     */
    valid?: (isValid: boolean) => void;
}

const merge = (old: any, replaceObj: any) => ({ ...old, ...replaceObj });

function getEncodingHeight(encoding: any, options: any) {
    return (
        options.height +
        (options.displayValue && encoding.text.length > 0
            ? options.fontSize + options.textMargin
            : 0) +
        options.marginTop +
        options.marginBottom
    );
}

function getBarcodePadding(textWidth: number, barcodeWidth: number, options: any) {
    if (options.displayValue && barcodeWidth < textWidth) {
        if (options.textAlign == 'center') {
            return Math.floor((textWidth - barcodeWidth) / 2);
        } else if (options.textAlign == 'left') {
            return 0;
        } else if (options.textAlign == 'right') {
            return Math.floor(textWidth - barcodeWidth);
        }
    }
    return 0;
}

function calculateEncodingAttributes(encodings: any[], barcodeOptions: any, context?: any) {
    for (let i = 0; i < encodings.length; i++) {
        var encoding = encodings[i];
        var options = merge(barcodeOptions, encoding.options);

        // Calculate the width of the encoding
        var textWidth;
        if (options.displayValue) {
            textWidth = messureText(encoding.text, options, context);
        } else {
            textWidth = 0;
        }

        var barcodeWidth = encoding.data.length * options.width;
        encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));

        encoding.height = getEncodingHeight(encoding, options);

        encoding.barcodePadding = getBarcodePadding(
            textWidth,
            barcodeWidth,
            options
        );
    }
}

function getTotalWidthOfEncodings(encodings) {
    var totalWidth = 0;
    for (let i = 0; i < encodings.length; i++) {
        totalWidth += encodings[i].width;
    }
    return totalWidth;
}

function getMaximumHeightOfEncodings(encodings: any[]) {
    var maxHeight = 0;
    for (let i = 0; i < encodings.length; i++) {
        if (encodings[i].height > maxHeight) {
            maxHeight = encodings[i].height;
        }
    }
    return maxHeight;
}

function messureText(string: string, options, context) {
    var ctx;

    if (context) {
        ctx = context;
        // } else if (typeof document !== "undefined") {
        //   ctx = document.createElement("canvas").getContext("2d");
    } else {
        // If the text cannot be messured we will return 0.
        // This will make some barcode with big text render incorrectly
        return 0;
    }
    ctx.font =
        options.fontOptions + ' ' + options.fontSize + 'px ' + options.font;

    // Calculate the width of the encoding
    var size = ctx.measureText(string).width;

    return size;
}

function Background(props: any) {
    const { width, height, color } = props;

    return (
        <Rect x={0} y={0} width={width} height={height} style={{ fill: color }} />
    );
}

function BarcodeChunk(props: any) {
    const { binary, padding, options } = props;

    // Creates the barcode out of the encoded binary
    let yFrom;
    if (options.textPosition == 'top') {
        yFrom = options.fontSize + options.textMargin;
    } else {
        yFrom = 0;
    }

    let barWidth = 0;
    let x = 0;
    let bars = [];
    for (var b = 0; b < binary.length; b++) {
        x = b * options.width + padding;

        if (binary[b] === '1') {
            barWidth++;
        } else if (barWidth > 0) {
            bars.push({
                x: x - options.width * barWidth,
                y: yFrom,
                width: options.width * barWidth,
                height: options.height,
            });
            barWidth = 0;
        }
    }

    // Last draw is needed since the barcode ends with 1
    if (barWidth > 0) {
        bars.push({
            x: x - options.width * (barWidth - 1),
            y: yFrom,
            width: options.width * barWidth,
            height: options.height,
        });
    }

    return bars.map((bar, i) => {
        return (
            <Rect key={i} x={bar.x} y={bar.y} width={bar.width} height={bar.height} />
        );
    });
}

function BarcodeText(props: { text: string, width: number, padding: number, options: any & { textMargin: number, height: number, displayValue: number } }) {
    const { text, width, padding, options } = props;

    // Draw the text if displayValue is set
    if (options.displayValue) {
        var x, y, textAnchor;

        if (options.textPosition == 'top') {
            y = options.fontSize - options.textMargin;
        } else {
            y = options.height + options.textMargin + options.fontSize;
        }

        // Draw the text in the correct X depending on the textAlign option
        if (options.textAlign == 'left' || padding > 0) {
            x = 0;
            textAnchor = 'start';
        } else if (options.textAlign == 'right') {
            x = width - 1;
            textAnchor = 'end';
        }
        // In all other cases, center the text
        else {
            x = width / 2;
            textAnchor = 'middle';
        }

        return (
            <Text
                x={x}
                y={y}
                fontFamily={options.font}
                fontSize={options.fontSize}
                fontWeight={'bold'}
                textAnchor={textAnchor}
                fill={options.lineColor}>
                {text}
            </Text>
        );
    } else {
        return null;
    }
}

export function Barcode({ value, options }: { value: string; options: Partial<BarcodeOptions> }) {
    let barcode = {} as any;

    JSBarcode(barcode, value, options);
    let encodings = barcode.encodings;

    const defaults = {
        width: 4,
        height: 130,
        // format: "auto",
        displayValue: true,
        fontOptions: 'bold',
        font: 'monospace',
        text: '',
        textAlign: 'center',
        textPosition: 'bottom',
        textMargin: 2,
        fontSize: 20,
        background: '#ffffff',
        lineColor: '#000000',
        // margin: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 16,
        marginRight: 16,
        // valid: function(){}
    };
    const mergedOptions = merge(defaults, options);

    calculateEncodingAttributes(encodings, mergedOptions);
    const totalWidth = getTotalWidthOfEncodings(encodings);
    const maxHeight = getMaximumHeightOfEncodings(encodings);
    const width =
        totalWidth + mergedOptions.marginLeft + mergedOptions.marginRight;

    let xs = [mergedOptions.marginLeft];
    encodings.forEach(e => xs.push(xs[xs.length - 1] + e.width));

    return (
        <View style={{ backgroundColor: 'white', }}>
            <Svg
                x={0}
                y={0}
                width={width}
                height={maxHeight}
                viewBox={`0 0 ${width} ${maxHeight}`}
                originX={0}
                originY={0}
            >
                {options.background && (
                    <Background
                        width={width}
                        height={maxHeight}
                        color={options.background}
                    />
                )}
                {encodings.map((encoding, i: number) => {
                    const encodingOptions = merge(options, encoding.options);

                    return (
                        <G
                            key={i}
                            x={xs[i]}
                            y={encodingOptions.marginTop}
                            fill={encodingOptions.lineColor}>
                            <BarcodeChunk
                                binary={encoding.data}
                                padding={encoding.barcodePadding}
                                options={encodingOptions}
                            />
                            <BarcodeText
                                text={encoding.text}
                                width={encoding.width}
                                padding={encoding.barcodePadding}
                                options={encodingOptions}
                            />
                        </G>
                    );
                })}
            </Svg>
        </View>
    );
}

export default Barcode;
