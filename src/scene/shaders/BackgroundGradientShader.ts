export const BACKGROUND_GRADIENT_SHADER = `
precision highp float;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float uTime;
uniform vec4 inputSize;
uniform vec2 uDimensions;

// Colors for the first set (start colors)
const vec4 color0_1 = vec4(0.459, 0.392, 0.915, 1.0); // #7664E9
const vec4 color1_1 = vec4(0.129, 0.063, 0.569, 1.0); // #211091
const vec4 color2_1 = vec4(0.322, 0.227, 0.925, 1.0); // #523AEB
const vec4 color3_1 = vec4(0.402, 0.353, 0.698, 1.0); // #665AB2

// Colors for the second set (end colors)
const vec4 color0_2 = vec4(0.988, 0.388, 0.635, 1.0); // #FC63A2
const vec4 color1_2 = vec4(0.909, 0.078, 0.419, 1.0); // #E8146B
const vec4 color2_2 = vec4(0.761, 0.251, 0.469, 1.0); // #C34078
const vec4 color3_2 = vec4(0.821, 0.471, 0.616, 1.0); // #D2779D

void main(void) {
    // Normalize UV coordinates
    vec2 uv = vTextureCoord;

    // Adjust for aspect ratio
    uv.x *= uDimensions.x / uDimensions.y;

    // Dynamic corner points based on uTime
    vec2 P0 = vec2(0.31 + 0.1 * sin(uTime), 0.30 + 0.1 * cos(uTime));
    vec2 P1 = vec2(0.70 + 0.1 * cos(uTime), 0.32 + 0.1 * sin(uTime));
    vec2 P2 = vec2(0.28 + 0.1 * sin(uTime), 0.71 + 0.1 * cos(uTime));
    vec2 P3 = vec2(0.72 + 0.1 * cos(uTime), 0.75 + 0.1 * sin(uTime));

    // Intermediate calculations for coordinates
    vec2 Q = P0 - P2;
    vec2 R = P1 - P0;
    vec2 S = R + P2 - P3;
    vec2 T = P0 - uv;

    float u, t;

    if (Q.x == 0.0 && S.x == 0.0) {
        u = -T.x / R.x;
        t = (T.y + u * R.y) / (Q.y + u * S.y);
    } else if (Q.y == 0.0 && S.y == 0.0) {
        u = -T.y / R.y;
        t = (T.x + u * R.x) / (Q.x + u * S.x);
    } else {
        float A = S.x * R.y - R.x * S.y;
        float B = S.x * T.y - T.x * S.y + Q.x * R.y - R.x * Q.y;
        float C = Q.x * T.y - T.x * Q.y;

        if (abs(A) < 0.0001) {
            u = -C / B;
        } else {
            u = (-B + sqrt(B * B - 4.0 * A * C)) / (2.0 * A);
        }

        t = (T.y + u * R.y) / (Q.y + u * S.y);
    }

    // Clamp and smooth the coordinates
    u = clamp(u, 0.0, 1.0);
    t = clamp(t, 0.0, 1.0);
    t = smoothstep(0.0, 1.0, t);
    u = smoothstep(0.0, 1.0, u);

    // Smoothly oscillate from 0 to 1 and back every 10 seconds
    float cycleTime = mod(uTime, 10.0);  // Cycle every 10 seconds
    float mixFactor = 0.5 + 0.5 * sin(2.0 * 3.14159265359 * cycleTime / 10.0); // Oscillate between 0 and 1

    // Mix colors from the first set to the second set and back
    vec4 color0 = mix(color0_1, color0_2, mixFactor);
    vec4 color1 = mix(color1_1, color1_2, mixFactor);
    vec4 color2 = mix(color2_1, color2_2, mixFactor);
    vec4 color3 = mix(color3_1, color3_2, mixFactor);

    // Calculate the gradient colors
    vec4 colorA = mix(color0, color1, u);
    vec4 colorB = mix(color2, color3, u);
    vec4 finalColor = mix(colorA, colorB, t);

    // Output the final color
    gl_FragColor = finalColor;
}
        `;
