 uniform sampler2D uTexture;
 uniform float uAlpha;
 uniform vec2 uOffset;
 varying vec2 vUv;

vec3 rgbSplit(sampler2D textureImage, vec2 uv, vec2 offset) {
    // Fetch the texel from the texture at the UV coordinates plus the offset for the red channel.
    vec4 texelR = texture2D(textureImage, uv + offset);
    // Fetch the texel from the texture at the UV coordinates for the green and blue channels.
    vec4 texelGB = texture2D(textureImage, uv);

    // Red channel from the offset texel, and the green and blue channels from the original texel.
    // Mix the RGB color with white based on the alpha of the original texel to handle transparency.
    return vec3(texelR.r, texelGB.g, texelGB.b);
 }

void main() {
   vec3 color = rgbSplit(uTexture,vUv,uOffset);

    // Use original texel's alpha to control the transparency.
   float alpha = texture2D(uTexture, vUv).a * uAlpha; // Apply global alpha uniformly

   gl_FragColor = vec4(color,alpha);
 }