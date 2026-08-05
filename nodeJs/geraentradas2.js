fs=require('fs');

amostras=[];

//30 laranjas
for(x=0;x<30;x++){
	amostras.push({
		peso:0.8+Math.random()/10,			//entre 0.8 e 0.9
		volume:0.7+Math.random()/10,		//entre 0.7 e 0.8
		cor:0.6+Math.random()/10,			//entre 0.6 e 0.7
		posicao:0.5+Math.random()/10,		//entre 0.5 e 0.6
		textura:0.4+Math.random()/10,		//entre 0.4 e 0.5
		consistencia:0.3+Math.random()/10,	//entre 0.3 e 0.4
		temperatura:0.2+Math.random()/10,	//entre 0.2 e 0.3
		idade:0.1+Math.random()/10,			//entre 0.1 e 0.2
		especie:'l'							//laranja
	});
}

//30 frutas qualquer
for(x=0;x<30;x++){
	amostras.push({
		peso:Math.random()*2,				//entre 0 e 2
		volume:Math.random()*2,				//entre 0 e 2
		cor:Math.random()*2,				//entre 0 e 2
		posicao:Math.random()*2,			//entre 0 e 2
		textura:Math.random()*2,			//entre 0 e 2
		consistencia:Math.random()*2,		//entre 0 e 2
		temperatura:Math.random()*2,		//entre 0 e 2
		idade:Math.random()*2,				//entre 0 e 2
		especie:'q'							//uma fruta qualquer
	});
}

//salva como JSON
fs.writeFileSync('entradas2.txt',JSON.stringify(amostras),'utf-8');

//leitura e exibicao
lidas=JSON.parse(fs.readFileSync('entradas2.txt','utf-8'));
lidas.forEach((a,i)=>{

	if(a.especie=='l')a.especie='laranja';
	else a.especie='fruta qualquer';

	console.log(`${a.peso.toFixed(6)} ${a.volume.toFixed(6)} ${a.cor.toFixed(6)} ${a.posicao.toFixed(6)} ${a.textura.toFixed(6)} ${a.consistencia.toFixed(6)} ${a.temperatura.toFixed(6)} ${a.idade.toFixed(6)} ${a.especie}`);
});
