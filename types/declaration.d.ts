// In your `declarations.d.ts`
declare module "three/examples/jsm/misc/GPUComputationRenderer" {
  export class GPUComputationRenderer {
    constructor(width: number, height: number, renderer: THREE.WebGLRenderer);
    // Add methods and properties as needed
  }
}

declare module "*.glsl" {
  const content: string;
  export default content;
}
