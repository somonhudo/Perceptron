fs=require('fs');

inputs=[]
target=[]
//carregamento dos valores
amostra=JSON.parse(fs.readFileSync('entradas2.txt','utf-8'));
for(x=0;x<60;x++){
	inputs[x]=[amostra[x].idade,amostra[x].temperatura,amostra[x].consistencia,amostra[x].textura,amostra[x].posicao,amostra[x].cor,amostra[x].volume,amostra[x].peso];
	target[x]=(amostra[x].especie=='l')?1.0:0.0;
}

//buscando dados no arquivo texto
lidas=JSON.parse(fs.readFileSync('bias1.txt','utf-8'));
weights=lidas[0];
bias=lidas[1];

//contabilizando acertos e erros
laranjacerto=0,laranjaerrado=0,qqrcerto=0,qqrerrado=0;

//testa a inteligencia artificial com 1000 predições aleatórias
for(x=0;x<1000;x++){
	alguma=parseInt(Math.random()*60); //escolhe uma fruta qualquer

	somatorio=0.0;
	for(h=0;h<8;h++)somatorio+=inputs[alguma][h]*weights[h];

	if(target[alguma]>0.5)
		if(somatorio>0)laranjacerto++;
		else laranjaerrado++;
	if(target[alguma]<0.5)
		if(somatorio<0)qqrcerto++;
		else qqrerrado++;
}

console.log("\nEsperado laranja dado laranja: "+laranjacerto);
console.log("Esperado laranja dado qqr: "+laranjaerrado);
console.log("Esperado qqr dado qqr: "+qqrcerto);
console.log("Esperado qqr dado laranja: "+qqrerrado);
