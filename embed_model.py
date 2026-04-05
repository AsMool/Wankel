import base64
with open('assets/wankel.glb', 'rb') as f:
    encoded = base64.b64encode(f.read()).decode('utf-8')
with open('assets/wankel_base64.js', 'w') as f:
    f.write('const wankelSrc = \"data:model/gltf-binary;base64,' + encoded + '\";\n')
    f.write('document.getElementById(\"wankel-model\").src = wankelSrc;\n')
