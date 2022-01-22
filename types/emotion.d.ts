import '@emotion/react'

declare module '@emotion/react' {
    export interface Theme extends DefaultTheme {
        colors: { brand: string, accent: string, success: string, error: string, warning: string, ui: { bright: string, light: string, whisper: string }, code: string, gray: { dark: string, copy: string, calm: string }, white: string, black: string }
        fonts: {
            sansSerif: string;
            serif: string;
            monospace: string;
        },
        breakpoints: {
            xs: number;
            sm: number;
            md: number;
            lg: number;
            xl: number;
        },
        widths: {
            md: number;
            lg: number;
            xl: number;
        }
        dimensions: {
            fontSize: {
                small: number;
                regular: number;
                large: number;
            },
            headingSizes: {
                h1: number;
                h2: number;
                h3: number;
                h4: number;
            },
            lineHeight: {
                small: number;
                regular: number;
                large: number;
            },
            containerPadding: number,
            borderRadii: {
                small: number;
                regular: number;
                large: number;
            },
        }
        heights: {
            header: number;
        }
        mq: () => ({
            [key: string]: {
                [key: string]: string | number;
            };
        })[]
    }
}

// You are also able to use a 3rd party theme this way:
import '@emotion/react'
import {LibTheme} from 'some-lib'

declare module '@emotion/react' {
    export interface Theme extends LibTheme {
    }
}