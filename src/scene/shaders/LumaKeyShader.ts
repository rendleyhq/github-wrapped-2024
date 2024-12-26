export const LUMA_KEY_SHADER = `
precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

// Set a threshold to determine what is considered "black"
const float threshold = 0.4; // Adjust this value to control the black detection sensitivity
const float smoothing = 0.05; // Smooth transition

void main() {
    // Sample the current pixel color from the video texture
    vec4 color = texture2D(uSampler, vTextureCoord);

    // Calculate the luminance of the pixel using standard weights
    float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    // If the luminance is below the threshold, make the pixel transparent
    float alpha = smoothstep(threshold - smoothing, threshold + smoothing, luminance);

    // Output the final color with modified alpha
    vec4 outputColor = vec4(color.rgb, color.a * alpha);

    outputColor.rgb *= outputColor.a; // Premultiply alpha

    gl_FragColor = outputColor;
}
`;
