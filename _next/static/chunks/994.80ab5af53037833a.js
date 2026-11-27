"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[994],{1323:function(e,t,i){i.d(t,{w:function(){return o}});var n=i(3428),s=i(2265),a=i(2461),r=i(9329);let o=s.forwardRef(({threshold:e=15,geometry:t,...i},o)=>{let l=s.useRef(null);s.useImperativeHandle(o,()=>l.current,[]);let u=s.useMemo(()=>[0,0,0,1,0,0],[]),c=s.useRef(),h=s.useRef();return s.useLayoutEffect(()=>{let i=l.current.parent,n=null!=t?t:null==i?void 0:i.geometry;if(!n)return;let s=c.current===n&&h.current===e;if(s)return;c.current=n,h.current=e;let r=new a.TOt(n,e).attributes.position.array;l.current.geometry.setPositions(r),l.current.geometry.attributes.instanceStart.needsUpdate=!0,l.current.geometry.attributes.instanceEnd.needsUpdate=!0,l.current.computeLineDistances()}),s.createElement(r.x,(0,n.Z)({segments:!0,points:u,ref:l,raycast:()=>null},i))})},9329:function(e,t,i){let n,s;i.d(t,{x:function(){return D}});var a=i(3428),r=i(2265),o=i(2461),l=i(5362);let u=new o.ZzF,c=new o.Pa4;class h extends o.L5s{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new o.a$l([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new o.a$l([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new o.$TI(t,6,1);return this.setAttribute("instanceStart",new o.kB5(i,3,0)),this.setAttribute("instanceEnd",new o.kB5(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let n=new o.$TI(i,2*t,1);return this.setAttribute("instanceColorStart",new o.kB5(n,t,0)),this.setAttribute("instanceColorEnd",new o.kB5(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new o.Uk6(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new o.ZzF);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),u.setFromBufferAttribute(t),this.boundingBox.union(u))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new o.aLr),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let s=0,a=e.count;s<a;s++)c.fromBufferAttribute(e,s),n=Math.max(n,i.distanceToSquared(c)),c.fromBufferAttribute(t,s),n=Math.max(n,i.distanceToSquared(c));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var d=i(6375);let p=parseInt(o.UZH.replace(/\D+/g,""));class f extends o.jyz{constructor(e){super({type:"LineMaterial",uniforms:o.rDY.clone(o.rDY.merge([d.UniformsLib.common,d.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new o.FM8(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${p>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let m=p>=125?"uv1":"uv2",v=new o.Ltg,y=new o.Pa4,b=new o.Pa4,g=new o.Ltg,w=new o.Ltg,x=new o.Ltg,E=new o.Pa4,A=new o.yGw,_=new o.Zzh,S=new o.Pa4,P=new o.ZzF,M=new o.aLr,L=new o.Ltg;function O(e,t,i){return L.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),L.multiplyScalar(1/L.w),L.x=s/i.width,L.y=s/i.height,L.applyMatrix4(e.projectionMatrixInverse),L.multiplyScalar(1/L.w),Math.abs(Math.max(L.x,L.y))}class z extends o.Kj0{constructor(e=new h,t=new f({color:16777215*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,s=0,a=t.count;e<a;e++,s+=2)y.fromBufferAttribute(t,e),b.fromBufferAttribute(i,e),n[s]=0===s?0:n[s-1],n[s+1]=n[s]+y.distanceTo(b);let s=new o.$TI(n,2,1);return e.setAttribute("instanceDistanceStart",new o.kB5(s,1,0)),e.setAttribute("instanceDistanceEnd",new o.kB5(s,1,1)),this}raycast(e,t){let i,a;let r=this.material.worldUnits,l=e.camera;null!==l||r||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let u=void 0!==e.params.Line2&&e.params.Line2.threshold||0;n=e.ray;let c=this.matrixWorld,h=this.geometry,d=this.material;if(s=d.linewidth+u,null===h.boundingSphere&&h.computeBoundingSphere(),M.copy(h.boundingSphere).applyMatrix4(c),r)i=.5*s;else{let e=Math.max(l.near,M.distanceToPoint(n.origin));i=O(l,e,d.resolution)}if(M.radius+=i,!1!==n.intersectsSphere(M)){if(null===h.boundingBox&&h.computeBoundingBox(),P.copy(h.boundingBox).applyMatrix4(c),r)a=.5*s;else{let e=Math.max(l.near,P.distanceToPoint(n.origin));a=O(l,e,d.resolution)}P.expandByScalar(a),!1!==n.intersectsBox(P)&&(r?function(e,t){let i=e.matrixWorld,a=e.geometry,r=a.attributes.instanceStart,l=a.attributes.instanceEnd,u=Math.min(a.instanceCount,r.count);for(let a=0;a<u;a++){_.start.fromBufferAttribute(r,a),_.end.fromBufferAttribute(l,a),_.applyMatrix4(i);let u=new o.Pa4,c=new o.Pa4;n.distanceSqToSegment(_.start,_.end,c,u);let h=c.distanceTo(u)<.5*s;h&&t.push({point:c,pointOnLine:u,distance:n.origin.distanceTo(c),object:e,face:null,faceIndex:a,uv:null,[m]:null})}}(this,t):function(e,t,i){let a=t.projectionMatrix,r=e.material,l=r.resolution,u=e.matrixWorld,c=e.geometry,h=c.attributes.instanceStart,d=c.attributes.instanceEnd,p=Math.min(c.instanceCount,h.count),f=-t.near;n.at(1,x),x.w=1,x.applyMatrix4(t.matrixWorldInverse),x.applyMatrix4(a),x.multiplyScalar(1/x.w),x.x*=l.x/2,x.y*=l.y/2,x.z=0,E.copy(x),A.multiplyMatrices(t.matrixWorldInverse,u);for(let t=0;t<p;t++){g.fromBufferAttribute(h,t),w.fromBufferAttribute(d,t),g.w=1,w.w=1,g.applyMatrix4(A),w.applyMatrix4(A);let r=g.z>f&&w.z>f;if(r)continue;if(g.z>f){let e=g.z-w.z,t=(g.z-f)/e;g.lerp(w,t)}else if(w.z>f){let e=w.z-g.z,t=(w.z-f)/e;w.lerp(g,t)}g.applyMatrix4(a),w.applyMatrix4(a),g.multiplyScalar(1/g.w),w.multiplyScalar(1/w.w),g.x*=l.x/2,g.y*=l.y/2,w.x*=l.x/2,w.y*=l.y/2,_.start.copy(g),_.start.z=0,_.end.copy(w),_.end.z=0;let c=_.closestPointToPointParameter(E,!0);_.at(c,S);let p=o.M8C.lerp(g.z,w.z,c),v=p>=-1&&p<=1,y=E.distanceTo(S)<.5*s;if(v&&y){_.start.fromBufferAttribute(h,t),_.end.fromBufferAttribute(d,t),_.start.applyMatrix4(u),_.end.applyMatrix4(u);let s=new o.Pa4,a=new o.Pa4;n.distanceSqToSegment(_.start,_.end,a,s),i.push({point:a,pointOnLine:s,distance:n.origin.distanceTo(a),object:e,face:null,faceIndex:t,uv:null,[m]:null})}}}(this,l,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(v),this.material.uniforms.resolution.value.set(v.z,v.w))}}class T extends h{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,n=new Float32Array(2*i);if(3===t)for(let s=0;s<i;s+=t)n[2*s]=e[s],n[2*s+1]=e[s+1],n[2*s+2]=e[s+2],n[2*s+3]=e[s+3],n[2*s+4]=e[s+4],n[2*s+5]=e[s+5];else for(let s=0;s<i;s+=t)n[2*s]=e[s],n[2*s+1]=e[s+1],n[2*s+2]=e[s+2],n[2*s+3]=e[s+3],n[2*s+4]=e[s+4],n[2*s+5]=e[s+5],n[2*s+6]=e[s+6],n[2*s+7]=e[s+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class j extends z{constructor(e=new T,t=new f({color:16777215*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let D=r.forwardRef(function({points:e,color:t=16777215,vertexColors:i,linewidth:n,lineWidth:s,segments:u,dashed:c,...d},p){var m,v;let y=(0,l.D)(e=>e.size),b=r.useMemo(()=>u?new z:new j,[u]),[g]=r.useState(()=>new f),w=(null==i||null==(m=i[0])?void 0:m.length)===4?4:3,x=r.useMemo(()=>{let n=u?new h:new T,s=e.map(e=>{let t=Array.isArray(e);return e instanceof o.Pa4||e instanceof o.Ltg?[e.x,e.y,e.z]:e instanceof o.FM8?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(n.setPositions(s.flat()),i){t=16777215;let e=i.map(e=>e instanceof o.Ilk?e.toArray():e);n.setColors(e.flat(),w)}return n},[e,u,i,w]);return r.useLayoutEffect(()=>{b.computeLineDistances()},[e,b]),r.useLayoutEffect(()=>{c?g.defines.USE_DASH="":delete g.defines.USE_DASH,g.needsUpdate=!0},[c,g]),r.useEffect(()=>()=>{x.dispose(),g.dispose()},[x]),r.createElement("primitive",(0,a.Z)({object:b,ref:p},d),r.createElement("primitive",{object:x,attach:"geometry"}),r.createElement("primitive",(0,a.Z)({object:g,attach:"material",color:t,vertexColors:!!i,resolution:[y.width,y.height],linewidth:null!==(v=null!=n?n:s)&&void 0!==v?v:1,dashed:c,transparent:4===w},d)))})},8252:function(e,t,i){i.d(t,{z:function(){return g}});var n=i(3428),s=i(5362),a=i(2265),r=i(2461),o=Object.defineProperty,l=(e,t,i)=>t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,u=(e,t,i)=>(l(e,"symbol"!=typeof t?t+"":t,i),i);class c{constructor(){u(this,"_listeners")}addEventListener(e,t){void 0===this._listeners&&(this._listeners={});let i=this._listeners;void 0===i[e]&&(i[e]=[]),-1===i[e].indexOf(t)&&i[e].push(t)}hasEventListener(e,t){if(void 0===this._listeners)return!1;let i=this._listeners;return void 0!==i[e]&&-1!==i[e].indexOf(t)}removeEventListener(e,t){if(void 0===this._listeners)return;let i=this._listeners,n=i[e];if(void 0!==n){let e=n.indexOf(t);-1!==e&&n.splice(e,1)}}dispatchEvent(e){if(void 0===this._listeners)return;let t=this._listeners,i=t[e.type];if(void 0!==i){e.target=this;let t=i.slice(0);for(let i=0,n=t.length;i<n;i++)t[i].call(this,e);e.target=null}}}var h=Object.defineProperty,d=(e,t,i)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,p=(e,t,i)=>(d(e,"symbol"!=typeof t?t+"":t,i),i);let f=new r.zHn,m=new r.JOQ,v=Math.cos(70*(Math.PI/180)),y=(e,t)=>(e%t+t)%t;class b extends c{constructor(e,t){super(),p(this,"object"),p(this,"domElement"),p(this,"enabled",!0),p(this,"target",new r.Pa4),p(this,"minDistance",0),p(this,"maxDistance",1/0),p(this,"minZoom",0),p(this,"maxZoom",1/0),p(this,"minPolarAngle",0),p(this,"maxPolarAngle",Math.PI),p(this,"minAzimuthAngle",-1/0),p(this,"maxAzimuthAngle",1/0),p(this,"enableDamping",!1),p(this,"dampingFactor",.05),p(this,"enableZoom",!0),p(this,"zoomSpeed",1),p(this,"enableRotate",!0),p(this,"rotateSpeed",1),p(this,"enablePan",!0),p(this,"panSpeed",1),p(this,"screenSpacePanning",!0),p(this,"keyPanSpeed",7),p(this,"zoomToCursor",!1),p(this,"autoRotate",!1),p(this,"autoRotateSpeed",2),p(this,"reverseOrbit",!1),p(this,"reverseHorizontalOrbit",!1),p(this,"reverseVerticalOrbit",!1),p(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),p(this,"mouseButtons",{LEFT:r.RsA.ROTATE,MIDDLE:r.RsA.DOLLY,RIGHT:r.RsA.PAN}),p(this,"touches",{ONE:r.QmN.ROTATE,TWO:r.QmN.DOLLY_PAN}),p(this,"target0"),p(this,"position0"),p(this,"zoom0"),p(this,"_domElementKeyEvents",null),p(this,"getPolarAngle"),p(this,"getAzimuthalAngle"),p(this,"setPolarAngle"),p(this,"setAzimuthalAngle"),p(this,"getDistance"),p(this,"getZoomScale"),p(this,"listenToKeyEvents"),p(this,"stopListenToKeyEvents"),p(this,"saveState"),p(this,"reset"),p(this,"update"),p(this,"connect"),p(this,"dispose"),p(this,"dollyIn"),p(this,"dollyOut"),p(this,"getScale"),p(this,"setScale"),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>c.phi,this.getAzimuthalAngle=()=>c.theta,this.setPolarAngle=e=>{let t=y(e,2*Math.PI),n=c.phi;n<0&&(n+=2*Math.PI),t<0&&(t+=2*Math.PI);let s=Math.abs(t-n);2*Math.PI-s<s&&(t<n?t+=2*Math.PI:n+=2*Math.PI),h.phi=t-n,i.update()},this.setAzimuthalAngle=e=>{let t=y(e,2*Math.PI),n=c.theta;n<0&&(n+=2*Math.PI),t<0&&(t+=2*Math.PI);let s=Math.abs(t-n);2*Math.PI-s<s&&(t<n?t+=2*Math.PI:n+=2*Math.PI),h.theta=t-n,i.update()},this.getDistance=()=>i.object.position.distanceTo(i.target),this.listenToKeyEvents=e=>{e.addEventListener("keydown",ee),this._domElementKeyEvents=e},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ee),this._domElementKeyEvents=null},this.saveState=()=>{i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=()=>{i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(n),i.update(),l=o.NONE},this.update=(()=>{let t=new r.Pa4,s=new r.Pa4(0,1,0),a=new r._fP().setFromUnitVectors(e.up,s),p=a.clone().invert(),y=new r.Pa4,g=new r._fP,w=2*Math.PI;return function(){let x=i.object.position;a.setFromUnitVectors(e.up,s),p.copy(a).invert(),t.copy(x).sub(i.target),t.applyQuaternion(a),c.setFromVector3(t),i.autoRotate&&l===o.NONE&&C(2*Math.PI/60/60*i.autoRotateSpeed),i.enableDamping?(c.theta+=h.theta*i.dampingFactor,c.phi+=h.phi*i.dampingFactor):(c.theta+=h.theta,c.phi+=h.phi);let E=i.minAzimuthAngle,A=i.maxAzimuthAngle;isFinite(E)&&isFinite(A)&&(E<-Math.PI?E+=w:E>Math.PI&&(E-=w),A<-Math.PI?A+=w:A>Math.PI&&(A-=w),E<=A?c.theta=Math.max(E,Math.min(A,c.theta)):c.theta=c.theta>(E+A)/2?Math.max(E,c.theta):Math.min(A,c.theta)),c.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,c.phi)),c.makeSafe(),!0===i.enableDamping?i.target.addScaledVector(b,i.dampingFactor):i.target.add(b),i.zoomToCursor&&z||i.object.isOrthographicCamera?c.radius=H(c.radius):c.radius=H(c.radius*d),t.setFromSpherical(c),t.applyQuaternion(p),x.copy(i.target).add(t),i.object.matrixAutoUpdate||i.object.updateMatrix(),i.object.lookAt(i.target),!0===i.enableDamping?(h.theta*=1-i.dampingFactor,h.phi*=1-i.dampingFactor,b.multiplyScalar(1-i.dampingFactor)):(h.set(0,0,0),b.set(0,0,0));let _=!1;if(i.zoomToCursor&&z){let n=null;if(i.object instanceof r.cPb&&i.object.isPerspectiveCamera){let e=t.length();n=H(e*d);let s=e-n;i.object.position.addScaledVector(L,s),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){let e=new r.Pa4(O.x,O.y,0);e.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/d)),i.object.updateProjectionMatrix(),_=!0;let s=new r.Pa4(O.x,O.y,0);s.unproject(i.object),i.object.position.sub(s).add(e),i.object.updateMatrixWorld(),n=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;null!==n&&(i.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(n).add(i.object.position):(f.origin.copy(i.object.position),f.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(f.direction))<v?e.lookAt(i.target):(m.setFromNormalAndCoplanarPoint(i.object.up,i.target),f.intersectPlane(m,i.target))))}else i.object instanceof r.iKG&&i.object.isOrthographicCamera&&(_=1!==d)&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/d)),i.object.updateProjectionMatrix());return d=1,z=!1,!!(_||y.distanceToSquared(i.object.position)>u||8*(1-g.dot(i.object.quaternion))>u)&&(i.dispatchEvent(n),y.copy(i.object.position),g.copy(i.object.quaternion),_=!1,!0)}})(),this.connect=e=>{i.domElement=e,i.domElement.style.touchAction="none",i.domElement.addEventListener("contextmenu",et),i.domElement.addEventListener("pointerdown",q),i.domElement.addEventListener("pointercancel",$),i.domElement.addEventListener("wheel",J)},this.dispose=()=>{var e,t,n,s,a,r;i.domElement&&(i.domElement.style.touchAction="auto"),null==(e=i.domElement)||e.removeEventListener("contextmenu",et),null==(t=i.domElement)||t.removeEventListener("pointerdown",q),null==(n=i.domElement)||n.removeEventListener("pointercancel",$),null==(s=i.domElement)||s.removeEventListener("wheel",J),null==(a=i.domElement)||a.ownerDocument.removeEventListener("pointermove",Q),null==(r=i.domElement)||r.ownerDocument.removeEventListener("pointerup",$),null!==i._domElementKeyEvents&&i._domElementKeyEvents.removeEventListener("keydown",ee)};let i=this,n={type:"change"},s={type:"start"},a={type:"end"},o={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},l=o.NONE,u=1e-6,c=new r.$V,h=new r.$V,d=1,b=new r.Pa4,g=new r.FM8,w=new r.FM8,x=new r.FM8,E=new r.FM8,A=new r.FM8,_=new r.FM8,S=new r.FM8,P=new r.FM8,M=new r.FM8,L=new r.Pa4,O=new r.FM8,z=!1,T=[],j={};function D(){return Math.pow(.95,i.zoomSpeed)}function C(e){i.reverseOrbit||i.reverseHorizontalOrbit?h.theta+=e:h.theta-=e}function U(e){i.reverseOrbit||i.reverseVerticalOrbit?h.phi+=e:h.phi-=e}let R=(()=>{let e=new r.Pa4;return function(t,i){e.setFromMatrixColumn(i,0),e.multiplyScalar(-t),b.add(e)}})(),k=(()=>{let e=new r.Pa4;return function(t,n){!0===i.screenSpacePanning?e.setFromMatrixColumn(n,1):(e.setFromMatrixColumn(n,0),e.crossVectors(i.object.up,e)),e.multiplyScalar(t),b.add(e)}})(),N=(()=>{let e=new r.Pa4;return function(t,n){let s=i.domElement;if(s&&i.object instanceof r.cPb&&i.object.isPerspectiveCamera){let a=i.object.position;e.copy(a).sub(i.target);let r=e.length();R(2*t*(r*=Math.tan(i.object.fov/2*Math.PI/180))/s.clientHeight,i.object.matrix),k(2*n*r/s.clientHeight,i.object.matrix)}else s&&i.object instanceof r.iKG&&i.object.isOrthographicCamera?(R(t*(i.object.right-i.object.left)/i.object.zoom/s.clientWidth,i.object.matrix),k(n*(i.object.top-i.object.bottom)/i.object.zoom/s.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}})();function I(e){i.object instanceof r.cPb&&i.object.isPerspectiveCamera||i.object instanceof r.iKG&&i.object.isOrthographicCamera?d=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function F(e){if(!i.zoomToCursor||!i.domElement)return;z=!0;let t=i.domElement.getBoundingClientRect(),n=e.clientX-t.left,s=e.clientY-t.top,a=t.width,r=t.height;O.x=n/a*2-1,O.y=-(2*(s/r))+1,L.set(O.x,O.y,1).unproject(i.object).sub(i.object.position).normalize()}function H(e){return Math.max(i.minDistance,Math.min(i.maxDistance,e))}function B(e){g.set(e.clientX,e.clientY)}function Z(e){E.set(e.clientX,e.clientY)}function V(){if(1==T.length)g.set(T[0].pageX,T[0].pageY);else{let e=.5*(T[0].pageX+T[1].pageX),t=.5*(T[0].pageY+T[1].pageY);g.set(e,t)}}function W(){if(1==T.length)E.set(T[0].pageX,T[0].pageY);else{let e=.5*(T[0].pageX+T[1].pageX),t=.5*(T[0].pageY+T[1].pageY);E.set(e,t)}}function Y(){let e=T[0].pageX-T[1].pageX,t=T[0].pageY-T[1].pageY;S.set(0,Math.sqrt(e*e+t*t))}function G(e){if(1==T.length)w.set(e.pageX,e.pageY);else{let t=en(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);w.set(i,n)}x.subVectors(w,g).multiplyScalar(i.rotateSpeed);let t=i.domElement;t&&(C(2*Math.PI*x.x/t.clientHeight),U(2*Math.PI*x.y/t.clientHeight)),g.copy(w)}function X(e){if(1==T.length)A.set(e.pageX,e.pageY);else{let t=en(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);A.set(i,n)}_.subVectors(A,E).multiplyScalar(i.panSpeed),N(_.x,_.y),E.copy(A)}function K(e){var t;let n=en(e),s=e.pageX-n.x,a=e.pageY-n.y;P.set(0,Math.sqrt(s*s+a*a)),M.set(0,Math.pow(P.y/S.y,i.zoomSpeed)),t=M.y,I(d/t),S.copy(P)}function q(e){var t,n;!1!==i.enabled&&(0===T.length&&(null==(t=i.domElement)||t.ownerDocument.addEventListener("pointermove",Q),null==(n=i.domElement)||n.ownerDocument.addEventListener("pointerup",$)),T.push(e),"touch"===e.pointerType?function(e){switch(ei(e),T.length){case 1:switch(i.touches.ONE){case r.QmN.ROTATE:if(!1===i.enableRotate)return;V(),l=o.TOUCH_ROTATE;break;case r.QmN.PAN:if(!1===i.enablePan)return;W(),l=o.TOUCH_PAN;break;default:l=o.NONE}break;case 2:switch(i.touches.TWO){case r.QmN.DOLLY_PAN:if(!1===i.enableZoom&&!1===i.enablePan)return;i.enableZoom&&Y(),i.enablePan&&W(),l=o.TOUCH_DOLLY_PAN;break;case r.QmN.DOLLY_ROTATE:if(!1===i.enableZoom&&!1===i.enableRotate)return;i.enableZoom&&Y(),i.enableRotate&&V(),l=o.TOUCH_DOLLY_ROTATE;break;default:l=o.NONE}break;default:l=o.NONE}l!==o.NONE&&i.dispatchEvent(s)}(e):function(e){let t;switch(e.button){case 0:t=i.mouseButtons.LEFT;break;case 1:t=i.mouseButtons.MIDDLE;break;case 2:t=i.mouseButtons.RIGHT;break;default:t=-1}switch(t){case r.RsA.DOLLY:if(!1===i.enableZoom)return;F(e),S.set(e.clientX,e.clientY),l=o.DOLLY;break;case r.RsA.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===i.enablePan)return;Z(e),l=o.PAN}else{if(!1===i.enableRotate)return;B(e),l=o.ROTATE}break;case r.RsA.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===i.enableRotate)return;B(e),l=o.ROTATE}else{if(!1===i.enablePan)return;Z(e),l=o.PAN}break;default:l=o.NONE}l!==o.NONE&&i.dispatchEvent(s)}(e))}function Q(e){!1!==i.enabled&&("touch"===e.pointerType?function(e){switch(ei(e),l){case o.TOUCH_ROTATE:if(!1===i.enableRotate)return;G(e),i.update();break;case o.TOUCH_PAN:if(!1===i.enablePan)return;X(e),i.update();break;case o.TOUCH_DOLLY_PAN:if(!1===i.enableZoom&&!1===i.enablePan)return;i.enableZoom&&K(e),i.enablePan&&X(e),i.update();break;case o.TOUCH_DOLLY_ROTATE:if(!1===i.enableZoom&&!1===i.enableRotate)return;i.enableZoom&&K(e),i.enableRotate&&G(e),i.update();break;default:l=o.NONE}}(e):function(e){if(!1!==i.enabled)switch(l){case o.ROTATE:if(!1===i.enableRotate)return;!function(e){w.set(e.clientX,e.clientY),x.subVectors(w,g).multiplyScalar(i.rotateSpeed);let t=i.domElement;t&&(C(2*Math.PI*x.x/t.clientHeight),U(2*Math.PI*x.y/t.clientHeight)),g.copy(w),i.update()}(e);break;case o.DOLLY:var t,n;if(!1===i.enableZoom)return;(P.set(e.clientX,e.clientY),M.subVectors(P,S),M.y>0)?(t=D(),I(d/t)):M.y<0&&(n=D(),I(d*n)),S.copy(P),i.update();break;case o.PAN:if(!1===i.enablePan)return;A.set(e.clientX,e.clientY),_.subVectors(A,E).multiplyScalar(i.panSpeed),N(_.x,_.y),E.copy(A),i.update()}}(e))}function $(e){var t,n,s;(function(e){delete j[e.pointerId];for(let t=0;t<T.length;t++)if(T[t].pointerId==e.pointerId){T.splice(t,1);return}})(e),0===T.length&&(null==(t=i.domElement)||t.releasePointerCapture(e.pointerId),null==(n=i.domElement)||n.ownerDocument.removeEventListener("pointermove",Q),null==(s=i.domElement)||s.ownerDocument.removeEventListener("pointerup",$)),i.dispatchEvent(a),l=o.NONE}function J(e){if(!1!==i.enabled&&!1!==i.enableZoom&&(l===o.NONE||l===o.ROTATE)){var t,n;e.preventDefault(),i.dispatchEvent(s),(F(e),e.deltaY<0)?(t=D(),I(d*t)):e.deltaY>0&&(n=D(),I(d/n)),i.update(),i.dispatchEvent(a)}}function ee(e){!1!==i.enabled&&!1!==i.enablePan&&function(e){let t=!1;switch(e.code){case i.keys.UP:N(0,i.keyPanSpeed),t=!0;break;case i.keys.BOTTOM:N(0,-i.keyPanSpeed),t=!0;break;case i.keys.LEFT:N(i.keyPanSpeed,0),t=!0;break;case i.keys.RIGHT:N(-i.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),i.update())}(e)}function et(e){!1!==i.enabled&&e.preventDefault()}function ei(e){let t=j[e.pointerId];void 0===t&&(t=new r.FM8,j[e.pointerId]=t),t.set(e.pageX,e.pageY)}function en(e){let t=e.pointerId===T[0].pointerId?T[1]:T[0];return j[t.pointerId]}this.dollyIn=(e=D())=>{I(d*e),i.update()},this.dollyOut=(e=D())=>{I(d/e),i.update()},this.getScale=()=>d,this.setScale=e=>{I(e),i.update()},this.getZoomScale=()=>D(),void 0!==t&&this.connect(t),this.update()}}let g=a.forwardRef(({makeDefault:e,camera:t,regress:i,domElement:r,enableDamping:o=!0,keyEvents:l=!1,onChange:u,onStart:c,onEnd:h,...d},p)=>{let f=(0,s.D)(e=>e.invalidate),m=(0,s.D)(e=>e.camera),v=(0,s.D)(e=>e.gl),y=(0,s.D)(e=>e.events),g=(0,s.D)(e=>e.setEvents),w=(0,s.D)(e=>e.set),x=(0,s.D)(e=>e.get),E=(0,s.D)(e=>e.performance),A=t||m,_=r||y.connected||v.domElement,S=a.useMemo(()=>new b(A),[A]);return(0,s.F)(()=>{S.enabled&&S.update()},-1),a.useEffect(()=>(l&&S.connect(!0===l?_:l),S.connect(_),()=>void S.dispose()),[l,_,i,S,f]),a.useEffect(()=>{let e=e=>{f(),i&&E.regress(),u&&u(e)},t=e=>{c&&c(e)},n=e=>{h&&h(e)};return S.addEventListener("change",e),S.addEventListener("start",t),S.addEventListener("end",n),()=>{S.removeEventListener("start",t),S.removeEventListener("end",n),S.removeEventListener("change",e)}},[u,c,h,S,f,g]),a.useEffect(()=>{if(e){let e=x().controls;return w({controls:S}),()=>w({controls:e})}},[e,S]),a.createElement("primitive",(0,n.Z)({ref:p,object:S,enableDamping:o},d))})},8117:function(e,t,i){i.d(t,{Q:function(){return b}});var n=i(5362),s=i(2265),a=i(2461),r=i(6375),o=Object.defineProperty,l=(e,t,i)=>t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,u=(e,t,i)=>(l(e,"symbol"!=typeof t?t+"":t,i),i);function c(e,t,i,n,s){let a;if(e=e.subarray||e.slice?e:e.buffer,i=i.subarray||i.slice?i:i.buffer,e=t?e.subarray?e.subarray(t,s&&t+s):e.slice(t,s&&t+s):e,i.set)i.set(e,n);else for(a=0;a<e.length;a++)i[a+n]=e[a];return i}class h extends a.u9r{constructor(){super(),u(this,"type","MeshLine"),u(this,"isMeshLine",!0),u(this,"positions",[]),u(this,"previous",[]),u(this,"next",[]),u(this,"side",[]),u(this,"width",[]),u(this,"indices_array",[]),u(this,"uvs",[]),u(this,"counters",[]),u(this,"widthCallback",null),u(this,"_attributes"),u(this,"_points",[]),u(this,"points"),u(this,"matrixWorld",new a.yGw),Object.defineProperties(this,{points:{enumerable:!0,get(){return this._points},set(e){this.setPoints(e,this.widthCallback)}}})}setMatrixWorld(e){this.matrixWorld=e}setPoints(e,t){var i;if(e=(i=e)instanceof Float32Array?i:i instanceof a.u9r?i.getAttribute("position").array:i.map(e=>{let t=Array.isArray(e);return e instanceof a.Pa4?[e.x,e.y,e.z]:e instanceof a.FM8?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e}).flat(),this._points=e,this.widthCallback=null!=t?t:null,this.positions=[],this.counters=[],e.length&&e[0]instanceof a.Pa4)for(let t=0;t<e.length;t++){let i=e[t],n=t/(e.length-1);this.positions.push(i.x,i.y,i.z),this.positions.push(i.x,i.y,i.z),this.counters.push(n),this.counters.push(n)}else for(let t=0;t<e.length;t+=3){let i=t/(e.length-1);this.positions.push(e[t],e[t+1],e[t+2]),this.positions.push(e[t],e[t+1],e[t+2]),this.counters.push(i),this.counters.push(i)}this.process()}compareV3(e,t){let i=6*e,n=6*t;return this.positions[i]===this.positions[n]&&this.positions[i+1]===this.positions[n+1]&&this.positions[i+2]===this.positions[n+2]}copyV3(e){let t=6*e;return[this.positions[t],this.positions[t+1],this.positions[t+2]]}process(){let e,t;let i=this.positions.length/6;this.previous=[],this.next=[],this.side=[],this.width=[],this.indices_array=[],this.uvs=[],t=this.compareV3(0,i-1)?this.copyV3(i-2):this.copyV3(0),this.previous.push(t[0],t[1],t[2]),this.previous.push(t[0],t[1],t[2]);for(let n=0;n<i;n++){if(this.side.push(1),this.side.push(-1),e=this.widthCallback?this.widthCallback(n/(i-1)):1,this.width.push(e),this.width.push(e),this.uvs.push(n/(i-1),0),this.uvs.push(n/(i-1),1),n<i-1){t=this.copyV3(n),this.previous.push(t[0],t[1],t[2]),this.previous.push(t[0],t[1],t[2]);let e=2*n;this.indices_array.push(e,e+1,e+2),this.indices_array.push(e+2,e+1,e+3)}n>0&&(t=this.copyV3(n),this.next.push(t[0],t[1],t[2]),this.next.push(t[0],t[1],t[2]))}t=this.compareV3(i-1,0)?this.copyV3(1):this.copyV3(i-1),this.next.push(t[0],t[1],t[2]),this.next.push(t[0],t[1],t[2]),this._attributes&&this._attributes.position.count===this.counters.length?(this._attributes.position.copyArray(new Float32Array(this.positions)),this._attributes.position.needsUpdate=!0,this._attributes.previous.copyArray(new Float32Array(this.previous)),this._attributes.previous.needsUpdate=!0,this._attributes.next.copyArray(new Float32Array(this.next)),this._attributes.next.needsUpdate=!0,this._attributes.side.copyArray(new Float32Array(this.side)),this._attributes.side.needsUpdate=!0,this._attributes.width.copyArray(new Float32Array(this.width)),this._attributes.width.needsUpdate=!0,this._attributes.uv.copyArray(new Float32Array(this.uvs)),this._attributes.uv.needsUpdate=!0,this._attributes.index.copyArray(new Uint16Array(this.indices_array)),this._attributes.index.needsUpdate=!0):this._attributes={position:new a.TlE(new Float32Array(this.positions),3),previous:new a.TlE(new Float32Array(this.previous),3),next:new a.TlE(new Float32Array(this.next),3),side:new a.TlE(new Float32Array(this.side),1),width:new a.TlE(new Float32Array(this.width),1),uv:new a.TlE(new Float32Array(this.uvs),2),index:new a.TlE(new Uint16Array(this.indices_array),1),counters:new a.TlE(new Float32Array(this.counters),1)},this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setIndex(this._attributes.index),this.computeBoundingSphere(),this.computeBoundingBox()}advance({x:e,y:t,z:i}){let n=this._attributes.position.array,s=this._attributes.previous.array,a=this._attributes.next.array,r=n.length;c(n,0,s,0,r),c(n,6,n,0,r-6),n[r-6]=e,n[r-5]=t,n[r-4]=i,n[r-3]=e,n[r-2]=t,n[r-1]=i,c(n,6,a,0,r-6),a[r-6]=e,a[r-5]=t,a[r-4]=i,a[r-3]=e,a[r-2]=t,a[r-1]=i,this._attributes.position.needsUpdate=!0,this._attributes.previous.needsUpdate=!0,this._attributes.next.needsUpdate=!0}}let d=`
  #include <common>
  #include <logdepthbuf_pars_vertex>
  #include <fog_pars_vertex>
  #include <clipping_planes_pars_vertex>

  attribute vec3 previous;
  attribute vec3 next;
  attribute float side;
  attribute float width;
  attribute float counters;
  
  uniform vec2 resolution;
  uniform float lineWidth;
  uniform vec3 color;
  uniform float opacity;
  uniform float sizeAttenuation;
  
  varying vec2 vUV;
  varying vec4 vColor;
  varying float vCounters;
  
  vec2 fix(vec4 i, float aspect) {
    vec2 res = i.xy / i.w;
    res.x *= aspect;
    return res;
  }
  
  void main() {
    float aspect = resolution.x / resolution.y;
    vColor = vec4(color, opacity);
    vUV = uv;
    vCounters = counters;
  
    mat4 m = projectionMatrix * modelViewMatrix;
    vec4 finalPosition = m * vec4(position, 1.0) * aspect;
    vec4 prevPos = m * vec4(previous, 1.0);
    vec4 nextPos = m * vec4(next, 1.0);
  
    vec2 currentP = fix(finalPosition, aspect);
    vec2 prevP = fix(prevPos, aspect);
    vec2 nextP = fix(nextPos, aspect);
  
    float w = lineWidth * width;
  
    vec2 dir;
    if (nextP == currentP) dir = normalize(currentP - prevP);
    else if (prevP == currentP) dir = normalize(nextP - currentP);
    else {
      vec2 dir1 = normalize(currentP - prevP);
      vec2 dir2 = normalize(nextP - currentP);
      dir = normalize(dir1 + dir2);
  
      vec2 perp = vec2(-dir1.y, dir1.x);
      vec2 miter = vec2(-dir.y, dir.x);
      //w = clamp(w / dot(miter, perp), 0., 4. * lineWidth * width);
    }
  
    //vec2 normal = (cross(vec3(dir, 0.), vec3(0., 0., 1.))).xy;
    vec4 normal = vec4(-dir.y, dir.x, 0., 1.);
    normal.xy *= .5 * w;
    //normal *= projectionMatrix;
    if (sizeAttenuation == 0.) {
      normal.xy *= finalPosition.w;
      normal.xy /= (vec4(resolution, 0., 1.) * projectionMatrix).xy * aspect;
    }
  
    finalPosition.xy += normal.xy * side;
    gl_Position = finalPosition;
    #include <logdepthbuf_vertex>
    #include <fog_vertex>
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    #include <clipping_planes_vertex>
    #include <fog_vertex>
  }
