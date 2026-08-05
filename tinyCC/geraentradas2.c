#include<stdio.h> //FILE
#include<stdlib.h> //rand
#include<time.h>

typedef struct{
	double peso;
	double volume;
	double cor;
	double posicao;
	double textura;
	double consistencia;
	double temperatura;
	double idade;
	char especie;
} fruta;

int main(){
	fruta amostra;
	srand(time(0));

	FILE *fp=fopen("entradas2.txt","w");
	for(int x=0;x<30;x++){
		amostra.especie='l'; //laranjas

		amostra.peso=0.8+((double)rand()/(double)(RAND_MAX))/10.0; //valor entre .8 e .9
		amostra.volume=0.7+((double)rand()/(double)(RAND_MAX))/10.0; //valor entre .7 e .8
		amostra.cor=0.6+((double)rand()/(double)(RAND_MAX))/10.0; //valor entre .6 e .7
		amostra.posicao=0.5+((double)rand()/(double)(RAND_MAX))/10.0; //valor entre .5 e .6
		amostra.textura=0.4+((double)rand()/(double)(RAND_MAX))/10.0; //valor entre .4 e .5
		amostra.consistencia=0.3+((double)rand()/(double)(RAND_MAX))/10.0; //valor entre .3 e .4
		amostra.temperatura=0.2+((double)rand()/(double)(RAND_MAX))/10.0; //valor entre .2 e .3
		amostra.idade=0.1+((double)rand()/(double)(RAND_MAX))/10.0; //valor entre .1 e .2

		//grava no arquivo
		fprintf(fp,"%lf %lf %lf %lf %lf %lf %lf %lf %c\n",amostra.peso,amostra.volume,amostra.cor,amostra.posicao,amostra.textura,amostra.consistencia,amostra.temperatura,amostra.idade,amostra.especie,amostra.especie); //grava no arquivo

	}
	for(int x=0;x<30;x++){
		amostra.especie='q'; //fruta qualquer

		amostra.peso=((double)rand()/(double)(RAND_MAX))*2; //valor entre 0 e 2
		amostra.volume=((double)rand()/(double)(RAND_MAX))*2; //valor entre 0 e 2
		amostra.cor=((double)rand()/(double)(RAND_MAX))*2; //valor entre 0 e 2
		amostra.posicao=((double)rand()/(double)(RAND_MAX))*2; //valor entre 0 e 2
		amostra.textura=((double)rand()/(double)(RAND_MAX))*2; //valor entre 0 e 2
		amostra.consistencia=((double)rand()/(double)(RAND_MAX))*2; //valor entre 0 e 2
		amostra.temperatura=((double)rand()/(double)(RAND_MAX))*2; //valor entre 0 e 2
		amostra.idade=((double)rand()/(double)(RAND_MAX))*2; //valor entre 0 e 2

		//grava no arquivo
		fprintf(fp,"%lf %lf %lf %lf %lf %lf %lf %lf %c\n",amostra.peso,amostra.volume,amostra.cor,amostra.posicao,amostra.textura,amostra.consistencia,amostra.temperatura,amostra.idade,amostra.especie,amostra.especie); //grava no arquivo
	}
	fclose(fp);

	fopen("entradas2.txt","r");
	for(int x=0;x<30;x++){
		//busca os valores no arquivo e exibe na tela
		fscanf(fp,"%lf %lf %lf %lf %lf %lf %lf %lf %c\n",&amostra.peso,&amostra.volume,&amostra.cor,&amostra.posicao,&amostra.textura,&amostra.consistencia,&amostra.temperatura,&amostra.idade,&amostra.especie,&amostra.especie); //busca no arquivo
		if(x<16)printf("%d) %lf %lf %lf %lf %lf %lf %lf %lf Laranja\n",x,amostra.peso,amostra.volume,amostra.cor,amostra.posicao,amostra.textura,amostra.consistencia,amostra.temperatura,amostra.idade);
	}
	for(int x=0;x<30;x++){
		//busca os valores no arquivo e exibe na tela
		fscanf(fp,"%lf %lf %lf %lf %lf %lf %lf %lf %c\n",&amostra.peso,&amostra.volume,&amostra.cor,&amostra.posicao,&amostra.textura,&amostra.consistencia,&amostra.temperatura,&amostra.idade,&amostra.especie,&amostra.especie); //busca no arquivo
		if(x<16)printf("%d) %lf %lf %lf %lf %lf %lf %lf %lf Fruta qualquer\n",x,amostra.peso,amostra.volume,amostra.cor,amostra.posicao,amostra.textura,amostra.consistencia,amostra.temperatura,amostra.idade);
	}
	fclose(fp);

	return 0;
}
