# GitHub Wrapped 2024

## Installation

1. Clone the repository.
2. Run `npm install`.
3. Rename the `.env.example` file to `.env` and replace its contents with your license key. You can get one for free at [app.rendley.com](https://app.rendley.com/).
4. Run `npm run dev`.

## Features

1. **Composition Rendered in the Browser**  
   The entire composition is rendered directly in the browser, eliminating the need for a server.

2. **Keyframe Animations**  
   Keyframe animations bring dynamic movement to elements within the video.

3. **4-Gradient Background with GLSL**  
   The background features four gradients that animate across the video, moving from corner to corner. This was created using a GLSL shader.

4. **Luma Key Effect**  
   A luma key shader removes the black background from the video, integrating it seamlessly into the scene.

5. **Masking**  
   A mask is applied to the programming language scene, hiding text that overlaps the region. The mask includes soft blurred corners for a natural look.

6. **Scaling and Trimming**  
   Clips are scaled and trimmed to fit the composition, ensuring synchronization with the video’s beats.

7. **Text Wrap Widths**  
   Text display is controlled with wrap widths, automatically wrapping to the next line when the maximum length is exceeded.

8. **Custom Fonts**  
   The Inter font is used to give the video a modern, clean aesthetic that enhances readability.

9. **Preloading**  
   All elements are preloaded to ensure smooth playback without delays during the video.
