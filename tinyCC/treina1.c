#include<stdio.h> //FILE
#include<stdlib.h> //rand
#include<time.h>

int main(){
	double peso[50];
	char especie[50];
	srand(time(0));

	//busca os valores no arquivo e armazena em dois arrays
	FILE *fp=fopen("entradas1.txt","r");
	for(int x=0;x<50;x++)fscanf(fp,"%lf %c\n",&peso[x],&especie[x]);
	fclose(fp);

	//inicializa o bias com um valor aleatorio
	double bias=(double)rand()/(double)(RAND_MAX); //valor entre 0 e 1

	for(int x=0;x<4000;x++){ //ajusta o bias centenas de vezes
		int alguma=rand()%25; //escolhe uma laranja qualquer

		//ajusta o bias pouco a pouco
		if(peso[alguma]>bias)bias=bias+(bias*0.01); //ajusta o bias um pouco a mais
		if(peso[alguma]<bias)bias=bias-(bias*0.01); //ajusta o bias um pouco a menos

		printf("biasfinal = %.6lf\n",bias);
	}

	printf("\nO valor que diferencia as laranjas: %.6lf\n\nCom uma margem de erro calibrada esse valor pode ser utilizado para classificar a fruta.\n",bias);
	return 0;
}