`,p=parseInt(a.UZH.replace(/\D+/g,"")),f=`
  #include <fog_pars_fragment>
  #include <logdepthbuf_pars_fragment>
  #include <clipping_planes_pars_fragment>
  
  uniform sampler2D map;
  uniform sampler2D alphaMap;
  uniform float useGradient;
  uniform float useMap;
  uniform float useAlphaMap;
  uniform float useDash;
  uniform float dashArray;
  uniform float dashOffset;
  uniform float dashRatio;
  uniform float visibility;
  uniform float alphaTest;
  uniform vec2 repeat;
  uniform vec3 gradient[2];
  
  varying vec2 vUV;
  varying vec4 vColor;
  varying float vCounters;
  
  void main() {
    #include <logdepthbuf_fragment>
    vec4 diffuseColor = vColor;
    if (useGradient == 1.) diffuseColor = vec4(mix(gradient[0], gradient[1], vCounters), 1.0);
    if (useMap == 1.) diffuseColor *= texture2D(map, vUV * repeat);
    if (useAlphaMap == 1.) diffuseColor.a *= texture2D(alphaMap, vUV * repeat).a;
    if (diffuseColor.a < alphaTest) discard;
    if (useDash == 1.) diffuseColor.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));
    diffuseColor.a *= step(vCounters, visibility);
    #include <clipping_planes_fragment>
    gl_FragColor = diffuseColor;     
    #include <fog_fragment>
    #include <tonemapping_fragment>
    #include <${p>=154?"colorspace_fragment":"encodings_fragment"}>
  }
