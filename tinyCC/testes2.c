#include<stdio.h> //FILE
#include<stdlib.h> //rand
#include<time.h>

int main(){
	FILE * fp; //para lidar com arquivos
	srand(time(0));

	int qtdimagens=120; //qtd de imagens para comparar
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

	//inicializa os pesos e bias com valor buscado do txt
	double weights[8];
	double bias;
	fp=fopen("bias2.txt","r");
	for(int i=0;i<8;i++)fscanf(fp,"%lf\n",&weights[i]);
	fscanf(fp,"%lf\n",&bias);
	fclose(fp);

	//contabilizando acertos e erros
	int circulocerto=0,circuloerrado=0,quadradocerto=0,quadradoerrado=0;

	//testa a inteligencia artificial com 1000 predições aleatórias
	for(int x=0;x<1000;x++){
		int alguma=rand()%qtdimagens; //escolhe uma imagem qualquer

		double somatorio=bias;
		for(int h=0;h<8;h++)somatorio+=weights[h]*chunks[alguma][h];

		if(alguma<qtdimagens/2) //se a imagem contem um circulo
			if(somatorio<0)circulocerto++;
			else circuloerrado++;
		if(alguma>qtdimagens/2) //se a imagem contem um quadrado
			if(somatorio>0)quadradocerto++;
			else quadradoerrado++;
	}

	printf("\nEsperado circulo dado circulo: %d\n",circulocerto);
	printf("Esperado circulo dado quadrado: %d\n",circuloerrado);
	printf("Esperado quadrado dado quadrado: %d\n",quadradocerto);
	printf("Esperado quadrado dado circulo: %d\n\n",quadradoerrado);

	return 0;
}
