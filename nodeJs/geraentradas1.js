fs=require('fs');

frutas=[];

//25 laranjas
for(x=0;x<25;x++){
	especie='l';
	peso=0.082+Math.random()/100;	//entre 0.082 e 0.092
	frutas.push(`${peso} ${especie}`);
}
//25 frutas qualquer
for(x=0;x<25;x++){
	especie='q';
	peso=Math.random()*2;			//entre 0 e 2
	frutas.push(`${peso} ${especie}`);
}

//salva no arquivo
fs.writeFileSync('entradas1.txt',frutas.join('\n'),'utf-8');

//leitura e exibicao
conteudo=fs.readFileSync('entradas1.txt','utf-8').split('\n');
conteudo.forEach((amostra)=>{
	[peso,especie]=amostra.split(' ');

	if(especie=='l')especie='laranja';
	else especie='fruta qualquer';

	console.log(`${parseFloat(peso).toFixed(6)} ${especie}`);
});