`;class m extends a.jyz{constructor(e){super({uniforms:{...r.UniformsLib.fog,lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},color:{value:new a.Ilk(16777215)},gradient:{value:[new a.Ilk(16711680),new a.Ilk(65280)]},opacity:{value:1},resolution:{value:new a.FM8(1,1)},sizeAttenuation:{value:1},dashArray:{value:0},dashOffset:{value:0},dashRatio:{value:.5},useDash:{value:0},useGradient:{value:0},visibility:{value:1},alphaTest:{value:0},repeat:{value:new a.FM8(1,1)}},vertexShader:d,fragmentShader:f}),u(this,"lineWidth"),u(this,"map"),u(this,"useMap"),u(this,"alphaMap"),u(this,"useAlphaMap"),u(this,"color"),u(this,"gradient"),u(this,"resolution"),u(this,"sizeAttenuation"),u(this,"dashArray"),u(this,"dashOffset"),u(this,"dashRatio"),u(this,"useDash"),u(this,"useGradient"),u(this,"visibility"),u(this,"repeat"),this.type="MeshLineMaterial",Object.defineProperties(this,{lineWidth:{enumerable:!0,get(){return this.uniforms.lineWidth.value},set(e){this.uniforms.lineWidth.value=e}},map:{enumerable:!0,get(){return this.uniforms.map.value},set(e){this.uniforms.map.value=e}},useMap:{enumerable:!0,get(){return this.uniforms.useMap.value},set(e){this.uniforms.useMap.value=e}},alphaMap:{enumerable:!0,get(){return this.uniforms.alphaMap.value},set(e){this.uniforms.alphaMap.value=e}},useAlphaMap:{enumerable:!0,get(){return this.uniforms.useAlphaMap.value},set(e){this.uniforms.useAlphaMap.value=e}},color:{enumerable:!0,get(){return this.uniforms.color.value},set(e){this.uniforms.color.value=e}},gradient:{enumerable:!0,get(){return this.uniforms.gradient.value},set(e){this.uniforms.gradient.value=e}},opacity:{enumerable:!0,get(){return this.uniforms.opacity.value},set(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get(){return this.uniforms.resolution.value},set(e){this.uniforms.resolution.value.copy(e)}},sizeAttenuation:{enumerable:!0,get(){return this.uniforms.sizeAttenuation.value},set(e){this.uniforms.sizeAttenuation.value=e}},dashArray:{enumerable:!0,get(){return this.uniforms.dashArray.value},set(e){this.uniforms.dashArray.value=e,this.useDash=0!==e?1:0}},dashOffset:{enumerable:!0,get(){return this.uniforms.dashOffset.value},set(e){this.uniforms.dashOffset.value=e}},dashRatio:{enumerable:!0,get(){return this.uniforms.dashRatio.value},set(e){this.uniforms.dashRatio.value=e}},useDash:{enumerable:!0,get(){return this.uniforms.useDash.value},set(e){this.uniforms.useDash.value=e}},useGradient:{enumerable:!0,get(){return this.uniforms.useGradient.value},set(e){this.uniforms.useGradient.value=e}},visibility:{enumerable:!0,get(){return this.uniforms.visibility.value},set(e){this.uniforms.visibility.value=e}},alphaTest:{enumerable:!0,get(){return this.uniforms.alphaTest.value},set(e){this.uniforms.alphaTest.value=e}},repeat:{enumerable:!0,get(){return this.uniforms.repeat.value},set(e){this.uniforms.repeat.value.copy(e)}}}),this.setValues(e)}copy(e){return super.copy(e),this.lineWidth=e.lineWidth,this.map=e.map,this.useMap=e.useMap,this.alphaMap=e.alphaMap,this.useAlphaMap=e.useAlphaMap,this.color.copy(e.color),this.gradient=e.gradient,this.opacity=e.opacity,this.resolution.copy(e.resolution),this.sizeAttenuation=e.sizeAttenuation,this.dashArray=e.dashArray,this.dashOffset=e.dashOffset,this.dashRatio=e.dashRatio,this.useDash=e.useDash,this.useGradient=e.useGradient,this.visibility=e.visibility,this.alphaTest=e.alphaTest,this.repeat.copy(e.repeat),this}}let v={width:.2,length:1,decay:1,local:!1,stride:0,interval:1},y=(e,t=1)=>(e.set(e.subarray(t)),e.fill(-1/0,-t),e),b=s.forwardRef((e,t)=>{let{children:i}=e,{width:r,length:o,decay:l,local:u,stride:c,interval:d}={...v,...e},{color:p="hotpink",attenuation:f,target:b}=e,g=(0,n.D)(e=>e.size),w=(0,n.D)(e=>e.scene),x=s.useRef(null),[E,A]=s.useState(null),_=function(e,t){let{length:i,local:r,decay:o,interval:l,stride:u}={...v,...t},c=s.useRef(),[h]=s.useState(()=>new a.Pa4);s.useLayoutEffect(()=>{e&&(c.current=Float32Array.from({length:30*i},(t,i)=>e.position.getComponent(i%3)))},[i,e]);let d=s.useRef(new a.Pa4),p=s.useRef(0);return(0,n.F)(()=>{if(e&&c.current){if(0===p.current){let t;r?t=e.position:(e.getWorldPosition(h),t=h);let i=1*o;for(let e=0;e<i;e++)t.distanceTo(d.current)<u||(y(c.current,3),c.current.set(t.toArray(),c.current.length-3));d.current.copy(t)}p.current++,p.current=p.current%l}}),c}(E,{length:o,decay:l,local:u,stride:c,interval:d});s.useEffect(()=>{let e=(null==b?void 0:b.current)||x.current.children.find(e=>e instanceof a.Tme);e&&A(e)},[_,b]);let S=s.useMemo(()=>new h,[]),P=s.useMemo(()=>{var e;let t;let n=new m({lineWidth:.1*r,color:p,sizeAttenuation:1,resolution:new a.FM8(g.width,g.height)});return i&&(Array.isArray(i)?t=i.find(e=>"string"==typeof e.type&&"meshLineMaterial"===e.type):"string"==typeof i.type&&"meshLineMaterial"===i.type&&(t=i)),"object"==typeof(null==(e=t)?void 0:e.props)&&n.setValues(t.props),n},[r,p,g,i]);return s.useEffect(()=>{P.uniforms.resolution.value.set(g.width,g.height)},[g]),(0,n.F)(()=>{_.current&&S.setPoints(_.current,f)}),s.createElement("group",null,(0,n.h)(s.createElement("mesh",{ref:t,geometry:S,material:P}),w),s.createElement("group",{ref:x},i))})},6141:function(e,t,i){i.d(t,{Z:function(){return s}});var n=i(5531);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,n.Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},8956:function(e,t,i){i.d(t,{Z:function(){return s}});var n=i(5531);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,n.Z)("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]])},7006:function(e,t,i){i.d(t,{Z:function(){return s}});var n=i(5531);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,n.Z)("Magnet",[["path",{d:"m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15",key:"1i3lhw"}],["path",{d:"m5 8 4 4",key:"j6kj7e"}],["path",{d:"m12 15 4 4",key:"lnac28"}]])},4715:function(e,t,i){i.d(t,{Z:function(){return s}});var n=i(5531);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,n.Z)("Rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]])},2420:function(e,t,i){i.d(t,{Z:function(){return s}});var n=i(5531);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,n.Z)("Triangle",[["path",{d:"M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"14u9p9"}]])},882:function(e,t,i){i.d(t,{Z:function(){return s}});var n=i(5531);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,n.Z)("Waves",[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"knzxuh"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"2jd2cc"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"rd2r6e"}]])},2369:function(e,t,i){i.d(t,{Z:function(){return s}});var n=i(5531);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,n.Z)("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]])},3428:function(e,t,i){i.d(t,{Z:function(){return n}});function n(){return(n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)({}).hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e}).apply(null,arguments)}}}]);