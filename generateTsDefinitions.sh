dts-bundle --name indicators --main declarations/index.d.ts --out generated.d.ts --baseDir declarations --outputAsModuleFolder
sed -i '' 's/default class/class/g' declarations/generated.d.ts