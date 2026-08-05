#include<stdio.h> //FILE
#include<stdlib.h> //rand
#include<time.h>

typedef struct{
	double peso;
	char especie;
} fruta;

int main(){
	fruta amostra;
	srand(time(0));

	FILE *fp=fopen("entradas1.txt","w");
	for(int x=0;x<25;x++){ //25 laranjas
		amostra.especie='l';
		amostra.peso=0.082+((double)rand()/(double)(RAND_MAX))/100.0; //valor entre 0.082 e 0.092
		fprintf(fp,"%lf %c\n",amostra.peso,amostra.especie); //grava no arquivo
	}
	for(int x=0;x<25;x++){ //25 frutas qualquer
		amostra.especie='q';
		amostra.peso=((double)rand()/(double)(RAND_MAX))/0.5; //valor entre 0 e 2
		fprintf(fp,"%lf %c\n",amostra.peso,amostra.especie); //grava no arquivo
	}
	fclose(fp);

	//leitura e exibicao
	fopen("entradas1.txt","r");
	for(int x=0;x<50;x++){
		fscanf(fp,"%lf %c\n",&amostra.peso,&amostra.especie); //busca no arquivo

		if(amostra.especie=='l')printf("%2d) %lf Laranja\n",x,amostra.peso); //exibe na tela
		else printf("%2d) %lf Fruta Qualquer\n",x,amostra.peso); //exibe na tela
	}
	fclose(fp);

	return 0;
}
