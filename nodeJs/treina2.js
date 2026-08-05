fs=require('fs');

inputs=[]
target=[]
//carregamento dos valores
amostra=JSON.parse(fs.readFileSync('entradas2.txt','utf-8'));
for(x=0;x<60;x++){
	inputs[x]=[amostra[x].idade,amostra[x].temperatura,amostra[x].consistencia,amostra[x].textura,amostra[x].posicao,amostra[x].cor,amostra[x].volume,amostra[x].peso];
	target[x]=(amostra[x].especie=='l')?1.0:0.0;
}

//inicializa estruturas de dados
weights=new Array(8);
for(h=0;h<8;h++)weights[h]=Math.random();
bias=0.0;

for(x=0;x<200000;x++){ //ajusta os bias centenas de vezes
	erros=0;

	for(i=0;i<100;i++){ //cada geracao tem 100 individuos
		alguma=parseInt(Math.random()*60);; //escolhe uma fruta qualquer

		somatorio=bias;
		for(h=0;h<8;h++)somatorio+=weights[h]*inputs[alguma][h];

		degrau=somatorio>=0.0?1.0:0.0;
		degrau=target[alguma]-degrau;

		if(degrau!=0.0){
			erros++;
			for(h=0;h<8;h++)weights[h]+=0.000002*degrau*inputs[alguma][h]; //ajusta os weights para mais ou para menos de acordo com target-degrau
			bias+=0.000002*degrau;
		}
	}

	console.log(`${200000-x} biasfinal = ${bias.toFixed(6)}`);

	if(x%10000==0&&erros==0)break; //o bias foi encontrado
}

//salva os bias e weights
data=[weights,bias];
fs.writeFileSync('bias1.txt',JSON.stringify(data),'utf-8');

console.log("\nTreinamento finalizado. Pesos salvos em 'bias1.txt'")
