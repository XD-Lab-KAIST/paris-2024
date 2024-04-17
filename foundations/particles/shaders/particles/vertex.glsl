uniform vec2 uResolution;
uniform float uSize;
uniform float uTime;
uniform sampler2D uParticlesTexture;

attribute vec2 aParticlesUv;
attribute vec3 aColor;
attribute float aSize;

varying vec3 vColor;
varying float vOpacity;

void main()
{
    vec4 particle = texture(uParticlesTexture, aParticlesUv);

    // Final position
    vec4 modelPosition = modelMatrix * vec4(particle.xyz, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    float sizeIn = smoothstep(0.0, 0.1, particle.a);
    float sizeOut = 1.0 - smoothstep(0.7, 1.0, particle.a);
    float size = min(sizeIn, sizeOut);

    // Point size
    gl_PointSize = size * aSize * uSize * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);


    //Time adjustment
    float timeAdjuster = min(uTime, 10.0) * 0.1;


    gl_PointSize *= (0.5 * timeAdjuster);
    vColor = vec3(aColor * (0.6) + 0.3 * cos(uTime * 1.0 + particle.x) * timeAdjuster);
    vColor = vec3(aColor * 0.3 * timeAdjuster);

    // vColor = vec3(aColor.r + cos((uTime + particle.x * 1.7 + particle.z + 0.7) * 1.1), aColor.gb);
    // vColor = vec3(aColor * (0.3));

    vOpacity = 0.4;
}