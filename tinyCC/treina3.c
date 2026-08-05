#include<stdio.h> //FILE
#include<stdlib.h> //rand
#include<time.h>

int main(){
	FILE * fp; //para lidar com arquivos
	srand(time(0));

	int qtdimagens=120; //qtd de imagens para treinar
	double chunks[qtdimagens][8]; //array de representacoes numericas das imagens

	//carregamento das imagens
	char filename[50]; //variavel que guarda o nome das imagens
	char cor; //usada na conversao
	for(int i=0;i<qtdimagens;i++){
		sprintf(filename,"imagens/amostra%04d.jpg",i);
		fp=fopen(filename,"r");
		fseek(fp,0,SEEK_END);
		long tamanho=ftell(fp)/8; //tamanho do arquivo
		fseek(fp,0,SEEK_SET);
		for(int h=0;h<8;h++)chunks[i][h]=0.0;
		for(int h=0;h<8;h++)for(int x=0;x<tamanho;x++){
			fread(&cor,sizeof(char),1,fp);
			chunks[i][h]+=(double)cor;
		}
		fclose(fp);
	}

	//inicializa estruturas de dados
	double weights[8];
	for(int i=0;i<8;i++)weights[i]=(double)rand()/(double)RAND_MAX;
	double bias=0.0;

	for(int x=0;x<20000;x++){ //treinamento
		int erros=0;

		for(int i=0;i<300;i++){ //cada geracao tem 300 individuos
			int alguma=rand()%qtdimagens; //escolhe uma imagem qualquer

			double somatorio=bias;
			for(int h=0;h<8;h++)somatorio+=weights[h]*chunks[alguma][h];

			double degrau=somatorio>=0.0?1.0:0.0;
			double target=alguma>qtdimagens/2?1.0:0.0;
			degrau=target-degrau;

			if(degrau!=0.0){
				erros++;
				for(int h=0;h<8;h++)weights[h]+=0.01*degrau*chunks[alguma][h]; //ajusta os weights para mais ou para menos de acordo com target-degrau
				bias+=0.01*degrau;
			}
		}

		printf("%d biasfinal = %.6lf\n",20000-x,bias);

		if(x%1000==0&&erros==0)break; //o bias foi encontrado
	}

	//Salva os wights e bias
	fp=fopen("bias2.txt","w");
	for(int i=0;i<8;i++)fprintf(fp,"%lf\n",weights[i]);
	fprintf(fp,"%lf\n",bias);
	fclose(fp);

	printf("\nTreinamento finalizado. weights e bias salvos em 'bias2.txt'\n");
	return 0;
}
